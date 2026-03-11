/**
 * ReviewNode Component
 *
 * Purpose:
 * Renders a single review item along with its nested replies.
 * This component is recursive, meaning it can render replies that
 * themselves contain further replies, creating a threaded discussion.
 *
 * Features:
 * - Displays reviewer information (name, initials, date)
 * - Shows review title and description
 * - Supports review images with preview modal
 * - Allows users to mark reviews as helpful or not helpful
 * - Allows inline replies to reviews
 * - Displays replies in a nested threaded structure
 * - Supports expandable replies (View more / View less)
 * - Image gallery using Swiper inside an Ant Design Modal
 *
 * Notes:
 * - depth controls indentation and styling of nested replies
 * - replyingTo controls which review is currently being replied to
 * - replyText manages the reply input content
 * - handleInlineReplySubmit handles posting the reply
 */

import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewNode = ({
    review,
    depth = 0,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    handleInlineReplySubmit
}) => {

    /**
     * Number of visible replies for pagination
     */
    const [visibleReplies, setVisibleReplies] = useState(3);

    /**
     * Image modal state
     */
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    /**
     * Dynamic indentation for nested replies
     */
    const marginLeft = depth > 0 ? '20px' : '0px';
    const borderLeft = depth > 0 ? '2px solid #efefef' : 'none';
    const paddingLeft = depth > 0 ? '15px' : '0px';
    const marginTop = depth > 0 ? '10px' : '0px';

    /**
     * Open modal image gallery
     */
    const openImageModal = (index) => {
        setInitialSlide(index);
        setIsImageModalOpen(true);
    };

    return (

        <div
            className="tour-detail-single-review"
            style={{ marginLeft, borderLeft, paddingLeft, marginTop }}
        >

            {/* =========================
               Review Header
            ========================= */}

            <div className="tour-detail-review-header">

                <div className="tour-detail-review-author">

                    <div className="tour-detail-review-avatar">
                        {review.initials}
                    </div>

                    <span className="tour-detail-review-name">
                        {review.name}
                    </span>

                </div>

                <span className="tour-detail-review-date">
                    {review.date}
                </span>

            </div>

            {/* =========================
               Review Body
            ========================= */}

            <div className="tour-detail-review-body">

                {review.title && (
                    <p className="tour-detail-review-title">
                        {review.title}
                    </p>
                )}

                <p className="tour-detail-review-desc">
                    {review.desc}
                </p>

                {/* =========================
                   Review Images
                ========================= */}

                {review.images && review.images.length > 0 && (

                    <div className="tour-detail-review-images">

                        {review.images.slice(0, 2).map((img, index) => {

                            const isLastVisible = index === 1;
                            const remainingCount = review.images.length - 2;

                            return (

                                <div
                                    key={index}
                                    style={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        width: '130px',
                                        height: '130px'
                                    }}
                                    onClick={() => openImageModal(index)}
                                >

                                    <img
                                        src={img}
                                        alt={`review-img-${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '12px',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    {isLastVisible && remainingCount > 0 && (

                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'white',
                                                fontSize: '20px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            +{remainingCount}
                                        </div>

                                    )}

                                </div>

                            );
                        })}

                    </div>

                )}

                {/* =========================
                   Review Actions
                ========================= */}

                <div className="tour-detail-review-helpful">

                    {depth === 0 && (
                        <>
                            <span className="helpful-btn">
                                Helpful
                            </span>

                            <span className="not-helpful-btn">
                                Not helpful
                            </span>
                        </>
                    )}

                    <span
                        className="reply-btn"
                        onClick={() => {
                            setReplyingTo(
                                replyingTo === review.id
                                    ? null
                                    : review.id
                            );
                            setReplyText('');
                        }}
                    >
                        Reply
                    </span>

                </div>

                {/* =========================
                   Reply Input
                ========================= */}

                {replyingTo === review.id && (

                    <div
                        style={{
                            marginTop: '15px',
                            marginBottom: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >

                        <Input.TextArea
                            rows={2}
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                        />

                        <Button
                            type="primary"
                            style={{ alignSelf: 'flex-start' }}
                            onClick={() =>
                                handleInlineReplySubmit(review.id)
                            }
                        >
                            Submit Reply
                        </Button>

                    </div>

                )}

            </div>

            <hr className="tour-detail-review-divider" />

            {/* =========================
               Nested Replies
            ========================= */}

            {review.replies && review.replies.length > 0 && (

                <div className="tour-detail-replies-container">

                    {review.replies
                        .slice(0, visibleReplies)
                        .map(reply => (

                            <ReviewNode
                                key={reply.id}
                                review={reply}
                                depth={depth + 1}
                                replyingTo={replyingTo}
                                setReplyingTo={setReplyingTo}
                                replyText={replyText}
                                setReplyText={setReplyText}
                                handleInlineReplySubmit={handleInlineReplySubmit}
                            />

                        ))}

                    {/* View More Replies */}

                    {review.replies.length > 3 && (

                        <div
                            style={{
                                color: '#EB662B',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                marginTop: '10px',
                                marginBottom: '15px',
                                marginLeft: depth === 0 ? '40px' : '0px',
                                paddingLeft: depth === 0 ? '20px' : '0px'
                            }}
                            onClick={() => {

                                if (visibleReplies < review.replies.length) {
                                    setVisibleReplies(prev => prev + 3);
                                } else {
                                    setVisibleReplies(3);
                                }

                            }}
                        >
                            {visibleReplies < review.replies.length
                                ? 'View more replies'
                                : 'View less replies'}
                        </div>

                    )}

                </div>

            )}

            {/* =========================
               Image Modal
            ========================= */}

            <Modal
                title="Review Photos"
                centered
                open={isImageModalOpen}
                onOk={() => setIsImageModalOpen(false)}
                onCancel={() => setIsImageModalOpen(false)}
                footer={null}
                destroyOnHidden
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >

                <div style={{ padding: '20px 0' }}>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        initialSlide={initialSlide}
                        navigation
                        pagination={{ clickable: true }}
                    >

                        {review.images?.map((img, index) => (

                            <SwiperSlide key={index}>

                                <img
                                    src={img}
                                    alt={`review-image-${index}`}
                                    style={{
                                        width: '100%',
                                        maxHeight: '70vh',
                                        objectFit: 'contain',
                                        borderRadius: '8px'
                                    }}
                                />

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </Modal>

        </div>
    );
};

export default ReviewNode;