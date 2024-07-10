import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Ajusta la URL base según sea necesario
});

// Intercepta cada solicitud para añadir el token JWT
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
