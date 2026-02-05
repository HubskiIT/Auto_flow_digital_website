import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const ProblemSection = () => {
    return (
        <section id="problem" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Wyzwania Codzienności</span>
                    <h2 className="section-headline">Kiedy Biznes Staje się <span style={{ color: '#ef4444' }}>Ciężarem</span></h2>
                </ScrollReveal>
                <div className="grid-3">
                    <ScrollReveal delay={100}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>01. Nadmiar Obowiązków</h3>
                            <p>Zamiast rozwijać firmę i wizję, wciąż gasisz pożary, toniesz w tabelkach i powtarzalnych zadaniach administracyjnych.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>02. Brak Czasu dla Siebie</h3>
                            <p>Czujesz, że każda decyzja i proces musi przejść przez Ciebie. Marzyłeś o wolności, a stałeś się zakładnikiem własnego sukcesu.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="card">
                            <h3 style={{ color: '#ef4444' }}>03. Niewykorzystany Potencjał</h3>
                            <p>Twoja firma może działać lepiej, szybciej i bez Twego ciągłego nadzoru. Obecny chaos blokuje Twój prawdziwy wzrost.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
