import React, { useState, useEffect } from "react";
import { LoginPageButton } from "./LoginPageButton";
import FilterButton, { Filters } from "./FilterButton";
import TextHeader from "./TextHeader";
import {CollectionButton} from "./CollectionButton";

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
        <div style={{
            position: "fixed",
            padding: "10px",
            top: 0,
            left: 0,
            width: "100%",
            height: "10vh",
            zIndex: 10,
            backgroundColor: "white",
            display: isVisible ? "block" : "none"
        }}>
            <LoginPageButton />
            <CollectionButton />
            {isHovered && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "11%",
                        backgroundColor: "#CBCBCB",
                        zIndex: "5",
                        pointerEvents: "none",
                    }}
                ></div>
            )}

            <TextHeader />
            {showFilterButton && onFilterChange && (
                <FilterButton onFilterChange={onFilterChange} />
            )}
        </div>
    );
};

export default Header;