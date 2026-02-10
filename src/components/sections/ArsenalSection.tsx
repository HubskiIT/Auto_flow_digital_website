import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
    ArrowRightIcon,
    BrainIcon,
    MessageSquareIcon,
    FileTextIcon,
    CalendarIcon,
    ShareIcon,
    ChartIcon
} from '../common/Icons';

const ArsenalSection = () => {
    return (
        <section id="arsenal" className="section" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.01), transparent)' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Nasz Arsenał</span>
                    <h2 className="section-headline">Co Możemy Zautomatyzować?</h2>
                    <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 20px', color: 'var(--text-secondary)' }}>Szybko i skutecznie wdrażamy rozwiązania, które odmienią Twoją firmę.</p>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}><span className="examples-badge">⚠️ TO TYLKO PRZYKŁADY MOŻLIWOŚCI</span></div>
                </ScrollReveal>
                <div className="comparison-list">
                    {[
                        { icon: <BrainIcon />, old: "Handlowiec dzwoni do zimnych leadów", new: "AI kwalifikuje i umawia spotkania (24/7)", time: "Oszczędność: 15h/tydz" },
                        { icon: <MessageSquareIcon />, old: "Klient czeka 2 dni na odpowiedź mailową", new: "Bot odpowiada i rozwiązuje problem w 45 sekund", time: "Oszczędność: 20h/tydz" },
                        { icon: <FileTextIcon />, old: "Ręczne przepisywanie faktur do Excela", new: "System sam sczytuje, księguje i płaci", time: "Oszczędność: 5h/tydz" },
                        { icon: <CalendarIcon />, old: "Wydzwanianie, by potwierdzić wizytę", new: "Automat SMS wysyła przypomnienia i linki", time: "Oszczędność: 3h/tydz" },
                        { icon: <ShareIcon />, old: "Mozolne planowanie postów w kalendarzu", new: "AI tworzy i publikuje content za Ciebie", time: "Oszczędność: 7h/tydz" },
                        { icon: <ChartIcon />, old: "Zbieranie danych z 5 systemów do raportu", new: "Dashboard aktualizuje się w czasie rzeczywistym", time: "Oszczędność: 4h/tydz" }
                    ].map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 100}>
                            <div className="comparison-item">
                                <div className="comparison-icon">{item.icon}</div>
                                <div className="comparison-content">
                                    <span className="old-way">{item.old}</span>
                                    <span className="comparison-arrow"><ArrowRightIcon /></span>
                                    <span className="new-way">{item.new}</span>
                                </div>
                                <span className="time-saved-badge">{item.time}</span>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArsenalSection;
