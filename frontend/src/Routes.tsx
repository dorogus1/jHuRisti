import Login from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import React from "react";
import CollectionPage from "./Pages/CollectionPage";



const AppRoutes =() =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/collection" element={<CollectionPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;