import React, { useState, useEffect } from "react";
import { LoginPageButton } from "../Componente/LoginPageButton";
import { useNavigate } from "react-router-dom";
import image1 from '../Img/main1.jpg';
import image2 from '../Img/main2.jpg';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";

const MainPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <LoginPageButton />
            <Header />
            <div
                style={{
                    width: "100vw",
                    height: "50vh",
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            ></div>
            <Footer />
        </div>
    );
};

export default MainPage;