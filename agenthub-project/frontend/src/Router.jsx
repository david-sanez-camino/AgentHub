/*
Carpeta q  gestiona las rutas de la aplicacion
*/
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PantallaPrincipal
import Home from './pages/PantallaPrincipal/home';
import Login from './pages/PantallaPrincipal/login';
import CrearUsuario from './pages/PantallaPrincipal/crear_usuario';
import Marketplace from './pages/PantallaPrincipal/Marketplace';

// SeccionesFooter
import AboutUs from './pages/SeccionesFooter/AboutUs';
import Blog from './pages/SeccionesFooter/Blog';
import Comunidad from './pages/SeccionesFooter/Comunidad';
import Soporte from './pages/SeccionesFooter/Soporte';
import Empleo from './pages/SeccionesFooter/Empleo';
import Privacidad from './pages/SeccionesFooter/Privacidad';
import TerminosLegales from './pages/SeccionesFooter/TerminosLegales';
import CasosDeUso from './pages/SeccionesFooter/CasosDeUso';
import Integraciones from './pages/SeccionesFooter/Integraciones';

// SeccionesNavbar
import Soluciones from './pages/SeccionesNavbar/Soluciones';
import Precios from './pages/SeccionesNavbar/Precios';
import Documentacion from './pages/SeccionesNavbar/Documentacion';

// PantallasAdmin
import ProtectedRoute from "./components/proteccion_ruta";
import PantallaAdmin from "./pages/PantallasAdmin/pantalla_admin";

// PantallasDesarrollador
import DesarrolladorPagina from './pages/PantallasDesarrollador/Desarrollador_Pagina';
import DatosCuenta from './pages/PantallasDesarrollador/Datos_Cuenta';
import DocumentacionCaracteristicas from './pages/PantallasDesarrollador/Documentacion_Caracteristicas';
import SubirAgente from './pages/PantallasDesarrollador/Subir_Agente';
import Finanzas from './pages/PantallasDesarrollador/Finanzas';
import MisAgentes from './pages/PantallasDesarrollador/Mis_Agentes';

// PantallaChatAgentes
import PantallaChat from './pages/PantallaChatAgentes/PantallaChat';

// PantallasCliente
import ClientePagina from './pages/PantallasCliente/Cliente_Pagina';
import ClientePerfil from './pages/PantallasCliente/Cliente_Perfil';
import ClienteMisAgentes from './pages/PantallasCliente/Cliente_Mis_Agentes';
import PagoAgente from './pages/PantallasCliente/PagoAgente';
import PagoExitoso from './pages/PantallasCliente/PagoExitoso';

// Rutas de Olvido y Reset Password
import ForgotPassword from './pages/PantallaPrincipal/OlvidoPassword';
import ResetPassword from './pages/PantallaPrincipal/ResetPassword';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crear_usuario" element={<CrearUsuario />} />
                <Route path="/sobre-nosotros" element={<AboutUs />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/comunidad" element={<Comunidad />} />
                <Route path="/soporte" element={<Soporte />} />
                <Route path="/empleo" element={<Empleo />} />
                <Route path="/privacidad" element={<Privacidad />} />
                <Route path="/terminos-legales" element={<TerminosLegales />} />
                <Route path="/casos-de-uso" element={<CasosDeUso />} />
                <Route path="/integraciones" element={<Integraciones />} />
                <Route path="/soluciones" element={<Soluciones />} />
                <Route path="/precios" element={<Precios />} />
                <Route path="/documentacion" element={<Documentacion />} />
                <Route path="/pantalla_admin" element={<ProtectedRoute> <PantallaAdmin /> </ProtectedRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Rutas Desarrollador */}
                <Route path="/desarrollador" element={<DesarrolladorPagina />} />
                <Route path="/desarrollador/perfil" element={<DatosCuenta />} />
                <Route path="/desarrollador/documentacion" element={<DocumentacionCaracteristicas />} />
                <Route path="/desarrollador/subir-agente" element={<SubirAgente />} />
                <Route path="/desarrollador/finanzas" element={<Finanzas />} />
                <Route path="/desarrollador/mis-agentes" element={<MisAgentes />} />
                <Route path="/chat/:idAgente" element={<PantallaChat />} />

                {/* Rutas Cliente */}
                <Route path="/cliente" element={<ClientePagina />} />
                <Route path="/cliente/perfil" element={<ClientePerfil />} />
                <Route path="/cliente/mis-agentes" element={<ClienteMisAgentes />} />
                <Route path="/cliente/pagar/:idAgente" element={<PagoAgente />} />
                <Route path="/cliente/pago-exitoso" element={<PagoExitoso />} />
            </Routes>
        </BrowserRouter>
    );
}
