import React, { useState } from 'react';
import Header from '../Componente/Header';
import Footer from '../Componente/Footer';

type QuestionProps = {
    question: string;
    answer: string;
    style?: React.CSSProperties; // Allows custom styling
};

const Question: React.FC<QuestionProps> = ({ question, answer, style }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item" style={style}>
            <div
                className="accordion-question"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <p style={{ margin: 0 }}>{question}</p>
                <span>{isOpen ? '−' : '+'}</span>
            </div>

            {/* Answer */}
            {isOpen && (
                <div className="accordion-answer">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const QuestionPage: React.FC = () => {
    const faqs = [
        {
            question: "How do I create an account on the platform?",
            answer: "Go to the Registration page, fill in the form, and confirm the email you receive."
        },
        {
            question: "Can I modify a product already added to the cart?",
            answer: "Of course! You can change the quantity or remove the product from the cart before completing the order."
        },
        {
            question: "Do I need to verify my email after registration?",
            answer: "Yes, to activate your account and be able to place orders, email verification is required."
        },
        {
            question: "How can I contact the support team?",
            answer: "You can email us at marogeldragosflorinel@gmail.com or call +40 752 179 896."
        },
        {
            question: "What payment methods are available?",
            answer: "We accept cash on delivery via courier."
        }
    ];

    return (
        <>
            <Header />
            <div className="container" style={{ paddingTop: "10vh", paddingBottom: "5vh"}}>
                <h1 className="title" style={{ paddingBottom: "5vh" }}>Frequently Asked Questions</h1>
                <div className="accordion">
                    {faqs.map((faq, index) => (
                        <Question
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            style={{
                                borderRadius: '5px',
                                padding: '10px',
                                marginBottom: '20px', // Adds more space between questions
                            }}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default QuestionPage;
