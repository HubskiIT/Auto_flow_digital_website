import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { MessageSquareIcon, StarIcon, BoltIcon } from '../common/Icons';

const SolutionsSection = () => {
    return (
        <section id="solutions" className="section">
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">3 Filary Automatyzacji</span>
                    <h2 className="section-headline">Twoja firma zarabia, <span style={{ color: 'var(--accent-blue)' }}>nawet gdy śpisz</span></h2>
                </ScrollReveal>

                <div className="grid-3">
                    {/* Card 1 - AI Chatbot with Demo */}
                    <ScrollReveal delay={0}>
                        <div className="card" style={{ height: '100%', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '24px' }}>
                                    <MessageSquareIcon />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>1. Automatyczna Sprzedaż <br /><span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Obsługa klienta 24/7</span></h3>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Problem</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>Klienci piszą wieczorem, w weekendy, święta. Ty śpisz. Oni idą do konkurencji.</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Korzyść</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>System odpowiada natychmiast, kwalifikuje klienta i umawia spotkanie. Budzisz się z pełnym kalendarzem.</p>
                                </div>
                            </div>

                            <div style={{ padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px' }}>Rezultat</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>+35% leadów <span style={{ fontWeight: '400', fontSize: '0.9rem', color: '#16a34a' }}>(zerowym kosztem czasu)</span></div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Card 2 */}
                    <ScrollReveal delay={200}>
                        <div className="card" style={{ height: '100%', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '24px' }}>
                                    <StarIcon />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>2. Inteligentna Selekcja <br /><span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Tylko gorące okazje</span></h3>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Problem</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>Otrzymujesz 20 wiadomości. 15 to "ciekawscy". 5 to klienci. Tracisz czas na złe leady.</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Korzyść</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>AI analizuje każdą wiadomość, ocenia potencjał i przekazuje handlowcom tylko te warte uwagi.</p>
                                </div>
                            </div>

                            <div style={{ padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px' }}>Rezultat</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>3x wyższa konwersja</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Card 3 */}
                    <ScrollReveal delay={400}>
                        <div className="card" style={{ height: '100%', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '24px' }}>
                                    <BoltIcon />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>3. Operacje Bezobsługowe <br /><span style={{ fontSize: '1rem', fontWeight: '400', color: '#94a3b8' }}>Firma na autopilocie</span></h3>

                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Problem</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>Faktury, przypomnienia, follow-upy – 15h/tydzień na admin. Zespół zmęczony.</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Korzyść</div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>AI wysyła faktury, przypomina o płatnościach, follow-up z klientami. Zespół ma czas na rzeczy ważne.</p>
                                </div>
                            </div>

                            <div style={{ padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px' }}>Rezultat</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>+20h/tydzień <span style={{ fontWeight: '400', fontSize: '0.9rem', color: '#16a34a' }}>na rozwój biznesu</span></div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
