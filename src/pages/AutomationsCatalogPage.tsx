import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollReveal from '../components/common/ScrollReveal';
import {
    BrainIcon,
    MessageSquareIcon,
    FileTextIcon,
    CalendarIcon,
    ShareIcon,
    ChartIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    BoltIcon
} from '../components/common/Icons';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type AutomationCategory = 'Wszystkie' | 'Sprzedaż' | 'Obsługa Klienta' | 'Operacje' | 'Marketing';

interface AutomationItem {
    id: string;
    title: string;
    description: string;
    category: AutomationCategory;
    icon: React.ReactNode;
    problem: string;
    solution: string;
    techStack: string[];
    steps: { title: string; desc: string }[];
    impact: string;
}

const AUTOMATIONS: AutomationItem[] = [
    {
        id: 'ai-receptionist',
        title: 'AI Recepcjonistka 24/7',
        description: 'Inteligentny asystent głosowy i tekstowy, który odbiera telefony i umawia wizyty.',
        category: 'Obsługa Klienta',
        icon: <MessageSquareIcon />,
        problem: 'Nieodebrane telefony po godzinach pracy, tracenie klientów, ciągłe przerywanie pracy recepcji.',
        solution: 'Bot AI odbiera każdy telefon, odpowiada na pytania z bazy wiedzy i zapisuje klienta w kalendarzu.',
        techStack: ['Vapi.ai', 'OpenAI', 'Cal.com', 'Airtable'],
        steps: [
            { title: 'Klient Dzwoni', desc: 'Telefon jest przekierowany do AI (głos jak człowiek).' },
            { title: 'Rozmowa', desc: 'AI odpowiada na pytania, sprawdza dostępność w kalendarzu.' },
            { title: 'Rezerwacja', desc: 'Wizyta ląduje w systemie, klient dostaje SMS z potwierdzeniem.' }
        ],
        impact: 'Zero nieodebranych połączeń. Recepcja odciążona w 90%.'
    },
    {
        id: 'lead-qualifier',
        title: 'Kwalifikacja Leadów + Wycena',
        description: 'System automatycznie oceniający potencjał klienta i generujący wstępną ofertę.',
        category: 'Sprzedaż',
        icon: <BoltIcon />,
        problem: 'Handlowcy tracą czas na "tyre-kickers", klienci czekają 2 dni na wycenę.',
        solution: 'Formularz na stronie triggeruje AI, która analizuje zgłoszenie i wysyła spersonalizowaną ofertę w PDF.',
        techStack: ['Typeform', 'ChatGPT-4', 'Google Docs', 'Gmail'],
        steps: [
            { title: 'Zgłoszenie', desc: 'Klient wypełnia formularz na stronie.' },
            { title: 'Analiza AI', desc: 'System ocenia budżet i potrzeby, dobiera pasujące usługi.' },
            { title: 'Oferta', desc: 'PDF z wyceną i opisem trafia do klienta w 3 minuty.' }
        ],
        impact: 'Oferta u klienta w 5 min zamiast 2 dni. Wyższa konwersja.'
    },
    {
        id: 'invoice-processor',
        title: 'Auto-Księgowanie Faktur',
        description: 'Robot, który wyciąga dane z faktur PDF i wprowadza je do systemu księgowego.',
        category: 'Operacje',
        icon: <FileTextIcon />,
        problem: 'Ręczne przepisywanie faktur, błędy w danych, opóźnienia w płatnościach.',
        solution: 'AI skanuje maila, pobiera PDF, odczytuje dane (OCR) i dodaje wydatek do Fakturownia/Subiekt.',
        techStack: ['Gmail API', 'Document AI', 'Fakturownia API'],
        steps: [
            { title: 'Odbiór Maila', desc: 'System monitoruje skrzynkę "faktury@firma.pl".' },
            { title: 'Ekstrakcja', desc: 'AI wyciąga NIP, kwoty, daty i pozycje.' },
            { title: 'Księgowanie', desc: 'Dane trafiają do systemu księgowego + przelew do banku (draft).' }
        ],
        impact: 'Oszczędność 10h miesięcznie na administracji.'
    },
    {
        id: 'social-content',
        title: 'Generator Contentu Social Media',
        description: 'Automat tworzący posty, grafiki i opisy na miesiąc do przodu.',
        category: 'Marketing',
        icon: <ShareIcon />,
        problem: 'Brak pomysłów, nieregularne publikacje, chaos w mediach społecznościowych.',
        solution: 'Podajesz temat raz w miesiącu -> AI generuje 12 postów (tekst + grafika) i planuje publikację.',
        techStack: ['Midjourney', 'Claude 3.5', 'Make.com', 'LinkedIn API'],
        steps: [
            { title: 'Input', desc: 'Wpisujesz temat miesiąca (np. "Nowoczesne biuro").' },
            { title: 'Kreacja', desc: 'AI pisze posty, dobiera hashtagi i generuje obrazy.' },
            { title: 'Akceptacja & Publikacja', desc: 'Zatwierdzasz pakiety jednym kliknięciem.' }
        ],
        impact: 'Pełny kalendarz contentu stworzony w 30 minut.'
    },
    {
        id: 'onboarding-bot',
        title: 'Onboarding Nowego Klienta',
        description: 'Proces, który sam wita klienta, zbiera dane i daje dostępy.',
        category: 'Operacje',
        icon: <CalendarIcon />,
        problem: 'Chaotyczne maile "witamy na pokładzie", zapominanie o dostępach, wrażenie chaosu.',
        solution: 'Po podpisaniu umowy, system wysyła serię maili, ankietę wdrożeniową i tworzy foldery.',
        techStack: ['DocuSign', 'Airtable', 'Google Drive', 'Slack'],
        steps: [
            { title: 'Umowa Podpisana', desc: 'Trigger po podpisaniu dokumentu online.' },
            { title: 'Setup', desc: 'System tworzy folder na Drive, kanał na Slacku, zadania w Asanie.' },
            { title: 'Welcome Pack', desc: 'Klient otrzymuje maila z dostępami i instrukcją.' }
        ],
        impact: 'Profesjonalne pierwsze wrażenie. Zero manualnej pracy.'
    },
    {
        id: 'review-Booster',
        title: 'Booster Opinii Google',
        description: 'System do automatycznego pozyskiwania pozytywnych recenzji.',
        category: 'Marketing',
        icon: <ChartIcon />,
        problem: 'Zadowoleni klienci zapominają wystawić opinię, niski ranking w Google Maps.',
        solution: 'Po zakończonej usłudze system prosi o ocenę. Dobre -> prośba o Google, Złe -> alert do szefa.',
        techStack: ['Twilio (SMS)', 'OpenAI (Sentyment)', 'Google Business Profile'],
        steps: [
            { title: 'Koniec Usługi', desc: 'System wykrywa zakończenie zlecenia/wizyty.' },
            { title: 'SMS/Email', desc: '"Jak oceniasz wizytę w skali 1-10?".' },
            { title: 'Filtracja', desc: 'Ocena 9-10: Link do Google. Ocena 1-8: Formularz feedbacku.' }
        ],
        impact: 'Średnia 4.9 gwiazdki i stały napływ opinii.'
    }
];

