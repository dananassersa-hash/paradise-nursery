import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
    const [showProducts, setShowProducts] = useState(false);

    const handleGetStarted = () => {
        setShowProducts(true);
    };

    return (
        <div>
            {!showProducts ? (
                <div className="landing-page">
                    <div className="landing-content">
                        <h1>Paradise Nursery</h1>

                        <p>Where Green Meets Serenity</p>

                        <AboutUs />

                        <button
                            className="get-started-button"
                            onClick={handleGetStarted}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            ) : (
                <div className="product-page">
                    <h1>Paradise Nursery Plants</h1>
                </div>
            )}
        </div>
    );
}

export default App;
