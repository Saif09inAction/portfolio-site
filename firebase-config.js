// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAokUohIDH-xfPzXu4_Wn9C1OEoPkYFz8",
  authDomain: "saif-s-portfolio-c7d5d.firebaseapp.com",
  projectId: "saif-s-portfolio-c7d5d",
  storageBucket: "saif-s-portfolio-c7d5d.firebasestorage.app",
  messagingSenderId: "397639047804",
  appId: "1:397639047804:web:14bc0b7ba7a7c747d9c7f9",
  measurementId: "G-EP6PWWDFLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
