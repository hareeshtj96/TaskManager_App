// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB69H1y6E94ERDQs7fPCl_P0FR6HcFdbjw",
    authDomain: "taskmanagement-7f926.firebaseapp.com",
    projectId: "taskmanagement-7f926",
    storageBucket: "taskmanagement-7f926.appspot.com",
    messagingSenderId: "633199629795",
    appId: "1:633199629795:web:60ae0588733c9c3cbf3cd6",
    measurementId: "G-H3GFXDVTNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);