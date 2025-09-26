import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";

const SecureRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if(loading){
        return <p>Loading.........</p>
    }

    if(user){
        return children
    }

    return <Navigate to={"/signup"}/>
};

export default SecureRout;