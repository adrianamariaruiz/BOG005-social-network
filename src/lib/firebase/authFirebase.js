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
// console.log(auth)


export const createUser = (email, pass, name) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      return updateProfile(userCredential.user, {
        displayName: name,
      })
    }).then(res => {
      auth = getAuth(app)
      console.log(auth.currentUser.displayName)

      // onNavigate('/principalPage');
    })

    .catch((error) => {
      console.log(error)
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // alert(errorMessage, errorCode);
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        // errorText.textContent = '¡Éste correo ya existe!';
        alert('¡Éste correo ya existe!')
      } else if (errorCode === 'auth/weak-password') {
        // errorText.textContent = 'Contraseña débil, debe tener al menos 6 carácteres';
        alert('Contraseña débil, debe tener al menos 6 carácteres')
      } else if (errorCode === 'auth/invalid-email') {
        // errorText.textContent = 'Éste correo es inválido';
        alert('Éste correo es inválido')
      } else {
        alert('Por favor ingrese los datos')
      }
    });
};

export const getUserAuth = () => auth
// console.log('user por aca', user);

export const authEmailPass = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.displayName);
      onNavigate('/principalPage');
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // alert(errorMessage, errorCode);
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        // errorText.textContent = 'Usuario no encontrado...';
        alert('Usuario no encontrado')
      } else if (errorCode === 'auth/wrong-password') {
        // errorText.textContent = '¡Email o contraseña incorrectos!';
        alert('¡Email o contraseña incorrectos!')
      } else if (errorCode === 'auth/invalid-email') {
        // errorText.textContent = '*El correo es inválido';
        alert('El correo es inválido')
      }
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

onAuthStateChanged(auth, (user) => { // dice si estamos conectadas//
  if (user) {
    usuario = user
    console.log('usuario', user)
    onNavigate('/principalPage')
  } else {
    console.log('No se encuentra el usuario');
    onNavigate('/signUp')
  }
});

export const signOutCount = () => {
  signOut(auth).then(() => {
    onNavigate('/');
  }).catch((error) => {
    alert(error, 'no pudiste cerrar sesión')
  });
}




