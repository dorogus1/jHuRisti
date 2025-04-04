import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5274/api/auth/register", { username, email, password });
            alert("Registration successful! Please check your email for the verification code.");
            navigate('/verify-email', { state: { email } });
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="container">
            <h1 className="title">REGISTER</h1>
            <p className="label">Username</p>
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="text-box"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <p className="label">Email</p>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="text-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p className="label">Password</p>
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="text-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>Register</button>
            <p className="label">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default RegisterPage;