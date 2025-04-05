import React, { useState, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import { useNavigate } from 'react-router-dom';
import '../CssFiles/CollectionPage.css';

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
        // Example checkout process
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
            // Navigate to a thank you page or back to collection
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
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading cart...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="collection-container">
            <Header />
            <div style={{ flex: 1, padding: '20px', marginTop: '80px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Shopping Cart</h1>

                {error && (
                    <div style={{ padding: '10px', background: '#fff3cd', color: '#856404', margin: '10px 0', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Your cart is empty</p>
                        <button
                            onClick={() => navigate('/collection')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ width: '100px', height: '100px', overflow: 'hidden', marginRight: '20px' }}>
                                        <img
                                            src={item.image?.startsWith('http') ? item.image :
                                                item.image?.startsWith('/') ? `http://localhost:5274${item.image}` :
                                                    'https://via.placeholder.com/100x100?text=No+Image'}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3>{item.name}</h3>
                                        <p>Size: {item.size} | Type: {item.type}</p>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                background: '#f0f0f0',
                                                cursor: 'pointer'
                                            }}
                                        >-</button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: 'none',
                                                background: '#f0f0f0',
                                                cursor: 'pointer'
                                            }}
                                        >+</button>
                                    </div>

                                    <div style={{ width: '120px', textAlign: 'right', marginLeft: '20px' }}>
                                        <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginTop: '5px'
                                            }}
                                        >Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '30px',
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                <h3>Subtotal:</h3>
                                <h3>${calculateSubtotal().toFixed(2)}</h3>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <button
                                    onClick={() => navigate('/collection')}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleCheckout}
                                    style={{
                                        padding: '10px 30px',
                                        backgroundColor: '#444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div style={{ height: '110px', background: 'transparent' }}></div>
            <Footer />
        </div>
    );
};

export default CartPage;