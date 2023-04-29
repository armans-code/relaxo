import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.log(error.code);
            if (
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/invalid-email'
            ) {
                setError('User not found.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Wrong password given.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="w-full space-y-8">
                <div>
                    <h1 className="text-blue-500 text-6xl font-extrabold text-center">
                        Relaxo
                    </h1>
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="border flex flex-col items-center px-11 pt-11 pb-8 mx-auto rounded-2xl w-4/12 gap-8">
                    <p className="text-red-500">{error}</p>
                    <div className="w-full gap-2 flex flex-col">
                        <p className="font-semibold">Email</p>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                    </div>
                    <div className="w-full gap-2 flex flex-col">
                        <p className="font-semibold">Password</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="
                    w-full flex justify-center bg-blue-600 hover:bg-blue-800 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-200"
                    >
                        Sign in
                    </button>
                    <p>
                        No Account?{' '}
                        <Link to="/register" className="text-blue-600">
                            Register here.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
