
import { signOutCount, auth, usuario } from '../firebase/authFirebase.js';
import { savePost, onGetPosts, deletePost, getPost, updatePost, like, dislike, getPosts } from '../firebase/configFirestore.js';

export const principalPage = () => {

    console.log(usuario)

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
    const pFooter= document.createElement ("p")
    pFooter.classList='pFooter'
    pFooter.textContent=('Social Network-Laboratoria- BOG005 By Adriana - Jennifer - Sol')
    // const containerFooter = document.createElement ("div")
    // containerFooter.classList= 'containerFooter'
    // const networkIcon = document.createElement ('i')
    // networkIcon.classList.add =( 'networkIcon','fa-brands', 'fa-twitter')

    // <i class='fa-brands', 'fa-twitter'></i>
    // <i class='fa-brands', 'fa-facebook',></i>
    // <i class='fa-brands',' fa-instagram'></i>

    const printHello = (userNameHello) => {
        const hello = document.createElement('div');
        hello.classList = 'hello';
        hello.textContent = userNameHello;
    }

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
        btnLike.setAttribute('data-id', dataId)

        if (dataPost.arrayLikes.includes(auth.currentUser.uid)) {
            btnLike.classList.add('color-on')
        } else {
            btnLike.classList.remove('color-on')
        }

        const spanLikes = document.createElement('span');
        spanLikes.className = 'spanLikes'
        spanLikes.textContent = dataPost.arrayLikes.length

        btnContainer.append(btnLike, spanLikes, btnEdit, btnDelete)
        task.append(nameTask, titleTask, descriptionTask, btnContainer)
        return task
    }

    let editStatus = false;
    let idPost = '';
    let arrayLikes = [];

    window.addEventListener('DOMContentLoaded', () => {
        onGetPosts((querySnapshot) => {
            postContainer.innerHTML = ""
            console.log(usuario.displayName);
            sectionContainer.append(printHello(auth.currentUser.uid))
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

            // const idUser = usuario.uid

            const btnLikes = postContainer.querySelectorAll('.btnLike')
            btnLikes.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    idPost = event.target.dataset.id
                    getPosts().then((res) => res.forEach((doc) => {
                        if (doc.id === idPost) {
                            if (doc.data().arrayLikes.includes(auth.currentUser.uid)) {
                                dislike(idPost, auth.currentUser.uid);
                            } else {
                                like(idPost, auth.currentUser.uid);
                            }
                        }
                    })

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
    footer.append(pFooter)
    // ,containerFooter
    // containerFooter.append(networkIcon)
    return wall
}