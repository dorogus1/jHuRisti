import React, {useState} from "react";
import Header from "../Componente/Header";
import Footer from "../Componente/Footer";

const PrivacyAndCookiePolicyPage: React.FC = () => {
    return (
        <div className="main-container">
            <Header />
            <div className="container" style={{ paddingTop: "10vh" }}>
                <h1 className="title">Privacy & cookie policy</h1>
                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        1. <strong>Information We Collect</strong><br/>
                        We may collect personal information from you when you visit our site, register an account, or interact with certain features. The types of personal information we may collect include:
                        <ul>
                            <li><strong>Personal Identification Information</strong>: Name, email address, phone number, etc.</li>
                            <li><strong>Usage Data</strong>: IP address, browser type, referring website, pages visited, and time spent on our site.</li>
                            <li><strong>Cookies and Tracking Data</strong>: Information collected through cookies and similar tracking technologies.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        2. <strong>How We Use Your Information</strong><br/>
                        We use the information we collect in the following ways:
                        <ul>
                            <li>To provide, maintain, and improve our website and services.</li>
                            <li>To personalize user experience and respond to your inquiries.</li>
                            <li>To send periodic emails regarding your account or other products and services.</li>
                            <li>To detect, prevent, and address technical issues or fraud.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        3. <strong>Sharing Your Information</strong><br/>
                        We do not sell or rent your personal information to third parties. We may share your information in the following cases:
                        <ul>
                            <li>With service providers who assist us in operating our website and services, subject to confidentiality agreements.</li>
                            <li>To comply with legal obligations, such as responding to subpoenas, court orders, or legal processes.</li>
                            <li>To protect our rights, property, or safety, and the rights, property, or safety of others.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        4. <strong>Data Security</strong><br/>
                        We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no security system is completely secure, and we cannot guarantee absolute security.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        5. <strong>Your Rights</strong><br/>
                        You have the right to:
                        <ul>
                            <li>Access, correct, or delete your personal information.</li>
                            <li>Withdraw your consent to the processing of your data at any time.</li>
                            <li>Object to or restrict the processing of your data under certain circumstances.</li>
                        </ul>
                        To exercise these rights, please contact us.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        6. <strong>Changes to Privacy Policy</strong><br/>
                        We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on this page, and the revised policy will be effective immediately upon publication.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        7. <strong>Contact Us</strong><br/>
                        If you have any questions about this Privacy Policy or how we handle your personal information, please contact us.
                    </p>
                </div>

                <hr />

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        <strong>Cookie Policy</strong>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        1. <strong>What Are Cookies?</strong><br/>
                        Cookies are small text files stored on your device when you visit a website. They allow the website to remember your actions and preferences over time, making your browsing experience more efficient.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        2. <strong>Types of Cookies We Use</strong><br/>
                        We use the following types of cookies:
                        <ul>
                            <li><strong>Essential Cookies</strong>: These cookies are necessary for the website to function and cannot be switched off in our systems.</li>
                            <li><strong>Performance Cookies</strong>: These cookies collect information about how visitors use the site, such as which pages are visited most frequently.</li>
                            <li><strong>Functional Cookies</strong>: These cookies allow the website to remember your preferences and choices, such as language or region.</li>
                            <li><strong>Targeting/Advertising Cookies</strong>: These cookies are used to deliver targeted advertising based on your interests.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        3. <strong>How We Use Cookies</strong><br/>
                        We use cookies for the following purposes:
                        <ul>
                            <li>To enhance the functionality and performance of the website.</li>
                            <li>To analyze website traffic and user behavior.</li>
                            <li>To personalize content and advertisements based on your preferences.</li>
                            <li>To remember your login details and settings.</li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        4. <strong>Third-Party Cookies</strong><br/>
                        We may use third-party services, such as Google Analytics or advertising networks, that set cookies on your device. These third parties may collect information about your activities on our site and other websites.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        5. <strong>Managing Cookies</strong><br/>
                        You can control or disable cookies by adjusting your browser settings. However, please note that disabling cookies may impact your experience on our website, and some features may not work as intended.
                        <br/>
                        For instructions on how to manage cookies in various browsers, please visit the following links:
                        <ul>
                            <li><a href="https://support.google.com/chrome/answer/95647?hl=en" style={{color:"#c80101",fontWeight:"bold"}}>Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" style={{color:"#c80101",fontWeight:"bold"}}>Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" style={{color:"#c80101",fontWeight:"bold"}}>Safari</a></li>
                        </ul>
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        6. <strong>Changes to Cookie Policy</strong><br/>
                        We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with an updated revision date.
                    </p>
                </div>

                <div>
                    <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                        7. <strong>Contact Us</strong><br/>
                        If you have any questions about this Cookie Policy or how we use cookies, please contact us.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyAndCookiePolicyPage;
