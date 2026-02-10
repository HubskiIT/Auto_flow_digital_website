import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { CheckCircleIcon } from '../common/Icons';

const ProcessSection = () => {
    return (
        <section id="process" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Mapa Drogowa</span>
                    <h2 className="section-headline">Twoja Podróż do Automatyzacji</h2>
                </ScrollReveal>
                <div className="timeline">
                    {[
                        { title: "Audyt 360 & Discovery", desc: "Zaczynamy od głębokiej analizy. Mapujemy każdy proces w firmie, znajdujemy wąskie gardła i miejsca, gdzie uciekają pieniądze.", deliverable: "Raport możliwości automatyzacji + Kalkulacja ROI" },
                        { title: "Architektura Rozwiązania", desc: "Projektujemy dedykowany system. Wybieramy narzędzia (Make, AI, CRM), które będą ze sobą rozmawiać. Żadnych przypadkowych działań.", deliverable: "Schemat techniczny i Plan Wdrożenia" },
                        { title: "Sprint Wdrożeniowy (Quick Wins)", desc: "Budujemy prototyp i wdrażamy pierwsze automatyzacje w 7-14 dni. Od razu czujesz ulgę w najtrudniejszych procesach.", deliverable: "Działający system MVP (Minimum Viable Product)" },
                        { title: "Testy & Optymalizacja", desc: "Uruchamiamy system na 'żywym organizmie', ale pod pełną kontrolą. Korygujemy błędy, uczymy AI Twojego tonu i specyfiki.", deliverable: "Bezblędnie działający proces" },
                        { title: "Szkolenie & Onboarding", desc: "Technologia jest dla ludzi. Szkolimy Twój zespół, jak korzystać z nowych narzędzi i jak współpracować z cyfrowymi asystentami.", deliverable: "Nagrania szkoleniowe i Dokumentacja" },
                        { title: "Skalowanie & Opieka", desc: "Biznes rośnie, system rośnie z nim. Monitorujemy działanie 24/7 i dodajemy nowe funkcje, gdy pojawiają się nowe potrzeby.", deliverable: "Stały support i raporty wydajności" }
                    ].map((step, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100}>
                            <div className={`timeline-row ${idx % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-branch"></div>
                                <div className="timeline-node">{idx + 1}</div>
                                <div className="timeline-content">
                                    <div className="step-header"><h4>{step.title}</h4></div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{step.desc}</p>
                                    <div className="step-deliverable"><CheckCircleIcon /><span style={{ color: '#94a3b8' }}>Efekt: <span className="step-tag">{step.deliverable}</span></span></div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
