/*
Carpeta q  gestiona las rutas de la aplicacion
*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import CrearUsuario from './pages/crear_usuario';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from "./components/proteccion_ruta"; //protege ruta a pantalla admin
import PantallaAdmin from "./pages/pantalla_admin";
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crear_usuario" element={<CrearUsuario />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/pantalla_admin" element={ <ProtectedRoute> <PantallaAdmin /> </ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
