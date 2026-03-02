import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewNode = ({ review, depth = 0, replyingTo, setReplyingTo, replyText, setReplyText, handleInlineReplySubmit }) => {
    const [visibleReplies, setVisibleReplies] = useState(3);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    const marginLeft = depth === 1 ? '40px' : '0px';
    const borderLeft = depth === 1 ? '2px solid #eaeaea' : 'none';
    const paddingLeft = depth === 1 ? '20px' : '0px';

    const openImageModal = (index) => {
        setInitialSlide(index);
        setIsImageModalOpen(true);
    };

    return (
        <div className="tour-detail-single-review" style={{ marginLeft, borderLeft, paddingLeft }}>
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
            <div className="tour-detail-review-body">
                {review.title && <p className="tour-detail-review-title">{review.title}</p>}
                <p className="tour-detail-review-desc">{review.desc}</p>

                {review.images && review.images.length > 0 && (
                    <div className="tour-detail-review-images">
                        {review.images.slice(0, 2).map((img, index) => {
                            const isLastVisible = index === 1;
                            const remainingCount = review.images.length - 2;
                            return (
                                <div
                                    key={index}
                                    style={{ position: 'relative', cursor: 'pointer', width: '130px', height: '130px' }}
                                    onClick={() => openImageModal(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`review-img-${index}`}
                                        style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover' }}
                                    />
                                    {isLastVisible && remainingCount > 0 && (
                                        <div style={{
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
                                        }}>
                                            +{remainingCount}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="tour-detail-review-helpful">
                    {depth === 0 && (
                        <>
                            <span className="helpful-btn">Helpful</span>
                            <span className="not-helpful-btn">Not helpful</span>
                        </>
                    )}
                    <span
                        className="reply-btn"
                        onClick={() => {
                            setReplyingTo(replyingTo === review.id ? null : review.id);
                            setReplyText('');
                        }}
                    >
                        Reply
                    </span>
                </div>

                {replyingTo === review.id && (
                    <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Input.TextArea
                            rows={2}
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                        />
                        <Button type="primary" style={{ alignSelf: 'flex-start' }} onClick={() => handleInlineReplySubmit(review.id)}>
                            Submit Reply
                        </Button>
                    </div>
                )}
            </div>
            <hr className="tour-detail-review-divider" />

            {review.replies && review.replies.length > 0 && (
                <div className="tour-detail-replies-container">
                    {review.replies.slice(0, visibleReplies).map(reply => (
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
                            {visibleReplies < review.replies.length ? 'View more replies' : 'View less replies'}
                        </div>
                    )}
                </div>
            )}

            <Modal
                title="Review Photos"
                centered
                open={isImageModalOpen}
                onOk={() => setIsImageModalOpen(false)}
                onCancel={() => setIsImageModalOpen(false)}
                footer={null}
                destroyOnClose
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
