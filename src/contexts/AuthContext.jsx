import React, { createContext, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { loginApi as login, registerApi as register } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (credentials) => {
        try {
          
            const response = await login(credentials);
            const { token, user } = response;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('id',user.id)
            setUser(user);
            console.log('User set in AuthContext:', user);
          
            return response;
        } catch (error) {
            throw error;
        }
    };

    const registerUser = async (userData) => {
        try {
            const response = await register(userData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loginUser,
        registerUser,
        logout,
    
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};