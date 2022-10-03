/* eslint-disable import/no-cycle */

import { authEmailPass } from './authFirebase.js';

export const signIn = () => {

  let signInContainer = document.createElement("div")
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
          
          <button class="btnGoogle" id="btnGoogle" type="submit"><img src="./images/google.png">Continuar con
            Google</button>
            </div>
        <a href="/signUp" class="linkSign" onclick="onNavigate()">No tienes una cuenta? Registrate</a>
      </div>`;

  signInContainer.innerHTML = signInTemplate

  window.signInEmailPass = function () {
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    console.log(email, pass);
    authEmailPass(email, pass);
  };

  return signInContainer

}

