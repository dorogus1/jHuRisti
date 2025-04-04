import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function LoginPageButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        console.log("User logo clicked");
        navigate('/');
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

            <div
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "10px",
                    zIndex: "20", // Increased z-index
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={UserLogo}
                    alt="User Icon"
                    style={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        pointerEvents: "auto",
                    }}
                />
            </div>
        </>
    );
}