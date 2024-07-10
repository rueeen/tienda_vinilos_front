import React, { useState, useContext } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
    // Estados para almacenar el nombre de usuario, contraseña y mensajes de error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Acceso al contexto de usuario y a la función de navegación
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setError(''); // Resetear el mensaje de error

        try {
            // Enviar solicitud de autenticación para obtener los tokens
            const response = await axios.post('/token/', { username, password });
            localStorage.setItem('access_token', response.data.access); // Guardar el token de acceso en el localStorage
            localStorage.setItem('refresh_token', response.data.refresh); // Guardar el token de actualización en el localStorage

            // Solicitar los datos del usuario autenticado
            const userResponse = await axios.get('/user/', {
                headers: {
                    Authorization: `Bearer ${response.data.access}` // Añadir el token de acceso en el encabezado de la solicitud
                }
            });
            setUser(userResponse.data); // Actualizar el contexto de usuario con los datos obtenidos

            navigate('/'); // Redirigir a la página principal
        } catch (error) {
            // Manejar errores de autenticación
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials. Please try again.'); // Mostrar mensaje de error si las credenciales son inválidas
            } else {
                setError('An unknown error occurred.'); // Mostrar mensaje de error genérico para otros casos
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Actualizar el estado del nombre de usuario
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de la contraseña
                />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error si existe */}
        </form>
    );
};

export default Login;
