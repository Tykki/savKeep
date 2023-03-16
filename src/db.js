// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_DB_KEY,
  authDomain: "savage-keep.firebaseapp.com",
  projectId: "savage-keep",
  storageBucket: "savage-keep.appspot.com",
  messagingSenderId: "505018716920",
  appId: "1:505018716920:web:24b1786e2fca4faf97210d",
  measurementId: "G-2FS3DY33K2"
};

// Initialize Firebase
export default getAnalytics(initializeApp(firebaseConfig));