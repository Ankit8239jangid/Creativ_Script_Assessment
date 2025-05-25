
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/utils/api';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const Navigater = useNavigate()
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Update login input handler
    const updateLoginInput = (newInput) => {
        setLoginInput(prev => ({
            ...prev,
            ...newInput
        }));
    };


    // Function to handle login API call
    const handleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post("/admin/login", loginInput);
            const token = response.data.token;
            const User = response.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem('User', JSON.stringify(User))
            console.log(User)
            if (response) {
                Navigater('/app/Dashboard')
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || '❌ Login failed. Please try again.';
            setError(errorMessage);
            console.error('❌ Error during authentication:', err);
            throw new Error(errorMessage); // Let component catch this
        } finally {
            setLoading(false);
        }
    };


    const handleLogOut = async () => {
        try {
            setIsLoggingOut(true);
    
            localStorage.removeItem('token');
            localStorage.removeItem('User');
            Navigater('/');

           
        } catch (err) {
            console.error('❌ Error during logout:', err);
            // Even if logout API fails, still clear local data and redirect
            localStorage.removeItem('token');
            localStorage.removeItem('User');
            Navigater('/');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loginInput,
                updateLoginInput,
                loading,
                error,
                handleSignIn,
                handleLogOut,
                isLoggingOut,
                setIsLoggingOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
