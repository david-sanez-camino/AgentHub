/*
Carpeta q  gestiona las rutas de la aplicacion
*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Públicas
import Home from './pages/home';
import Login from './pages/login';
import CrearUsuario from './pages/crear_usuario';
import AboutUs from './pages/AboutUs';

// Admin (Legado / Ya existía)
import ProtectedRoute from "./components/proteccion_ruta";
import PantallaAdmin from "./pages/pantalla_admin";

// Nuevas Rutas: Desarrollador
import DesarrolladorPagina from './pages/Desarrollador_Pagina';
import DatosCuenta from './pages/Datos_Cuenta';
import DocumentacionCaracteristicas from './pages/Documentacion_Caracteristicas';
import SubirAgente from './pages/Subir_Agente';
import Finanzas from './pages/Finanzas';
import MisAgentes from './pages/Mis_Agentes';

// Nuevas Rutas: Cliente
import ClientePagina from './pages/Cliente_Pagina';
import ClientePerfil from './pages/Cliente_Perfil';
import ClienteMisAgentes from './pages/Cliente_Mis_Agentes';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crear_usuario" element={<CrearUsuario />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/pantalla_admin" element={<ProtectedRoute> <PantallaAdmin /> </ProtectedRoute>} />

                {/* Rutas Desarrollador */}
                <Route path="/desarrollador" element={<DesarrolladorPagina />} />
                <Route path="/desarrollador/perfil" element={<DatosCuenta />} />
                <Route path="/desarrollador/documentacion" element={<DocumentacionCaracteristicas />} />
                <Route path="/desarrollador/subir-agente" element={<SubirAgente />} />
                <Route path="/desarrollador/finanzas" element={<Finanzas />} />
                <Route path="/desarrollador/mis-agentes" element={<MisAgentes />} />

                {/* Rutas Cliente */}
                <Route path="/cliente" element={<ClientePagina />} />
                <Route path="/cliente/perfil" element={<ClientePerfil />} />
                <Route path="/cliente/mis-agentes" element={<ClienteMisAgentes />} />
            </Routes>
        </BrowserRouter>
    );
}
