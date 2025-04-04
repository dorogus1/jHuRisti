import React, { useState } from "react";

const Header: React.FC = () => {
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
                        height: "11%",
                        backgroundColor: "#CBCBCB",
                        zIndex: "5",
                        pointerEvents: "none", // 🔥 Add this line here
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
                <span style={{ cursor: "pointer" }}>jHuRisti</span>
            </header>
        </div>
    );
};

export default Header;