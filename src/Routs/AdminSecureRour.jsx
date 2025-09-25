import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";

const AdminSecureRour = ({ children }) => {
    const {admin} = useContext(AuthContext);

    if(admin){
        return children
    }else{
        return <Navigate to={"/"}/>
    }
};

export default AdminSecureRour;