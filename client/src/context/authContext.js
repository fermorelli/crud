import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);
    return context;
}

export const AuthProvider = ({children})=>{

    const [ user, setUser ] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
    },[user])

    const regNew = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email,password) => {
        signInWithEmailAndPassword(auth, email, password);
    }

    const logout = ()=> {
        signOut(auth);
    }

    return(
        <authContext.Provider value={{regNew, login, logout, user}}>
            {children}
        </authContext.Provider>
    )
};