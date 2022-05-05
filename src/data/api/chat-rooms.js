import firebase from "firebase/compat/app";
import { ref, onUnmounted } from "vue";
import { db, firebaseApp } from "./firebase";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getUserById } from "./users";
import { sendMessageFromChatApp } from "./chat-messages";

const chatRoomsCollection = db.collection("chatRooms");

export const addImageInStorage = async (image, path) => {
  const storage = getStorage(firebaseApp);
  const storageRef = stRef(storage, path + image.name);

  await uploadBytes(storageRef, image);
  let imageUrl = null;
  await getDownloadURL(storageRef).then((url) => {
    imageUrl = url;
  });
  return imageUrl;
};

export const setChatAvatar = async (chatID, image) => {
  var blob = image.slice(0, image.size, image.type);
  const modifiedImage = new File([blob], "avatar." + image.name.split(".")[1], {
    type: image.type,
  });
  const imageUrl = await addImageInStorage(
    modifiedImage,
    "chats-images/" + chatID + "/"
  );

  return imageUrl;
};

export const createChatRoom = async (chatName, userID, image) => {
  let user = null;
  await Promise.resolve(getUserById(userID)).then(function (value) {
    user = value;
  });
  const id = Math.floor(Math.random() * 100000).toString();

  const imageUrl = image ? await setChatAvatar(id, image) : null;

  const chatRoom = {
    name: chatName,
    chatRoomId: id,
    lastMessageTime: "",
    chatLastMessage: "",
    chatIcon: imageUrl,
    users: [userID],
  };
  await chatRoomsCollection.doc(id).set(chatRoom);

  sendMessageFromChatApp(id, user.name + " created the chat");
};

export const editChatAvatar = async (chatID, image) => {
  const imageUrl = image ? await setChatAvatar(chatID, image) : null;

  await chatRoomsCollection.doc(chatID).update({ chatIcon: imageUrl });
};

export const getChatRoomById = async (id) => {
  const chat = await chatRoomsCollection.doc(id).get();
  return chat.exists ? chat.data() : null;
};

export const joinChatRoom = async (chatID, userID) => {
  await chatRoomsCollection.doc(chatID).update({
    users: firebase.firestore.FieldValue.arrayUnion(userID),
  });
  let user = null;
  await Promise.resolve(getUserById(userID)).then(function (value) {
    user = value;
  });
  sendMessageFromChatApp(chatID, user.name + " joined the chat");
};

export const leaveFromChatRoom = async (chatID, userID) => {
  await chatRoomsCollection.doc(chatID).update({
    users: firebase.firestore.FieldValue.arrayRemove(userID),
  });
  let user = null;
  await Promise.resolve(getUserById(userID)).then(function (value) {
    user = value;
  });
  sendMessageFromChatApp(chatID, user.name + " left the chat");
};

export const getChatRooms = () => {
  const chatRooms = ref([]);
  const close = chatRoomsCollection.onSnapshot((snapshot) => {
    chatRooms.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);
  return chatRooms;
};

export const getChatRoomsByUser = (userID) => {
  const chatRooms = ref([]);
  const close = chatRoomsCollection
    .orderBy("lastMessageTime", "desc")
    .where("users", "array-contains", userID)
    .onSnapshot((snapshot) => {
      chatRooms.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);
  return chatRooms;
};

export const deleteChatRoom = async (chatID) => {
  const messagesCollection = chatRoomsCollection
    .doc(chatID)
    .collection("messages");

  const snapshot = await messagesCollection.get();

  snapshot.docs.forEach((message) => {
    messagesCollection.doc(message.ref.id).delete();
  });

  return chatRoomsCollection.doc(chatID).delete();
};
