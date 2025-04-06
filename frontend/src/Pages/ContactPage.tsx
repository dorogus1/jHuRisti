import React, { useState } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import {useNavigate} from "react-router-dom";

const ContactPage: React.FC = () => {
    // Declarăm starea pentru input
    const [Nume, setNume] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Mesaj, setMesaj] = useState<string>('');

    return (
        <div className="main-container">
            <Header />
            <div className="container" style={{ paddingTop: "25vh" }}>
                <h1 className="title">Contact</h1>

                <div className="contact-info" style={{ marginTop: "20px" }}>
                    <p><strong>Email:</strong> marogeldragosflorinel@gmail.com</p>
                    <p><strong>Telefon:</strong> +40 752 179 896</p>
                    <p><strong>Program:</strong> Luni - Vineri: 9:00 - 18:00</p>
                </div>
            </div>
            <div style={{ height: '110px', background: 'transparent' }}></div>
            <Footer />
        </div>
    );
}

export default ContactPage;
