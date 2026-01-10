// Firebase Configuration (CDN ESM Imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };

