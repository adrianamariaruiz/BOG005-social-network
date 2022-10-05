import { signOutCount } from '../firebase/authFirebase.js';
import { savePost } from '../firebase/configFirestore.js';

export const principalPage = () => {
    let principalPageContainer = document.createElement("div")
    const principalPageTemplate =
        `
        <header class="headerContainer">
        <button class="btnSignOut" onClick="signOutClick()">Cerrar Sesión</button>
        </header>
        <div class=inputPostContainer>
        <textarea id='inputPost' type='text' placeholder='Qué estás pensando...' ></textarea>
        <button class="btnPost" type='text' onclick="createPost()">Publicar</button>
        </div>
        `

    principalPageContainer.innerHTML = principalPageTemplate

    window.signOutClick = function () {
        signOutCount();
    };

    window.createPost = function () {
        const infoPost = document.getElementById('inputPost').value;
        console.log('funciona el', infoPost);
        savePost(infoPost);
    };

    return principalPageContainer
}




// export const principalPage = () => {
//     // const mostrar = document.getElementById('root')
//     const mostrar = document.createElement('div')
//     // console.log(mostrar)
//     let texto = document.createElement("h1")
//     texto.textContent = 'Página en construcción'
//     console.log(texto)
//     // mostrar.appendChild(texto)

//     let btnSignOut = document.createElement("button")
//     btnSignOut.textContent = 'Cerrar sesión'
//     btnSignOut.classList = 'btn_SignOut'

//     mostrar.innerHTML = texto
//     mostrar.innerHTML = btnSignOut

//     return mostrar
// }


