import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import LightMode from "../Pictures/WhiteShopCart.png";
import DarkMode from "../Pictures/BlackShopCart.png";

export function CartPageButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains('dark-mode'));
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const handleClick = () => {
        navigate('/cart-page');
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="user-button-container cart-page-button"
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