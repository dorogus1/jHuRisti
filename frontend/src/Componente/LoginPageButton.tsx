import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function LoginPageButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {/* Hover Background (Placed First So It's Behind Everything) */}
            {isHovered && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "11%", // Covers the top part of the page
                        backgroundColor: "#CBCBCB", // Light grey transparent background
                        zIndex: "1", // Lower than everything else
                    }}
                ></div>
            )}

            <div
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "10px",
                    zIndex: "10", // Ensures the image stays on top
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={UserLogo}
                    style={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        zIndex: "10", // Stays on top
                    }}
                    onClick={() => navigate('/')}
                />
            </div>
        </>
    );
}
