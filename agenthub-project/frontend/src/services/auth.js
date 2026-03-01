/*
aqui mantendremos la sesion abierta entre las pantallas para q sea persistente
asi cuando cambiemos de pantalla no se pierda la sesion y el usuario no tenga que volver a loguearse
*/
export function saveAuth(loginResponse) {
    // loginResponse: { token, type, usuario }
    localStorage.setItem("auth_token", loginResponse.token);
    localStorage.setItem("auth_type", loginResponse.type || "Bearer");
    localStorage.setItem("auth_user", JSON.stringify(loginResponse.usuario || null));
}

export function getToken() {
    return localStorage.getItem("auth_token");
}

export function getAuthHeader() {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    const type = localStorage.getItem("auth_type") || "Bearer";
    return `${type} ${token}`;
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem("auth_user") || "null");
    } catch {
        return null;
    }
}

export function isLoggedIn() {
    return !!getToken();
}

export function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_type");
    localStorage.removeItem("auth_user");
}