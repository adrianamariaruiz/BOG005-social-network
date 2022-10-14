
import { signOutCount, auth, usuario } from '../firebase/authFirebase.js';
import { savePost, onGetPosts, deletePost, getPost, updatePost, like, dislike, getPosts } from '../firebase/configFirestore.js';

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

    const sectionContainer = document.createElement('section')
    sectionContainer.classList = 'sectionContainer'

    const formContainer = document.createElement('form')
    formContainer.classList = 'formContainer-principalPage'

    // const nameUser= document.createElement('h2')
    // nameUser.classList = 'nameUser';
    // nameUser.textContent= auth.currentUser.auth.currentUser.displayName;
    // console.log("prueba", usuario.uid)

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
    // <i class="fa-brands fa-twitter"></i>
    // <i class="fa-brands fa-facebook"></i>
    // <i class="fa-brands fa-instagram"></i>

    const printPost = (dataPost, dataId) => {

        // console.log(dataPost.arrayLikes.length)

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
        btnLike.setAttribute('data-id', dataId)

        if (dataPost.arrayLikes.includes(auth.currentUser.uid)) {
            btnLike.classList.add('color-on')
        } else {
            btnLike.classList.remove('color-on')
        }

        // <i class="fa-regular fa-face-laugh-wink"></i>
        // btnLike.appendChild(document.createElement('i')).classList.add("fa-solid", "fa-face-grin-hearts")
        // btnLike.setAttribute('id', index)

        const spanLikes = document.createElement('span');
        spanLikes.className = 'spanLikes'
        spanLikes.textContent = dataPost.arrayLikes.length

        btnContainer.append(btnLike, spanLikes, btnEdit, btnDelete)
        task.append(nameTask, titleTask, descriptionTask, btnContainer)
        return task
    }
    // ,nameUser, emailUser
    let editStatus = false;
    let idPost = '';
    let isLike = false
    let arrayLikes = [];

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
                    formContainer.querySelector('.btnPost').innerText = 'Editar'
                })
            })

            // console.log('idPost', idPost);
            // console.log('usuarioId', usuario.uid);
            const idUser = usuario.uid

            // const likeFunction = (idPost, idUser, isLike) => like(idPost, idUser, isLike)

            const btnLikes = postContainer.querySelectorAll('.btnLike')
            btnLikes.forEach((btn) => {
                btn.addEventListener('click', (event) => {

                    // event.target.classList.toggle('like-on')

                    // if (event.target.classList.contains('like-on')) {
                    //     event.target.classList.remove('like-on')
                    // } else {
                    //     event.target.classList.add('like-on')
                    // }

                    console.log(btn)
                    idPost = event.target.dataset.id

                    // if (event.target.classList.contains('like-on')) {
                    //     isLike = true;
                    //     console.log('isLike esta en true')
                    // } else {
                    //     isLike = false;
                    //     console.log('isLike esta en false')
                    // }

                    // like(idPost, idUser).then(res => { })
                    getPosts().then((res) => res.forEach((doc) => {
                        // console.log(doc.data())
                        if (doc.id === idPost) {
                            if (doc.data().arrayLikes.includes(auth.currentUser.uid)) {
                                console.log('entro al if', auth.currentUser.uid)
                                dislike(idPost, auth.currentUser.uid);
                            } else {
                                like(idPost, auth.currentUser.uid);
                            }
                        } else {
                            console.log('error')
                        }
                    })

                        // btn.addEventListener('click', () => {


                        //         // if (doc.data().arrayLikes.includes(auth.currentUser.uid)) {
                        //         //     event.target.classList.add('color-on')
                        //         // } else {
                        //         //     event.target.classList.remove('color-on')
                        //         // }
                        //     })

                    )
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
            savePost(title, desc, namePost, arrayLikes);
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