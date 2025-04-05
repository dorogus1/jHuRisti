import React, {useEffect, useState} from 'react';
import DarkMode from "../Pictures/WhiteShopCart.png";

export function CartButtonAdd() {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleCartClick = () => {
        setShowPopup(!showPopup);
    };

    const handleButtonClick = (buttonName: string) => {
        // Add your specific functionality here
        console.log(`${buttonName} clicked`);
        setShowPopup(false);
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="cart-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCartClick}
            >
                <img
                    src={DarkMode}
                    alt="User Icon"
                    className="user-button-icon"
                />
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-box">
                            <button
                                className="popup-button"
                                onClick={() => handleButtonClick('Button 1')}
                            >
                                Button 1
                            </button>
                            <button
                                className="popup-button"
                                onClick={() => handleButtonClick('Button 2')}
                            >
                                Button 2
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}