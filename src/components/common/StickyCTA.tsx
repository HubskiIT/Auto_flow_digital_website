import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './Icons';

interface StickyCTAProps {
    onClick: () => void;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the hero (approx 800px)
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="sticky-cta-container">
            <button className="btn-cta primary sticky-cta-button" onClick={onClick}>
                Odbierz Audyt
                <ArrowRightIcon />
            </button>
        </div>
    );
};

export default StickyCTA;
