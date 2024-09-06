// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ProtectedRoute from "./components/protectedRoute";
import Chat from "./components/Chat"
const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <Router>
            <Navbar user={user} />
            <div style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="/logout" element={<Logout setUser={setUser} />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute user={user}>
                               <Chat/>
                            </ProtectedRoute>
                        }
                    />
                    {/* Add more protected routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};

const Home = () => {
    return <h2>Welcome to the Home Page!</h2>;
};

export default App;
