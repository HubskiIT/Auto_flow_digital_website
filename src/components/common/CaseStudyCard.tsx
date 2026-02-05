import React from 'react';
import {
    CheckCircleIcon,
    TrendingUpIcon,
    ShoppingBagIcon,
    DumbbellIcon,
    HammerIcon,
    SmileIcon,
    HomeIcon,
    MegaphoneIcon
} from './Icons';

interface CaseStudyCardProps {
    industry: string;
    title: string;
    description: string;
    screenshot: string;
    automations: string[];
    results: string[];
    iconName: 'ShoppingBag' | 'Dumbbell' | 'Hammer' | 'Smile' | 'Home' | 'Megaphone';
    bgColor?: string;
}

// Icon mapping
const iconMap = {
    ShoppingBag: ShoppingBagIcon,
    Dumbbell: DumbbellIcon,
    Hammer: HammerIcon,
    Smile: SmileIcon,
    Home: HomeIcon,
    Megaphone: MegaphoneIcon
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
    industry,
    title,
    description,
    screenshot,
    automations,
    results,
    iconName,
    bgColor = 'rgba(6, 182, 212, 0.1)'
}) => {
    const IconComponent = iconMap[iconName];

    return (
        <div className="case-study-card">
            {/* Industry Badge */}
            <div className="case-study-badge" style={{ background: bgColor }}>
                <div className="case-study-badge-icon"><IconComponent /></div>
                <span>{industry}</span>
            </div>

            {/* Screenshot/Mockup */}
            <div className="case-study-screenshot">
                <img src={screenshot} alt={title} loading="lazy" />
            </div>

            {/* Content */}
            <div className="case-study-content">
                <h3 className="case-study-title">{title}</h3>
                <p className="case-study-description">{description}</p>

                {/* Automations List */}
                <div className="case-study-section">
                    <h4 className="case-study-section-title">
                        <CheckCircleIcon /> Wdrożone Automatyzacje
                    </h4>
                    <ul className="automation-list">
                        {automations.map((automation, index) => (
                            <li key={index}>{automation}</li>
                        ))}
                    </ul>
                </div>

                {/* Results */}
                <div className="case-study-section">
                    <h4 className="case-study-section-title">
                        <TrendingUpIcon /> Wyniki Biznesowe
                    </h4>
                    <div className="results-badges">
                        {results.map((result, index) => (
                            <div key={index} className="result-badge">
                                {result}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyCard;
