import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Client'); // Default to Client
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push("Password must be at least 8 characters long");
        }
        if (!/[a-zA-Z]/.test(password)) {
            passwordErrors.push("Password must contain at least one letter");
        }
        if (!/[0-9]/.test(password)) {
            passwordErrors.push("Password must contain at least one digit");
        }
        if (!/[@./+/-/_]/.test(password)) {
            passwordErrors.push("Password must contain at least one special character (@, ., /, +, -, _)");
        }
        return passwordErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = [];

        // Validar contraseñas
        if (password !== confirmPassword) {
            newErrors.push('Passwords do not match');
        }

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            newErrors.push(...passwordErrors);
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post('/register/', {
                username: username,
                email: email,
                password: password,
                password2: confirmPassword,
                user_type: userType
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                const serverErrors = error.response.data;
                const errorList = [];
                for (let key in serverErrors) {
                    if (Array.isArray(serverErrors[key])) {
                        serverErrors[key].forEach(err => errorList.push(err));
                    } else {
                        errorList.push(serverErrors[key]);
                    }
                }
                setErrors(errorList);
            } else {
                setErrors(['An unknown error occurred']);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div>
                <label>User Type</label>
                <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                    <option value="Client">Client</option>
                    <option value="Employee">Employee</option>
                </select>
            </div>
            <button type="submit">Register</button>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index} style={{ color: 'red' }}>{error}</li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default Register;
