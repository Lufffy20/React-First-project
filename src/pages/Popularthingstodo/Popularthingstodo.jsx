import React, { useState } from "react";
import "./Popularthingstodo.css";


const Popularthingstodo = () => {
    return (
        <div className="popular-section">
            <div className="popular-header">
                <h2>Popular things to do</h2>
                <span>See all</span>
            </div>

            <div className="popular-content">
                <div className="card-cruises" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80)" }}><h3>Cruises</h3></div>
                <div className="card-beachtours" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)" }}><h3>Beach Tours</h3></div>
                <div className="card-citytours" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80)" }}><h3>City Tours</h3></div>
                <div className="card-museumtour" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80)" }}><h3>Museum Tour</h3></div>
                <div className="card-food" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80)" }}><h3>Food</h3></div>
                <div className="card-hiking" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80)" }}><h3>Hiking</h3></div>
            </div>
        </div >
    );
};

export default Popularthingstodo;