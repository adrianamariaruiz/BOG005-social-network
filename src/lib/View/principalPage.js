

import { signOutCount, auth, usuario } from '../firebase/authFirebase.js';
import { savePost, onGetPosts, deletePost, getPost, updatePost } from '../firebase/configFirestore.js';

// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';


export const principalPage = () => {
   const wall = document.createElement('div')
    wall.classList = 'wall'

    const header = document.createElement('header')
    header.classList = 'header'

    const imageLogo = document.createElement("img")
    imageLogo.classList = 'imageLogo'
    imageLogo.setAttribute('src', './images/logoHeader2.png');

    const imageTitle = document.createElement("img")
    imageTitle.classList = 'imageTitle'
    imageTitle.setAttribute('src', './images/kids_food.png');

    const btnSignOut = document.createElement("button")
    btnSignOut.classList.add('btn_SignOut', 'fa-solid', 'fa-right-from-bracket')
    // btnSignOut.textContent = 'Cerrar Sesion'

    // btnSignOut.classList = <i class="fa-solid fa-right-from-bracket"></i>

    // basurero <i class="fa-solid fa-trash-can"></i>
    // editar <i class="fa-solid fa-pen-to-square"></i>

    const sectionContainer = document.createElement('section')
    sectionContainer.classList = 'sectionContainer'


    // console.log(auth.currentUser.displayName)
    // const nameUser = document.createElement('h2')
    // nameUser.setAttribute('id', 'nameUser')
    // // nameUser.textContent = auth.currentUser.displayName
    // console.log('auth', auth.currentUser);


    const formContainer = document.createElement('form')
    formContainer.classList = 'formContainer-principalPage'
    
    // const nameUser= document.createElement('h2')
    // nameUser.classList = 'nameUser';
    // nameUser.textContent= auth.currentUser.auth.currentUser.displayName;
    // console.log("prueba", auth.currentUser.auth.currentUser.displayName)


    // const emailUser= document.createElement('h3')
    // emailUser.classList = 'emailUser';
    // emailUser.textContent= auth.displayName;

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


    const printPost = (dataPost, dataId) => {
        const task = document.createElement('div');
        task.classList = 'task';

        const nameTask = document.createElement('span');
        nameTask.classList = 'nameTask';
        nameTask.textContent = dataPost.namePost;

        const titleTask = document.createElement('h3');
        titleTask.classList = 'titleTask';
        titleTask.textContent = dataPost.title;

        const descriptionTask = document.createElement('p');
        descriptionTask.classList = 'descriptionTask';
        descriptionTask.textContent = dataPost.description;

        const btnContainer = document.createElement('div');
        btnContainer.classList = 'btnContainer';

        const btnDelete = document.createElement('button');
        btnDelete.classList.add("btnDelete", "fa-solid", "fa-trash-can");
        btnDelete.setAttribute('data-id', dataId)
        
        const btnEdit = document.createElement('button');
        btnEdit.classList.add("btnEdit", "fa-solid", "fa-pen-to-square");
        btnEdit.setAttribute('data-id', dataId)
     
        const btnLike = document.createElement('button');
        
        btnLike.classList.add("btnLike", "fa-regular", "fa-face-laugh-wink");
        // <i class="fa-regular fa-face-laugh-wink"></i>
        // btnLike.appendChild(document.createElement('i')).classList.add("fa-solid", "fa-face-grin-hearts")
        // btnLike.setAttribute('id', index)


        const spanLikes = document.createElement('span');
        spanLikes.className = 'spanLikes'
        spanLikes.textContent = 0

        btnContainer.append(btnLike, spanLikes, btnEdit, btnDelete)
        task.append(nameTask, titleTask, descriptionTask, btnContainer)
        return task
    }
    // ,nameUser, emailUser
    let editStatus = false;
    let idPost = '';

    window.addEventListener('DOMContentLoaded', () => {
        onGetPosts((querySnapshot) => {
            postContainer.innerHTML = ""
            querySnapshot.forEach((infoPost) => {
                const dataPost = infoPost.data()
                    const dataId = infoPost.id
                    postContainer.append(printPost(dataPost, dataId))
            })

            const arrayDeleteBtn = postContainer.querySelectorAll('.btnDelete')
            arrayDeleteBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    deletePost(event.target.dataset.id);
                })
            })

            const arrayEditBtn = postContainer.querySelectorAll('.btnEdit')
            arrayEditBtn.forEach(btn => {
                btn.addEventListener('click', async (event) => {
                    const dataEdit = await getPost(event.target.dataset.id)
                  
                    const postEdit = dataEdit.data()
                    formContainer.querySelector('.titlePost').value = postEdit.title
                    formContainer.querySelector('.inputPost').value = postEdit.description

                    editStatus = true;
                    idPost = event.target.dataset.id
                    // console.log(idPost)
                    formContainer.querySelector('.btnPost').innerText = 'Editar'
                })
            })

    
            const btnLikes = postContainer.querySelectorAll('.btnLike')
            btnLikes.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.target.classList.toggle('like-on')
                

                    // funcion de conteo
                    const inputLikes = document.querySelector('.inputLikes')
                    const textLikes = document.querySelectorAll('.span')

                    if (event.target.classList.contains('like-on')) {
                        console.log('sumar 1')
                        let contadorLikes = parseInt(inputLikes.value) + 1;
                        inputLikes.value = contadorLikes
                        console.log('contador', contadorLikes)

                    } else {
                        console.log('restar1')
                        let contadorLikes = parseInt(inputLikes.value) - 1;
                        inputLikes.value = contadorLikes
                        console.log('restando', contadorLikes)
                    }
                })
            })
        })
    })

    btnPost.addEventListener("click", (e) => {
        e.preventDefault()
        const title = titlePost.value
        const desc = inputPost.value
        if (!editStatus) {
            // console.log('save post', usuario);
            const namePost = usuario.displayName
            savePost(title, desc, namePost);
        } else {
            updatePost(idPost, { title: titlePost.value, description: inputPost.value })
            editStatus = false;
            formContainer.querySelector('.btnPost').innerText = 'Publicar'

        }

        formContainer.reset()
    })

    btnSignOut.addEventListener('click', () => {
        signOutCount();
    })

      
    header.append(imageLogo, imageTitle, btnSignOut)
    formContainer.append(titlePost, inputPost, btnPost)
    sectionContainer.append(formContainer, postContainer)
    wall.append(header, sectionContainer, footer)
    return wall
}