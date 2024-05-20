// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDS_rJSjOewGl6XvIXRUrsCApA_fEehP5g",
    authDomain: "react-based-chatapp.firebaseapp.com",
    projectId: "react-based-chatapp",
    storageBucket: "react-based-chatapp.appspot.com",
    messagingSenderId: "413776278832",
    appId: "1:413776278832:web:f211b99832fe2f420384f5",
    measurementId: "G-5GPDCTQXCZ"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
