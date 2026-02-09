import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    const { authenticated } = useContext(AuthContext);
    const navigate = useNavigate()

    if (authenticated) {
        return children;
    } else {
        navigate('/auth/login', { replace: true })
        // return <Navigate to="/auth/login" replace='true' />;
    }


}
