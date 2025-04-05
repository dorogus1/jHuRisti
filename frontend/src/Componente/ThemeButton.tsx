import React, {useEffect, useRef, useState} from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/BlackThemeButton.png";
import LightMode from "../Pictures/WhiteThemeButton.png";
import hoverSound from "../Sounds/ThemeButton.mp3";

export function ThemeButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const buttonRef = useRef<HTMLDivElement>(null);

    audioRef.current.volume = 0.3; // Adjust volume here

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(true);
            // Only play sound if in light mode
            if (!isDarkMode) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(error => console.log("Audio playback failed:", error));
            }
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(false);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains('dark-mode'));
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}
            <div
                ref={buttonRef}
                className="user-button-container theme-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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