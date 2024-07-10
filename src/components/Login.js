import React, { useState, useContext } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('/token/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const userResponse = await axios.get('/user/', {
                headers: {
                    Authorization: `Bearer ${response.data.access}`
                }
            });
            setUser(userResponse.data);

            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
