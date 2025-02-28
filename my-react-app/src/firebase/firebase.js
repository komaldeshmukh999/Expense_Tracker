import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";//Realtime database

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_APP_API_KEY,
    authDomain:import.meta.env.VITE_APP_AUTHDOMAIN,
    databaseURL:import.meta.env.VITE_APP_DATABASEURL,
    projectId:import.meta.env.VITE_APP_PROJECTID,
    storageBucket:import.meta.env.VITE_APP_STORAGEBUCKET ,
    messagingSenderId:import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId:import.meta.env.VITE_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Initialize Realtime Database and export it
export default app;