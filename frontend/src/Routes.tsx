import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import MainPage from "./Pages/MainPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CollectionPage from "./Pages/CollectionPage";
import AddProduct from "./Pages/AddProduct";
import CartPage from "./Pages/CartPage";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactPage from "./Pages/ContactPage";
import QuestionPage from "./Pages/QuestionPage";
import TermsAndConditionsPage from "./Pages/TermsAndConditionsPage";
import PrivacyAndCookiePolicyPage from "./Pages/PrivacyAndCookiePolicyPage";


const AppRoutes =() =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/cart-page" element={<CartPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/questions" element={<QuestionPage />} />
                <Route path="/termsofuse" element={<TermsAndConditionsPage />} />
                <Route path="/privacy" element={<PrivacyAndCookiePolicyPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;