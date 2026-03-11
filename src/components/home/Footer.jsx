/**
 * Footer Component
 *
 * Purpose:
 * Renders the website footer section which contains:
 * - Contact information
 * - Company related links
 * - Support links
 * - Newsletter subscription form
 * - Mobile app download links
 *
 * Features:
 * - Uses a background image for visual styling
 * - Organized into multiple columns for better layout
 * - Provides quick navigation links to important pages
 * - Includes a newsletter input field for email subscription
 *
 * Notes:
 * - Styling is handled via "Footer.css"
 * - Background image is imported from assets
 * - All links are currently placeholders (#) and can be replaced with actual routes
 */

import React from "react";
import "./Footer.css";
import footer from "../../assets/img/footer.jpg";

const Footer = () => {
    return (
        <div
            className="footer-container"
            style={{ backgroundImage: `url(${footer})` }}
        >
            <div className="footer-content">

                {/* =========================
                   Footer Top Section
                   Expert Contact + Social
                ========================= */}
                <div className="footer-header">
                    <p>
                        Speak to our expert at{" "}
                        <span
                            style={{
                                color: "#EB662B",
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                        >
                            1-800-453-6744
                        </span>
                    </p>

                    <p
                        style={{
                            fontWeight: "500",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Follow Us
                    </p>
                </div>

                {/* =========================
                   Footer Columns Container
                ========================= */}
                <div className="footer-links-container">

                    {/* =========================
                       Contact Section
                    ========================= */}
                    <div className="footer-contact footer-column">
                        <h3>Contact</h3>

                        <div className="footer-contact-content">
                            <p>
                                328 Queensberry Street,
                                North Melbourne VIC3051,
                                Australia.
                            </p>

                            <p>hi@viatours.com</p>
                        </div>
                    </div>

                    {/* =========================
                       Company Links
                    ========================= */}
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

                    {/* =========================
                       Support Links
                    ========================= */}
                    <div className="footer-support footer-column">
                        <h3>Support</h3>

                        <div className="footer-support-content">
                            <a href="#">Get in Touch</a><br />
                            <a href="#">Help center</a><br />
                            <a href="#">Live chat</a><br />
                            <a href="#">How it works</a><br />
                        </div>
                    </div>

                    {/* =========================
                       Newsletter Section
                    ========================= */}
                    <div className="footer-newsletter footer-column">
                        <h3>Newsletter</h3>

                        <p>
                            Subscribe to the free newsletter
                            and stay up to date
                        </p>

                        <div className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Your email address"
                            />

                            <button>Send</button>
                        </div>

                        {/* =========================
                           Mobile Apps Links
                        ========================= */}
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