
import { signOutCount } from '../firebase/authFirebase.js';
import { savePost, getPost } from '../firebase/configFirestore.js';

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
    formContainer.classList = 'formContainerPrincipalPage'

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
        const data = getPost().then(res => {
            console.log('data', res);
            res.forEach((element) => {
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
        // console.log(postContainer)
        return postContainer
    }

    // // aca toca traer lo que tenia mas lo nuevo
    btnPost.addEventListener("click", (e) => {
        e.preventDefault()

        const titlePost = document.getElementById('titlePost')

        savePost()
        formContainer.reset()
    })

    btnSignOut.addEventListener('click', () => {
        signOutCount();
    })

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