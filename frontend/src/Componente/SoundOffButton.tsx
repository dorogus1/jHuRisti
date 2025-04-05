import React, { useEffect, useRef, useState } from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/Soundoffblack.png";
import LightMode from "../Pictures/Soundoffwhite.png";
import { useSound } from "../Context/SoundContext";

export function SoundOffButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const { isMuted, toggleMute } = useSound();

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(false);
        }
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
                ref={buttonRef}
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
            </div>
        </>
    );
}