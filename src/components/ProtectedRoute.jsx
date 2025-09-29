import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from './MainLayout';

const ProtectedRoute = ({ children }) => {
    const authenticatedUser = JSON.parse(localStorage.getItem("user"));
    console.log('ProtectedRoute - authenticatedUser:', authenticatedUser, );

    if (!authenticatedUser) {
        console.log('No user, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
