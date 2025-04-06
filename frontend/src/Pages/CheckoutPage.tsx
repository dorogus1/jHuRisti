import React, { useState, useEffect } from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import { useNavigate } from 'react-router-dom';
import '../CssFiles/CheckoutPage.css';

interface CheckoutFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    location: string;
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: ''
    });
    const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Load cart items from localStorage
        const loadCartFromStorage = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const items = JSON.parse(savedCart);
                    setCartItems(items);

                    // Calculate total amount
                    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
                    setTotalAmount(total);
                } else {
                    // Redirect to cart if no items
                    navigate('/cart');
                }
            } catch (err) {
                console.error('Error loading cart:', err);
            }
        };

        loadCartFromStorage();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when field is edited
        if (errors[name as keyof CheckoutFormData]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<CheckoutFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare order data
            const orderData = {
                customerInfo: formData,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    size: item.size,
                    type: item.type,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: totalAmount
            };

            // Send order to backend
            const response = await fetch('http://localhost:5274/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            // Clear cart
            localStorage.removeItem('cart');

            // Navigate to confirmation page
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Order submission error:', error);
            setErrors({ ...errors, email: error instanceof Error ? error.message : 'An error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-container">
            <Header />
            <div className="checkout-container">
                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-content">
                    <div className="checkout-form-container">
                        <h2>Delivery Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <div className="error-message">{errors.phone}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={errors.address ? 'error' : ''}
                                />
                                {errors.address && <div className="error-message">{errors.address}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">City/Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={errors.location ? 'error' : ''}
                                />
                                {errors.location && <div className="error-message">{errors.location}</div>}
                            </div>

                            <div className="checkout-buttons">
                                <button
                                    type="button"
                                    onClick={() => navigate('/cart')}
                                    className="back-button"
                                >
                                    Back to Cart
                                </button>
                                <button
                                    type="submit"
                                    className="submit-order-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-details">
                                            Size: {item.size} | Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <h3>Total</h3>
                            <h3>${totalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;