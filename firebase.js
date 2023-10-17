import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrQcidb05hRLoWAvsM7JJVcuqdRbEAq0I",
  authDomain: "chatgpt-clone-53d9b.firebaseapp.com",
  projectId: "chatgpt-clone-53d9b",
  storageBucket: "chatgpt-clone-53d9b.appspot.com",
  messagingSenderId: "118122972842",
  appId: "1:118122972842:web:94ede087e9ed3d0c6172d3",
  measurementId: "G-P1J1XW2QWR",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
