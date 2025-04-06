import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
const AboutUs: React.FC = () => {
    return (
        <div className="main-container">
            <Header />
            <main className="page-content">
                <div className="container" style={{ paddingTop: "14vh" }}>
                    <h1 className="title">About Us</h1>

                    <p className="label">
                        We are a team of professionals in HR who decided that starting today, building the website will be the sole responsibility of our department.
                    </p>

                    <div>
                        <h2 className="label">Our Mission</h2>
                        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            To prove that this time, HR is actually going to build the website—not just talk about it.
                        </p>
                    </div>

                    <div>
                        <h2 className="label">The Team</h2>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
                            <li>Făgădar Marina – Front-end (with a little spice of Back-end)</li>
                            <li>Marogel Dragoș – Back-end Developer</li>
                            <li>Cîrjaliu Diana – Front-end Developer</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
