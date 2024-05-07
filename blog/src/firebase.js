// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-f0638.firebaseapp.com",
  projectId: "blog-mern-f0638",
  storageBucket: "blog-mern-f0638.appspot.com",
  messagingSenderId: "844058699635",
  appId: "1:844058699635:web:437f75f672de88b3d00706"
};

// Initialize Firebase 
export const app = initializeApp(firebaseConfig);