import { signOutCount } from '../firebase/authFirebase.js';

// export const principalPage = `
// <h1>Pagina en Construcción</h1>
// <button onClick="signOutClick()">SignOut</button>
// `;

export const principalPage = () => {
    // const mostrar = document.getElementById('root')
    const mostrar = document.createElement('div')
    // console.log(mostrar)
    let texto = document.createElement("h1")
    texto.textContent = 'Página en construcción'
    console.log(texto)
    // mostrar.appendChild(texto)

    mostrar.innerHTML = texto
    return texto
}

window.signOutClick = function () {
    signOutCount();
};
