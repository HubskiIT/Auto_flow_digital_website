import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { CheckCircleIcon } from '../common/Icons';

const ProcessSection = () => {
    return (
        <section id="process" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="section-title">Mapa Drogowa</span>
                        <h2 className="section-headline">Twoja Podróż do Pełnej Automatyzacji</h2>
                        <p className="section-subtitle" style={{ maxWidth: '700px', margin: '20px auto' }}>
                            Uproszczony proces wdrażania systemów AI, który gwarantuje ROI od pierwszego miesiąca.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="process-board">
                    <div className="process-horizontal-container">
                        {[
                            { title: "Discovery", desc: "Audyt i analiza wąskich gardeł w firmie.", outcome: "+20h czasu tygodniowo" },
                            { title: "Design", desc: "Projekt dedykowanego ekosystemu AI.", outcome: "Plan ROI w 12 m-cy" },
                            { title: "Budowa", desc: "Szybkie wdrożenie prototypu w 7-14 dni.", outcome: "Działający system" },
                            { title: "Nauka AI", desc: "Tweaking modeli pod Twój ton i markę.", outcome: "99% trafność treści" },
                            { title: "Integracja", desc: "Połączenie z Twoimi narzędziami (CRM, Slack).", outcome: "Zero 'ręcznej' pracy" },
                            { title: "Skalowanie", desc: "Ciągła optymalizacja i wsparcie techniczne.", outcome: "Wykładniczy wzrost" }
                        ].map((step, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <div className="process-step-card">
                                    <div className="step-number">{idx + 1}</div>
                                    <div className="step-content">
                                        <h4>{step.title}</h4>
                                        <p className="step-desc">{step.desc}</p>
                                        <div className="step-result">
                                            <CheckCircleIcon />
                                            <span>{step.outcome}</span>
                                        </div>
                                    </div>
                                    {idx < 5 && <div className="step-connector"></div>}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;

