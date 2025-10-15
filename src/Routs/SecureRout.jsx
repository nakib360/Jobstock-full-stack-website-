import { useContext, useEffect } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";
import { PropagateLoader } from "react-spinners";

const SecureRout = ({ children }) => {
    const { user, loading, setShowLoginModel } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-40">
                <PropagateLoader color="#0b8260" />
            </div>
        )
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