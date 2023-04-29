import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function Header() {
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
    };
    return (
        <div className="px-28">
            <nav class="w-full">
                <slot>
                    <div class="flex items-center justify-between py-4 relative">
                        <Link to="/">
                            <p class="text-3xl font-bold text-blue-600">
                                Relaxo
                            </p>
                        </Link>
                        <div class="flex items-center gap-2">
                            <Link
                                to="/"
                                className="p-2 mx-4 hover:text-blue-700 text-blue-600 transition-colors duration-300"
                            >
                                Relaxo
                            </Link>
                            <Link
                                to="/journal"
                                className="p-2 mx-4 hover:text-blue-600 transition-colors duration-300"
                            >
                                Journal
                            </Link>
                            <Link
                                to="/breathing"
                                className="p-2 mx-4 hover:text-blue-600 transition-colors duration-300"
                            >
                                Breathing
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="border rounded hover:bg-gray-50 transition-colors py-2 px-6 hover:cursor-pointer"
                            >
                                Sign Out
                            </div>
                        </div>
                    </div>
                </slot>
            </nav>
        </div>
    );
}

export default Header;
