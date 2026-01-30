import React from 'react';
import TextRotator from '../common/TextRotator';
import { ArrowRightIcon } from '../common/Icons';
import DigitalPyramid from '../features/DigitalPyramid';

const HeroSection = ({ scrollToContact }: { scrollToContact: (e: React.MouseEvent) => void }) => {
    return (
        <section className="hero">
            <DigitalPyramid />
            <div className="container hero-content">
                <div className="hero-badge"><div className="hero-badge-dot"></div>AI AUTOMATION AGENCY 2.0</div>
                <h1>Skaluj Biznes Bez Chaosu <br />dzięki <TextRotator words={["Automatyzacji AI", "Wirtualnym Agentom", "Inteligentnym Procesom", "Technologii No-Code"]} interval={3000} /></h1>

                <div className="hero-buttons" style={{ marginTop: '40px' }}>
                    <a href="#contact" className="btn-cta primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={scrollToContact}>
                        Umów Darmową Konsultację <ArrowRightIcon />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
