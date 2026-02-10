import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import { CheckCircleIcon, ArrowRightIcon } from '../common/Icons';

const AuditSection = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            question: "Czy korzystasz z systemu CRM?",
            options: [
                { text: "Tak, pełna automatyzacja", value: 0 },
                { text: "Tak, ale wprowadzam dane ręcznie", value: 10 },
                { text: "Nie, używam Excela/Kartki", value: 20 }
            ]
        },
        {
            question: "Ile czasu dziennie poświęcasz na e-maile?",
            options: [
                { text: "Mniej niż 30 min", value: 0 },
                { text: "30 min - 1.5h", value: 10 },
                { text: "Ponad 2h", value: 20 }
            ]
        },
        {
            question: "Jak wystawiasz faktury?",
            options: [
                { text: "Automat (Stripe/Fakturownia)", value: 0 },
                { text: "Ręcznie, kopiuj-wklej", value: 20 }
            ]
        }
    ];

    const handleAnswer = (value: number) => {
        setScore(prev => prev + value);
        if (step < questions.length) {
            setStep(prev => prev + 1);
        }
    };

    const resetAudit = () => {
        setStep(0);
        setScore(0);
    };

    return (
        <section id="audit" className="section" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(6,182,212,0.05) 50%, rgba(2,6,23,1) 100%)' }}>
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="section-title">DARMOWY MICRO-AUDYT</span>
                        <h2 className="section-headline">Sprawdź swój <span style={{ color: '#06b6d4' }}>Potencjał Automatyzacji</span></h2>
                        <p className="section-description">Odpowiedz na 3 szybkie pytania i zobacz, ile godzin miesięcznie możesz odzyskać.</p>
                    </div>

                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '40px',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
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
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', textAlign: 'center' }}>
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
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    fontSize: '1.1rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                                                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                }}
                                            >
                                                {option.text}
                                                <ArrowRightIcon />
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: '20px', display: 'flex', gap: '4px' }}>
                                        {questions.map((_, i) => (
                                            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? '#06b6d4' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
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
                                            background: 'rgba(6, 182, 212, 0.1)',
                                            color: '#06b6d4',
                                            marginBottom: '20px'
                                        }}>
                                            <CheckCircleIcon />
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                                        Twój wynik: <span style={{ color: '#4ade80' }}>{Math.min(score + 10, 100)}%</span> potencjału
                                    </h3>
                                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '30px' }}>
                                        Możesz odzyskać około <span style={{ color: 'white', fontWeight: 'bold' }}>{Math.floor((score / 60) * 40) + 5} godzin</span> miesięcznie dzięki prostym automatyzacjom.
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
                                            color: '#64748b',
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
