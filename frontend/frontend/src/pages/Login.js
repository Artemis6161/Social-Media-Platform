// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                
                email,
                password,
                
            });
            localStorage.setItem('authToken', data.token);
            setUser(data);  // Set the user in state to show in the navbar
            navigate('/');  // Redirect to the homepage after login
        } catch (error) {
            console.error('Invalid login credentials');
        }
    };

    return (
        <div className='form-wrapper'>
        <div  className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p className="redirect">Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
        </div>
    );
};

export default Login;

