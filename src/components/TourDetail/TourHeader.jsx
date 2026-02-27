import React from 'react';
import { Button } from 'antd';

const TourHeader = ({ tour, displayImages }) => {
    return (
        <>
            <div className="tour-detail-header">
                <p className="tour-detail-header-breadcrumb">home &gt; tours &gt; {tour.location}</p>
                <p className="tour-detail-header-title">{tour.title}</p>
            </div>

            <div className="tour-detail-content-section">
                <div className="tour-detail-top-wrapper">
                    <div className="tour-detail-header1-section">
                        <div className="tour-detail-header1">
                            {tour.bestPrice && <Button type="primary">Bestseller</Button>}
                            {tour.freeCancel && <Button type="primary">Free cancellation</Button>}
                        </div>

                        <div className="tour-detail-header1-title">
                            <p>{tour.title}</p>
                            <div className="tour-detail-info">
                                <p>{tour.rating || "New"}/5</p>
                                <p>{tour.location}</p>
                                <p>{tour.reviews || 0} reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className="tour-detail-tag">
                        <a href="">Share</a>
                        <a href="">wishlist</a>
                    </div>
                </div>

                <div className="tour-detail-image-section">
                    {displayImages.slice(0, 4).map((imgObj, index) => (
                        <div key={index} className="tour-detail-image">
                            <img src={imgObj.image} alt="tour-detail-image" />
                            {index === 3 && (
                                <div className="see-all-photos-btn">
                                    See all photos
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TourHeader;
