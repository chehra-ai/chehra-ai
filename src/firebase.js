// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD3j96BO_XunYMKQ-JOv83EjicsziNpfH0",
  authDomain: "chehra-ai.firebaseapp.com",
  databaseURL: "https://chehra-ai-default-rtdb.firebaseio.com",
  projectId: "chehra-ai",
  storageBucket: "chehra-ai.appspot.com",
  messagingSenderId: "153428363461",
  appId: "1:153428363461:web:6128a9d0211c461851c8ac",
  measurementId: "G-H4M00SEN11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states will now persist locally.
  })
  .catch((error) => {
    // Handle errors here.
    console.error("Error setting auth persistence: ", error);
  });

export const db = getFirestore(app);
export default app;
export { auth };