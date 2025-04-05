import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/BlackShopCart.png";
import LightMode from "../Pictures/WhiteShopCart.png";

export function CollectionButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        navigate('/collection');
    };

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains('dark-mode'));
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="user-button-container collection-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={isDarkMode ? LightMode : DarkMode}
                    alt="User Icon"
                    className="user-button-icon"
                />
            </div>
        </>
    );
}