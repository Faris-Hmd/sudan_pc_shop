// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  appId: "1:170352568774:web:cd10475686779dfd832ac7",
  measurementId: "G-8TPBWFYX32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
