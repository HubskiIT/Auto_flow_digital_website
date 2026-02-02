import React from 'react';
import TextRotator from '../common/TextRotator';
import { ArrowRightIcon } from '../common/Icons';


const HeroSection = ({ scrollToContact }: { scrollToContact: (e: React.MouseEvent) => void }) => {
    return (
        <section className="hero">

            <div className="container hero-content">
                <div className="hero-badge"><div className="hero-badge-dot"></div>AGENCJA AUTOMATYZACJI 2.0</div>
                <h1><span style={{ display: 'block', fontSize: '0.6em', color: 'var(--accent-cyan)', marginBottom: '10px' }}>AutoFlow Digital</span>
                    Skaluj Biznes Bez Chaosu <br />dzięki <TextRotator words={["Automatyzacji AI", "Wirtualnym Agentom", "Inteligentnym Procesom", "Technologii No-Code"]} interval={3000} /></h1>

                <div className="hero-buttons" style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="#contact" className="btn-cta primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={scrollToContact}>
                        Umów Darmową Konsultację <ArrowRightIcon />
                    </a>
                    <a href="#audit" className="btn-cta secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={(e) => { e.preventDefault(); document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        Sprawdź Potencjał (1 min)
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
