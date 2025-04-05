import React, { useState } from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/User.png";

export function ThemeButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="user-button-container theme-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={DarkMode}
                    alt="Theme Toggle"
                    className="user-button-icon"
                />
            </div>
        </>
    );
}