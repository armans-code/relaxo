import React, { useContext, useState } from 'react';
import { auth } from './firebase';
import { useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { ACCOUNT } from '../gql/queries';
import { useLazyQuery } from '@apollo/client';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function setAccessToken(user) {
    user.getIdToken().then((token) =>
        localStorage.setItem('accessToken', token),
    );
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [account, setAccount] = useState();
    const [loading, setLoading] = useState(true);

    const [getAccount, { aLoading, error, data }] = useLazyQuery(ACCOUNT, {
        fetchPolicy: 'network-only',
    });

    async function login(email, password) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return setAccessToken(res.user);
    }

    function logout() {
        return signOut(auth).then(() => localStorage.removeItem('accessToken'));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            getAccount({
                variables: { accountId: user?.uid },
            }).then((data) => {
                setAccount(data?.data?.account);
            });

            if (error) console.log(error);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        account,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
