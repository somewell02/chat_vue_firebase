import { ref, onUnmounted } from "vue";
import { db } from "./firebase";
import { getUserById } from "./users";

const chatRoomsCollection = db.collection("chatRooms");

export const sendMessageFromChatApp = async (chatID, message) => {
  chatRoomsCollection.doc(chatID).collection("messages").add({
    authorIcon: "",
    email: "chatApp",
    message: message,
    sendBy: "chatApp",
    time: Date.now(),
  });
};

export const getChatRoomMessages = (chatID) => {
  const chatRoomMessages = ref([]);
  const close = chatRoomsCollection
    .doc(chatID)
    .collection("messages")
    .orderBy("time")
    .onSnapshot((snapshot) => {
      chatRoomMessages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  onUnmounted(close);
  return chatRoomMessages;
};

export const sendMessage = async (userID, chatID, message) => {
  let user = null;
  const time = Date.now();
  await Promise.resolve(getUserById(userID)).then(function (value) {
    user = value;
  });
  await chatRoomsCollection.doc(chatID).collection("messages").add({
    authorIcon: "",
    email: user.email,
    message: message,
    sendBy: user.name,
    time: time,
  });
  await chatRoomsCollection.doc(chatID).update({
    chatLastMessage: message,
    lastMessageTime: time,
  });
};
