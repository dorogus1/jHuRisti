import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const VerifyEmailPage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    // Redirect if no email was passed
    useEffect(() => {
        if (!email) {
            alert("No email found. Please register again.");
            navigate("/register");
        }
    }, [email, navigate]);

    const handleSubmit = async () => {
        try {
            console.log("Verifying email:", email, "with code:", verificationCode);
            const response = await axios.post("http://localhost:5274/api/auth/verify-email", {
                email,
                emailVerificationCode: verificationCode.trim()
            });
            alert("Email verified successfully!");
            navigate('/login');
        } catch (error: any) {
            console.error("Verification error:", error);
            const errorMessage = error.response?.data || "Verification failed!";
            alert(errorMessage);
        }
    };

    return (
        <div className="container">
            <h1 className="title">VERIFY EMAIL</h1>
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

export default VerifyEmailPage;
