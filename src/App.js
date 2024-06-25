import React from 'react';
import Vinilo from './components/Vinilo'; // Importamos el componente Vinilo
import CrearVinilo from './components/CrearVinilo'; // Importamos el componente CrearVinilo
import EditarVinilo from './components/EditarVinilo'; // Importamos el componente EditarVinilo
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importamos los componentes de react-router-dom

function Home() { // Creamos el componente Home
    return <h2>Home Page</h2>; 
}


/**
 * Crea el componente App.
 * @returns {JSX.Element} El componente App renderizado.
 */
function App() { // Creamos el componente App
    return (
        <Router> 
            <div>
                <h1>Vinyl Store</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/vinilos">Vinilos</Link>
                        </li>
                        <li>
                            <Link to="/crear-vinilo">Crear Vinilo</Link>
                        </li>
                    </ul>
                </nav>
                <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/vinilos" element={<Vinilo />} />
                    <Route path="/crear-vinilo" element={<CrearVinilo />} />
                    <Route path="/editar-vinilo/:id" element={<EditarVinilo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
