import Login from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import React from "react";



const AppRoutes =() =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;