// LoginPage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth/AuthContext';


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginInput, updateLoginInput, loading, error, handleSignIn } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSignIn = async (e) => {
        e.preventDefault();
        try {
            await handleSignIn();
        } catch (err) {
            // Error is already handled in the context, but you can add additional handling here if needed
        }
    };

    return (
        <div className="flex flex-col h-screen w-full items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
            {/* Logo Section */}
            <div className="text-center mb-5">
                <img className="w-50" src="/Logo.png" alt="Logo" />
            </div>

            {/* Sign In Section */}
            <h2 className="text-gray-600 mb-5">
                Sign in to your CAUHEC Connect account
            </h2>

            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}
                <div className="mb-6">
                    <label className="block text-sm text-gray-800 mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={loginInput.email}
                        onChange={(e) => {
                            updateLoginInput({ ...loginInput, email: e.target.value });
                        }}
                        id="email"
                        placeholder="Enter your email"
                        className="w-full p-3 text-sm font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        disabled={loading}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm text-gray-800 mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={loginInput.password}
                            onChange={(e) => {
                                updateLoginInput({ ...loginInput, password: e.target.value });
                            }}
                            placeholder="Enter your password"
                            className="w-full p-3 text-sm font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                            disabled={loading}
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={onSignIn}
                    className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;