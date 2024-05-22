// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVdoHeaAyqSjvPLnhR-bk8uYUEIJU5v_Y",
  authDomain: "daveads-storage.firebaseapp.com",
  projectId: "daveads-storage",
  storageBucket: "daveads-storage.appspot.com",
  messagingSenderId: "307422893719",
  appId: "1:307422893719:web:9390fb3ccabd8a4b9d3bd2",
  measurementId: "G-6TMSEMBY1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);