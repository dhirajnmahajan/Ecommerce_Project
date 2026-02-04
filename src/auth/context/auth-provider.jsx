import { useEffect, useState } from "react"
import { AuthContext } from "./auth-context"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/connection";
import { ComparePassword, ConvertHashPassword } from '../authService'


export default function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)

    const initialize = () => {
        const userProfile = JSON.parse(sessionStorage.getItem('user'))
        if (userProfile) {
            setAuthenticated(true)
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        initialize();
    }, [])

    // register function 
    // this is register function which is written in user's api file previously

    async function addUser(formData) {

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


    // Login function
    // this is login function which is written in user's api file previously 

    async function loginUser(data) {
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

            if (responseCompared) {
                sessionStorage.setItem("user", JSON.stringify(userData));
                setAuthenticated(true);
            }
            return responseCompared;
        } catch (e) {
            console.error("error at login ", e)
        }
    }

    // Logout 
    const logout = () => {
        sessionStorage.removeItem('user');
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ authenticated, loginUser, addUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}