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
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
                    gap: "10px",
                    maxWidth: "600px",
                    margin: "0 auto",
                    textAlign: "left",
                }}>
                    <div style={{ gridColumn: "1" }}>
                        {/*logo*!*/}
                    </div>
                    <div style={{ gridColumn: "2" }}>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/about")}>About Us</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/shops")}>Shops</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/questions")}>Questions</p>
                        <p style={{ cursor: "pointer", color: "#414141" }} onClick={() => navigate("/contact")}>Contact</p>

                    </div>
                    <div style={{ gridColumn: "3" }}>
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