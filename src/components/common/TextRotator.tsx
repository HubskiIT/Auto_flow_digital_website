import React, { useState, useEffect } from 'react';

// Smooth Text Rotator
const TextRotator = ({ words, interval = 3000 }: { words: string[], interval?: number }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 500);
        }, interval);

        return () => clearInterval(timer);
    }, [words, interval]);

    return (
        <span
            className="gradient-text"
            style={{
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block'
            }}
        >
            {words[index]}
        </span>
    );
};

export default TextRotator;
