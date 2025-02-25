// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGw4ka0C63SHzamj6ImE4a7IyUd2P4Ujw",
  authDomain: "aicoding-75623.firebaseapp.com",
  projectId: "aicoding-75623",
  databaseURL:'https://aicoding-75623-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: "aicoding-75623.firebasestorage.app",
  messagingSenderId: "1060106818476",
  appId: "1:1060106818476:web:e69d2b3f304ab4e6df6009",
  measurementId: "G-044MDERXB5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { database };
