import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Asegúrate de ajustar la URL base según sea necesario
});

// Intercepta cada solicitud para añadir el token JWT
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token'); // Obtener el token de acceso del localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Añadir el token al encabezado de autorización de la solicitud si está presente en el localStorage 
        }
        return config; // Devolver la configuración de la solicitud actualizada
    },
    error => { 
        return Promise.reject(error); // Devolver un error si la solicitud no se puede modificar correctamente 
    }
);

export default api; 
