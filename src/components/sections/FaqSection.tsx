import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { FAQSchema } from '../seo/FAQSchema';

const FaqSection = () => {
    const faqs = [
        {
            question: "Czy automatyzacja zwolni moich pracowników?",
            answer: "Nie. Automatyzacja zabiera im 'robotę robota' – nudne, powtarzalne czynności. Dzięki temu odzyskują czas na kreatywność, sprzedaż i budowanie relacji z klientami. Twoi ludzie będą szczęśliwsi, a firma wydajniejsza."
        },
        {
            question: "Czy to jest bezpieczne dla moich danych?",
            answer: "Tak. Bezpieczeństwo to nasz priorytet. Korzystamy ze standardów enterprise (szyfrowanie, RODO/GDPR compliance). Dane są przetwarzane tylko tam, gdzie to konieczne, i zabezpieczone umowami poufności."
        },
        {
            question: "Ile trwa wdrożenie?",
            answer: "Proste automatyzacje (Quick Wins) wdrażamy w 7-14 dni. Kompleksowe systemy transformacyjne zajmują od 4 do 8 tygodni, w zależności od skomplikowania procesów."
        },
        {
            question: "Czy muszę mieć wiedzę techniczną?",
            answer: "Absolutnie nie. To my jesteśmy od technologii. Dostajesz od nas gotowy, działający system oraz proste instrukcje obsługi (dashboardy). My zajmujemy się tym, co 'pod maską'."
        }
    ];

    return (
        <section id="faq" className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <ScrollReveal>
                    <span className="section-title">Q&A</span>
                    <h2 className="section-headline">Częste Pytania</h2>
                    <FAQSchema faqs={faqs} />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default FaqSection;

