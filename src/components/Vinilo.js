import React, { useState, useEffect, useCallback } from 'react'; // Importamos hooks para trabajar el manejo de eventos
import api from '../services/api'; // Importamos la instancia de axios
import { Link } from 'react-router-dom'; // Importamos el componente Link de react-router-dom

const Vinilo = () => { // Creamos la función que se encargará de listar los álbumes
    const [vinilos, setVinilos] = useState([]); // Definimos el estado para almacenar los álbumes

    const fetchVinilos = useCallback(async () => { // Creamos una función para obtener los álbumes desde la API
        try {
            const { data } = await api.get('/albums/'); // Realizamos una petición GET a la API para obtener los álbumes
            setVinilos(data); // Actualizamos el estado con la respuesta de la API
        } catch (error) {
            console.error('Error:', error); // En caso de error, mostramos un mensaje en la consola
        }
    }, []);

    useEffect(() => { // Utilizamos el hook useEffect para cargar los álbumes al cargar el componente
        fetchVinilos(); // Llamamos a la función para obtener los álbumes
    }, [fetchVinilos]); // Indicamos que la función se ejecutará al cargar el componente

    const handleDelete = async (id) => { // Función que se ejecuta al eliminar un álbum
        try {
            await api.delete(`/albums/${id}/`); // Realizamos una petición DELETE a la API para eliminar un álbum
            alert('Vinilo eliminado con éxito!'); // Mostramos un mensaje de éxito
            fetchVinilos(); // Volvemos a obtener los álbumes para actualizar la lista
        } catch (error) {
            console.error('Error:', error); // En caso de error, mostramos un mensaje en la consola
        }
    };

    return (
        <div>
            <h1>Vinilos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Publicación</th>
                        <th>Géneros</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vinilos.map((vinilo) => (
                        <tr key={vinilo.id}>
                            <td>{vinilo.id}</td>
                            <td>{vinilo.titulo}</td>
                            <td>{vinilo.artista ? vinilo.artista.nombre : 'Desconocido'}</td> 
                            <td>${vinilo.precio}</td>
                            <td>{vinilo.stock}</td>
                            <td>
                                {vinilo.portada && (
                                    <img src={vinilo.portada} alt={vinilo.titulo} width="100" />
                                )}
                            </td>
                            <td>{new Date(vinilo.publicacion).toLocaleDateString()}</td> 
                            <td>
                                {vinilo.genero && vinilo.genero.map((g) => g.nombre).join(', ')}
                            </td>
                            <td>
                                <Link to={`/editar-vinilo/${vinilo.id}`}>Editar</Link> 
                                <button onClick={() => handleDelete(vinilo.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vinilo;
