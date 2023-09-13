import { useState, useEffect, createContext } from 'react';
import { useApi } from '../services/api';
import { getUserLocalStorage, setUserLocalStorage } from './utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const api = useApi();

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
        }
    }, []);

    async function signIn(email, password) {
        const response = await api.signIn(email, password);
        const payload = { token: response.token, name: response.name };
        setUser(payload);
        setUserLocalStorage(payload);
    }

    async function signOut() {
        setUser(null);
        setUserLocalStorage(null);
    }

    // let config = {};

    // if (JSON.parse(localStorage.getItem('user'))) {
    //     if (user.token === undefined) {
    //         let userStoredToken = JSON.parse(localStorage.getItem('user')).token;
    //         config = {
    //             headers: {
    //                 Authorization: `Bearer ${userStoredToken}`,
    //             },
    //         };
    //     } else {
    //         config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         };
    //     }
    //     if (user.name === undefined) {
    //         let userStoredName = JSON.parse(localStorage.getItem('user')).name;
    //         user.name = userStoredName;
    //     }
    // }

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
