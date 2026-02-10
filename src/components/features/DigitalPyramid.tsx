import React, { useState, useEffect } from 'react';

const BuilderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" fill="rgba(6, 182, 212, 0.2)" />
        <path d="M12 14a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" fill="rgba(6, 182, 212, 0.2)" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="12" x2="12" y2="14" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
        <path d="M15 17l2-2" />
        <path d="M9 17l-2-2" />
    </svg>
);

const DigitalPyramid = () => {
    const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
    const [builderPos, setBuilderPos] = useState({ x: 0, y: 0 });

    const blocks = [
        { id: 1, x: 20, y: 120 }, { id: 2, x: 90, y: 120 }, { id: 3, x: 160, y: 120 }, { id: 4, x: 230, y: 120 },
        { id: 5, x: 55, y: 80 }, { id: 6, x: 125, y: 80 }, { id: 7, x: 195, y: 80 },
        { id: 8, x: 90, y: 40 }, { id: 9, x: 160, y: 40 },
        { id: 10, x: 125, y: 0 }
    ];

    useEffect(() => {
        let currentBlockIndex = 0;

        const buildLoop = () => {
            if (currentBlockIndex >= blocks.length) {
                setTimeout(() => {
                    setVisibleBlocks([]);
                    currentBlockIndex = 0;
                    buildLoop();
                }, 3000);
                return;
            }

            const targetBlock = blocks[currentBlockIndex];
            setBuilderPos({ x: targetBlock.x + 10, y: targetBlock.y - 40 });

            setTimeout(() => {
                setVisibleBlocks(prev => [...prev, targetBlock.id]);
                currentBlockIndex++;
                buildLoop();
            }, 600);
        };

        buildLoop();
        return () => { };
    }, []);

    return (
        <div className="pyramid-container">
            {blocks.map((block) => (
                <div
                    key={block.id}
                    className={`pyramid-block ${visibleBlocks.includes(block.id) ? 'visible' : 'hidden'}`}
                    style={{ left: block.x, top: block.y }}
                >
                </div>
            ))}
            <div
                className="builder-cursor"
                style={{ left: builderPos.x, top: builderPos.y }}
            >
                <BuilderIcon />
            </div>
        </div>
    );
};

export default DigitalPyramid;
