/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { onNavigate } from '../../main.js';
import { firebaseConfig } from './configFirebase.js';
// import { Swal } from "https://cdn.jsdelivr.net/npm/sweetalert2@11";



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
    })

    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Éste correo ya existe!'
        })
        // alert('¡Éste correo ya existe!')
      } else if (errorCode === 'auth/weak-password') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Contraseña débil, debe tener al menos 6 carácteres!'
        })
        // alert('Contraseña débil, debe tener al menos 6 carácteres')
      } else if (errorCode === 'auth/invalid-email') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Éste correo es inválido'
        })
        // alert('Éste correo es inválido')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor ingrese los datos'
        })
        // alert('Por favor ingrese los datos')
      }
    });
};

export const authEmailPass = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;

      // console.log(user.displayName);

      if (usuario != '') {
        onNavigate('/principalPage');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario no encontrado'
        })
        // alert('Usuario no encontrado')
      } else if (errorCode === 'auth/wrong-password') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Email o contraseña incorrectos!'
        })
        // alert('¡Email o contraseña incorrectos!')
      } else if (errorCode === 'auth/invalid-email') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo es inválido'
        })
        // alert('El correo es inválido')
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
      if (usuario != '') {
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
    // console.log('usuario', usuario.displayName)
    onNavigate('/principalPage')
  } else {
    console.log('No se encuentra el usuario');
  }
});

export const signOutCount = () => {
  signOut(auth).then(() => {
    onNavigate('/');
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'no pudiste cerrar sesión'
    })
    // alert(error, 'no pudiste cerrar sesión')
  });
}

export { onAuthStateChanged }



