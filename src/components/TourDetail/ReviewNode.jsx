import React, { useState } from 'react';
import { Button, Input } from 'antd';

const ReviewNode = ({ review, depth = 0, replyingTo, setReplyingTo, replyText, setReplyText, handleInlineReplySubmit }) => {
    const [visibleReplies, setVisibleReplies] = useState(3);
    const marginLeft = depth === 1 ? '40px' : '0px';
    const borderLeft = depth === 1 ? '2px solid #eaeaea' : 'none';
    const paddingLeft = depth === 1 ? '20px' : '0px';

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
                        {review.images.map((img, index) => (
                            <img key={index} src={img} alt={`review-img-${index}`} />
                        ))}
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
        </div>
    );
};

export default ReviewNode;
