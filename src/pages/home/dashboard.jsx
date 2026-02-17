import Header from "../../components/home/Header";
import "./dashboard.css";
import sectionImage from "../../assets/img/section.jpg";
import WhyChoose from "../../components/whychoose/WhyChoose";
import TrendingDestinations from "../../components/home/TrendingDestinations";
import FindPopularTours from "../../components/findpopulartours/FindPopularTours";

function App() {
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
        </div>
    );
}

export default App;
