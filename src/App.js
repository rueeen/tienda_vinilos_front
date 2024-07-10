import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Vinilo from './components/Vinilo';
import CrearVinilo from './components/CrearVinilo';
import EditarVinilo from './components/EditarVinilo';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider, UserContext } from './contexts/UserContext';

function Home() {
    const { user } = useContext(UserContext);
    
    return (
        <h2>Bienvenido {user ? user.username : 'Invitado'}</h2>
    );
}

function Navigation() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/vinilos">Vinilos</Link>
                </li>
                {user && user.userprofile && user.userprofile.user_type === 2 && (
                    <>
                        <li>
                            <Link to="/crear-vinilo">Crear Vinilo</Link>
                        </li>
                        <li>
                            <Link to="/editar-vinilo">Editar Vinilo</Link>
                        </li>
                    </>
                )}
                {!user ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

function App() {
    return (
        <UserProvider>
            <Router>
                <div>
                    <h1>Vinyl Store</h1>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vinilos" element={<Vinilo />} />
                        <Route path="/crear-vinilo" element={<CrearVinilo />} />
                        <Route path="/editar-vinilo/:id" element={<EditarVinilo />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
