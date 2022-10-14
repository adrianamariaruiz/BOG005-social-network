import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { app } from '../firebase/authFirebase.js';

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();

export const savePost = (title, description, namePost, arrayLikes) => {
    addDoc(collection(db, "posts"), { title, description, namePost, arrayLikes });
}

// export const getPosts = async () => {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     const docData = []
//     querySnapshot.forEach((doc) => {
//         docData.push(doc.data())
//     });
//     return docData;
// }

// export const onGetPosts = async(callback)=> {
//     await onSnapshot(collection(db, 'post'), callback)
// }

// export const getPosts = ()=>getDocs(collection(db, 'posts'))
export const getPosts = () => getDocs(collection(db, 'posts'))

export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback)

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id))

export const getPost = (id) => getDoc(doc(db, 'posts', id))

export const updatePost = (id, newFields) => updateDoc(doc(db, 'posts', id), newFields)



export const like = (idPost, idUser) => {
    updateDoc(doc(db, 'posts', idPost), { arrayLikes: arrayUnion(idUser) })
}


export const dislike = (idPost, idUser) => {
    updateDoc(doc(db, 'posts', idPost), { arrayLikes: arrayRemove(idUser) })

};


