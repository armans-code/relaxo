import React from 'react';
import Header from './Header';
import { useAuth } from '../../auth/AuthContext';
import { Navigate } from 'react-router-dom';

function Layout({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex flex-col justify-start">
            <Header />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
