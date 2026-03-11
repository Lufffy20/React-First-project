/**
 * CustomerDiscount Section
 *
 * Purpose:
 * Displays a promotional banner encouraging users to download the app
 * and receive a discount on their first booking.
 *
 * Features:
 * - Promotional background banner
 * - Displays discount offer message
 * - Email input field for sending a magic link
 * - Call-to-action button to send the link
 *
 * Flow:
 * Homepage loads
 *        ↓
 * CustomerDiscount component renders
 *        ↓
 * User enters email
 *        ↓
 * (Future feature) Magic link sent to user's email to download the app
 */

import React from 'react';
import "./CustomerDiscount.css";
import customerdiscount from '../../assets/img/banner.jpg';

function CustomerDiscount() {
    return (
        <div
            className="customerdiscount-section"
            style={{ backgroundImage: `url(${customerdiscount})` }}
        >
            <div className='grid'>
                <h1>Get 5% off your 1st app booking</h1>
                <p>Booking's better on the app. Use promo code "TourBooking" to save!</p>
                <h5>Get a magic link sent to your email</h5>

                <div className='customerdiscount-input'>
                    <input type="text" placeholder='Enter your email' />
                    <button className='send-btn'>Send</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerDiscount;