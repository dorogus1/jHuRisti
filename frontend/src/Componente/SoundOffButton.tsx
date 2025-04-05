import React, { useEffect, useState } from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/Soundoffblack.png";
import LightMode from "../Pictures/Soundoffwhite.png";
import { useSound } from "../Context/SoundContext";

export function SoundOffButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isMuted, toggleMute } = useSound();

    // Simplified hover handlers
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Check for dark mode
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
        <div className="sound-button-wrapper">
            {isHovered && <div className="user-button-hover-overlay" />}
            <div
                className={`user-button-container sound-button ${isMuted ? 'muted' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={toggleMute}
            >
                <img
                    src={isDarkMode ? LightMode : DarkMode}
                    alt="Sound Toggle"
                    className="user-button-icon"
                />
                {isMuted && <div className="muted-indicator" />}
            </div>
        </div>
    );
}