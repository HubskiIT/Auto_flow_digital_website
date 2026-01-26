
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import DottedGlowBackground from './components/DottedGlowBackground';
import { 
    BoltIcon, 
    ChartIcon, 
    BrainIcon, 
    BuildingIcon, 
    ArrowRightIcon, 
    CheckCircleIcon,
    InstagramIcon,
    FacebookIcon,
    YoutubeIcon,
    TiktokIcon,
    LinkedinIcon,
    StarIcon,
    PlusIcon,
    MinusIcon,
    MailIcon,
    FileTextIcon,
    CalendarIcon,
    MessageSquareIcon,
    ShareIcon,
    BoxIcon,
    RefreshIcon,
    MenuIcon,
    XIcon,
    DumbbellIcon,
    HammerIcon,
    SmileIcon,
    ShoppingBagIcon,
    HomeIcon,
    MegaphoneIcon,
    GlobeIcon,
    LayoutIcon,
    RocketIcon,
    CodeIcon
} from './components/Icons';

// --- Types ---
type FaqItem = {
    question: string;
    answer: string;
};

// --- Components ---

const BuilderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" fill="rgba(6, 182, 212, 0.2)"/>
        <path d="M12 14a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" fill="rgba(6, 182, 212, 0.2)"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="12" x2="12" y2="14"/>
        <circle cx="12" cy="7" r="1" fill="currentColor" />
        <path d="M15 17l2-2" />
        <path d="M9 17l-2-2" />
    </svg>
);

// Digital Pyramid Building Animation
const DigitalPyramid = () => {
    const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);
    const [builderPos, setBuilderPos] = useState({ x: 0, y: 0 });
    
    const blocks = [
        { id: 1, x: 20, y: 120 }, { id: 2, x: 90, y: 120 }, { id: 3, x: 160, y: 120 }, { id: 4, x: 230, y: 120 },
        { id: 5, x: 55, y: 80 }, { id: 6, x: 125, y: 80 }, { id: 7, x: 195, y: 80 },
        { id: 8, x: 90, y: 40 }, { id: 9, x: 160, y: 40 },
        { id: 10, x: 125, y: 0 }
    ];

    useEffect(() => {
        let currentBlockIndex = 0;
        
        const buildLoop = () => {
            if (currentBlockIndex >= blocks.length) {
                setTimeout(() => {
                    setVisibleBlocks([]);
                    currentBlockIndex = 0;
                    buildLoop();
                }, 3000);
                return;
            }

            const targetBlock = blocks[currentBlockIndex];
            setBuilderPos({ x: targetBlock.x + 10, y: targetBlock.y - 40 });

            setTimeout(() => {
                setVisibleBlocks(prev => [...prev, targetBlock.id]);
                currentBlockIndex++;
                buildLoop();
            }, 600);
        };

        buildLoop();
        return () => {};
    }, []);

    return (
        <div className="pyramid-container">
            {blocks.map((block) => (
                <div 
                    key={block.id}
                    className={`pyramid-block ${visibleBlocks.includes(block.id) ? 'visible' : 'hidden'}`}
                    style={{ left: block.x, top: block.y }}
                >
                </div>
            ))}
            <div 
                className="builder-cursor"
                style={{ left: builderPos.x, top: builderPos.y }}
            >
                <BuilderIcon />
            </div>
        </div>
    );
};

// Smooth Text Rotator
const TextRotator = ({ words, interval = 3000 }: { words: string[], interval?: number }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true); 
            }, 500); 
        }, interval);

        return () => clearInterval(timer);
    }, [words, interval]);

    return (
        <span 
            className="gradient-text"
            style={{ 
                opacity: fade ? 1 : 0, 
                transform: fade ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block' 
            }}
        >
            {words[index]}
        </span>
    );
};

