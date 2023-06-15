// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM5L_pWM5aFORewNPg1H0iJPk5g4N0hhs",
  authDomain: "manager-project-3bc13.firebaseapp.com",
  projectId: "manager-project-3bc13",
  storageBucket: "manager-project-3bc13.appspot.com",
  messagingSenderId: "1054585210300",
  appId: "1:1054585210300:web:bec4b96440c3bec87757b9",
  measurementId: "G-WMEQEHLJTF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
