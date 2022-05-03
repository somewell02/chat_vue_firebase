import { ref, onUnmounted } from "vue";
import { db } from "./firebase";

const usersCollection = db.collection("users");

export const getUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};

export const getUserById = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const createUser = (user) => {
  return usersCollection.doc(user.uid).set({
    email: user.email,
    name: user.displayName,
    phone: user.phoneNumber,
  });
};
