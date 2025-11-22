// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACa5a0MmohKo2h4-fN2ffnl7BlgLDr4iQ",
  authDomain: "sudan-pc-shop.firebaseapp.com",
  projectId: "sudan-pc-shop",
  storageBucket: "sudan-pc-shop.firebasestorage.app",
  messagingSenderId: "170352568774",
  appId: "1:170352568774:web:621c05df397bc057832ac7",
  measurementId: "G-4H5XTW59TM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
