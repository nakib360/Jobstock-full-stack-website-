import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.init";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/users?email=${user?.email}`)
            .then((res) => {
                if (res.data[0]?.admin === "true") {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            })
    }, [user?.email])

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const LogInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = () => {
        return signOut(auth)
            .then(() => {
                setAdmin(false);
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const value = {
        user,
        loading,
        auth,
        admin,
        signUpUser,
        LogInUser,
        signInWithGoogle,
        signOutUser,
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};

export default AuthProvider;