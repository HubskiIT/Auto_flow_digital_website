import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from './Icons';
import { FaqItem } from '../../../types';

const Accordion = ({ items }: { items: FaqItem[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button className="accordion-header" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                        {item.question}
                        {activeIndex === index ? <MinusIcon /> : <PlusIcon />}
                    </button>
                    <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
