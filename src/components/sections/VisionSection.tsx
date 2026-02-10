import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { ArrowRightIcon } from '../common/Icons';

const VisionSection = () => {
    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
                <ScrollReveal delay={600}>
                    <div style={{
                        marginTop: '60px',
                        background: 'linear-gradient(90deg, rgba(6,182,212,0.1), rgba(59,130,246,0.1))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '40px',
                        textAlign: 'center'
                    }}>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'white' }}>Wyobraź sobie:</h4>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 30px' }}>
                            Poniedziałek 9:00 – <span style={{ color: '#4ade80', fontWeight: 'bold' }}>7 nowych leadów w CRM</span>, <span style={{ color: '#4ade80', fontWeight: 'bold' }}>3 spotkania umówione</span>, <span style={{ color: '#4ade80', fontWeight: 'bold' }}>2 faktury opłacone automatycznie</span>.<br />
                            Ty: pijesz kawę i planujesz wzrost.
                        </p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            WIDZISZ EFEKTY? → Pokażemy Ci to w 20 minut <ArrowRightIcon />
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default VisionSection;
