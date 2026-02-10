import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import DigitalPyramid from '../features/DigitalPyramid';

const MissionSection = () => {
    return (
        <section id="mission" className="section">
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <span className="section-title">Nasza Misja</span>
                        <h2 className="section-headline">Budujemy <span style={{ color: '#06b6d4' }}>Cyfrowe Fabryki</span></h2>
                        <DigitalPyramid />
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: '40px' }}>Nie jesteśmy zwykłą agencją. Jesteśmy architektami Twojej wydajności. Wdrażamy "cyfrowych pracowników" – inteligentne boty i automatyzacje, które przejmują nudne zadania. Dzięki nam technologia przestaje być kosztem, a staje się Twoją największą przewagą.</p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default MissionSection;
