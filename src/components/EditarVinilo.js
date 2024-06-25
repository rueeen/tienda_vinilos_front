import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // Importamos la instancia de axios

function ActualizarVinilo() {  // Creamos la función que se encargará de actualizar un álbum
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [publicacion, setPublicacion] = useState('');
    const [genero, setGenero] = useState([]);
    const [artista, setArtista] = useState('');
    const [portada, setPortada] = useState(null);
    const [artistas, setArtistas] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => { // Utilizamos el hook useEffect para cargar los artistas y géneros al cargar el componente
        api.get(`/albums/${id}/`) // Realizamos una petición GET a la API para obtener los datos del álbum
            .then(response => {
                const album = response.data;
                setTitulo(album.titulo);
                setPrecio(album.precio);
                setStock(album.stock);
                setPublicacion(album.publicacion);
                setGenero(album.genero.map(gen => gen.id)); // Actualizamos el estado con los géneros del álbum
                setArtista(album.artista.id); // Actualizamos el estado con el artista del álbum
            })
            .catch(error => {
                console.error('Error:', error); // En caso de error, mostramos un mensaje en la consola
            });

        api.get('/artistas/') // Realizamos una petición GET a la API para obtener los artistas
            .then(response => {
                setArtistas(response.data); // Actualizamos el estado con la respuesta de la API
            })
            .catch(error => {
                console.error('Error:', error); // En caso de error, mostramos un mensaje en la consola
            });

        api.get('/generos/') // Realizamos una petición GET a la API para obtener los géneros
            .then(response => {
                setGeneros(response.data); // Actualizamos el estado con la respuesta de la API
            })
            .catch(error => {
                console.error('Error:', error); // En caso de error, mostramos un mensaje en la consola
            });
    }, [id]);

    const handleSubmit = (event) => { // Función que se ejecuta al enviar el formulario
        event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        const formData = new FormData(); // Creamos un objeto FormData para enviar los datos del formulario
        formData.append('titulo', titulo);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('publicacion', publicacion);
        formData.append('artista', artista);
        genero.forEach((gen) => formData.append('genero', gen)); // Agregamos los géneros seleccionados al FormData
        if (portada) {
            formData.append('portada', portada); // Agregamos la portada al FormData si se seleccionó un archivo
        }

        api.put(`/albums/${id}/`, formData, { // Realizamos una petición PUT a la API para actualizar el álbum
            headers: {
                'Content-Type': 'multipart/form-data' // Indicamos que se enviarán datos en formato multipart/form-data
            }
        })
        .then(response => {
            alert('Álbum actualizado con éxito!'); // Mostramos un mensaje de éxito
        })
        .catch(error => {
            console.error('Error:', error.response.data); // En caso de error, mostramos un mensaje en la consola
        });
    };

    return (
        <div>
            <h1>Actualizar Álbum</h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Publicación:</label>
                    <input
                        type="date"
                        value={publicacion}
                        onChange={(e) => setPublicacion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Género:</label>
                    <select
                        multiple
                        value={genero}
                        onChange={(e) => setGenero(Array.from(e.target.selectedOptions, option => option.value))} // Actualizamos el estado con los géneros seleccionados
                        required
                    >
                        {generos.map((gen) => (
                            <option key={gen.id} value={gen.id}>{gen.nombre}</option> // Mostramos los géneros disponibles
                        ))}
                    </select>
                </div>
                <div>
                    <label>Artista:</label>
                    <select
                        value={artista}
                        onChange={(e) => setArtista(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un artista</option>
                        {artistas.map((art) => (
                            <option key={art.id} value={art.id}>{art.nombre}</option> // Mostramos los artistas disponibles
                        ))}
                    </select>
                </div>
                <div>
                    <label>Portada:</label>
                    <input
                        type="file"
                        onChange={(e) => setPortada(e.target.files[0])} // Actualizamos el estado con la portada seleccionada
                    />
                </div>
                <button type="submit">Actualizar Álbum</button>
            </form>
        </div>
    );
}

export default ActualizarVinilo; // Exportamos el componente ActualizarVinilo
