/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { onNavigate } from '../../main.js';
import { firebaseConfig } from './configFirebase.js';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = (email, pass, name) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      onNavigate('/principalPage');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage, errorCode);
    });
};

export const authEmailPass = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      onNavigate('/principalPage');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage, errorCode);
    });
};

export const authGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      onNavigate('/principalPage');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export const signOutCount = () => {
  signOut(auth).then(() => {
    onNavigate('/');
  }).catch((error) => {
    console.log(error, 'no pudiste cerrar sesión')
  });
}




