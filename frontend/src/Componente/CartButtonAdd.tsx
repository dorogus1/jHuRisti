import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkMode from "../Pictures/WhiteShopCart.png";
import '../CssFiles/PopCart.css';
import popUpSound from "../Sounds/SoundCartPage.mp3";

interface CartButtonAddProps {
    productId: number;
    quantity: number;
    productDetails: {
        name: string;
        price: number;
        image: string | null;
        stock: number;
        size: string;
        type: string;
    };
}

export function CartButtonAdd({ productId, quantity, productDetails }: CartButtonAddProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const popupCountRef = useRef(0);
    const audioRef = useRef(new Audio(popUpSound));
    const navigate = useNavigate();

    audioRef.current.volume = 1;


    const handleClick = async () => {
        try {

            const response = await fetch('http://localhost:5274/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productId, quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product to cart');
            }

            updateLocalCart();
            setShowPopup(true);
            popupCountRef.current++;
            if(popupCountRef.current >= 3)
            {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }

            } catch (err) {
            console.error('Error adding product to cart:', err);
            setError(err instanceof Error ? err.message : 'Failed to add product to cart');
        }
    };

    const updateLocalCart = () => {
        // Get current cart from localStorage
        let cart = [];
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        } catch (err) {
            console.error('Error parsing cart data:', err);
        }

        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === productId);

        if (existingItemIndex >= 0) {
            // Update existing item quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: productId,
                quantity,
                ...productDetails,
            });
        }

        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleGoToCart = () => {
        navigate('/cart-page');
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {isHovered && <div className="user-button-hover-overlay" />}
            <div
                className="cart-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <img
                    src={DarkMode}
                    alt="User Icon"
                    className="user-button-icon"
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Choose your weapon</h2>
                        <button onClick={handleGoToCart}>Go to Your Cart</button>
                        <button onClick={handleClosePopup}>Continue Shopping</button>
                    </div>
                </div>
            )}
        </>
    );
}