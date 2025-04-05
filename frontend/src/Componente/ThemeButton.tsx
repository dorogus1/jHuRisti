import React, { useEffect, useRef, useState } from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/BlackThemeButton.png";
import LightMode from "../Pictures/WhiteThemeButton.png";
import hoverSound from "../Sounds/ThemeButton.mp3";
import { useSound } from "../Context/SoundContext";

export function ThemeButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const buttonRef = useRef<HTMLDivElement>(null);
    const { isMuted } = useSound();

    audioRef.current.volume = 1.0;

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
        // Play sound only when switching to dark mode and not muted
        if (!isDarkMode && !isMuted) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => console.log("Audio playback failed:", error));
        }
    };

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

        return () => {
            observer.disconnect();
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    // Update audio mute state when isMuted changes
    useEffect(() => {
        audioRef.current.muted = isMuted;
    }, [isMuted]);

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