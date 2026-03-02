import React, { useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourHeader = ({ tour, displayImages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <Row gutter={[10, 10]}>
                        {displayImages?.[0] && (
                            <Col xs={24} md={16}>
                                <div className="tour-detail-image" style={{ aspectRatio: '800 / 510' }}>
                                    <img src={displayImages[0].image} alt="tour-detail-image" />
                                </div>
                            </Col>
                        )}
                        <Col xs={24} md={8}>
                            <Row gutter={[10, 10]}>
                                {displayImages?.[1] && (
                                    <Col span={24}>
                                        <div className="tour-detail-image" style={{ aspectRatio: '400 / 250' }}>
                                            <img src={displayImages[1].image} alt="tour-detail-image" />
                                        </div>
                                    </Col>
                                )}
                                {displayImages?.[2] && (
                                    <Col span={12}>
                                        <div className="tour-detail-image" style={{ aspectRatio: '200 / 250' }}>
                                            <img src={displayImages[2].image} alt="tour-detail-image" />
                                        </div>
                                    </Col>
                                )}
                                {displayImages?.[3] && (
                                    <Col span={12}>
                                        <div className="tour-detail-image" style={{ aspectRatio: '200 / 250' }}>
                                            <img src={displayImages[3].image} alt="tour-detail-image" />
                                            <div
                                                className="see-all-photos-btn"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                See all photos
                                            </div>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <Modal
                title="All Photos"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
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
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {displayImages?.map((imgObj, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={imgObj.image}
                                    alt={`tour-image-${index}`}
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
        </>
    );
};

export default TourHeader;
