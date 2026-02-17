import "./discount.css";

function Discount() {
    return (
        <div className="discount-section">
            <div className="slider"></div>

            <div className="discount-content">
                <h1>
                    Grab up to{" "}
                    <span className="highlight">35% off</span>
                    <br />
                    on your favorite
                    <br />
                    Destination
                </h1>

                <p>Limited time offer, don't miss the opportunity</p>
                <button className="discount-btn">Book Now</button>
            </div>
        </div>
    );
}

export default Discount;
