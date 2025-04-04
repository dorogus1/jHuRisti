import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TextHeader: React.FC = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate('/main');
    };

    return (
        <>
            {isHovered && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "11%",
                        backgroundColor: "#CBCBCB",
                        zIndex: "1",
                    }}
                ></div>
            )}

            <header
                style={{
                    fontSize: "32px",
                    textAlign: "center",
                    padding: "5px",
                    position: "relative",
                    top: "10px",
                    zIndex: "10",
                    cursor: "pointer",
                    width: "120px",
                    margin: "0 auto",
                }}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                jHuRisti
            </header>
        </>
    );
};

export default TextHeader;