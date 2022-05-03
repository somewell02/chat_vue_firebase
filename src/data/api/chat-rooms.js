import firebase from "firebase/compat/app";
import { ref, onUnmounted } from "vue";
import { db } from "./firebase";
import { getUserById } from "./users";
import { sendMessageFromChatApp } from "./chat-messages";

const chatRoomsCollection = db.collection("chatRooms");

export const createChatRoom = async (chatName, userID) => {
  let user = null;
  await Promise.resolve(getUserById(userID)).then(function (value) {
    user = value;
  });
  let id = chatName + Math.floor(Math.random() * 100000);
  const chatRoom = {
    name: chatName,
    chatRoomId: id,
    lastMessageTime: "",
    chatLastMessage: "",
    chatIcon:
      "https://img.freepik.com/free-vector/chat-speech-bubble-icon_23-2147501656.jpg?1",
    users: [userID],
  };
  await chatRoomsCollection.doc(id).set(chatRoom);

  sendMessageFromChatApp(id, user.name + " created the chat");
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
  console.log(chatID, userID);
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

export const deleteChatRoom = (chatID) => {
  // chatRoomsCollection
  //   .doc(chatID)
  //   .collection('messages')
  //   .delete()
  return chatRoomsCollection.doc(chatID).delete();
};
