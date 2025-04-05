import React, { useState, useEffect } from "react";
import { LoginPageButton } from "./LoginPageButton";
import FilterButton, { Filters } from "./FilterButton";
import TextHeader from "./TextHeader";
import { CollectionButton } from "./CollectionButton";
import { ThemeButton } from "./ThemeButton";
import '../CssFiles/Componente.css';
import {SoundOffButton} from "./SoundOffButton";
import {CartPageButton} from "./CartPageButton";

interface HeaderProps {
    showFilterButton?: boolean;
    onFilterChange?: (filters: Filters) => void;
}

const Header: React.FC<HeaderProps> = ({ showFilterButton, onFilterChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY < lastScrollY) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`header-container ${!isVisible ? 'header-hidden' : ''}`}>
            <LoginPageButton />
            <CollectionButton />
            <CartPageButton />
            <ThemeButton />
            <SoundOffButton />
            {isHovered && <div className="header-hover-overlay" />}
            <TextHeader />
            {showFilterButton && onFilterChange && (
                <FilterButton onFilterChange={onFilterChange} />
            )}
        </div>
    );
};

export default Header;