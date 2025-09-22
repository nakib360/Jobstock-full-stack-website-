// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.VITE_apiKey,
  // authDomain: import.meta.VITE_authDomain,
  // projectId: import.meta.VITE_projectId,
  // storageBucket: import.meta.VITE_storageBucket,
  // messagingSenderId: import.meta.VITE_messagingSenderId,
  // appId: import.meta.VITE_appId,
  // measurementId: import.meta.VITE_measurementId,
  apiKey: "AIzaSyCNtC3YeZ4QJElKQwjKgnizxcqIXkgh6xg",
  authDomain: "job-stock-668d6.firebaseapp.com",
  projectId: "job-stock-668d6",
  storageBucket: "job-stock-668d6.firebasestorage.app",
  messagingSenderId: "262922202384",
  appId: "1:262922202384:web:44c7a2cbc35b20f6ea4995",
  measurementId: "G-7GXJLX5XDN"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
export default app;