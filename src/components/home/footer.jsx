import React from "react";
import "./footer.css";
import footer from "../../assets/img/footer.jpg";

const Footer = () => {
    return (
        <div
            className="footer-container"
            style={{ backgroundImage: `url(${footer})` }}
        >
            <div className="footer-content">
                <div className="footer-header">
                    <p>Speak to our expert at <span style={{ color: "#EB662B", textDecoration: "underline", cursor: "pointer" }}>1-800-453-6744</span></p>
                    <p style={{ fontWeight: "500", fontFamily: "Inter", fontSize: "16px", cursor: "pointer" }} >Follow Us</p>
                </div>

                <div className="footer-links-container">
                    <div className="footer-contact footer-column">
                        <h3>Contact</h3>
                        <div className="footer-contact-content">
                            <p>328 Queensberry Street, North Melbourne VIC3051,Australia.</p>
                            <p>hi@viatours.com</p>
                        </div>
                    </div>

                    <div className="footer-company footer-column">
                        <h3>Company</h3>
                        <div className="footer-company-content">
                            <a href="#">About Us</a><br />
                            <a href="#">Tourz Reviews</a><br />
                            <a href="#">Contact Us</a><br />
                            <a href="#">Travel Guides</a><br />
                            <a href="#">Data Policy</a><br />
                            <a href="#">Cookie Policy</a><br />
                            <a href="#">Legal</a><br />
                            <a href="#">Sitemap</a><br />
                        </div>
                    </div>

                    <div className="footer-support footer-column">
                        <h3>Support</h3>
                        <div className="footer-support-content">
                            <a href="#">Get in Touch</a><br />
                            <a href="#">Help center</a><br />
                            <a href="#">Live chat</a><br />
                            <a href="#">How it works</a><br />
                        </div>
                    </div>

                    <div className="footer-newsletter footer-column">
                        <h3>Newsletter</h3>
                        <p>Subscribe to the free newsletter and stay up to date</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Your email address" />
                            <button>Send</button>
                        </div>

                        <div className="footer-mobile-apps">
                            <h3>Mobile Apps</h3>
                            <div className="mobile-apps-content">
                                <a href="#">iOS App</a><br />
                                <a href="#">Android App</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;