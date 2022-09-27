import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import{ app } from './lib/component/firebase.js';
const auth = getAuth(app);

const firebaseConfig = {
  apiKey: "AIzaSyDgNOTiysnRa1Dhq40OobZ54zRnFWOQn34",
  authDomain: "socialnetwork-13.firebaseapp.com",
  projectId: "socialnetwork-13",
  storageBucket: "socialnetwork-13.appspot.com",
  messagingSenderId: "428426453330",
  appId: "1:428426453330:web:d01d7b1c375802bbab9a8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const createUser = (email,pass) => {
  createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  
  });}