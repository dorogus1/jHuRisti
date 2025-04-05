// frontend/src/Componente/CartButtonCollection.tsx
import React from 'react';
import '../CssFiles/CartPopup.css';

interface CartButtonCollectionProps {
    isVisible: boolean;
    onClose: () => void;
    onAction1: () => void;
    onAction2: () => void;
}

const CartButtonCollection: React.FC<CartButtonCollectionProps> = ({ isVisible, onClose, onAction1, onAction2 }) => {
    if (!isVisible) return null;

    return (
        <div className="cart-popup-overlay" onClick={onClose}>
            <div className="cart-popup" onClick={e => e.stopPropagation()}>
                <button className="popup-button" onClick={onAction1}>Add to Cart</button>
                <button className="popup-button" onClick={onAction2}>Buy Now</button>
            </div>
        </div>
    );
};

export default CartButtonCollection;