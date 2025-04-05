import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../CssFiles/Componente.css';
import LogoLight from "../Pictures/LogoSiteAlb.png";
import LogoDark from "../Pictures/LogoSiteNegru.png";
import HoverImage from "../Pictures/LogoDrop.png";

const TextHeader: React.FC = () => {
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
        navigate('/main');
    };

    return (
        <>
            {isHovered && <div className="text-header-hover-overlay" />}

            <header
                className="text-header-container"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={isDarkMode ? (LogoLight && isHovered ? HoverImage : LogoDark) : (LogoDark && isHovered ? HoverImage : LogoDark)}
                    alt="jHuRisti Logo"
                    className="text-header-logo"
                />
            </header>
        </>
    );
};

export default TextHeader;