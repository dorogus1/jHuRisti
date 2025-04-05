import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function LoginPageButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate('/');
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "20px",
                    zIndex: "20", // Increased z-index
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={UserLogo}
                    alt="User Icon"
                    className="user-button-icon"
                />
            </div>
        </>
    );
}