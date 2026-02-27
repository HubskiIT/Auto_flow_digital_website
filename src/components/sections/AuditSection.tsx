import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import { CheckCircleIcon, ArrowRightIcon } from '../common/Icons';
import { useTheme } from '@/src/hooks/useTheme';


const AuditSection = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const { theme } = useTheme();

    const questions = [
        {
            question: "Ile osób w Twoim zespole wykonuje powtarzalne zadania?",
            options: [
                { text: "Tylko ja", value: 10 },
                { text: "2-5 osób", value: 30 },
                { text: "6-15 osób", value: 60 },
                { text: "Powyżej 15 osób", value: 90 }
            ]
        },
        {
            question: "Jak dużo czasu dziennie marnujecie na 'klepanie' danych?",
            options: [
                { text: "Mniej niż 1h", value: 5 },
                { text: "1-3h", value: 20 },
                { text: "3-5h", value: 45 },
                { text: "Całe dnie", value: 80 }
            ]
        },
        {
            question: "Gdybyś mógł zautomatyzować jeden proces od jutra, to byłoby...",
            options: [
                { text: "Obsługa klienta / Leadów", value: 40 },
                { text: "Fakturowanie / Administracja", value: 30 },
                { text: "Raportowanie / Dane", value: 50 },
                { text: "Social media / Marketing", value: 35 }
            ]
        }
    ];

    const handleAnswer = (value: number) => {
        setScore(prev => prev + value);
        setStep(prev => prev + 1);
    };

    const resetAudit = () => {
        setStep(0);
        setScore(0);
    };

    return (
        <section id="audit" className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="section-title">DARMOWY MICRO-AUDYT</span>
                        <h2 className="section-headline">Sprawdź swój <span style={{ color: 'var(--accent-blue)' }}>Potencjał Automatyzacji</span></h2>
                        <p className="section-description" style={{ color: 'var(--text-secondary)' }}>Odpowiedz na 3 szybkie pytania i zobacz, ile godzin miesięcznie możesz odzyskać.</p>
                    </div>

                    <div className="audit-box" style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        background: 'var(--bg-card)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '24px',
                        padding: '40px',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-premium)'
                    }}>
                        <AnimatePresence mode="wait">
                            {step < questions.length ? (
                                <motion.div
                                    key={`question-${step}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>
                                        {questions[step].question}
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {questions[step].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(option.value)}
                                                className="audit-option-btn"
                                                style={{
                                                    padding: '20px',
                                                    background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid var(--border-glass)',
                                                    borderRadius: '12px',
                                                    color: 'var(--text-primary)',
                                                    fontSize: '1.1rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {option.text}
                                                <ArrowRightIcon />
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '20px', display: 'flex', gap: '4px' }}>
                                        {questions.map((_, i) => (
                                            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? 'var(--accent-blue)' : 'var(--border-glass)', borderRadius: '2px' }}></div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center' }}
                                >
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            padding: '20px',
                                            borderRadius: '50%',
                                            background: 'rgba(37, 99, 235, 0.1)',
                                            color: 'var(--accent-blue)',
                                            marginBottom: '20px'
                                        }}>
                                            <CheckCircleIcon />
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                                        Twój wynik: <span style={{ color: '#10b981' }}>{Math.min(score + 10, 100)}%</span> potencjału
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '30px' }}>
                                        Możesz odzyskać około <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{Math.floor((score / 60) * 40) + 5} godzin</span> miesięcznie dzięki prostym automatyzacjom.
                                    </p>
                                    <a href="#contact"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                                        className="btn-cta primary"
                                        style={{ width: '100%', justifyContent: 'center' }}>
                                        Odbierz Plan Automatyzacji <ArrowRightIcon />
                                    </a>
                                    <button
                                        onClick={resetAudit}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            marginTop: '20px',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Zacznij od nowa
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};


export default AuditSection;
