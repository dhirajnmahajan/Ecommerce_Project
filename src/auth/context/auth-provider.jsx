import { useEffect, useState } from "react"
import { AuthContext } from "./auth-context"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/connection";
import { ComparePassword, ConvertHashPassword } from '../authService'

export default function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [preview, setPreview] = useState(null)

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
            phoneNumber: userData.phoneNumber,
            imageUrl: userData.imageUrl
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

    async function loginUser(data) {
        try {
            const searchQuery = query(
                collection(db, "users"),
                where("email", "==", data.email)
            );

            const response = await getDocs(searchQuery);

            if (response.empty) {
                throw new Error("User not found");
            }

            const userDoc = response.docs[0];
            const userData = userDoc.data();

            const comparedHash = await ComparePassword(
                data.password,
                userData.password
            );

            //  stop login if password incorrect
            if (!comparedHash) {
                throw new Error("Invalid password");
            }

            const userProfile = {
                id: userDoc.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
            };

            sessionStorage.setItem("userEmail", JSON.stringify(userProfile.email));
            setAuthenticated(true);
            setUser(userProfile);

            return userProfile;

        } catch (e) {
            console.error("error at login ", e);
            throw e;
        }
    }

    const logout = () => {
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("user");
        setUser(null);
        setAuthenticated(false);
    };


    // update function 
    async function updateUser(data) {
        try {

            if (!user.id) {
                throw ("User not found")
            }
            if (!data.imageUrl) {
                delete data.imageUrl;
            }

            const docRef = doc(db, "users", user.id)
            // console.log(user.id);


            await updateDoc(docRef, data
                // {
                // firstname: data.firstname,
                // lastname: data.lastname
                // }
            );

            const updatedUser = {
                ...user,
                ...data
            }
            // console.log({ ...user });

            setUser(updatedUser);
            // console.log(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            console.log("Document edited with ID: ", docRef.id);

            return {
                success: true,
                message: "Profile updated successfully"
            }


        } catch (error) {
            console.error("Profile update error ", error);
            throw error;
        }
    }

    // Change Password 

    async function changePassword(data) {
        try {
            if (!user?.id) {
                throw new Error("User not found");
            }

            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error("User record not found");
            }

            const dbUser = docSnap.data();

            // compare plain text with stored hash
            const isMatch = await ComparePassword(
                data.currentPassword,
                dbUser.password
            );

            if (!isMatch) {
                throw new Error("Current password is incorrect");
            }

            // hash new password
            const newHashedPassword = await ConvertHashPassword(
                data.newPassword
            );

            // update in firestore
            await updateDoc(docRef, {
                password: newHashedPassword
            });

            return {
                success: true,
                message: "Password updated successfully"
            };
        } catch (error) {
            console.error("Change password error:", error);
            throw error;
        }
    }



    return (
        <AuthContext.Provider value={{ authenticated, user, loginUser, addUser, updateUser, logout, changePassword, preview, setPreview }}>
            {children}
        </AuthContext.Provider>
    )
}