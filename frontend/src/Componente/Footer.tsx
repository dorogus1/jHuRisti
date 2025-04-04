import { useNavigate } from "react-router-dom";
import Logo from "../Pictures/User.png"; // Make sure to import your logo image

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <footer
                style={{
                    backgroundColor: "#CBCBCB",
                    color: "white",
                    padding: "20px",
                    textAlign: "center",
                    bottom: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: "10",
                }}
            >
                <div style={{ flex: "1" }}>
                    <img src={Logo} alt="Logo" style={{ width: "100px" }} />
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/about")}>About Us</p>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/shops")}>Shops</p>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/questions")}>Questions</p>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/contact")}>Contact</p>
                </div>
                <div style={{ flex: "1", textAlign: "center" }}>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/termsofuse")}>Terms of Use</p>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/termsofsale")}>Terms of Sale</p>
                    <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/privacy")}>Privacy & Cookie Policy</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;