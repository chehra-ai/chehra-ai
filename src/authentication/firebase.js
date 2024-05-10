// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-0oXDiNhQfnjvrmG8u_raHVpjl8xLuo",
  authDomain: "authentication-firebase-ex.firebaseapp.com",
  projectId: "authentication-firebase-ex",
  storageBucket: "authentication-firebase-ex.appspot.com",
  messagingSenderId: "216274692455",
  appId: "1:216274692455:web:97e1bb16f27eca83c527c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);