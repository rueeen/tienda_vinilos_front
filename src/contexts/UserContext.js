import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/api';

/**
 * El UserContext es una característica de React que nos permite compartir datos entre componentes sin tener que pasar props 
 * manualmente a través de la jerarquía de componentes. Proporciona una forma conveniente de acceder a los datos en cualquier 
 * componente de la aplicación sin tener que pasarlos explícitamente como props. En el código que has proporcionado, se está utilizando 
 * la función createContext() para crear un contexto llamado UserContext. Un contexto en React es esencialmente un objeto que contiene 
 * un valor y puede ser compartido por varios componentes.  
 * Una vez que se crea el contexto, se puede utilizar para proporcionar un valor a los componentes descendientes utilizando el componente 
 * Provider y acceder a ese valor en los componentes descendientes utilizando el componente Consumer o el hook useContext.
 */

// Crear un contexto para el usuario
export const UserContext = createContext();

/**
 * Proveedor de contexto para el usuario.
 * Provee el estado del usuario y una función para actualizarlo a los componentes hijos.
 * 
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que serán envueltos por el proveedor.
 */
export const UserProvider = ({ children }) => {
    // Estado para almacenar los datos del usuario
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtener el token de acceso almacenado en el localStorage
        const token = localStorage.getItem('access_token');
        if (token) {
            // Hacer una solicitud para obtener los datos del usuario
            axios.get('/user/', {
                headers: {
                    Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
                }
            })
            .then(response => {
                // Si la solicitud es exitosa, actualizar el estado del usuario
                setUser(response.data);
            })
            .catch(error => {
                // Si hay un error en la solicitud, registrar el error y establecer el usuario como null
                console.log("Error fetching user data:", error);
                setUser(null);
            });
        }
    }, []); // El efecto se ejecuta una vez al montar el componente

    return (
        // Proveer el estado del usuario y la función para actualizarlo a los componentes hijos
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
