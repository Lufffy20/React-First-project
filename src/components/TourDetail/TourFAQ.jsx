/**
 * TourFAQ Component
 *
 * Purpose:
 * Displays the Frequently Asked Questions (FAQ) section
 * for a specific tour. Each FAQ contains a question and
 * its corresponding answer.
 *
 * Features:
 * - Dynamically renders FAQ items from the provided data
 * - Displays a fallback message if no FAQs exist
 * - Includes a visual icon for each FAQ entry
 * - Maintains consistent layout and spacing
 *
 * Props:
 * - faqs (Array):
 *   List of FAQ objects containing:
 *     - id (optional)
 *     - question (string)
 *     - answer (string)
 *
 * Notes:
 * - If faqs array is empty or undefined,
 *   a default message is displayed.
 */

import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const TourFAQ = ({ faqs }) => {

    return (
        <div className="tour-detail-faq-section">

            {/* Section Title */}
            <h2>FAQ</h2>

            {/* FAQ Container */}
            <div className="tour-detail-faq-item">

                {faqs && faqs.length > 0 ? (

                    /**
                     * Loop through all FAQs and render them
                     */
                    faqs.map((faq, index) => (

                        <div
                            key={faq.id || index}
                            style={{
                                marginBottom: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '15px'
                            }}
                        >

                            {/* FAQ Content */}
                            <div style={{ flex: 1 }}>

                                {/* Question */}
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        marginBottom: '8px'
                                    }}
                                >
                                    {faq.question}
                                </p>

                                {/* Answer */}
                                <p
                                    style={{
                                        color: '#666',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {faq.answer}
                                </p>

                            </div>

                            {/* FAQ Icon */}
                            <div
                                className="tour-detail-faq-icon"
                                style={{ marginLeft: '20px' }}
                            >
                                <UserOutlined
                                    style={{
                                        fontSize: '24px',
                                        color: '#EB662B'
                                    }}
                                />
                            </div>

                        </div>

                    ))

                ) : (

                    /**
                     * Fallback when no FAQ data exists
                     */
                    <p>No FAQs available for this tour.</p>

                )}

            </div>

        </div>
    );
};

export default TourFAQ;