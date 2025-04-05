import UserLogo from "../Pictures/User.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import '../CssFiles/Componente.css';

export function CollectionButton() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate('/collection');
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="user-button-container collection-button"
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