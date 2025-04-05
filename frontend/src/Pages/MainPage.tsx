import React, { useState, useEffect } from "react";
import image1 from '../Img/img.png';
import image2 from '../Img/img_2.png';
import image3 from '../Img/img_1.png';
import image4 from '../Img/1c64075ae03627456e64840d1e6e279c.jpg';
import image5 from '../Img/2afe38ade37de829b765f44b819831c6.jpg';
import image6 from '../Img/2ba3838c208138b6ca4a56b894501e41.jpg';
import image7 from '../Img/75e22594c83a665309cf09bb4e121a60.jpg';
import image8 from '../Img/5751a5302061c5b2860c113558fcbc09.jpg';
import image9 from '../Img/6766c96b1eaaa50de992a9ce5b24ee67.jpg';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import '../CssFiles/MainPage.css';

const MainPage: React.FC = () => {
    const [images, setImages] = useState({
        col1: [image1, image4, image3],
        col2: [image2, image5, image6],
        col3: [image7, image8, image9]
    });

    const [currentIndexes, setCurrentIndexes] = useState({
        col1: 0,
        col2: 0,
        col3: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndexes(prev => ({
                col1: (prev.col1 + 1) % images.col1.length,
                col2: (prev.col2 + 1) % images.col2.length,
                col3: (prev.col3 + 1) % images.col3.length
            }));
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main-container">
            <Header />
            <div className="columns-container">
                <div className="column">
                    <img
                        src={images.col1[currentIndexes.col1]}
                        alt="Column 1"
                        className="rotating-image reverse"
                    />
                </div>
                <div className="column">
                    <img
                        src={images.col2[currentIndexes.col2]}
                        alt="Column 2"
                        className="rotating-image"
                    />
                </div>
                <div className="column">
                    <img
                        src={images.col3[currentIndexes.col3]}
                        alt="Column 3"
                        className="rotating-image reverse"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;