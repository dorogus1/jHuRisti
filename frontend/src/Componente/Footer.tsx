import { useNavigate } from "react-router-dom";

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
                    position: "relative",
                    bottom: "0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pointerEvents: "none",
                }}
            >
                <h3
                    style={{
                        color: "#414141"
                    }}
                >
                    More Information
                </h3>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                    maxWidth: "600px",
                    width: "100%",
                    textAlign: "left",
                }}>
                    <div style={{ flex: "1 1 100px" }}>
                        {/*logo*/}
                    </div>
                    <div style={{ flex: "1 1 100px" }}>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/about")}>About Us</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/shops")}>Shops</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/questions")}>Questions</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/contact")}>Contact</p>
                    </div>
                    <div style={{ flex: "1 1 100px" }}>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/termsofuse")}>Terms of Use</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/termsofsale")}>Terms of Sale</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/privacy")}>Privacy & Cookie Policy</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;