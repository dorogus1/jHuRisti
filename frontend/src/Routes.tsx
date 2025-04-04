import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import MainPage from "./Pages/MainPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CollectionPage from "./Pages/CollectionPage";



const AppRoutes =() =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/collection" element={<CollectionPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;