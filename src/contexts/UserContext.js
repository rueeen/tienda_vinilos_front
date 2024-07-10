import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.get('/user/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log("Error fetching user data:", error);
                setUser(null);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
