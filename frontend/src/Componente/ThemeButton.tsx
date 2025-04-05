import React, {useEffect, useState} from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/BlackThemeButton.png";
import LightMode from "../Pictures/WhiteThemeButton.png";

export function ThemeButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
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
                className="user-button-container theme-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={isDarkMode ? LightMode : DarkMode}
                    alt="Theme Toggle"
                    className="user-button-icon"
                />
            </div>
        </>
    );
}