import React from 'react';
import cartImage from '../Pictures/BlackShopCart.png';

const CartButtonAdd: React.FC = () => {
    const handleCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert('Cart button clicked!');
    };

    return (
        <div className="cart-button" onClick={handleCartClick}>
            <img src={cartImage} alt="Cart" />
        </div>
    );
};

export default CartButtonAdd;