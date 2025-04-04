import React, { useState } from "react";
import {LoginPageButton} from "../Componente/LoginPageButton";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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
            <LoginPageButton />

            <footer
                style={{
                    backgroundColor: "#CBCBCB",
                    color: "white",
                    padding: "20px",
                    textAlign: "center",
                    position: "relative",
                    bottom: "0",
                    width: "100%",
                }}
            >
                <h3
                    style={{
                        color: "#414141"
                    }}
                >
                    More Information
                </h3>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <p style={{ cursor: "pointer", color: "#A9A9A9" }} onClick={() => navigate("/shops")}>Shops</p>
                    <p style={{ cursor: "pointer", color: "#4da6ff" }} onClick={() => navigate("/contact")}>Contact</p>
                    <p style={{ cursor: "pointer", color: "#4da6ff" }} onClick={() => navigate("/regulations")}>Regulations</p>
                    <p style={{ cursor: "pointer", color: "#4da6ff" }} onClick={() => navigate("/about")}>About Us</p>
                </div>
            </footer>

        </div>
    );
};

export default MainPage;
