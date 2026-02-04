import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/connection'
import { ComparePassword, ConvertHashPassword } from '../auth/authService'

export async function getUsers() {

    const roleArray = []
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        roleArray.push(doc.data())
        console.log(`doc data ${doc.id} => ${doc.data()}`);
    });

    return roleArray;
}

export async function updateUser(id, updateData) {
    try {
        const docRef = doc(db, "users", id)
        const response = await updateDoc(docRef, updateData);
        console.log("Document edited with ID: ", docRef.id);
        return response;

    } catch (e) {
        console.error("Error editing document: ", e);
    }
}

export async function deleteUser(id) {
    try {
        const docRef = await deleteDoc(doc(db, "users", id))
        console.log("Document deleting with ID: ", docRef.id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }

}

