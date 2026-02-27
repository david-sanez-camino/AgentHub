import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Cargando...');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  useEffect(() => {
    // Prueba de conexión con el backend
    axios.get(`${API_URL}/api/health`)
      .then(response => {
        setMessage(`Conectado al backend: ${response.data}`);
      })
      .catch(error => {
        setMessage('Backend no disponible. Asegúrate de que el servidor esté corriendo.');
        console.error('Error conectando al backend:', error);
      });
  }, [API_URL]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{ color: '#333' }}>🤖 AgentHub</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>{message}</p>
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Estado del Sistema</h3>
        <ul style={{ textAlign: 'left', color: '#555' }}>
          <li>✅ Frontend: Funcionando</li>
          <li>🔄 Backend: {message.includes('Conectado') ? 'Conectado' : 'Desconectado'}</li>
          <li>🗄️ Base de Datos: PostgreSQL</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
