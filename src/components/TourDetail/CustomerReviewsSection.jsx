import React, { useState } from 'react';
import { Button, Input, Rate, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ReviewNode from './ReviewNode';

const userReviews = [
    {
        id: 1,
        initials: "A.T",
        name: "Ali Tufan",
        date: "April 2023",
        title: "Take this tour! Its fantastic!",
        desc: "Great for 4-5 hours to explore. Really a lot to see and tons of photo spots. Even have a passport for you to collect all the stamps as a souvenir. Must see for a Harry Potter fan.",
        images: [
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001"
        ],
        helpful: "Helpful",
        notHelpful: "Not helpful",
        replies: []
    }
];

const CustomerReviewsSection = () => {
    const [reviewsList, setReviewsList] = useState(userReviews);
    const [visibleCount, setVisibleCount] = useState(3);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [reviewForm, setReviewForm] = useState({
        name: '', email: '', title: '', comment: '', images: [],
        ratings: { Location: 0, Amenities: 0, Food: 0, Room: 0, Price: 0, TourOperator: 0 }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (key, value) => {
        setReviewForm(prev => ({ ...prev, ratings: { ...prev.ratings, [key]: value } }));
    };

    const handleFormSubmit = async () => {
        if (!reviewForm.name || !reviewForm.email || !reviewForm.comment) {
            message.error("Please fill in the required fields (Name, Email, Comment).");
            return;
        }

        setIsSubmitting(true);

        // Simulated API call delay
        setTimeout(async () => {
            try {
                const base64Images = await Promise.all(
                    reviewForm.images.map(file => {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file.originFileObj || file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });
                    })
                );

                const newReview = {
                    id: Date.now(),
                    initials: reviewForm.name.substring(0, 2).toUpperCase(),
                    name: reviewForm.name,
                    date: dayjs().format("MMMM YYYY"),
                    title: reviewForm.title || "Review",
                    desc: reviewForm.comment,
                    images: base64Images,
                    helpful: "Helpful",
                    notHelpful: "Not helpful",
                    replies: []
                };

                setReviewsList([newReview, ...reviewsList]);
                setReviewForm({
                    name: '', email: '', title: '', comment: '', images: [],
                    ratings: { Location: 0, Amenities: 0, Food: 0, Room: 0, Price: 0, TourOperator: 0 }
                });
                message.success("Review submitted successfully!");
            } catch (error) {
                message.error("Failed to submit review.");
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
    };

    const handleInlineReplySubmit = (parentId) => {
        if (!replyText.trim()) return;

        const newReply = {
            id: Date.now(),
            initials: "GU",
            name: "Guest",
            date: dayjs().format("MMMM YYYY"),
            title: "",
            desc: replyText,
            images: [],
            helpful: "Helpful",
            notHelpful: "Not helpful",
            replies: []
        };

        const addReplyRecursively = (reviews, targetId, reply) => {
            return reviews.map(rev => {
                if (rev.id === targetId) {
                    return { ...rev, replies: [...(rev.replies || []), reply] };
                }
                if (rev.replies && rev.replies.length > 0) {
                    return { ...rev, replies: addReplyRecursively(rev.replies, targetId, reply) };
                }
                return rev;
            });
        };

        setReviewsList(addReplyRecursively(reviewsList, parentId, newReply));
        setReplyingTo(null);
        setReplyText('');
    };

    return (
        <div className="tour-detail-customer-review-wrapper">
            <div className="tour-detail-customer-review-section">
                <h2>Customer Reviews</h2>
                <div className="tour-detail-customer-review-container">
                    <div className="review-grid">
                        <div className="review-item overall-rating">
                            <div className="review-text">
                                <span className="review-label">Overall Rating</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Location</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Amenities</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Food</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Price</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Rooms</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Tour Operator</span>
                                <span className="review-desc">Excellent</span>
                            </div>
                            <span className="review-score">5.0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tour-detail-reviews-list">
                {reviewsList.slice(0, visibleCount).map((review) => (
                    <ReviewNode
                        key={review.id}
                        review={review}
                        depth={0}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        handleInlineReplySubmit={handleInlineReplySubmit}
                    />
                ))}
            </div>

            {reviewsList.length > 3 && (
                <Button
                    className="tour-detail-review-button"
                    type="primary"
                    onClick={() => {
                        if (visibleCount < reviewsList.length) {
                            setVisibleCount(prev => prev + 3);
                        } else {
                            setVisibleCount(3);
                        }
                    }}
                >
                    {visibleCount < reviewsList.length ? 'See More Reviews' : 'See Less Reviews'}
                </Button>
            )}

            <div className="tour-detail-review-reply">
                <h2>Leave a Reply</h2>
                <p className="tour-detail-review-reply-desc">
                    Your email address will not be published. Required fields are marked *
                </p>

                <div className="tour-detail-review-ratings">
                    <div className="rating-item">
                        <span className="rating-label">Location</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.Location} onChange={(val) => handleRatingChange('Location', val)} />
                    </div>
                    <div className="rating-item">
                        <span className="rating-label">Amenities</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.Amenities} onChange={(val) => handleRatingChange('Amenities', val)} />
                    </div>
                    <div className="rating-item">
                        <span className="rating-label">Food</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.Food} onChange={(val) => handleRatingChange('Food', val)} />
                    </div>
                    <div className="rating-item">
                        <span className="rating-label">Room</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.Room} onChange={(val) => handleRatingChange('Room', val)} />
                    </div>
                    <div className="rating-item">
                        <span className="rating-label">Price</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.Price} onChange={(val) => handleRatingChange('Price', val)} />
                    </div>
                    <div className="rating-item">
                        <span className="rating-label">Tour Operator</span>
                        <Rate className="custom-rate" value={reviewForm.ratings.TourOperator} onChange={(val) => handleRatingChange('TourOperator', val)} />
                    </div>
                </div>

                <div className="tour-detail-reply-form">
                    <div className="reply-form-row">
                        <Input placeholder="Name *" className="reply-input" value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} />
                        <Input placeholder="Email *" className="reply-input" value={reviewForm.email} onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })} />
                    </div>
                    <Input placeholder="Title" className="reply-input-full" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} />

                    <Upload
                        multiple
                        listType="picture"
                        accept=".png,.jpg,.jpeg"
                        beforeUpload={(file) => {
                            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                            if (!isJpgOrPng) {
                                message.error('You can only upload JPG/PNG file!');
                            }
                            return false; // Always return false to stop auto-uploading
                        }}
                        maxCount={4}
                        fileList={reviewForm.images}
                        onChange={({ fileList }) => {
                            // Filter out any non JPG/PNG files that might have slipped through
                            const validFiles = fileList.filter(file => {
                                // If the file object doesn't have a type (e.g. some edge cases or already uploaded files), just check extension or allow
                                if (file.type) {
                                    return file.type === 'image/jpeg' || file.type === 'image/png';
                                }
                                return true;
                            });

                            if (validFiles.length > 4) {
                                message.warning("You can only upload a maximum of 4 images.");
                                setReviewForm({ ...reviewForm, images: validFiles.slice(0, 4) });
                            } else {
                                setReviewForm({ ...reviewForm, images: validFiles });
                            }
                        }}
                    >
                        {reviewForm.images.length < 4 && (
                            <Button icon={<UploadOutlined />}>Upload Images (Max 4)</Button>
                        )}
                    </Upload>

                    <Input.TextArea placeholder="Comment *" rows={4} className="reply-textarea" value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} />
                    <Button type="primary" className="reply-submit-btn" loading={isSubmitting} onClick={handleFormSubmit}>
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerReviewsSection;
