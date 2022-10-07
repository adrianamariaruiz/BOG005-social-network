
import { signOutCount } from '../firebase/authFirebase.js';
import { savePost, getPosts } from '../firebase/configFirestore.js';
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

// export const principalPage = () => {
//     let principalPageContainer = document.createElement("div")
//     const principalPageTemplate =
//         `
//         <header class="headerContainer">
//         <button class="btnSignOut" onClick="signOutClick()">Cerrar Sesión</button>
//         </header>
//         <form class="formContainer" type="submit" id="formContainer">
//         <input id='titlePost' type='text' placeholder='Nombra tu receta...'>
//         <textarea id='inputPost' type='text' placeholder='Describe tu receta...' ></textarea>
//         </form>
//         <button class="btnPost" type='text' onclick="createPost()">Publicar</button>

//         `

//     principalPageContainer.innerHTML = principalPageTemplate


//     window.addEventListener('DOMContentLoaded', () => {
//         const querySnapshot = getPosts()
//         console.log(querySnapshot)
//     })


//     window.createPost = function () {
//         const titlePost = document.getElementById('titlePost').value;
//         const infoPost = document.getElementById('inputPost').value;

//         console.log('funciona el', infoPost, 'y el', titlePost);
//         savePost(titlePost, infoPost);
//         const formContainer = document.getElementById('formContainer')
//         formContainer.reset()
//     };

//     // const formContainer = document.getElementById('formContainer')

//     // formContainer.addEventListener("submit", (e) => {
//     //     e.preventDefault()
//     //     const titlePost = document.getElementById('titlePost').value;
//     //     const infoPost = document.getElementById('inputPost').value;
//     //     savePost(titlePost, infoPost);
//     // formContainer.reset()

//     // })


//     window.signOutClick = function () {
//         signOutCount();
//     };

//     return principalPageContainer
// }




export const principalPage = () => {
    const wall = document.createElement('div')
    wall.classList = 'wall'

    const header = document.createElement('header')
    header.classList = 'header'

    const imageLogo = document.createElement("img")
    imageLogo.classList = 'imageLogo'
    imageLogo.setAttribute('src', './images/logoHeader.png');

    const btnSignOut = document.createElement("button")
    btnSignOut.textContent = 'Cerrar sesión'
    btnSignOut.classList = 'btn_SignOut'

    const sectionContainer = document.createElement('section')
    sectionContainer.classList = 'sectionContainer'

    const formContainer = document.createElement('form')
    formContainer.classList = 'formContainer'

    const titlePost = document.createElement('input')
    titlePost.classList = 'titlePost'
    titlePost.type = 'texto'
    titlePost.setAttribute('placeholder', 'Nombra tu receta...');
    titlePost.setAttribute('required', '');

    const inputPost = document.createElement('textarea');
    inputPost.classList = 'inputPost'
    inputPost.setAttribute('placeholder', 'Describe tu receta...')
    inputPost.setAttribute('required', '');


    const btnPost = document.createElement('button')
    btnPost.classList = 'btnPost'
    btnPost.textContent = 'Publicar'


    const postContainer = document.createElement('div')
    postContainer.classList = 'postContainer'

    const footer = document.createElement("footer")
    footer.classList = 'footer'


    window.addEventListener('DOMContentLoaded', () => {
        // const querySnapshot = await getPosts();
        // const querySnapshot = await getDocs(collection(db, "posts"));
        // console.log(querySnapshot);
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.data());
        // });
        const data = getPosts().then(res => {
            console.log('data', res);
            res.forEach((element) => {
                // console.log('este es el titulo del post', doc.title)
                // console.log('este es la descripcion del post', doc.description)
                printPost(element);
            })
        });
    })

    const printPost = (element) => {
        const task = document.createElement('div');
        task.classList = 'task'
        const titleTask = document.createElement('h3');
        titleTask.classList = 'titleTask'
        titleTask.textContent = element.title
        const descriptionTask = document.createElement('p');
        descriptionTask.classList = 'descriptionTask'
        descriptionTask.textContent = element.description

        task.append(titleTask, descriptionTask)
        postContainer.append(task)
        return postContainer
    }

    btnPost.addEventListener("click", (e) => {
        e.preventDefault()
        const pruebatitulo = titlePost.value
        // const titlePost = document.getElementById('titlePost').textContent;
        // console.log('titulo', titlePost);
        // const infoPost = document.getElementById('inputPost').textContent;
        const pruebadesc = inputPost.value
        savePost(pruebatitulo, pruebadesc);
        formContainer.reset()

    })

    btnSignOut.addEventListener('click', () => {
        signOutCount();
    })

    // window.signOutClick = function () {
    //     //         signOutCount();
    //     //     };

    header.append(imageLogo, btnSignOut)
    formContainer.append(titlePost, inputPost, btnPost)
    sectionContainer.append(formContainer, postContainer)
    wall.append(header, sectionContainer, footer)
    return wall
}

// window.addEventListener('DOMContentLoaded', () => {
//     // const querySnapshot = await getPosts();
//     // const querySnapshot = await getDocs(collection(db, "posts"));
//     // console.log(querySnapshot);
//     // querySnapshot.forEach((doc) => {
//     //     console.log(doc.data());
//     // });
//     const data = getPosts().then(res => {
//         console.log('data', res);
//         res.forEach((element) => {
//             // console.log('este es el titulo del post', doc.title)
//             // console.log('este es la descripcion del post', doc.description)
//             printPost(element);
//         })
//     });
// })

// export const printPost = (element) => {
//     const task = document.createElement('div');
//     task.classList = 'task'
//     const titleTask = document.createElement('h3');
//     titleTask.classList = 'titleTask'
//     titleTask.textContent = element.title
//     const descriptionTask = document.createElement('p');
//     descriptionTask.classList = 'descriptionTask'
//     descriptionTask.textContent = element.description

//     task.append(titleTask, descriptionTask)
//     const totalPost = document.getElementsByClassName('postContainer')
//     // totalPost.innerHTML = task
//     totalPost.append(task)
//     return totalPost
// }