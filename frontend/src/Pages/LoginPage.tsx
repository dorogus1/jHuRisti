import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CssFiles/LoginPage.css';
import Header from "../Componente/Header";
import Footer from "../Componente/Footer";

const LoginPage: React.FC = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5274/api/auth/login", {
                usernameOrEmail,
                password
            });
            alert("Login successful! Redirecting to the main page.");
            navigate('/main');
        } catch (error: any) { // Type assertion to 'any'
            if (error.response) {
                console.error("Error response:", error.response.data);
                alert(`Login failed: ${error.response.data}`);
            } else {
                console.error("Error message:", error.message);
                alert("Login failed!");
            }
        }
    };

    return (
        <div>
            < Header />
            <div className="container" style={{ paddingTop: "10vh" }}>
                <h1 className="title">SIGN IN/REGISTER</h1>
               <p className="label">Username or Email</p>
                <input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    className="text-box"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                <button className="button" onClick={handleSubmit}>Login</button>
                <p className="label">Don't have an account? <Link to="/register" className="custom-link">Register</Link></p>
                < Footer />
            </div>
        </div>
    );
}

export default LoginPage;