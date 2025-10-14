import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";

const SignInSecure = ({ children }) => {
    const { user } = useContext(AuthContext);

    if(!user){
        return children
    }

    return <Navigate to={"/"}/>
};

export default SignInSecure;