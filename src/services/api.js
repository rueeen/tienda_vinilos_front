import axios from 'axios'; // Importamos axios

const api = axios.create({ // Creamos una instancia de axios con la URL base de la API
    baseURL: 'http://localhost:8000/api', // URL base de la API
});

export default api; // Exportamos la instancia de axios
