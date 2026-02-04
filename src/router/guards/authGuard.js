import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../auth/context/auth-context'

export default function AuthGuard({ children }) {

    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log('authenticated', authenticated);

    // useEffect(() => {
    //     if (!authenticated) {
    //         navigate('/auth/login', { replace: true })
    //     }

    // }, [authenticated, navigate])

    // if (!authenticated) {
    //     return null; // or loader
    // }
    // return children;

    if (authenticated) {
        return children;
    } else {
        navigate('/auth/login', { replace: true })
    }

}


