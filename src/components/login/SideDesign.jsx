import React, { useState, useEffect, useRef } from "react";
import "./SideDesign.css";

const slides = [
    {
        image: "https://stellar.annaizu.com/images/sidebar/1-UKVI-Illustrations.png",
        description: <>Stay Compliant, Stay Alert<br />Expiry Notifications Made Simple.</>
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/2-UKVI-Illustrations.png",
        description: <>Effortless Onboarding,<br />Robust Compliance Stay Compliant</>
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/3-UKVI-Illustrations.png",
        description: <>Tailored Roles, Solid Compliance:<br />Manage Staff with Confidence</>
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/4-UKVI-Illustrations.png",
        description: <>OCR Magic, Compliance Sorted<br />Effortless & Secured Document Handling</>
    }
];

const SideDesign = () => {
    const [current, setCurrent] = useState(0);
    const startX = useRef(0);
    const endX = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                nextSlide();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isDragging]);

    const handleInteractionEnd = () => {
        if (!startX.current || !endX.current) return;

        const diff = startX.current - endX.current;

        if (diff > 50) {
            nextSlide();
        } else if (diff < -50) {
            prevSlide();
        }

        startX.current = 0;
        endX.current = 0;
    };

    // Mouse Event Handlers (Desktop Only)
    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        endX.current = e.clientX;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        handleInteractionEnd();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    return (
        <div className="side-design-container">
            <div className="side-design-card">
                <div className="side-design-content">

                    <div className="brand">
                        <img
                            src="https://stellar.annaizu.com/images/Annaizu-logo.svg"
                            alt="logo"
                        />
                    </div>

                    <div
                        className="text-content"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        <img
                            src={slides[current].image}
                            alt="slide"
                            className="slide-image"
                            draggable="false"
                        />

                        <div className="slide-text">
                            <p>{slides[current].description}</p>
                        </div>

                        <div className="dots">
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${current === index ? "active" : ""}`}
                                    onClick={() => setCurrent(index)}
                                ></span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SideDesign;
