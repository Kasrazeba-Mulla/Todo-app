// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; //to get access to the database
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtovKcgxfs2BbsFY2BY28GJyqvwEx5Cc8",
  authDomain: "todo-list-1cd59.firebaseapp.com",
  databaseURL: "https://todo-list-1cd59-default-rtdb.firebaseio.com",
  projectId: "todo-list-1cd59",
  storageBucket: "todo-list-1cd59.appspot.com",
  messagingSenderId: "99517718757",
  appId: "1:99517718757:web:2a807cea47b5fe5389740c",
  measurementId: "G-3W42LWYK6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
