import React, { useState, useEffect } from "react";
import image1 from '../Img/img.png';
import image2 from '../Img/img_2.png';
import image3 from '../Img/img_1.png';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import '../CssFiles/MainPage.css';

const MainPage: React.FC = () => {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const images = [image1, image2, image3];
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 3000);
    //
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="main-container">
            <Header />
            <div className="columns-container">
                <div className="column">
                    <img src={image1} alt="Column 1" className="rotating-image reverse" />
                </div>
                <div className="column">
                    <img src={image2} alt="Column 2" className="rotating-image " />
                </div>
                <div className="column">
                    <img src={image3} alt="Column 3" className="rotating-image reverse" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;