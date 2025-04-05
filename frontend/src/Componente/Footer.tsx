import { useNavigate } from "react-router-dom";
import Logo from "../Pictures/LogoEchipa@2x.png";
import '../CssFiles/Componente.css';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer-container">
            <div className="footer-logo">
                <img src={Logo} alt="Logo" className="footer-logo-image" />
            </div>
            <div className="footer-links">
                <p className="footer-link" onClick={() => navigate("/about")}>About Us</p>
                <p className="footer-link" onClick={() => navigate("/shops")}>Shops</p>
                <p className="footer-link" onClick={() => navigate("/questions")}>Questions</p>
                <p className="footer-link" onClick={() => navigate("/contact")}>Contact</p>
            </div>
            <div className="footer-links">
                <p className="footer-link" onClick={() => navigate("/termsofuse")}>Terms of Use</p>
                <p className="footer-link" onClick={() => navigate("/termsofsale")}>Terms of Sale</p>
                <p className="footer-link" onClick={() => navigate("/privacy")}>Privacy & Cookie Policy</p>
            </div>
        </footer>
    );
};

export default Footer;