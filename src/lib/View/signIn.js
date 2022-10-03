/* eslint-disable import/no-cycle */

<<<<<<< HEAD:src/lib/View/signIn.js
import { authEmailPass } from '../firebase/authFirebase.js';
=======
import { authEmailPass, authGoogle } from '../firebase/authFirebase.js';
>>>>>>> 9e1fd385581e8e5966351b64b0e209b97b50b627:src/lib/component/signIn.js

export const signIn = () => {

  let signInContainer = document.createElement("div")
  signInContainer.classList.add('container')
  // let signInContainer = document.getElementById('root')
  const signInTemplate =
    `
      <picture>
        <img id="logo" src="./images/logo2.png" alt="logo">
      </picture>
      <div class="form-container-signIn">
        <form class="formContainer">
          <input class="inputForm" type="email" placeholder="Email" id="inputEmail">
          <input class="inputForm" type="password" placeholder="Contraseña" id="inputPassword">
          </form>
          <div>
          <button class="btnSignIn" id="btnSignIn" onclick="signInEmailPass()" >Iniciar Sesión</button>
          
          <div class="optionSignIn">
          <hr>
          <p>o</p>
          <hr>
          </div>
          
          <button class="btnGoogle" id="btnGoogle" type="submit" onclick="signInGoogle()"><img src="./images/google.png">Acceder con
 Google</button>
            </div>
        <a href="/signUp" class="linkSign" >No tienes una cuenta? Registrate</a>
      </div>`;

  signInContainer.innerHTML = signInTemplate

  window.signInEmailPass = function () {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    console.log(email, pass);
    authEmailPass(email, pass);
  };

  window.signInGoogle = function (){
    authGoogle();
  }

  return signInContainer

}//<button class="btnGoogle" id="btnGoogle" type="submit" onclick="signInGoogle()"><img src="./images/google.png">Acceder con
// Google</button>

