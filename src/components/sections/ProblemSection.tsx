import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const ProblemSection = () => {
    return (
        <section id="problem" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Diagnoza Problemu</span>
                    <h2 className="section-headline">Czy Ręczne Procesy <span style={{ color: '#ef4444' }}>Hamują Twój Rozwój</span>?</h2>
                </ScrollReveal>
                <div className="grid-3">
                    <ScrollReveal delay={100}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>01. Chaos Komunikacyjny</h3>
                            <p>Gubisz leady, bo handlowcy nie odpisują od razu? Skrzynki mailowe pękają w szwach, a klient czeka 2 dni na wycenę?</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>02. Wypalenie Zespołu</h3>
                            <p>Twoi najlepsi ludzie marnują 40% czasu na "kopiuj-wklej", wprowadzanie faktur i raportowanie, zamiast zarabiać pieniądze.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>03. Bariera Skalowalności</h3>
                            <p>Chcesz obsłużyć 2x więcej klientów, ale to wymagałoby zatrudnienia 2x więcej osób? To model, który zabija marżę.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
