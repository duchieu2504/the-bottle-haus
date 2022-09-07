// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkqXKziteXyctu3mNbNopzkpwP6ApB9TM",
    authDomain: "the-bottle-house-2448f.firebaseapp.com",
    projectId: "the-bottle-house-2448f",
    storageBucket: "the-bottle-house-2448f.appspot.com",
    messagingSenderId: "117669662185",
    appId: "1:117669662185:web:036adacdc123a8c8394f78",
    measurementId: "G-36HNW2014Y",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firebase.analytics();

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// lưu trữ firebase
const auth = firebase.auth();

// lưu trứ firestore
const db = getFirestore();

export { db, auth };
export default firebase;
