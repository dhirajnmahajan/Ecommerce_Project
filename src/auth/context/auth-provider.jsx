import { useEffect, useState } from "react"
import { AuthContext } from "./auth-context"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/connection";
import { ComparePassword, ConvertHashPassword } from '../authService'


export default function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    const me = async () => {
        const userEmail = JSON.parse(sessionStorage.getItem('userEmail'));
        const q = query(collection(db, "users"), where("email", "==", userEmail));

        const response = await getDocs(q)
        if (response.empty) {
            throw ("user Not Found");

        }
        const userDoc = response.docs[0];
        const userData = { ...userDoc.data() };


        const userProfile = {
            id: userDoc.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            phoneNumber: userData.phoneNumber
        };

        setUser(userProfile);
        return userProfile;
    }

    const initialize = async () => {
        await me();
        setAuthenticated(true)
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

            const response = await addDoc(collection(db, "users"), payload);
            // console.log("Document written with ID: ", response.id);

            if (response) {
                return {
                    success: true,
                    message: "User created"
                }
            }

        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
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
            const userProfile = {
                id: userDoc.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phoneNumber: userData.phoneNumber
            };

            sessionStorage.setItem("userEmail", JSON.stringify(userProfile.email));
            setAuthenticated(true);
            setUser(userProfile);
            return userProfile;

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
        <AuthContext.Provider value={{ authenticated, user, loginUser, addUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}