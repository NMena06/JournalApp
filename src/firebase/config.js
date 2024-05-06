// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4jhTt7UD2ymt7Gc2BduFJDeZJu6cNozM",
  authDomain: "react-journalapp-fh.firebaseapp.com",
  projectId: "react-journalapp-fh",
  storageBucket: "react-journalapp-fh.appspot.com",
  messagingSenderId: "271847588656",
  appId: "1:271847588656:web:48a29769eab8247232fef5",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
