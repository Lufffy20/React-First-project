import React, { useState } from "react";
import "./Header.css";
import { Button, Drawer, Select } from "antd";
import { MenuOutlined, GlobalOutlined, SearchOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useLogout } from "../../hooks/useAuth";

const Header = () => {

    const navigate = useNavigate();
    const { handleLogout } = useLogout();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items: favorites } = useSelector((state) => state.favorites);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/all-tours-details?location=${searchTerm}`);
        }
    };

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
                    <SearchOutlined className="search-icon" onClick={() => navigate(`/all-tours-details?location=${searchTerm}`)} />
                    <input
                        type="text"
                        placeholder="Search destinations or activities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                </div>


                <div className="mobile-hidden">
                    <nav className="nav-links">

                        <Select
                            defaultValue="Destinations"
                            style={{ width: 140 }}
                            variant="borderless"
                            className="nav-select"
                            size="large"
                            popupMatchSelectWidth={false}
                            styles={{ popup: { minWidth: 180 } }}
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
                            variant="borderless"
                            className="nav-select"
                            size="large"
                            popupMatchSelectWidth={false}
                            styles={{ popup: { minWidth: 150 } }}
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
                            variant="borderless"
                            className="nav-select"
                            size="large"
                            options={[
                                { value: 'USD', label: 'USD' },
                                { value: 'EUR', label: 'EUR' },
                                { value: 'GBP', label: 'GBP' },
                                { value: 'JPY', label: 'JPY' },
                            ]}
                        />

                        {/* Favorites Icon */}
                        <div className="nav-favorites" onClick={() => navigate("/favorites")} style={{ cursor: 'pointer', marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                            <Badge count={favorites.length} size="small" offset={[5, 0]}>
                                <HeartOutlined style={{ fontSize: '22px', color: '#05073C' }} />
                            </Badge>
                        </div>

                        {/* Sign Up Text Button */}
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    type="text"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign up
                                </Button>
                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={() => navigate("/login")}
                                    className="login-btn"
                                >
                                    Log in
                                </Button>
                            </>
                        ) : (
                            <>
                                <span style={{ marginRight: '15px', fontWeight: '500', color: '#101828' }}>
                                    {user?.firstName}
                                </span>
                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={handleLogout}
                                    className="login-btn"
                                    style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                                >
                                    Log out
                                </Button>
                            </>
                        )}

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
                                <SearchOutlined className="search-icon-mobile" onClick={() => {
                                    navigate(`/all-tours-details?location=${searchTerm}`);
                                    onClose();
                                }} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            navigate(`/all-tours-details?location=${searchTerm}`);
                                            onClose();
                                        }
                                    }}
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
                                style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center' }}
                                onClick={() => {
                                    navigate("/favorites");
                                    onClose();
                                }}
                            >
                                <HeartOutlined style={{ marginRight: '8px' }} />
                                Favorites ({favorites.length})
                            </Button>

                            {!isAuthenticated ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <div style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '500', color: '#101828' }}>
                                        {user?.firstName}
                                    </div>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        onClick={() => {
                                            handleLogout();
                                            onClose();
                                        }}
                                        className="login-btn"
                                        style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                                    >
                                        Log out
                                    </Button>
                                </>
                            )}
                        </div>
                    </Drawer>
                </div>

            </div>
        </header>
    );
};

export default Header;