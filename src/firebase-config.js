// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7AE3nKJfANwdJ5TzU_GryraximfidOBQ",
  authDomain: "chat-app-ba422.firebaseapp.com",
  projectId: "chat-app-ba422",
  storageBucket: "chat-app-ba422.appspot.com",
  messagingSenderId: "889175760990",
  appId: "1:889175760990:web:e5d172a52e6727a56dd4cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

