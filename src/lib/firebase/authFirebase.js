/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { onNavigate } from '../../main.js';
import { firebaseConfig } from './configFirebase.js';



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export let auth = getAuth(app);
export let usuario = ''


export const createUser = (email, pass, name) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      return updateProfile(userCredential.user, {
        displayName: name,
      })
    }).then(res => {
      auth = getAuth(app)

      // onNavigate('/principalPage');
    })

    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('¡Éste correo ya existe!')
      } else if (errorCode === 'auth/weak-password') {
        alert('Contraseña débil, debe tener al menos 6 carácteres')
      } else if (errorCode === 'auth/invalid-email') {
        alert('Éste correo es inválido')
      } else {
        alert('Por favor ingrese los datos')
      }
    });
};

export const getUserAuth = () => auth

export const authEmailPass = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.displayName);
      if(usuario!=null){
        onNavigate('/principalPage');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        alert('Usuario no encontrado')
      } else if (errorCode === 'auth/wrong-password') {
        alert('¡Email o contraseña incorrectos!')
      } else if (errorCode === 'auth/invalid-email') {
        alert('El correo es inválido')
      }
    });
};

export const authGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      if(usuario!=null){
        onNavigate('/principalPage');
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

  onAuthStateChanged(auth, (user) => { // dice si estamos conectadas//
    if (user) {
      usuario = user
      console.log('usuario', user)
      onNavigate('/principalPage')
    } else {
      console.log('No se encuentra el usuario');
      // onNavigate('/')
    }
  });

export const signOutCount = () => {
  signOut(auth).then(() => {
    onNavigate('/');
  }).catch((error) => {
    alert(error, 'no pudiste cerrar sesión')
  });
}




