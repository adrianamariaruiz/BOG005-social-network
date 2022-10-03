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
<<<<<<< HEAD:src/lib/View/principalPage.js
    texto.id = 'h1texto'
    texto.textContent = 'Pagina con nodos'
    //console.log(texto)
    mostrar.appendChild(texto)
=======
    texto.textContent = 'Página en construcción'
    console.log(texto)
    // mostrar.appendChild(texto)

    mostrar.innerHTML = texto
>>>>>>> 9e1fd385581e8e5966351b64b0e209b97b50b627:src/lib/component/principalPage.js
    return texto
}

// window.signOutClick = function () {
//     signOutCount();
// };
