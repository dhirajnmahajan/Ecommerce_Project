import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/auth-context";
import { useNavigate } from "react-router-dom";
import NotFound from "../../404";

export default function AuthGuard({ children, roles = [] }) {

    const { authenticated, user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        const userEmail = sessionStorage.getItem("userEmail")
        if (!authenticated && !userEmail) {
            navigate('/auth/login', { replace: true })
        }

        if (authenticated && !roles.includes(user?.roleValue)) {
            navigate('/404', { replace: true })
        }
    }, [authenticated, navigate])

    if (!authenticated) return null;

    return children;
}