// Scroll Reveal Component
const ScrollReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`reveal-section ${isVisible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

// Chat Simulation Component
const ChatDemo = () => {
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setStep(1); 
            await new Promise(r => setTimeout(r, 1000));
            setIsTyping(true);
            setStep(2); 
            await new Promise(r => setTimeout(r, 1500));
            setIsTyping(false);
            setStep(3);
            await new Promise(r => setTimeout(r, 2000));
            setStep(4);
            await new Promise(r => setTimeout(r, 1000));
            setIsTyping(true);
            setStep(5); 
            await new Promise(r => setTimeout(r, 1500));
            setIsTyping(false);
            setStep(6);
            await new Promise(r => setTimeout(r, 6000));
            setStep(0);
        };

        if (step === 0) sequence();
    }, [step]);

    return (
        <div className="demo-wrapper">
            <div className="phone-mockup">
                <div className="phone-notch"></div>
                <div className="chat-screen">
                    <div style={{textAlign: 'center', color: '#52525b', fontSize: '0.8rem', marginBottom: '10px'}}>Dzisiaj, 14:30</div>
                    {step >= 1 && <div className="chat-message user">Hej, czy dostaliście moje zgłoszenie?</div>}
                    {isTyping && step === 2 && <div className="typing-indicator"><div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div></div>}
                    {step >= 3 && <div className="chat-message bot">Cześć! 👋 Tak, mamy Twoje zgłoszenie w systemie. Kiedy chciałbyś porozmawiać o szczegółach?</div>}
                    {step >= 4 && <div className="chat-message user">Wtorek o 18:00 by mi pasował.</div>}
                    {isTyping && step === 5 && <div className="typing-indicator"><div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div></div>}
                    {step >= 6 && <div className="chat-message bot">Zrozumiałem. 📅 Dodałem spotkanie do kalendarza na <b>Wtorek o 18:00</b>. Wyślę Ci przypomnienie SMS 24h przed!</div>}
                </div>
            </div>

            <div className="backend-logic">
                <div className={`logic-card ${step >= 1 && step <= 2 ? 'active' : ''}`}>
                    <div className="logic-icon"><MessageSquareIcon /></div>
                    <div><h4 style={{margin:0}}>Odbiór Wiadomości</h4><p style={{margin:0, fontSize:'0.9rem', color:'#a1a1aa'}}>Webhook przechwytuje SMS/WhatsApp w 0.2s</p></div>
                </div>
                <div className={`logic-card ${step === 2 || step === 5 ? 'active' : ''}`}>
                    <div className="logic-icon"><BrainIcon /></div>
                    <div><h4 style={{margin:0}}>AI Processing</h4><p style={{margin:0, fontSize:'0.9rem', color:'#a1a1aa'}}>Analiza intencji, kontekstu i sprawdzenie dostępności</p></div>
                </div>
                <div className={`logic-card ${step >= 5 ? 'active' : ''}`}>
                    <div className="logic-icon"><CalendarIcon /></div>
                    <div><h4 style={{margin:0}}>Integracja & Akcja</h4><p style={{margin:0, fontSize:'0.9rem', color:'#a1a1aa'}}>Google Calendar API + CRM Update</p></div>
                </div>
            </div>
        </div>
    );
};

const InfiniteTicker = () => (
    <div className="ticker-wrap">
        <div className="ticker">
            <span className="ticker-item">FAKTUROWANIE</span>
            <span className="ticker-item highlight">EMAILE</span>
            <span className="ticker-item">OBSŁUGA KLIENTA</span>
            <span className="ticker-item highlight">RAPORTY</span>
            <span className="ticker-item">LEAD GENERATION</span>
            <span className="ticker-item highlight">SOCIAL MEDIA</span>
            <span className="ticker-item">ONBOARDING</span>
            <span className="ticker-item highlight">ZAMÓWIENIA</span>
            <span className="ticker-item">FAKTUROWANIE</span>
            <span className="ticker-item highlight">EMAILE</span>
            <span className="ticker-item">OBSŁUGA KLIENTA</span>
            <span className="ticker-item highlight">RAPORTY</span>
            <span className="ticker-item">LEAD GENERATION</span>
            <span className="ticker-item highlight">SOCIAL MEDIA</span>
            <span className="ticker-item">ONBOARDING</span>
            <span className="ticker-item highlight">ZAMÓWIENIA</span>
        </div>
    </div>
);

const Accordion = ({ items }: { items: FaqItem[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <button className="accordion-header" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                        {item.question}
                        {activeIndex === index ? <MinusIcon /> : <PlusIcon />}
                    </button>
                    <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

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
        <section id="cases" className="section" style={{background: 'rgba(255,255,255,0.02)'}}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Case Studies</span>
                    <h2 className="section-headline">Branże, które <span style={{color: '#06b6d4'}}>Odmieniliśmy</span></h2>
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
                                <p style={{fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6'}}>{activeCase.problem}</p>
                            </div>
                            <div className="case-column solution">
                                <h4><BrainIcon /> Jak Pomagamy</h4>
                                <div className="case-list">
                                    {activeCase.solutions.map((sol, i) => (
                                        <div key={i} className="case-list-item">
                                            <div className="case-list-icon" style={{color: '#3b82f6'}}><CheckCircleIcon /></div>
                                            <div><strong style={{color: 'white'}}>{sol.title}:</strong> {sol.desc}</div>
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
                    <div style={{textAlign: 'center', marginTop: '40px'}}>
                        <p style={{fontSize: '1.1rem', color: '#94a3b8', marginBottom: '20px'}}>Twoje pytanie: <i>"Działa to u mnie?"</i> <br/>Nasza odpowiedź: <b>"Jeśli masz klientów i procesy = TAK."</b></p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>Przeanalizuj Mój Biznes (20 min) <ArrowRightIcon /></a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

// Websites Section
const WebsitesSection = () => {
    return (
        <section id="websites" className="section" style={{background: '#020617'}}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">WEB DESIGN & DEVELOPMENT</span>
                    <h2 className="section-headline">Twoja Nowa <span style={{color: '#6366f1'}}>Strona Internetowa</span></h2>
                    
                    <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px'}}>
                        <p style={{fontSize: '1.25rem', color: '#e2e8f0', marginBottom: '24px', lineHeight: '1.6'}}>
                            Tworzymy profesjonalne, szyte na miarę strony www, które nie tylko świetnie wyglądają, ale przede wszystkim działają. 
                            Od nowoczesnego designu UI/UX, przez szybki kod, aż po optymalizację SEO. 
                            Budujemy solidny fundament Twojej obecności w internecie.
                        </p>
                        
                        <div style={{display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px'}}>
                            <span style={{padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500'}}>Strony Firmowe</span>
                            <span style={{padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500'}}>Landing Page</span>
                            <span style={{padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500'}}>Sklepy E-commerce</span>
                            <span style={{padding: '8px 20px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.9rem', fontWeight: '500'}}>Redesign</span>
                        </div>

                        <p style={{fontSize: '1.1rem', color: '#94a3b8'}}>
                            Ale w 2026 roku sama strona to za mało. Dlatego nasze realizacje zamieniamy w systemy, które sprzedają 24/7:
                        </p>
                    </div>

                    <div className="grid-3">
                        <div className="card">
                            <div style={{color: '#6366f1', marginBottom: '20px'}}><LayoutIcon /></div>
                            <h3>Strona, która sprzedaje</h3>
                            <div className="code-window">
                                <div className="code-line"><span className="code-key">HERO:</span><span className="code-val">"Remont w 14 dni"</span></div>
                                <div className="code-line"><span className="code-key">PROBLEM:</span><span className="code-val">Dlaczego inni mają klientów?</span></div>
                                <div className="code-line"><span className="code-key">CTA:</span><span className="code-val">"Rezerwuj Termin"</span></div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{color: '#06b6d4', marginBottom: '20px'}}><MessageSquareIcon /></div>
                            <h3>AI Chatbot 24/7</h3>
                            <div className="code-window">
                                <div className="code-line"><span className="code-key">USER:</span><span className="code-val">"Ile kosztuje kuchnia?"</span></div>
                                <div className="code-line"><span className="code-key">BOT:</span><span className="code-val">"Budżet 25-45k. Kiedy start?"</span></div>
                                <div className="code-line" style={{color:'#4ade80'}}>[Umawia spotkanie]</div>
                            </div>
                        </div>
                        <div className="card">
                            <div style={{color: '#ec4899', marginBottom: '20px'}}><BoltIcon /></div>
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
                            <p style={{fontSize:'0.9rem', color:'#94a3b8'}}>Mapujemy Twój proces: lead → klient → zlecenie. Ustalamy co blokuje sprzedaż.</p>
                        </div>
                        <div className="web-step-card">
                            <div className="web-step-header">TYDZIEŃ 3-4</div>
                            <h4><CodeIcon /> Budowa + Design</h4>
                            <p style={{fontSize:'0.9rem', color:'#94a3b8'}}>Strona pod Twoją branżę (nie szablon!). Trenujemy Chatbota na Twoich cenach.</p>
                        </div>
                        <div className="web-step-card">
                            <div className="web-step-header">TYDZIEŃ 5-6</div>
                            <h4><RocketIcon /> Integracja + Launch</h4>
                            <p style={{fontSize:'0.9rem', color:'#94a3b8'}}>Łączymy: Strona ↔ Chatbot ↔ CRM. Szkolenie z obsługi. Start kampanii.</p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '80px',
                        padding: '40px',
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.6))',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: '24px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{position:'absolute', top:'-50%', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents:'none'}}></div>

                        <h3 style={{fontSize: '1.8rem', color: 'white', marginBottom: '16px'}}>Twoja strona może zarabiać na siebie</h3>
                        <p style={{color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px'}}>
                            Nie pozwól, by Twoja wizytówka w sieci była tylko kosztem. Zmień odwiedzających w płacących klientów dzięki nowoczesnemu designowi i automatyzacji.
                        </p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>
                            Wyceń Projekt WWW <ArrowRightIcon />
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id') || '';
            }
        });
        setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Twoje zgłoszenie zostało przyjęte! Sprawdź WhatsApp - wysłaliśmy potwierdzenie.");
  };

  const toggleDay = (day: string) => {
      if (selectedDays.includes(day)) setSelectedDays(selectedDays.filter(d => d !== day));
      else setSelectedDays([...selectedDays, day]);
  };

  const toggleTime = (time: string) => {
      if (selectedTimes.includes(time)) setSelectedTimes(selectedTimes.filter(t => t !== time));
      else setSelectedTimes([...selectedTimes, time]);
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
  };

  return (
    <>
        <DottedGlowBackground 
            gap={40} 
            radius={1} 
            color="rgba(255, 255, 255, 0.05)" 
            glowColor="rgba(6, 182, 212, 0.5)" 
            speedScale={0.3} 
        />

        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); closeMenu(); }}>
                AUTO FLOW <span style={{color: '#06b6d4'}}>DIGITAL</span>
            </a>
            
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>

            <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                <a href="#problem" className={`nav-link ${activeSection === 'problem' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'problem')}>Problem</a>
                <a href="#mission" className={`nav-link ${activeSection === 'mission' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'mission')}>Misja</a>
                <a href="#arsenal" className={`nav-link ${activeSection === 'arsenal' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'arsenal')}>Arsenał</a>
                <a href="#demo" className={`nav-link ${activeSection === 'demo' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'demo')}>Demo</a>
                <a href="#solutions" className={`nav-link ${activeSection === 'solutions' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'solutions')}>Rozwiązania</a>
                <a href="#websites" className={`nav-link ${activeSection === 'websites' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'websites')}>Strony WWW</a>
                <a href="#process" className={`nav-link ${activeSection === 'process' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'process')}>Proces</a>
                <a href="#cases" className={`nav-link ${activeSection === 'cases' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'cases')}>Case Studies</a>
                <a href="#reviews" className={`nav-link ${activeSection === 'reviews' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'reviews')}>Opinie</a>
                <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
            </div>
            
            <a href="#contact" className="btn-cta primary" onClick={(e) => scrollToSection(e, 'contact')}>Darmowa Konsultacja</a>
        </nav>

        <section className="hero">
            <div className="container hero-content">
                <div className="hero-badge"><div className="hero-badge-dot"></div>AI AUTOMATION AGENCY 2.0</div>
                <h1>Skaluj Biznes Bez Chaosu <br />dzięki <TextRotator words={["Automatyzacji AI", "Wirtualnym Agentom", "Inteligentnym Procesom", "Technologii No-Code"]} interval={3000}/></h1>
                
                <div className="hero-buttons" style={{marginTop: '40px'}}>
                    <a href="#contact" className="btn-cta primary" style={{padding: '16px 32px', fontSize: '1.1rem'}} onClick={(e) => scrollToSection(e, 'contact')}>
                        Umów Darmową Konsultację <ArrowRightIcon />
                    </a>
                </div>
            </div>
        </section>

        <section id="problem" className="section" style={{background: 'rgba(255,255,255,0.02)'}}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Diagnoza Problemu</span>
                    <h2 className="section-headline">Czy Ręczne Procesy <span style={{color: '#ef4444'}}>Hamują Twój Rozwój</span>?</h2>
                </ScrollReveal>
                <div className="grid-3">
                    <ScrollReveal delay={100}>
                        <div className="card">
                            <h3 style={{color: '#ef4444'}}>01. Chaos Komunikacyjny</h3>
                            <p>Gubisz leady, bo handlowcy nie odpisują od razu? Skrzynki mailowe pękają w szwach, a klient czeka 2 dni na wycenę?</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="card">
                            <h3 style={{color: '#ef4444'}}>02. Wypalenie Zespołu</h3>
                            <p>Twoi najlepsi ludzie marnują 40% czasu na "kopiuj-wklej", wprowadzanie faktur i raportowanie, zamiast zarabiać pieniądze.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="card">
                            <h3 style={{color: '#ef4444'}}>03. Bariera Skalowalności</h3>
                            <p>Chcesz obsłużyć 2x więcej klientów, ale to wymagałoby zatrudnienia 2x więcej osób? To model, który zabija marżę.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

        <section id="mission" className="section">
            <div className="container">
                <ScrollReveal>
                    <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
                        <span className="section-title">Nasza Misja</span>
                        <h2 className="section-headline">Budujemy <span style={{color: '#06b6d4'}}>Cyfrowe Fabryki</span></h2>
                        <DigitalPyramid />
                        <p style={{fontSize: '1.2rem', color: '#94a3b8', marginTop: '40px'}}>Nie jesteśmy zwykłą agencją. Jesteśmy architektami Twojej wydajności. Wdrażamy "cyfrowych pracowników" – inteligentne boty i automatyzacje, które przejmują nudne zadania. Dzięki nam technologia przestaje być kosztem, a staje się Twoją największą przewagą.</p>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <section id="arsenal" className="section" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0.01), transparent)'}}>
             <div className="container">
                 <ScrollReveal>
                    <span className="section-title">Nasz Arsenał</span>
                    <h2 className="section-headline">Co Możemy Zautomatyzować?</h2>
                    <p style={{textAlign:'center', maxWidth:'700px', margin:'0 auto 20px', color:'var(--text-secondary)'}}>Szybko i skutecznie wdrażamy rozwiązania, które odmienią Twoją firmę.</p>
                    <div style={{textAlign: 'center', marginBottom: '60px'}}><span className="examples-badge">⚠️ TO TYLKO PRZYKŁADY MOŻLIWOŚCI</span></div>
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

        <section style={{padding: '0 0 100px 0'}}><InfiniteTicker /></section>
        
        <section id="demo" className="section" style={{background: 'rgba(255,255,255,0.02)'}}>
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Zobacz to w akcji</span>
                    <h2 className="section-headline">Jak to działa <span style={{color: '#06b6d4'}}>naprawdę?</span></h2>
                    <p style={{textAlign:'center', maxWidth:'600px', margin:'0 auto 40px', color:'var(--text-secondary)'}}>To nie magia. To precyzyjnie zaprojektowany system. Zobacz, co dzieje się "pod maską", gdy Twój klient wysyła wiadomość.</p>
                    <ChatDemo />
                </ScrollReveal>
            </div>
        </section>

        <section id="solutions" className="section">
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">3 Filary Automatyzacji</span>
                    <h2 className="section-headline">Twoja firma zarabia, <span style={{color: '#06b6d4'}}>nawet gdy śpisz</span></h2>
                </ScrollReveal>
                
                <div className="grid-3">
                    {/* Card 1 */}
                    <ScrollReveal delay={0}>
                        <div className="card" style={{height: '100%', justifyContent: 'space-between'}}>
                            <div>
                                <div style={{width: '50px', height: '50px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '24px'}}>
                                    <MessageSquareIcon />
                                </div>
                                <h3 style={{fontSize: '1.4rem', marginBottom: '16px'}}>1. AI CHATBOT <br/><span style={{fontSize: '1rem', fontWeight: '400', color: '#94a3b8'}}>Pierwszy kontakt 24/7</span></h3>
                                
                                <div style={{marginBottom: '16px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Problem</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: '#cbd5e1'}}>Klienci piszą wieczorem, w weekendy, święta. Ty śpisz. Oni idą do konkurencji.</p>
                                </div>

                                <div style={{marginBottom: '20px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Korzyść</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: 'white'}}>Bot odpowiada natychmiast: ceny, terminy, umawia spotkania. Ty budzisz się z nowymi klientami w kalendarzu.</p>
                                </div>
                            </div>
                            
                            <div style={{padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px'}}>
                                <div style={{fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px'}}>Rezultat</div>
                                <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'white'}}>+35% leadów <span style={{fontWeight:'400', fontSize:'0.9rem', color:'#86efac'}}>(bo konkurencja śpi)</span></div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Card 2 */}
                    <ScrollReveal delay={200}>
                        <div className="card" style={{height: '100%', justifyContent: 'space-between'}}>
                            <div>
                                <div style={{width: '50px', height: '50px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '24px'}}>
                                    <StarIcon />
                                </div>
                                <h3 style={{fontSize: '1.4rem', marginBottom: '16px'}}>2. LEAD SCORING <br/><span style={{fontSize: '1rem', fontWeight: '400', color: '#94a3b8'}}>Tylko gorące okazje</span></h3>
                                
                                <div style={{marginBottom: '16px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Problem</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: '#cbd5e1'}}>Otrzymujesz 20 wiadomości. 15 to "ciekawscy". 5 to klienci. Tracisz czas na złe leady.</p>
                                </div>

                                <div style={{marginBottom: '20px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Korzyść</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: 'white'}}>AI analizuje każdą wiadomość, ocenia (gorący / ciepły / zimny), mówi zespołowi "Dzwonić TERAZ".</p>
                                </div>
                            </div>
                            
                            <div style={{padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px'}}>
                                <div style={{fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px'}}>Rezultat</div>
                                <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'white'}}>3x szybsze zamykanie transakcji</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Card 3 */}
                    <ScrollReveal delay={400}>
                        <div className="card" style={{height: '100%', justifyContent: 'space-between'}}>
                            <div>
                                <div style={{width: '50px', height: '50px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '24px'}}>
                                    <BoltIcon />
                                </div>
                                <h3 style={{fontSize: '1.4rem', marginBottom: '16px'}}>3. AUTOMATYZACJA <br/><span style={{fontSize: '1rem', fontWeight: '400', color: '#94a3b8'}}>Zespół wolny od rutyny</span></h3>
                                
                                <div style={{marginBottom: '16px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#f87171', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Problem</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: '#cbd5e1'}}>Faktury, przypomnienia, follow-upy – 15h/tydzień na admin. Zespół zmęczony.</p>
                                </div>

                                <div style={{marginBottom: '20px'}}>
                                    <div style={{fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px'}}>Korzyść</div>
                                    <p style={{fontSize: '0.95rem', lineHeight: '1.5', color: 'white'}}>AI wysyła faktury, przypomina o płatnościach, follow-up z klientami. Zespół ma czas na rzeczy ważne.</p>
                                </div>
                            </div>
                            
                            <div style={{padding: '16px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '8px'}}>
                                <div style={{fontSize: '0.8rem', textTransform: 'uppercase', color: '#4ade80', marginBottom: '4px'}}>Rezultat</div>
                                <div style={{fontSize: '1.1rem', fontWeight: '800', color: 'white'}}>+20h/tydzień <span style={{fontWeight:'400', fontSize:'0.9rem', color:'#86efac'}}>na rozwój biznesu</span></div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={600}>
                    <div style={{
                        marginTop: '60px',
                        background: 'linear-gradient(90deg, rgba(6,182,212,0.1), rgba(59,130,246,0.1))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '40px',
                        textAlign: 'center'
                    }}>
                        <h4 style={{fontSize: '1.5rem', marginBottom: '20px', color: 'white'}}>Wyobraź sobie:</h4>
                        <p style={{fontSize: '1.2rem', lineHeight: '1.6', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 30px'}}>
                            Poniedziałek 9:00 – <span style={{color: '#4ade80', fontWeight: 'bold'}}>7 nowych leadów w CRM</span>, <span style={{color: '#4ade80', fontWeight: 'bold'}}>3 spotkania umówione</span>, <span style={{color: '#4ade80', fontWeight: 'bold'}}>2 faktury opłacone automatycznie</span>.<br/>
                            Ty: pijesz kawę i planujesz wzrost.
                        </p>
                        <a href="#contact" className="btn-cta primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>
                            WIDZISZ EFEKTY? → Pokażemy Ci to w 20 minut
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <WebsitesSection />
        
        <section id="process" className="section" style={{background: 'rgba(255,255,255,0.02)'}}>
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
                                    <p style={{margin:0, fontSize:'0.95rem', color:'var(--text-secondary)'}}>{step.desc}</p>
                                    <div className="step-deliverable"><CheckCircleIcon /><span style={{color: '#94a3b8'}}>Efekt: <span className="step-tag">{step.deliverable}</span></span></div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>

        <CaseStudiesSection />

        <section id="reviews" className="section">
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Dowody Skuteczności</span>
                    <h2 className="section-headline">Liczby nie kłamią</h2>
                </ScrollReveal>
                <div className="grid-3">
                    <ScrollReveal delay={0}>
                        <div className="card">
                            <div style={{display:'flex', gap:'4px', color:'#fbbf24', marginBottom:'16px'}}><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                            <h3>E-commerce Fashion</h3>
                            <p>"Wdrożenie bota AI do obsługi zwrotów i pytań o rozmiary zredukowało liczbę ticketów o 70%. Zespół wreszcie zajął się sprzedażą."</p>
                            <div style={{marginTop:'20px', fontWeight:'700', color: '#06b6d4'}}>Oszczędność: 40h / tyg</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <div className="card">
                            <div style={{display:'flex', gap:'4px', color:'#fbbf24', marginBottom:'16px'}}><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                            <h3>Agencja Nieruchomości</h3>
                            <p>"Lead scoring i automatyczne potwierdzenia spotkań sprawiły, że nasi agenci przestali jeździć na puste spotkania. Konwersja wzrosła dwukrotnie."</p>
                            <div style={{marginTop:'20px', fontWeight:'700', color: '#06b6d4'}}>Wzrost konwersji: +210%</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="card">
                            <div style={{display:'flex', gap:'4px', color:'#fbbf24', marginBottom:'16px'}}><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                            <h3>Usługi B2B</h3>
                            <p>"Automatyzacja generowania umów i faktur skróciła proces onboardingu klienta z 3 dni do 15 minut. Klienci są zachwyceni."</p>
                            <div style={{marginTop:'20px', fontWeight:'700', color: '#06b6d4'}}>Czas procesu: -95%</div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

        <section id="faq" className="section">
            <div className="container" style={{maxWidth: '800px'}}>
                <ScrollReveal>
                    <span className="section-title">Q&A</span>
                    <h2 className="section-headline">Częste Pytania</h2>
                    <Accordion items={[
                        { question: "Czy automatyzacja zwolni moich pracowników?", answer: "Nie. Automatyzacja zabiera im 'robotę robota' – nudne, powtarzalne czynności. Dzięki temu odzyskują czas na kreatywność, sprzedaż i budowanie relacji z klientami. Twoi ludzie będą szczęśliwsi, a firma wydajniejsza." },
                        { question: "Czy to jest bezpieczne dla moich danych?", answer: "Tak. Bezpieczeństwo to nasz priorytet. Korzystamy ze standardów enterprise (szyfrowanie, RODO/GDPR compliance). Dane są przetwarzane tylko tam, gdzie to konieczne, i zabezpieczone umowami poufności." },
                        { question: "Ile trwa wdrożenie?", answer: "Proste automatyzacje (Quick Wins) wdrażamy w 7-14 dni. Kompleksowe systemy transformacyjne zajmują od 4 do 8 tygodni, w zależności od skomplikowania procesów." },
                        { question: "Czy muszę mieć wiedzę techniczną?", answer: "Absolutnie nie. To my jesteśmy od technologii. Dostajesz od nas gotowy, działający system oraz proste instrukcje obsługi (dashboardy). My zajmujemy się tym, co 'pod maską'." }
                    ]} />
                </ScrollReveal>
            </div>
        </section>

        <section id="contact" className="section contact-section">
            <div className="container">
                <ScrollReveal>
                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <span className="section-title" style={{textAlign:'left'}}>OSTATNI KROK</span>
                            <h2>Gotowy na <span style={{color: '#06b6d4'}}>Przyszłość?</span></h2>
                            <p style={{color: '#94a3b8', fontSize: '1.1rem', marginBottom: '24px'}}>Przestań tracić czas na procesy, które mogą dziać się same. Umów się na darmowy audyt. <br/><br/><span style={{color: '#4ade80', fontWeight: 'bold'}}>Wystarczy 20-30 minut</span>, abyśmy znaleźli potencjał do automatyzacji w Twojej firmie.</p>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}><div style={{background:'rgba(6, 182, 212, 0.1)', padding:'8px', borderRadius:'50%'}}><CheckCircleIcon /></div><span style={{fontWeight:'500'}}>Otrzymasz konkretny plan działania w 24h</span></div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}><div style={{background:'rgba(6, 182, 212, 0.1)', padding:'8px', borderRadius:'50%'}}><CheckCircleIcon /></div><span style={{fontWeight:'500'}}>Poufność gwarantowana (NDA)</span></div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}><div style={{background:'rgba(6, 182, 212, 0.1)', padding:'8px', borderRadius:'50%'}}><CheckCircleIcon /></div><span style={{fontWeight:'500'}}>Mówimy językiem biznesu, nie kodu</span></div>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={handleContactSubmit}>
                            <h3 style={{marginBottom:'24px'}}>Zarezerwuj Termin</h3>
                            <div className="form-row">
                                <div className="form-group"><label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#a1a1aa'}}>Imię</label><input type="text" className="form-input" placeholder="Twoje imię" required /></div>
                                <div className="form-group"><label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#a1a1aa'}}>Nazwisko</label><input type="text" className="form-input" placeholder="Twoje nazwisko" required /></div>
                            </div>
                            <div className="form-group"><label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#a1a1aa'}}>Email Firmowy</label><input type="email" className="form-input" placeholder="name@company.com" required /></div>
                            <div className="form-group"><label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#a1a1aa'}}>Telefon</label><input type="tel" className="form-input" placeholder="+48 ..." required /></div>
                            <div className="form-group"><label style={{display:'block', marginBottom:'8px', fontSize:'0.9rem', color:'#a1a1aa'}}>Opis Oczekiwań / Wyzwanie</label><textarea className="form-textarea" rows={3} placeholder="Co chcesz usprawnić w swojej firmie? Jakie masz oczekiwania?" required></textarea></div>
                            <div className="selection-group"><span className="selection-label">Preferowane Dni:</span><div className="selection-options">{['Pon', 'Wt', 'Śr', 'Czw', 'Pt'].map(day => (<button key={day} type="button" className={`toggle-btn ${selectedDays.includes(day) ? 'selected' : ''}`} onClick={() => toggleDay(day)}>{day}</button>))}</div></div>
                            <div className="selection-group"><span className="selection-label">Preferowane Godziny:</span><div className="selection-options">{['9:00 - 12:00', '12:00 - 15:00', '15:00 - 17:00'].map(time => (<button key={time} type="button" className={`toggle-btn ${selectedTimes.includes(time) ? 'selected' : ''}`} onClick={() => toggleTime(time)}>{time}</button>))}</div></div>
                            <button type="submit" className="btn-cta primary" style={{width: '100%', justifyContent: 'center', padding:'16px', fontSize:'1rem'}}>Wyślij Zgłoszenie <ArrowRightIcon /></button>
                            <p style={{fontSize: '0.8rem', color: '#52525b', marginTop: '16px', textAlign: 'center'}}>100% spamu free. Twoje dane są bezpieczne.</p>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand"><h3>AUTO FLOW <span style={{color: '#06b6d4'}}>DIGITAL</span></h3><p>Twój partner w cyfrowej transformacji. Automatyzujemy nudę, abyś Ty mógł zająć się biznesem.</p></div>
                    <div className="footer-col"><h4>Nawigacja</h4><div className="footer-links"><a href="#problem" className="footer-link">Problem</a><a href="#mission" className="footer-link">Misja</a><a href="#arsenal" className="footer-link">Arsenał</a><a href="#solutions" className="footer-link">Rozwiązania</a><a href="#process" className="footer-link">Proces</a><a href="#reviews" className="footer-link">Opinie</a><a href="#faq" className="footer-link">FAQ</a><a href="#contact" className="footer-link">Kontakt</a></div></div>
                    <div className="footer-col"><h4>Prawne</h4><div className="footer-links"><a href="#" className="footer-link">Polityka Prywatności</a><a href="#" className="footer-link">Regulamin</a><a href="#" className="footer-link">RODO</a></div></div>
                    <div className="footer-col"><h4>Social Media</h4><div className="social-links"><a href="#" className="social-icon" aria-label="Instagram"><InstagramIcon /></a><a href="#" className="social-icon" aria-label="Facebook"><FacebookIcon /></a><a href="#" className="social-icon" aria-label="LinkedIn"><LinkedinIcon /></a></div></div>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">&copy; {new Date().getFullYear()} Auto Flow Digital. Wszelkie prawa zastrzeżone.</div>
                    <div style={{color: '#52525b', fontSize: '0.8rem'}}>Designed for Future.</div>
                </div>
            </div>
        </footer>
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
