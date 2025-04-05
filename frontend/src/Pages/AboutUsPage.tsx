import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";

const AboutUs: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container" style={{ paddingTop: "10vh" }}>
                <h1 className="title">Despre Noi</h1>

                <p className="label">
                    Suntem o echipă de profesioniști în programare, respectiv HR, care a decis că, începând de azi, realizarea site-ului să fie responsabilitatea exclusivă a departamentului nostru.
                </p>

                <div>
                    <h2 className="label">Misiunea Noastră</h2>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        Să demonstrăm că de data asta HR-ul chiar se apucă de făcut site-ul, nu doar să vorbească despre el.
                    </p>
                </div>

                <div>
                    <h2 className="label">Echipa</h2>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
                        <li>Făgădar Marina – Front-with a little spiece of back -end Dev</li>
                        <li>Marogel Dragoș – Backend Dev</li>
                        <li>Cîrjaliu Diana – Frontend Dev</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
