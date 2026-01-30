import React, { useState, useEffect } from 'react';
import { MessageSquareIcon, BrainIcon, CalendarIcon } from '../common/Icons';

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
                    <div style={{ textAlign: 'center', color: '#52525b', fontSize: '0.8rem', marginBottom: '10px' }}>Dzisiaj, 14:30</div>
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
                    <div><h4 style={{ margin: 0 }}>Odbiór Wiadomości</h4><p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa' }}>Webhook przechwytuje SMS/WhatsApp w 0.2s</p></div>
                </div>
                <div className={`logic-card ${step === 2 || step === 5 ? 'active' : ''}`}>
                    <div className="logic-icon"><BrainIcon /></div>
                    <div><h4 style={{ margin: 0 }}>AI Processing</h4><p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa' }}>Analiza intencji, kontekstu i sprawdzenie dostępności</p></div>
                </div>
                <div className={`logic-card ${step >= 5 ? 'active' : ''}`}>
                    <div className="logic-icon"><CalendarIcon /></div>
                    <div><h4 style={{ margin: 0 }}>Integracja & Akcja</h4><p style={{ margin: 0, fontSize: '0.9rem', color: '#a1a1aa' }}>Google Calendar API + CRM Update</p></div>
                </div>
            </div>
        </div>
    );
};

export default ChatDemo;
