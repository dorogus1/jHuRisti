import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../Componente/Footer";
import Header from "../Componente/Header";

const TermsAndConditionsPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="container" style={{ paddingTop: "10vh" }}>
                <h1 className="title">Terms and Conditions</h1>

                <p className="label">
                    Welcome to CultureDrop! By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our site. If you do not agree with these terms, you should not use this website.
                </p>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        1.Acceptance of Terms By accessing this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                       2.Changes to Terms We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website after such changes will be considered acceptance of those updates.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        3.User Registration Some sections of the website may require you to create an account. You are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account. You agree to notify us immediately if you suspect any unauthorized use of your account.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        4. Intellectual Property The content, features, and functionality of this website are owned by jHuRistii and are protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works from any part of this website without prior written permission.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        5. Privacy Policy Our use of your personal data is governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        6. User Conduct You agree to use this website for lawful purposes only. You are prohibited from engaging in any activity that interferes with the operation of the site or violates any laws or regulations. This includes, but is not limited to, transmitting harmful viruses or engaging in fraudulent activity.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        7. Limitation of Liability jHuRistii is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the website, including any errors or omissions in the content.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        8. Third-Party Links Our website may contain links to third-party websites. We do not endorse, control, or assume responsibility for the content or practices of these third-party sites.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        9. Termination We reserve the right to suspend or terminate your access to the website at our discretion, without notice, for violations of these terms.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        10. Governing Law These Terms and Conditions are governed by and construed in accordance with the laws of Romania, without regard to its conflict of law principles.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        11. Contact Information If you have any questions about these Terms and Conditions, please contact us.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditionsPage;
