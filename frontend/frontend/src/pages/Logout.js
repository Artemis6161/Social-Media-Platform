// src/pages/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Reset user state
        setUser(null);
        navigate('/login');
    }, [navigate, setUser]);

    return null;
};

export default Logout;
