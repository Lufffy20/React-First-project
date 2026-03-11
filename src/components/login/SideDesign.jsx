/**
 * SideDesign Component
 *
 * Purpose:
 * Displays a sliding informational sidebar UI used typically
 * on authentication pages (login / signup).
 *
 * Features:
 * - Auto sliding carousel
 * - Mouse drag support for manual navigation
 * - Interactive slide indicators (dots)
 * - Image + text combination slides
 *
 * Behavior:
 * - Slides automatically change every 3 seconds
 * - If the user is dragging, auto slide pauses
 * - Drag left → next slide
 * - Drag right → previous slide
 *
 * Notes:
 * - Uses useRef to track drag start and end positions
 * - Dragging is enabled only for desktop (mouse events)
 * - Slide data is stored in a static array
 */

import React, { useState, useEffect, useRef } from "react";
import "./SideDesign.css";

/**
 * Slide configuration data
 * Each slide contains:
 * - image
 * - description
 */
const slides = [
    {
        image: "https://stellar.annaizu.com/images/sidebar/1-UKVI-Illustrations.png",
        description: (
            <>
                Stay Compliant, Stay Alert
                <br />
                Expiry Notifications Made Simple.
            </>
        )
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/2-UKVI-Illustrations.png",
        description: (
            <>
                Effortless Onboarding,
                <br />
                Robust Compliance Stay Compliant
            </>
        )
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/3-UKVI-Illustrations.png",
        description: (
            <>
                Tailored Roles, Solid Compliance:
                <br />
                Manage Staff with Confidence
            </>
        )
    },
    {
        image: "https://stellar.annaizu.com/images/sidebar/4-UKVI-Illustrations.png",
        description: (
            <>
                OCR Magic, Compliance Sorted
                <br />
                Effortless & Secured Document Handling
            </>
        )
    }
];

const SideDesign = () => {

    /**
     * Current slide index
     */
    const [current, setCurrent] = useState(0);

    /**
     * Track drag positions
     */
    const startX = useRef(0);
    const endX = useRef(0);

    /**
     * Track dragging state
     */
    const [isDragging, setIsDragging] = useState(false);

    /**
     * Move to next slide
     */
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    /**
     * Move to previous slide
     */
    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    /**
     * Auto slide effect
     * Changes slide every 3 seconds
     */
    useEffect(() => {

        const interval = setInterval(() => {
            if (!isDragging) {
                nextSlide();
            }
        }, 3000);

        return () => clearInterval(interval);

    }, [isDragging]);

    /**
     * Determine swipe direction after interaction ends
     */
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

    /**
     * Mouse down event
     * Starts drag tracking
     */
    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.clientX;
    };

    /**
     * Mouse move event
     * Tracks drag position
     */
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        endX.current = e.clientX;
    };

    /**
     * Mouse up event
     * Ends drag and triggers slide change
     */
    const handleMouseUp = () => {
        setIsDragging(false);
        handleInteractionEnd();
    };

    /**
     * Mouse leave event
     * Cancels drag state
     */
    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    return (
        <div className="side-design-container">

            <div className="side-design-card">

                <div className="side-design-content">

                    {/* Brand Logo Section */}
                    <div className="brand">
                        <img
                            src="https://stellar.annaizu.com/images/Annaizu-logo.svg"
                            alt="logo"
                        />
                    </div>

                    {/* Slide Content Area */}
                    <div
                        className="text-content"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onDragStart={(e) => e.preventDefault()}
                    >

                        {/* Slide Image */}
                        <img
                            src={slides[current].image}
                            alt="slide"
                            className="slide-image"
                            draggable="false"
                        />

                        {/* Slide Description */}
                        <div className="slide-text">
                            <p>{slides[current].description}</p>
                        </div>

                        {/* Slide Navigation Dots */}
                        <div className="dots">
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${current === index ? "active" : ""
                                        }`}
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