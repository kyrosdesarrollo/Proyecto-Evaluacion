// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {  getAuth } from 'firebase/auth';
import {  getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRlqBkGHebgyzxRyFgXCuy99SMBEHL9j4",
  authDomain: "react-71a32.firebaseapp.com",
  projectId: "react-71a32",
  storageBucket: "react-71a32.appspot.com",
  messagingSenderId: "680114701351",
  appId: "1:680114701351:web:bceeb6a7d412b937fb7a02"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);