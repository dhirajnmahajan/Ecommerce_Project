

import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/connection'

export async function getRoles() {

    const roleArray = []
    const querySnapshot = await getDocs(collection(db, "roles"));

    querySnapshot.forEach((doc) => {
        roleArray.push(doc.data())
        console.log(`doc data ${doc.id} => ${doc.data()}`);
    });

    return roleArray;
}

export async function addRole(roleData) {

    try {
        const docRef = await addDoc(collection(db, "roles"), roleData);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateRole(id = "9yLHhv1cpDjujq81FdZa", updateData = { name: "dhiraj" }) {
    try {
        const docRef = doc(db, "roles", id)
        const response = await updateDoc(docRef, updateData);
        console.log("Document edited with ID: ", docRef.id);
        return response;

    } catch (e) {
        console.error("Error editing document: ", e);
    }
}

export async function deleteRole(id) {
    try {
        const docRef = await deleteDoc(doc(db, "roles", id))
        console.log("Document deleting with ID: ", docRef.id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }

}