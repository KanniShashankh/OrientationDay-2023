// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9oKnW5xuDDc6ZEe98hHt50-zckgVX9x4",
  authDomain: "orientation-2023-dbfce.firebaseapp.com",
  projectId: "orientation-2023-dbfce",
  storageBucket: "orientation-2023-dbfce.appspot.com",
  messagingSenderId: "169445376456",
  appId: "1:169445376456:web:67310da03108d594acc0fd",
  measurementId: "G-6Y6DPVGX5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
