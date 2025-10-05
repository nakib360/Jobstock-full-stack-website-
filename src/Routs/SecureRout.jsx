import { useContext, useEffect } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";

const SecureRout = ({ children }) => {
    const { user, loading, setShowLoginModel } = useContext(AuthContext);

    if (loading) {
        return <p>Loading.........</p>
    }
    
    useEffect(() => {
        if (!user) {
            setShowLoginModel(true)
        }
    }, [user, setShowLoginModel])


    if (user) {
        return children
    }


    return <Navigate to={"/"} />
};

export default SecureRout;