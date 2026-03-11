/**
 * CheckoutPage + CheckoutForm
 *
 * Purpose:
 * Handles the **secure payment process using Stripe** for tour bookings.
 * The page receives booking data from the BookingSidebar and processes
 * the payment before creating a booking in the backend.
 *
 * Features:
 * - Stripe card payment integration
 * - Secure card input using Stripe Elements
 * - Prevents double submission
 * - Displays booking summary
 * - Handles API booking creation after payment method generation
 * - Redirects to thank-you page on success
 * - Graceful fallback if booking data is missing
 *
 * Flow:
 * BookingSidebar → navigate('/checkout', { state: bookingData })
 *        ↓
 * CheckoutPage loads bookingData
 *        ↓
 * Stripe creates PaymentMethod
 *        ↓
 * Backend booking API called
 *        ↓
 * Success → Redirect to Thank You Page
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, message, Card, Typography, Divider } from 'antd';

import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import { createBookingAxiosCall } from '../../helper/helperapi';

const { Title, Text } = Typography;


/**
 * Initialize Stripe
 * Uses env variable or fallback test key
 */
const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    "pk_test_TYooMQauvdEDq54NiTphI7jx"
);


/**
 * Stripe Element Styles
 */
const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': { color: '#aab7c4' },
            fontFamily: 'Inter, sans-serif',
        },
        invalid: {
            color: '#9e2146'
        },
    },
};

const inputStyle = {
    padding: '12px 14px',
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '16px'
};



/**
 * Checkout Form Component
 * Handles Stripe payment creation
 */
const CheckoutForm = ({ bookingData, setProcessing, processing }) => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    /**
     * Prevent double submission
     */
    const isSubmitting = React.useRef(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements || processing || isSubmitting.current) {
            return;
        }

        isSubmitting.current = true;
        setProcessing(true);

        const cardNumberElement =
            elements.getElement(CardNumberElement);


        /**
         * Create payment method
         */
        const { error, paymentMethod } =
            await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
            });


        if (error) {

            message.error(error.message);
            isSubmitting.current = false;
            setProcessing(false);

        } else {

            console.log('[PaymentMethod]', paymentMethod);

            /**
             * Attach payment method to booking payload
             */
            const finalBookingData = {
                ...bookingData,
                paymentMethodId: paymentMethod.id
            };

            try {

                const response =
                    await createBookingAxiosCall(finalBookingData);

                if (response.data.success) {

                    message.success(
                        'Booking placed and payment successful!'
                    );

                    navigate('/thank-you');

                } else {

                    message.error(
                        response.data.message || 'Payment failed.'
                    );

                    isSubmitting.current = false;
                    setProcessing(false);

                }

            } catch (err) {

                console.error('Booking error:', err);

                message.error(
                    err.response?.data?.message ||
                    'An error occurred during booking.'
                );

                isSubmitting.current = false;
                setProcessing(false);

            }

        }

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="checkout-form"
        >

            <div style={{ marginBottom: 24 }}>

                {/* Card Number */}
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    Card Number
                </Text>

                <div style={inputStyle}>
                    <CardNumberElement options={ELEMENT_OPTIONS} />
                </div>


                <div style={{ display: 'flex', gap: '16px' }}>

                    {/* Expiry */}
                    <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                            Expiration Date
                        </Text>

                        <div style={inputStyle}>
                            <CardExpiryElement options={ELEMENT_OPTIONS} />
                        </div>
                    </div>


                    {/* CVC */}
                    <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                            CVC
                        </Text>

                        <div style={inputStyle}>
                            <CardCvcElement options={ELEMENT_OPTIONS} />
                        </div>
                    </div>

                </div>

            </div>


            {/* Submit Button */}
            <Button
                type="primary"
                htmlType="submit"
                disabled={!stripe || processing}
                loading={processing}
                block
                size="large"
                style={{
                    height: '50px',
                    fontSize: '18px'
                }}
            >

                {processing
                    ? 'Processing...'
                    : `Pay $${bookingData?.totalPrice?.toFixed(2)}`}

            </Button>

        </form>

    );

};



/**
 * Checkout Page
 * Displays order summary + payment form
 */
const CheckoutPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);


    /**
     * Booking data from previous page
     */
    const bookingData =
        location.state?.bookingData;


    /**
     * If no booking data → redirect home
     */
    if (!bookingData) {

        message.error(
            "No booking information found. Please try booking again."
        );

        navigate("/");

        return null;

    }



    return (

        <div
            style={{
                padding: '60px 20px',
                maxWidth: '800px',
                margin: '0 auto',
                fontFamily: 'Inter, sans-serif'
            }}
        >

            <Title
                level={2}
                style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}
            >
                Secure Checkout
            </Title>



            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '40px'
                }}
            >



                {/* Order Summary */}
                <div style={{ flex: '1 1 300px' }}>

                    <Card
                        title={<span style={{ fontSize: '20px' }}>Order Summary</span>}
                        bordered={false}
                        style={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >

                        <div style={{ marginBottom: '16px' }}>

                            <Text strong style={{ display: 'block' }}>
                                Booking Details
                            </Text>

                            <Text type="secondary" style={{ display: 'block' }}>
                                Date: {bookingData.bookingDate}
                            </Text>

                            <Text type="secondary" style={{ display: 'block' }}>
                                Time: {bookingData.bookingTime}
                            </Text>

                        </div>


                        <Divider style={{ margin: '12px 0' }} />


                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <Text>Adults ({bookingData.adultCount})</Text>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <Text>Youths ({bookingData.youthCount})</Text>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <Text>Children ({bookingData.childrenCount})</Text>
                        </div>


                        {(bookingData.extraServiceBooking || bookingData.extraServicePerson) && (
                            <>
                                <Divider style={{ margin: '12px 0' }} />

                                <Text strong>Extras Included</Text>

                                {bookingData.extraServiceBooking &&
                                    <div style={{ marginTop: '8px' }}>
                                        <Text type="secondary">
                                            - Service per booking
                                        </Text>
                                    </div>
                                }

                                {bookingData.extraServicePerson &&
                                    <div>
                                        <Text type="secondary">
                                            - Service per person
                                        </Text>
                                    </div>
                                }
                            </>
                        )}


                        <Divider style={{ margin: '16px 0' }} />


                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>

                            <Title level={4} style={{ margin: 0 }}>
                                Total Due:
                            </Title>

                            <Title level={4}
                                style={{
                                    margin: 0,
                                    color: '#1890ff'
                                }}
                            >
                                ${bookingData.totalPrice.toFixed(2)}
                            </Title>

                        </div>

                    </Card>

                </div>



                {/* Payment Form */}
                <div style={{ flex: '1 1 400px' }}>

                    <Card
                        title={<span style={{ fontSize: '20px' }}>Payment Details</span>}
                        bordered={false}
                        style={{
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >

                        <Elements stripe={stripePromise}>

                            <CheckoutForm
                                bookingData={bookingData}
                                setProcessing={setProcessing}
                                processing={processing}
                            />

                        </Elements>


                        {processing && (

                            <Text
                                type="secondary"
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: '16px'
                                }}
                            >
                                Processing payment... Please don't close this window.
                            </Text>

                        )}

                    </Card>

                </div>

            </div>

        </div>

    );

};

export default CheckoutPage;