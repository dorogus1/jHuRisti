import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CssFiles/LoginPage.css';

const VerifyLoginPage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            alert("Email missing. Please log in again.");
            navigate("/login");
        }
    }, [email, navigate]);

    const handleSubmit = async () => {
        try {
            console.log("Verifying login for:", email, "with code:", verificationCode);
            const response = await axios.post("http://localhost:5274/api/auth/login_verification", {
                email,
                verificationCode: verificationCode.trim()
            });
            alert("Login verified successfully! Token: " + response.data.token);
            navigate('/');
        } catch (error: any) {
            console.error("Login verification error:", error);
            alert(error.response?.data || "Verification failed!");
        }
    };

    return (
        <div className="container">
            <h1 className="title">VERIFY LOGIN</h1>
            
            <p className="label">Verification Code</p>
            <input
                type="text"
                name="verificationCode"
                placeholder="Verification Code"
                className="text-box"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>Verify</button>
        </div>
    );
};

export default VerifyLoginPage;