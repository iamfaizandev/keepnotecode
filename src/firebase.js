import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyASm8wnqSUrGBJ-ontnnBcVF_2UAkGIj6M",
  authDomain: "onekeepnotes.firebaseapp.com",
  projectId: "onekeepnotes",
  storageBucket: "onekeepnotes.appspot.com",
  messagingSenderId: "963764806693",
  appId: "1:963764806693:web:b520a891261e3479748bcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
