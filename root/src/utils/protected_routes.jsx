import { storageService } from "../services/storage_services";
import { Outlet, Navigate } from 'react-router-dom';
import React from 'react'; // Add this import

export const ProtectedRoute = () => {
    const token = storageService.get("token");
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
};