import React, {useContext, useState, useEffect, useRef} from 'react';
import {auth, db} from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
onAuthStateChanged } from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';


const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext);
}

// Can add other user profile/account updates e.g. updatePassword
export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading]  = useState(true)
    const userInfo = useRef()

    function signup(email, password) {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {

        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        // Listener that listens to the authentication state
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
