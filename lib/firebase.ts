// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
