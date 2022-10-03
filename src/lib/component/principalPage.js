import { signOutCount } from './authFirebase.js';

// export const principalPage = `
// <h1>Pagina en Construcción</h1>
// <button onClick="signOutClick()">SignOut</button>
// `;

export const principalPage = () => {
    const mostrar = document.getElementById('root')
    // console.log(mostrar)
    let texto = document.createElement("h1")
    texto.textContent = 'Pagina con nodos'
    console.log(texto)
    mostrar.appendChild(texto)
    return texto
}

window.signOutClick = function () {
    signOutCount();
};