export const AutomationsCatalogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<AutomationCategory>('Wszystkie');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const categories: AutomationCategory[] = ['Wszystkie', 'Sprzedaż', 'Obsługa Klienta', 'Operacje', 'Marketing'];

    const filteredAutomations = activeCategory === 'Wszystkie'
        ? AUTOMATIONS
        : AUTOMATIONS.filter(a => a.category === activeCategory);

    // Dummy scroll handler needed for Navbar reuse
    const scrollToSection = (e: React.MouseEvent, id: string) => {
        // Since we are on a separate page, we might want to redirect to home anchor
        // For now, simpler implementation:
        window.location.href = `/#${id}`;
        setMobileMenuOpen(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <SEO
                title="Katalog Automatyzacji"
                description="Przeglądaj gotowe rozwiązania automatyzacji dla biznesu: AI recepcjonistka, generowanie leadów, content marketing."
                url="https://autoflowdigital.pl/katalog-automatyzacji"
            />
            <Navbar
                scrolled={true}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                scrollToSection={scrollToSection}
            />

            <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <section style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 className="section-headline" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
                            Katalog <span className="gradient-text">Możliwości</span>
                        </h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                            Konkretne rozwiązania, które wdrażamy. Wybierz obszar, który chcesz usprawnić, i zobacz jak to działa "pod maską".
                        </p>
                    </section>

                    {/* Filter Tabs */}
                    <div className="case-tabs" style={{ justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`case-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                                style={{ padding: '10px 24px' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                        <AnimatePresence mode="popLayout">
                            {filteredAutomations.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="automation-card"
                                    style={{
                                        background: 'var(--bg-card)',
                                        borderRadius: '24px',
                                        border: '1px solid var(--border-glass)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div style={{ padding: '30px', borderBottom: '1px solid var(--border-glass)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                                            <div style={{
                                                background: 'rgba(6, 182, 212, 0.1)',
                                                color: 'var(--accent-cyan)',
                                                padding: '12px',
                                                borderRadius: '16px',
                                                display: 'flex'
                                            }}>
                                                {item.icon}
                                            </div>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid var(--border-glass)',
                                                padding: '4px 10px',
                                                borderRadius: '99px'
                                            }}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'white' }}>{item.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.5' }}>{item.description}</p>
                                    </div>

                                    <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        {/* Problem vs Solution */}
                                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-error)', marginBottom: '4px', fontWeight: 'bold' }}>⛔ PROBLEM:</div>
                                            <div style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>{item.problem}</div>
                                        </div>

                                        {/* How it works */}
                                        <div>
                                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '0.05em' }}>
                                                JAK TO DZIAŁA?
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {item.steps.map((step, idx) => (
                                                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                                                        <div style={{
                                                            minWidth: '24px', height: '24px',
                                                            background: 'var(--accent-cyan)', color: 'black',
                                                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '0.8rem', fontWeight: 'bold'
                                                        }}>
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{step.title}</div>
                                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{step.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '20px 30px', background: 'rgba(6, 182, 212, 0.05)', borderTop: '1px solid var(--border-glass)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-success)', fontWeight: '600', fontSize: '0.95rem' }}>
                                            <CheckCircleIcon />
                                            {item.impact}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '80px' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Nie widzisz tego, czego szukasz?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>To tylko wybrane przykłady. Budujemy systemy "szyte na miarę".</p>
                        <a href="/#contact" className="btn-cta primary">Umów darmową konsultację <ArrowRightIcon /></a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
