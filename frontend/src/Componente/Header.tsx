import React, { useState, useEffect } from "react";


const Footer: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div>
            {isHovered && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "11%", // Covers the top part of the page
                        backgroundColor: "#CBCBCB", // Light grey transparent background
                        zIndex: "5", // Puts it behind the text
                    }}
                ></div>
            )}

            {/* Header (Above the Box) */}
            <header
                style={{
                    fontSize: "32px",
                    textAlign: "center",
                    padding: "20px",
                    position: "relative",
                    zIndex: "10", // Ensures the text stays on top
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                jHuRisti
            </header>

        </div>
    );
};

export default Footer;