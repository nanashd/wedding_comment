import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCg4wwElwUtLRUGkPIheSTuXpt1bSGkwrE",
  authDomain: "wedding-comment-wall.firebaseapp.com",
  projectId: "wedding-comment-wall",
  storageBucket: "wedding-comment-wall.firebasestorage.app",
  messagingSenderId: "207850893216",
  appId: "1:207850893216:web:714838b1629f59e7adfec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
