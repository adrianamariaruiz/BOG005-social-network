import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { app } from '../firebase/authFirebase.js';

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const savePost = (title, description) => {
    addDoc(collection(db, "posts"), { title, description });
}

export const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push(doc.data())
    });
    return docData;
}
