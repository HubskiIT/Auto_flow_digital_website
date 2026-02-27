import React from 'react';
import TextRotator from '../common/TextRotator';
import { ArrowRightIcon, CheckCircleIcon, StarIcon } from '../common/Icons';

const HeroSection = ({ scrollToContact }: { scrollToContact: (e: React.MouseEvent) => void }) => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-badge">
                    <div className="hero-badge-dot" />
                    Agencja Automatyzacji AI & No-Code
                </div>

                <h1>
                    Zyskaj setki godzin wolnego czasu <br />
                    <span>dzięki <TextRotator words={["Inteligentnej Automatyzacji AI", "Wirtualnym Agentom", "Procesom No-Code", "Skalowalnym Systemom"]} interval={3000} /></span>
                </h1>

                <p className="hero-description">
                    Projektujemy i wdrażamy systemy, które pracują 24/7. Skaluj swój biznes bez powiększania zespołu, eliminując powtarzalny chaos i błędy ludzkie.
                </p>

                <div className="hero-buttons">
                    <a href="#contact" className="btn-cta primary" onClick={scrollToContact}>
                        Odbierz Darmowy Audyt <ArrowRightIcon />
                    </a>
                    <a href="#audit" className="btn-cta secondary" onClick={(e) => { e.preventDefault(); document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        Sprawdź Potencjał (1 min)
                    </a>
                </div>

                <div className="hero-social-proof">
                    <div className="social-proof-stars">
                        {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                    </div>
                    <span className="social-proof-text">Ponad 50 wdrożonych automatyzacji w 2025 roku</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
