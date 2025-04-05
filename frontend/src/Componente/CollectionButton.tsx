import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import '../CssFiles/Componente.css';
import DarkMode from "../Pictures/BlackShopCart.png";
import LightMode from "../Pictures/WhiteShopCart.png";
import hoverSound from "../Sounds/PeELE.mp3";

export function CollectionButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const audioRef = useRef(new Audio(hoverSound));
    const buttonRef = useRef<HTMLDivElement>(null);

    audioRef.current.volume = 0.1;

    const handleClick = () => {
        navigate('/collection');
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only trigger if hovering the actual button
        if (e.target === buttonRef.current || buttonRef.current?.contains(e.target as Node)) {
            setIsHovered(true);
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => console.log("Audio playback failed:", error));
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only trigger if leaving the actual button
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