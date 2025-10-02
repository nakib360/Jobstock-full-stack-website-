import { useContext, useEffect } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";

const SecureRout = ({ children }) => {
    const { user, loading, setShowLoginModel } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            setShowLoginModel(true)
        }
    }, [user, setShowLoginModel])

    if (loading) {
        return <p>Loading.........</p>
    }

    if (user) {
        return children
    }


    return <Navigate to={"/"} />
};

export default SecureRout;