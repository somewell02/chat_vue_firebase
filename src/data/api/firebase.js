import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAtqdqoE6uhQu1WenECk7gqVv5w2tlgbZc",
  authDomain: "the-chat-module.firebaseapp.com",
  databaseURL:
    "https://the-chat-module-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "the-chat-module",
  storageBucket: "the-chat-module.appspot.com",
  messagingSenderId: "187273692521",
  appId: "1:187273692521:web:55b451d10aaff9cb76a9f8",
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
