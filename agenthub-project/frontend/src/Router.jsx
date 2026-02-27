/*
Carpeta q  gestiona las rutas de la aplicacion
*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import CrearUsuario from './pages/crear_usuario';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crear_usuario" element={<CrearUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}
