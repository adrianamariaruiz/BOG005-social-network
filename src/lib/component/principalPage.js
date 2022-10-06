
import { signOutCount } from '../firebase/authFirebase.js';
import { getPosts, savePost } from '../firebase/configFirestore.js';

export const principalPage = () => {
    let principalPageContainer = document.createElement("div")
    const principalPageTemplate =
        `
        <header class="headerContainer">
        <button class="btnSignOut" onClick="signOutClick()">Cerrar Sesión</button>
        </header>
        <form class="formContainer" type="submit" id="formContainer">
        <input id='titlePost' type='text' placeholder='Nombra tu receta...'>
        <textarea id='inputPost' type='text' placeholder='Describe tu receta...' ></textarea>
        </form>
        <button class="btnPost" type='text' onclick="createPost()">Publicar</button>

        `

    principalPageContainer.innerHTML = principalPageTemplate


    window.addEventListener('DOMContentLoaded', () => {
        const querySnapshot = getPosts()
        console.log(querySnapshot)
    })


    window.createPost = function () {
        const titlePost = document.getElementById('titlePost').value;
        const infoPost = document.getElementById('inputPost').value;

        console.log('funciona el', infoPost, 'y el', titlePost);
        savePost(titlePost, infoPost);
        const formContainer = document.getElementById('formContainer')
        formContainer.reset()
    };

    // const formContainer = document.getElementById('formContainer')

    // formContainer.addEventListener("submit", (e) => {
    //     e.preventDefault()
    //     const titlePost = document.getElementById('titlePost').value;
    //     const infoPost = document.getElementById('inputPost').value;
    //     savePost(titlePost, infoPost);
    // formContainer.reset()

    // })


    window.signOutClick = function () {
        signOutCount();
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


