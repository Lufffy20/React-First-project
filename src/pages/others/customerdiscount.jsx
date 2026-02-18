import React from 'react';
import './customerdiscount.css';
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