import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
    LayoutIcon,
    MessageSquareIcon,
    BoltIcon,
    GlobeIcon,
    CodeIcon,
    RocketIcon,
    ArrowRightIcon
} from '../common/Icons';

const WebsitesSection = () => {
    return (
        <section id="websites" className="section" style={{ background: '#020617' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">WEB DESIGN & DEVELOPMENT</span>
                    <h2 className="section-headline">Twoja Nowa <span style={{ color: '#6366f1' }}>Strona Internetowa</span></h2>

                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <p style={{ fontSize: '1.25rem', color: '#e2e8f0', marginBottom: '24px', lineHeight: '1.6' }}>
                            Tworzymy profesjonalne, szyte na miarę strony www, które nie tylko świetnie wyglądają, ale przede wszystkim działają.
                            Od nowoczesnego designu UI/UX, przez szybki kod, aż po optymalizację SEO.
                            Budujemy solidny fundament Twojej obecności w internecie.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
                            <span style={{ padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500' }}>Strony Firmowe</span>
                            <span style={{ padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500' }}>Landing Page</span>
                            <span style={{ padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500' }}>Sklepy E-commerce</span>
                            <span style={{ padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500' }}>Redesign</span>
                        </div>

                        <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
                            Ale w 2026 roku sama strona to za mało. Dlatego nasze realizacje zamieniamy w systemy, które sprzedają 24/7:
                        </p>
                    </div>

                    <div className="grid-3">
                        <div className="card">
                            <div style={{ color: '#6366f1', marginBottom: '20px' }}><LayoutIcon /></div>
                            <h3>Strona, która sprzedaje</h3>
                            <div className="code-window">
                                <div className="code-line"><span className="code-key">HERO:</span><span className="code-val">"Remont w 14 dni"</span></div>
                                <div className="code-line"><span className="code-key">PROBLEM:</span><span className="code-val">Dlaczego inni mają klientów?</span></div>
                                <div className="code-line"><span className="code-key">CTA:</span><span className="code-val">"Rezerwuj Termin"</span></div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ color: '#06b6d4', marginBottom: '20px' }}><MessageSquareIcon /></div>
                            <h3>AI Chatbot 24/7</h3>
                            <div className="code-window">
                                <div className="code-line"><span className="code-key">USER:</span><span className="code-val">"Ile kosztuje kuchnia?"</span></div>
                                <div className="code-line"><span className="code-key">BOT:</span><span className="code-val">"Budżet 25-45k. Kiedy start?"</span></div>
                                <div className="code-line" style={{ color: '#4ade80' }}>[Umawia spotkanie]</div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{ color: '#ec4899', marginBottom: '20px' }}><BoltIcon /></div>
                            <h3>Automatyzacja Procesów</h3>
                            <div className="code-window">
                                <div className="code-line"><span className="code-key">ON:</span><span className="code-val">Formularz wysłany</span></div>
                                <div className="code-line"><span className="code-key">THEN:</span><span className="code-val">SMS do Ciebie (5s)</span></div>
                                <div className="code-line"><span className="code-key">THEN:</span><span className="code-val">Dodaj do CRM</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="web-process-steps">
                        <div className="web-step-card">
                            <div className="web-step-header">TYDZIEŃ 1-2</div>
                            <h4><GlobeIcon /> Analiza + Struktura</h4>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Mapujemy Twój proces: lead → klient → zlecenie. Ustalamy co blokuje sprzedaż.</p>
                        </div>
                        <div className="web-step-card">
                            <div className="web-step-header">TYDZIEŃ 3-4</div>
                            <h4><CodeIcon /> Budowa + Design</h4>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Strona pod Twoją branżę (nie szablon!). Trenujemy Chatbota na Twoich cenach.</p>
                        </div>
                        <div className="web-step-card">
                            <div className="web-step-header">TYDZIEŃ 5-6</div>
                            <h4><RocketIcon /> Integracja + Launch</h4>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Łączymy: Strona ↔ Chatbot ↔ CRM. Szkolenie z obsługi. Start kampanii.</p>
                        </div>
                    </div>

                    <div className="websites-cta-box" style={{
                        marginTop: '80px',
                        padding: '40px',
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.6))',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: '24px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

                        <h3 className="websites-cta-title" style={{ fontSize: '1.8rem', color: 'white', marginBottom: '16px' }}>Twoja strona może zarabiać na siebie</h3>
                        <p className="websites-cta-desc" style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
                            Nie pozwól, by Twoja wizytówka w sieci była tylko kosztem. Zmień odwiedzających w płacących klientów dzięki nowoczesnemu designowi i automatyzacji.
                        </p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            Wyceń Projekt WWW <ArrowRightIcon />
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default WebsitesSection;
