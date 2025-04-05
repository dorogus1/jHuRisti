import React, { useState, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import { useNavigate } from 'react-router-dom';
import '../CssFiles/CartPage.css';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
    stock: number;
    size: string;
    type: string;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart items from localStorage
        const loadCartFromStorage = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
                setLoading(false);
            } catch (err) {
                console.error('Error loading cart:', err);
                setError('Failed to load your cart items');
                setLoading(false);
            }
        };

        loadCartFromStorage();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, loading]);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.min(newQuantity, item.stock) }
                    : item
            )
        );
    };

    const removeItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        try {
            // Here you would normally send the cart to your backend
            for (const item of cartItems) {
                const response = await fetch('http://localhost:5274/api/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: item.id,
                        quantity: item.quantity
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to checkout item: ${item.name}`);
                }
            }

            // Clear cart and navigate to confirmation
            setCartItems([]);
            alert('Checkout successful!');
            navigate('/collection');

        } catch (err) {
            console.error('Checkout error:', err);
            setError(err instanceof Error ? err.message : 'Checkout failed');
        }
    };

    if (loading) {
        return (
            <div className="collection-container">
                <Header />
                <div className="loading-container">
                    <p>Loading cart...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="collection-container">
            <Header />
            <div className="cart-container">
                <h1 className="cart-header">Your Shopping Cart</h1>

                {error && <div className="error-message">{error}</div>}

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <button
                            onClick={() => navigate('/collection')}
                            className="empty-cart-button"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="cart-items-list">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image-container">
                                        <img
                                            src={item.image?.startsWith('http') ? item.image :
                                                item.image?.startsWith('/') ? `http://localhost:5274${item.image}` :
                                                    'https://via.placeholder.com/100x100?text=No+Image'}
                                            alt={item.name}
                                            className="item-image"
                                        />
                                    </div>

                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p>Size: {item.size} | Type: {item.type}</p>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="item-quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="quantity-button"
                                        >-</button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                            className="quantity-button"
                                        >+</button>
                                    </div>

                                    <div className="item-price-actions">
                                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="remove-button"
                                        >Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="subtotal-row">
                                <h3>Subtotal:</h3>
                                <h3>${calculateSubtotal().toFixed(2)}</h3>
                            </div>
                            <div className="action-buttons">
                                <button
                                    onClick={() => navigate('/collection')}
                                    className="continue-shopping-button"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    className="checkout-button"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;