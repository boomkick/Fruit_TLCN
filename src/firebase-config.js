// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsKO7XQKEQc-zWS-UO6d1utJffS1u0-fY",
  authDomain: "chat-app-4a006.firebaseapp.com",
  projectId: "chat-app-4a006",
  storageBucket: "chat-app-4a006.appspot.com",
  messagingSenderId: "526348796563",
  appId: "1:526348796563:web:544a6824052eba3ee34366"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

