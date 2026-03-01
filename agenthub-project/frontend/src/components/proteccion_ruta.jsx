/*
componente para proteger las rutas, si el usuario no esta logueado lo redirige a la pagina de login
*/
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

export default function ProtectedRoute({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}