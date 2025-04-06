// frontend/src/Pages/OrderConfirmationPage.tsx
import React from 'react';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";
import { useNavigate } from 'react-router-dom';
import '../CssFiles/CheckoutPage.css';

const OrderConfirmationPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <Header />
            <div className="checkout-container">
                <h1 className="checkout-title">Order Confirmation</h1>

                <div className="checkout-content" style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <div className="checkout-form-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
                        <div style={{ marginBottom: '30px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>

                        <h2 style={{ marginBottom: '20px' }}>Your Order Has Been Placed!</h2>

                        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
                            Thank you for your purchase. We've sent an email confirmation with your order details.
                        </p>

                        <p style={{ marginBottom: '30px' }}>
                            Your order is being processed and will be shipped soon.
                        </p>

                        <button
                            onClick={() => navigate('/collection')}
                            className="submit-order-button"
                            style={{ maxWidth: '250px', margin: '0 auto' }}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmationPage;