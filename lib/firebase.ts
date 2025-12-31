// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyACa5a0MmohKo2h4-fN2ffnl7BlgLDr4iQ",
  authDomain: "sudan-pc-shop.firebaseapp.com",
  projectId: "sudan-pc-shop",
  storageBucket: "sudan-pc-shop.firebasestorage.app",
  messagingSenderId: "170352568774",
  appId: "1:170352568774:web:621c05df397bc057832ac7",
  measurementId: "G-4H5XTW59TM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Use a cleaner environment check for 2025 workflows
const isDevelopment =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true";

// if (isDevelopment) {
//   // Only connect if we are in a browser environment
//   try {
//     // 8080 is the default Firestore port unless changed in firebase.json
//     connectFirestoreEmulator(db, "127.0.0.1", 8080);
//     console.info("✔ Connected to Firestore Emulator");
//   } catch (err) {
//     console.warn("✘ Firestore Emulator connection failed:", err);
//   }
// }
export const productsRef = collection(db, "products");
export const usersRef = collection(db, "users");

export const ordersRef = collection(db, "orders");
