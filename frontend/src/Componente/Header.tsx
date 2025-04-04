import React, { useState } from "react";
import { LoginPageButton } from "./LoginPageButton";
import FilterButton, { Filters } from "./FilterButton";

interface HeaderProps {
    showFilterButton?: boolean;
    onFilterChange?: (filters: Filters) => void;
}

const Header: React.FC<HeaderProps> = ({ showFilterButton, onFilterChange }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <LoginPageButton />
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

            <header
                style={{
                    fontSize: "32px",
                    textAlign: "center",
                    padding: "20px",
                    position: "relative",
                    zIndex: "10",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span style={{ cursor: "pointer" }}>jHuRisti</span>
                {showFilterButton && onFilterChange && (
                    <FilterButton onFilterChange={onFilterChange} />
                )}
            </header>
        </div>
    );
};

export default Header;