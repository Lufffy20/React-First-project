/**
 * Dashboard / Home Page
 *
 * Purpose:
 * This is the main landing page of the tour application where users
 * can explore destinations, trending tours, and promotional sections.
 *
 * Features:
 * - Hero section with search UI
 * - Fetch tours data using useTours hook
 * - Multiple dynamic sections like:
 *      • WhyChoose
 *      • Trending Destinations
 *      • Popular Tours
 *      • Discounts
 *      • Customer Reviews
 *      • Articles
 *
 * Layout Flow:
 * Header
 *   ↓
 * Hero Section (Search Area)
 *   ↓
 * Why Choose Us
 *   ↓
 * Trending Destinations
 *   ↓
 * Popular Tours
 *   ↓
 * Discounts & Offers
 *   ↓
 * Activities / Top Trending
 *   ↓
 * Customer Reviews
 *   ↓
 * Articles
 *   ↓
 * Footer
 */

import Header from "../../components/home/Header";
import Discount from "../../section/Others/Discount";
import "./dashboard.css";
import sectionImage from "../../assets/img/section.jpg";
import WhyChoose from "../../section/WhyChoose/WhyChoose";
import TrendingDestinations from "../../section/TrendingDestinations/TrendingDestinations";
import FindPopularTours from "../../section/FindPopularTours/FindPopularTours";
import Popularthingstodo from "../../section/PopularThingsToDo/PopularThingsToDo";
import TopTrending from "../../section/TopTrending/TopTrending";
import CustomerReviews from "../../section/CustomerReviews/CustomerReviews";
import CustomerDiscount from "../../section/Others/CustomerDiscount";
import Artical from "../../section/Articles/Article";
import { useTours } from "../../hooks/useTours";
import Footer from "../../components/home/Footer";

function App() {
    // Trigger initial tours fetch
    useTours();

    return (
        <div className="main-container">
            <Header />

            {/* Hero Section */}
            <div
                className="hero-section"
                style={{ backgroundImage: `url(${sectionImage})` }}
            >
                <div className="hero-content">
                    <h1>Explore The World</h1>
                    <p className="hero-text">Find the best destinations and activities</p>

                    {/* Search Box */}
                    <div className="section-search-box">
                        <div className="section-search-item">
                            <span className="section-icon">📍</span>
                            <div>
                                <p className="section-label">Where</p>
                                <p className="section-value">Search destinations</p>
                            </div>
                        </div>

                        <div className="section-search-item">
                            <span className="section-icon">📅</span>
                            <div>
                                <p className="section-label">When</p>
                                <p className="section-value">February 05 ~ March 14</p>
                            </div>
                        </div>

                        <div className="section-search-item">
                            <span className="section-icon">🧳</span>
                            <div>
                                <p className="section-label">Tour Type</p>
                                <p className="section-value">All tour</p>
                            </div>
                        </div>

                        <button className="section-search-btn">
                            🔍 Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Choose Section */}
            <WhyChoose />

            {/* Trending Destinations Section */}
            <TrendingDestinations />

            {/* Find Popular Tours Section */}
            <FindPopularTours />

            {/* Discount Section */}
            <Discount />

            {/* Popular things to do */}
            <Popularthingstodo />

            {/* Top Trending Tours */}
            <TopTrending />

            {/* Customer Reviews */}
            <CustomerReviews />

            {/* Customer Discount */}
            <CustomerDiscount />

            {/* Artical */}
            <Artical />

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;