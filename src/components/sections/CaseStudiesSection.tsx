import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import {
    DumbbellIcon,
    HammerIcon,
    SmileIcon,
    ShoppingBagIcon,
    HomeIcon,
    MegaphoneIcon,
    BoltIcon,
    BrainIcon,
    ChartIcon,
    CheckCircleIcon,
    ArrowRightIcon
} from '../common/Icons';

// Case Studies Data
const CASE_STUDIES = [
    {
        id: 'training',
        title: 'Studio Treningowe',
        icon: <DumbbellIcon />,
        problem: 'Trainer wydaje 3h dziennie na administrację (SMS, umawianie, Excel), brak czasu na nowych klientów, 25% klientów "znika" bez przypomnień.',
        solutions: [
            { title: 'AI Chatbot', desc: 'WhatsApp + strona: Umawia sloty i wysyła potwierdzenia.' },
            { title: 'CRM Automation', desc: 'Przypomnienia 48h/24h przed sesją, feedback po treningu.' },
            { title: 'Strona Sprzedażowa', desc: '"Transformacja w 12 tygodni" + testimonials.' }
        ],
        results: ['12h/tydzień wolne', '+15 klientów/miesiąc', 'Retencja +30%', 'Przychód +50%']
    },
    {
        id: 'construction',
        title: 'Firma Budowlana',
        icon: <HammerIcon />,
        problem: 'Leads czekają 2-3 dni na wycenę, 40% kontaktów ginie bez follow-up, chaos w kalendarzu ekip.',
        solutions: [
            { title: 'AI Lead Qualification', desc: 'Natychmiastowa ocena priorytetu i wstępna wycena.' },
            { title: 'Quote Generator', desc: 'AI tworzy ofertę w 5 minut na podstawie danych.' },
            { title: 'Smart Scheduling', desc: 'Ekiipy widzą zlecenia live, klient wybiera termin online.' }
        ],
        results: ['Odp. 48h → 15min', 'Konwersja +40%', '+600k PLN/rok przychodu']
    },
    {
        id: 'dentist',
        title: 'Klinika Stomatologiczna',
        icon: <SmileIcon />,
        problem: '30-40% no-show wizyt, recepcja blokowana standardowymi pytaniami, brak upsellu po wizytach.',
        solutions: [
            { title: 'AI Recepcja 24/7', desc: 'Bot pokazuje cennik i wolne sloty.' },
            { title: 'No-Show Prevention', desc: 'Automatyczne SMS i łatwa opcja przełożenia.' },
            { title: 'Post-Wizyta Flow', desc: 'Automatyczny feedback i oferta pakietu.' }
        ],
        results: ['No-show 35% → 8%', '+12 pacjentów/miesiąc', 'Recepcja 6h → 45min']
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        icon: <ShoppingBagIcon />,
        problem: '65% porzuconych koszyków, obsługa klienta 4h/dzień, social media chaotyczne.',
        solutions: [
            { title: 'Abandonment Recovery', desc: 'SMS/Email "Twój koszyk czeka" + 10% rabat.' },
            { title: 'AI Support', desc: '85% pytań rozstrzygniętych automatycznie.' },
            { title: 'Social Calendar', desc: '3 posty/tydzień + Stories automatycznie.' }
        ],
        results: ['Recovery +25%', 'Support -75%', 'ROAS 4x → 7x', 'Przychód +35%']
    },
    {
        id: 'realestate',
        title: 'Biuro Nieruchomości',
        icon: <HomeIcon />,
        problem: 'Response time 24-48h, 60% leadów ginie, chaos w pokazywaniu mieszkań.',
        solutions: [
            { title: 'AI Lead Router', desc: '"Szukam 2-pokoi" → 3 propozycje w 2 minuty + wirtualny spacer.' },
            { title: 'Smart Scheduling', desc: 'Klient wybiera slot → agent powiadomiony.' },
            { title: 'Nurture Sequence', desc: 'Email/SMS z nowymi ofertami co 3 dni.' }
        ],
        results: ['Odp. 48h → 7min', 'Pokazania +65%', 'Transakcje +30%']
    },
    {
        id: 'marketing',
        title: 'Agencja Marketingowa',
        icon: <MegaphoneIcon />,
        problem: '20h/tydzień na content, ręczne raporty z 5 platform, brak skalowania.',
        solutions: [
            { title: 'AI Content Agent', desc: 'Topic + tone → 5 gotowych postów w 12 minut.' },
            { title: 'Auto-Raporty', desc: 'Analytics + Ads + Email → PDF codziennie o 8:00.' },
            { title: 'Client Dashboard', desc: 'Live metryki dla każdego klienta.' }
        ],
        results: ['Content 20h → 3h', '+3 klientów', 'Marża +25%', 'Piątek wolny']
    }
];

const CaseStudiesSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeCase = CASE_STUDIES[activeTab];

    return (
        <section id="cases" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Case Studies</span>
                    <h2 className="section-headline">Branże, które <span style={{ color: '#06b6d4' }}>Odmieniliśmy</span></h2>
                    <div className="case-tabs">
                        {CASE_STUDIES.map((study, idx) => (
                            <button key={study.id} className={`case-tab-btn ${activeTab === idx ? 'active' : ''}`} onClick={() => setActiveTab(idx)}>
                                {study.icon}
                                {study.title}
                            </button>
                        ))}
                    </div>
                    <div className="case-card" key={activeTab}>
                        <div className="case-header">
                            <div className="case-icon-large">{activeCase.icon}</div>
                            <h3>{activeCase.title}</h3>
                        </div>
                        <div className="case-body">
                            <div className="case-column problem">
                                <h4><BoltIcon /> Typowy Problem</h4>
                                <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6' }}>{activeCase.problem}</p>
                            </div>
                            <div className="case-column solution">
                                <h4><BrainIcon /> Jak Pomagamy</h4>
                                <div className="case-list">
                                    {activeCase.solutions.map((sol, i) => (
                                        <div key={i} className="case-list-item">
                                            <div className="case-list-icon" style={{ color: '#3b82f6' }}><CheckCircleIcon /></div>
                                            <div><strong style={{ color: 'white' }}>{sol.title}:</strong> {sol.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="case-column results">
                                <h4><ChartIcon /> Wyniki</h4>
                                <div className="case-list">
                                    {activeCase.results.map((res, i) => (
                                        <div key={i} className="case-metric">{res}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <p style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '20px' }}>Twoje pytanie: <i>"Działa to u mnie?"</i> <br />Nasza odpowiedź: <b>"Jeśli masz klientów i procesy = TAK."</b></p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Przeanalizuj Mój Biznes (20 min) <ArrowRightIcon /></a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default CaseStudiesSection;
