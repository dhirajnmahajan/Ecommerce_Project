

import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
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

export async function addUser(formData) {

    try {
        const hashPassword = await ConvertHashPassword(formData.password)
        const payload = {
            ...formData,
            password: hashPassword
        }

        const docRef = await addDoc(collection(db, "users"), payload);
        console.log("Document written with ID: ", docRef.id);

        return docRef;

    } catch (e) {
        console.error("Error adding document: ", e);
    }
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

export async function loginUser(data) {

    // console.log(data);

    try {
        const searchQuery = query(collection(db, "users"), where("email", "==", data.email));
        const response = await getDocs(searchQuery)
        if (response.empty) {
            console.error("user not found ")
        }
        const userDoc = response.docs[0];
        // console.log(userDoc.data());
        const userData = { ...userDoc.data() };
        const responseCompared = await ComparePassword(data.password, userData.password)
        return responseCompared;



        //     const response = await getDocs(searchQuery)
        //     console.log(response)
        //     if (response.empty) {
        //         console.error("Users Not Found");
        //     }
        //     const userDoc = response.docs[0];
        //     const userData = { ...userDoc.data() };
        //     const responseCompared = await ComparePassword(data.password, userData.password)
        //     console.log('response', responseCompared);
        //     return responseCompared;

    } catch (e) {
        console.error("error at login ", e)
    }
}