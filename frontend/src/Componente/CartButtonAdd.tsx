import React, {useEffect, useState} from 'react';
import DarkMode from "../Pictures/WhiteShopCart.png";

export function CartButtonAdd() {
    const [isHovered, setIsHovered] = useState(false);


    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}

            <div
                className="cart-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                //onClick={handleClick}
            >
                <img
                    src={DarkMode}
                    alt="User Icon"
                    className="user-button-icon"
                />
            </div>
        </>
    );
}