import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAucusuF70bLUMQ2lA7r6eToY84hB50da4",
  authDomain: "reba-ai.firebaseapp.com",
  projectId: "reba-ai",
  storageBucket: "reba-ai.firebasestorage.app",
  messagingSenderId: "201669748242",
  appId: "1:201669748242:web:3222f6ca8e078270311acb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 