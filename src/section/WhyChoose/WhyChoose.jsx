import { FaTicketAlt, FaGlobe, FaGem, FaHeadset } from "react-icons/fa";
import "./WhyChoose.css";

const features = [
    {
        icon: <FaTicketAlt />,
        title: "Ultimate flexibility",
        desc: "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
    },
    {
        icon: <FaGlobe />,
        title: "Memorable experiences",
        desc: "Browse and book tours and activities so incredible, you'll want to tell your friends.",
    },
    {
        icon: <FaGem />,
        title: "Quality at our core",
        desc: "High-quality standards. Millions of reviews. A Toursz company.",
    },
    {
        icon: <FaHeadset />,
        title: "Award-winning support",
        desc: "New price? New plan? No problem. We're here to help, 24/7.",
    },
];

function WhyChoose() {
    return (
        <div className="why-section">
            <h2>Why choose Tourz</h2>

            <div className="why-grid">
                {features.map((item, index) => (
                    <div className="why-card" key={index}>
                        <div className="icon">{item.icon}</div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhyChoose;
