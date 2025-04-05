import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import '../CssFiles/Componente.css';
import LightMode from "../Pictures/ShopWhite.png";
import DarkMode from "../Pictures/ShopBlack.png";
import hoverSound from "../Sounds/PeELE.mp3";
import { useSound } from "../Context/SoundContext";

export function CollectionButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const buttonRef = useRef<HTMLDivElement>(null);
    const { isMuted } = useSound();

    audioRef.current.volume = 0.1;

    const handleClick = () => {
        navigate('/collection');
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(true);
            if (!isMuted) {
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

    // Update audio mute state when isMuted changes
    useEffect(() => {
        audioRef.current.muted = isMuted;
    }, [isMuted]);

    return (
        <div
            ref={buttonRef}
            className="user-button-container collection-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {isHovered && <div className="user-button-hover-overlay" />}
            <img
                src={isDarkMode ? LightMode : DarkMode}
                alt="User Icon"
                className="user-button-icon"
            />
        </div>
    );
}