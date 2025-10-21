import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAqLDgxW9gdzrH-vnRALsDP11bbROUEEMU",
  authDomain: "chat-app-ef85c.firebaseapp.com",
  projectId: "chat-app-ef85c",
  storageBucket: "chat-app-ef85c.firebasestorage.app",
  messagingSenderId: "756197689277",
  appId: "1:756197689277:web:4ce9ae9e84f169414374d4",
  measurementId: "G-4CF1CKKEJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db };
