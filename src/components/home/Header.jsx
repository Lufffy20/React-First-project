import React, { useState } from "react";
import "./Header.css";
import { Button, Drawer, Select } from "antd";
import { MenuOutlined, GlobalOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <header className="main-header">
            <div className="header-container">

                <div className="logo" onClick={() => navigate("/")}>
                    <h2>TravelSite</h2>
                </div>

                <div className="search-box">
                    <SearchOutlined className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search destinations or activities"
                    />
                </div>


                <div className="mobile-hidden">
                    <nav className="nav-links">

                        <Select
                            defaultValue="Destinations"
                            style={{ width: 140 }}
                            bordered={false}
                            className="nav-select"
                            size="large"
                            dropdownStyle={{ minWidth: 180 }}
                            options={[
                                { value: 'destinations', label: 'Destinations' },
                                { value: 'usa', label: 'USA' },
                                { value: 'france', label: 'France' },
                                { value: 'japan', label: 'Japan' },
                            ]}
                        />

                        <Select
                            defaultValue="Activities"
                            style={{ width: 120 }}
                            bordered={false}
                            className="nav-select"
                            size="large"
                            dropdownStyle={{ minWidth: 150 }}
                            options={[
                                { value: 'activities', label: 'Activities' },
                                { value: 'hiking', label: 'Hiking' },
                                { value: 'tours', label: 'City Tours' },
                                { value: 'food', label: 'Food & Drink' },
                            ]}
                        />

                        <Select
                            defaultValue="USD"
                            style={{ width: 80 }}
                            bordered={false}
                            className="nav-select"
                            size="large"
                            options={[
                                { value: 'USD', label: 'USD' },
                                { value: 'EUR', label: 'EUR' },
                                { value: 'GBP', label: 'GBP' },
                                { value: 'JPY', label: 'JPY' },
                            ]}
                        />

                        {/* Sign Up Text Button */}
                        <Button
                            type="text"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </Button>

                        {/* Login Rectangle Button */}
                        <Button
                            type="primary"
                            shape="round"
                            onClick={() => navigate("/login")}
                            className="login-btn"
                        >
                            Log in
                        </Button>

                    </nav>
                </div>

                <div className="mobile-visible">
                    <Button type="primary" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="right"
                        onClose={onClose}
                        open={visible}
                        className="mobile-drawer"
                    >
                        <div className="mobile-nav-links">
                            <div className="search-box-mobile">
                                <SearchOutlined className="search-icon-mobile" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                />
                            </div>
                            <Select
                                defaultValue="Destinations"
                                style={{ width: '100%' }}
                                size="large"
                                className="mobile-select"
                                options={[
                                    { value: 'destinations', label: 'Destinations' },
                                    { value: 'usa', label: 'USA' },
                                    { value: 'france', label: 'France' },
                                    { value: 'japan', label: 'Japan' },
                                ]}
                            />
                            <Select
                                defaultValue="Activities"
                                style={{ width: '100%' }}
                                size="large"
                                className="mobile-select"
                                options={[
                                    { value: 'activities', label: 'Activities' },
                                    { value: 'hiking', label: 'Hiking' },
                                    { value: 'tours', label: 'City Tours' },
                                    { value: 'food', label: 'Food & Drink' },
                                ]}
                            />
                            <Select
                                defaultValue="USD"
                                style={{ width: '100%' }}
                                size="large"
                                className="mobile-select"
                                options={[
                                    { value: 'USD', label: 'USD' },
                                    { value: 'EUR', label: 'EUR' },
                                    { value: 'GBP', label: 'GBP' },
                                    { value: 'JPY', label: 'JPY' },
                                ]}
                            />
                            <Button
                                type="text"
                                onClick={() => {
                                    navigate("/signup");
                                    onClose();
                                }}
                            >
                                Sign up
                            </Button>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={() => {
                                    navigate("/login");
                                    onClose();
                                }}
                                className="login-btn"
                            >
                                Log in
                            </Button>
                        </div>
                    </Drawer>
                </div>

            </div>
        </header>
    );
};

export default Header;
