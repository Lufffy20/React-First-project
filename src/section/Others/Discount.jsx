/**
 * Discount Section
 *
 * Purpose:
 * Displays a promotional banner offering a limited-time discount on tours.
 *
 * Features:
 * - Static promotional banner with background slider
 * - Highlighted discount percentage
 * - Call-to-action button to encourage booking
 *
 * Flow:
 * Homepage loads
 *        ↓
 * Discount component renders
 *        ↓
 * User sees promotional offer
 *        ↓
 * User can click "Book Now" to proceed with booking flow (future navigation integration)
 */

import "./Discount.css";

function Discount() {
    return (
        <div className="discount-section">
            <div className="slider"></div>

            <div className="discount-content">
                <h1>
                    Grab up to{" "}
                    <span className="highlight">35% off</span>
                    <br />
                    on your favorite
                    <br />
                    Destination
                </h1>

                <p>Limited time offer, don't miss the opportunity</p>
                <button className="discount-btn">Book Now</button>
            </div>
        </div>
    );
}

export default Discount;