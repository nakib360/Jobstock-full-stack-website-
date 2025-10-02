import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { getStorage } from "firebase/storage";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const storage = getStorage(app)
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/users?email=${user?.email}`)
            .then((res) => {
                if (res.data[0]?.admin === true) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            })
    }, [user?.email])

    const signUpUser = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const LogInUser = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(false)
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = () => {
        setLoading(false);
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
        setLoading,
        auth,
        admin,
        signUpUser,
        LogInUser,  
        signInWithGoogle,
        signOutUser,
        storage
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};

export default AuthProvider;