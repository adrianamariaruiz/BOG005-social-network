import { createUser } from '../firebase/authFirebase.js';

export const signUp = () => {
  let signUpContainer = document.createElement("div");
  signUpContainer.classList.add('container')

  const signUpTemplate = `
  <picture>
    <img id="logo" src="./images/logo2.png" alt="logo">
  </picture>
  <div class="form-container-signIn">
    <h1 class="formTittle">Ingresa tus datos</h1>
    <form class="formContainer">
      <input class="inputForm" type="text" placeholder="Nombre" id="inputName">
      <input class="inputForm" type="email" placeholder="Email" id="inputEmail">
      <input class="inputForm" type="password" placeholder="Contraseña" id="inputPassword">
      
    </form>
    <div>
    <button class="btnSignIn btnSignUp" id="btnSignUp"  type="submit" onclick="register()">Registrarse</button>
    </div>
    <p>Ya tienes una cuenta?</p>  
    <a href="/" class="linkSign" > Inicia Sesión</a>
  </div>`;

  signUpContainer.innerHTML = signUpTemplate;

  window.register = function () {
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    createUser(email, pass, name);
  };

  return signUpContainer

}
