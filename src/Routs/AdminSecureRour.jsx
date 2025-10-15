import { useContext } from "react";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate } from "react-router";
import { PropagateLoader } from "react-spinners";

const AdminSecureRour = ({ children }) => {
    const { admin, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-40">
                <PropagateLoader color="#0b8260" />
            </div>
        )
    }

    if (admin) {
        return children
    }
    
    return <Navigate to={"/"} />

};

export default AdminSecureRour;