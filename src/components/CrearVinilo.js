import React, { useState, useEffect } from 'react'; // Importamos hooks para trabajar el manejo de eventos
import api from '../services/api'; // Importamos la instancia de axios

function CrearVinilo() { // Creamos la función que se encargará de crear un nuevo álbum
    const [titulo, setTitulo] = useState(''); // Definimos el estado para almacenar los valores de los campos del formulario
    const [precio, setPrecio] = useState(''); // Definimos el estado para almacenar los valores de los campos del formulario
    const [stock, setStock] = useState(''); // Definimos el estado para almacenar los valores de los campos del formulario
    const [publicacion, setPublicacion] = useState(''); // Definimos el estado para almacenar los valores de los campos del formulario
    const [genero, setGenero] = useState([]); // Definimos el estado para almacenar los valores de los campos del formulario
    const [artista, setArtista] = useState(''); // Definimos el estado para almacenar los valores de los campos del formulario
    const [portada, setPortada] = useState(null); // Definimos el estado para almacenar los valores de los campos del formulario
    const [artistas, setArtistas] = useState([]); // Definimos el estado para almacenar los artistas
    const [generos, setGeneros] = useState([]); // Definimos el estado para almacenar los géneros

    useEffect(() => { // Utilizamos el hook useEffect para cargar los artistas y géneros al cargar el componente
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
    }, []);

    const handleSubmit = (event) => { // Función que se ejecuta al enviar el formulario
        event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        const formData = new FormData(); // Creamos un objeto FormData para enviar los datos del formulario
        formData.append('titulo', titulo); 
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('publicacion', publicacion);
        formData.append('artista', artista);
        formData.append('portada', portada);

        genero.forEach((gen) => formData.append('genero', gen)); // Agregamos los géneros seleccionados al FormData

    
        api.post('/albums/', formData, { // Realizamos una petición POST a la API para crear un nuevo álbum
            headers: {
                'Content-Type': 'multipart/form-data' // Indicamos que se enviarán datos en formato multipart/form-data
            }
        })
        .then(response => {
            alert('Álbum creado con éxito!'); // Mostramos un mensaje de éxito
            setTitulo('');
            setPrecio('');
            setStock('');
            setPublicacion('');
            setGenero([]);
            setArtista('');
            setPortada(null);
        })
        .catch(error => {
            console.error('Error:', error.response.data); // En caso de error, mostramos un mensaje en la consola
        });
    };

    return ( // Retornamos el formulario para crear un nuevo álbum
        <div>
            <h1>Crear Nuevo Álbum</h1>
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
                            <option key={gen.id} value={gen.id}>{gen.nombre}</option>
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
                            <option key={art.id} value={art.id}>{art.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Portada:</label>
                    <input
                        type="file"
                        onChange={(e) => setPortada(e.target.files[0])}
                    />
                </div>
                <button type="submit">Crear Álbum</button>
            </form>
        </div>
    );
}

export default CrearVinilo; // Exportamos la función para poder utilizarla en otros componentes
