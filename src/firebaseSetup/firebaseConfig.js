// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmk9b2AZeU-sPIq-3z0enHteOjnsaHrnk",
  authDomain: "recipe-book-application-6645f.firebaseapp.com",
  databaseURL: "https://recipe-book-application-6645f-default-rtdb.firebaseio.com",
  projectId: "recipe-book-application-6645f",
  storageBucket: "recipe-book-application-6645f.firebasestorage.app",
  messagingSenderId: "967808786510",
  appId: "1:967808786510:web:543c4d3c9530c7c483a31f",
  measurementId: "G-1CNB400LVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
