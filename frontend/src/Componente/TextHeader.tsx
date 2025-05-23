import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFiles/Componente.css";
import LogoLight from "../Pictures/LogoSiteAlb.png";
import LogoDark from "../Pictures/LogoSiteNegru.png";
import HoverImageLight from "../Pictures/alb.png";
import HoverImageDark from "../Pictures/negru.png";
import MusicSound from "../Sounds/NotLikeUs.mp3";
import { useSound } from "../Context/SoundContext";

const TextHeader: React.FC = () => {
    const { isMuted } = useSound();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const musicRef = useRef(new Audio(MusicSound));

    useEffect(() => {
        musicRef.current.volume = 0.25;
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains("dark-mode"));
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    // Pause audio if mute is toggled while playing
    useEffect(() => {
        if (isMuted) {
            musicRef.current.pause();
            musicRef.current.currentTime = 0;
        }
    }, [isMuted]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        musicRef.current.currentTime = 0;
        if (!isMuted) {
            musicRef.current.play().catch((error) => console.log("Audio playback failed:", error));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
    };

    const handleClick = () => {
        navigate("/main");
    };

    return (
        <>
            {isHovered && <div className="text-header-hover-overlay" />}
            <header
                className="text-header-container"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={
                        isDarkMode
                            ? (LogoLight && isHovered ? HoverImageLight : LogoLight)
                            : (LogoDark && isHovered ? HoverImageDark : LogoDark)
                    }
                    alt="jHuRisti Logo"
                    className="text-header-logo"
                />
            </header>
        </>
    );
};

export default TextHeader;