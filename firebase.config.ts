// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQBmutEX5qnVBeGT1kPP0jw6PamCAHtGs",
  authDomain: "firestreamapp-95c0e.firebaseapp.com",
  projectId: "firestreamapp-95c0e",
  storageBucket: "firestreamapp-95c0e.appspot.com",
  messagingSenderId: "361177112096",
  appId: "1:361177112096:web:2eea16cdc7d035358b2645"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);