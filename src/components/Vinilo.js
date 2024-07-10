import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const Vinilo = () => {
    const [vinilos, setVinilos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVinilos = async () => {
            try {
                const response = await axios.get('/albums/');
                setVinilos(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchVinilos();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Lista de Vinilos</h2>
            <ul>
                {vinilos.map((vinilo) => (
                    <li key={vinilo.id}>{vinilo.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Vinilo;
