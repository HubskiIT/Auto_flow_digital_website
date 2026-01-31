import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import { ArrowRightIcon, CheckCircleIcon } from '../common/Icons';

const ContactSection = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleDay = (day: string) => {
        setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    const toggleTime = (time: string) => {
        setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    const validateForm = (formData: FormData) => {
        const newErrors: Record<string, string> = {};
        const nameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/;
        const phoneRegex = /^[\d\s\-\+]{9,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const firstName = formData.get('firstName') as string;
        if (!nameRegex.test(firstName)) {
            newErrors.firstName = "Imię nie może zawierać cyfr ani znaków specjalnych.";
        }

        const lastName = formData.get('lastName') as string;
        if (!nameRegex.test(lastName)) {
            newErrors.lastName = "Nazwisko nie może zawierać cyfr ani znaków specjalnych.";
        }

        const phone = formData.get('phone') as string;
        if (!phoneRegex.test(phone)) {
            newErrors.phone = "Podaj poprawny numer telefonu (min. 9 cyfr).";
        }

        const email = formData.get('email') as string;
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Podaj poprawny adres e-mail.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        if (!validateForm(formData)) {
            return;
        }

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            description: formData.get('description'),
            preferredDays: selectedDays,
            preferredTimes: selectedTimes,
            source: 'website_contact_form'
        };

        try {
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            if (!webhookUrl) {
                console.error("Webhook URL not defined in env");
                alert("Błąd konfiguracji formularza. Skontaktuj się z nami telefonicznie.");
                return;
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Reset states after showing success message
                setSelectedDays([]);
                setSelectedTimes([]);
                setErrors({});
                // e.target.reset() is not needed as the form unmounts, but good practice if we were staying
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.');
        }
    };

    const renderInputError = (fieldName: string) => {
        return errors[fieldName] ? (
            <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors[fieldName]}</span>
        ) : null;
    };

    const inputStyle = (fieldName: string) => ({
        border: errors[fieldName] ? '1px solid #ef4444' : undefined
    });

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <ScrollReveal>
                    <div className="contact-wrapper">
                        <div className="contact-info">
                            <span className="section-title" style={{ textAlign: 'left' }}>OSTATNI KROK</span>
                            <h2>Gotowy na <span style={{ color: '#06b6d4' }}>Przyszłość?</span></h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '24px' }}>Przestań tracić czas na procesy, które mogą dziać się same. Umów się na darmowy audyt. <br /><br /><span style={{ color: '#4ade80', fontWeight: 'bold' }}>Wystarczy 20-30 minut</span>, abyśmy znaleźli potencjał do automatyzacji w Twojej firmie.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '8px', borderRadius: '50%' }}><CheckCircleIcon /></div><span style={{ fontWeight: '500' }}>Otrzymasz konkretny plan działania w 24h</span></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '8px', borderRadius: '50%' }}><CheckCircleIcon /></div><span style={{ fontWeight: '500' }}>Poufność gwarantowana (NDA)</span></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '8px', borderRadius: '50%' }}><CheckCircleIcon /></div><span style={{ fontWeight: '500' }}>Mówimy językiem biznesu, nie kodu</span></div>
                            </div>
                        </div>

                        <div className="contact-form-container" style={{ position: 'relative', minHeight: '600px' }}>
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="success-message"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            textAlign: 'center',
                                            padding: '40px',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                            style={{
                                                color: '#4ade80',
                                                marginBottom: '24px',
                                                background: 'rgba(74, 222, 128, 0.1)',
                                                padding: '20px',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            style={{
                                                fontSize: '2rem',
                                                marginBottom: '16px',
                                                background: 'linear-gradient(to right, #fff, #94a3b8)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            Zgłoszenie wysłane!
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            style={{
                                                color: '#94a3b8',
                                                marginBottom: '32px',
                                                fontSize: '1.1rem',
                                                maxWidth: '400px'
                                            }}
                                        >
                                            Dziękujemy za kontakt. Odezwiemy się do Ciebie w ciągu 24 godzin z propozycją terminu rozmowy.
                                        </motion.p>

                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            onClick={() => setIsSubmitted(false)}
                                            className="btn-cta secondary"
                                            style={{
                                                padding: '12px 24px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Wyślij kolejne zgłoszenie
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, display: 'none' }}
                                        transition={{ duration: 0.3 }}
                                        className="contact-form"
                                        onSubmit={handleContactSubmit}
                                    >
                                        <h3 style={{ marginBottom: '24px' }}>Zarezerwuj Termin</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Imię</label>
                                                <input type="text" name="firstName" className="form-input" placeholder="Twoje imię" required style={inputStyle('firstName')} />
                                                {renderInputError('firstName')}
                                            </div>
                                            <div className="form-group">
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Nazwisko</label>
                                                <input type="text" name="lastName" className="form-input" placeholder="Twoje nazwisko" required style={inputStyle('lastName')} />
                                                {renderInputError('lastName')}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Email Firmowy</label>
                                            <input type="email" name="email" className="form-input" placeholder="name@company.com" required style={inputStyle('email')} />
                                            {renderInputError('email')}
                                        </div>
                                        <div className="form-group">
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Telefon</label>
                                            <input type="tel" name="phone" className="form-input" placeholder="+48 ..." required style={inputStyle('phone')} />
                                            {renderInputError('phone')}
                                        </div>
                                        <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Opis Oczekiwań / Wyzwanie</label><textarea name="description" className="form-textarea" rows={3} placeholder="Co chcesz usprawnić w swojej firmie? Jakie masz oczekiwania?" required></textarea></div>
                                        <div className="selection-group"><span className="selection-label">Preferowane Dni:</span><div className="selection-options">{['Pon', 'Wt', 'Śr', 'Czw', 'Pt'].map(day => (<button key={day} type="button" className={`toggle-btn ${selectedDays.includes(day) ? 'selected' : ''}`} onClick={() => toggleDay(day)}>{day}</button>))}</div></div>
                                        <div className="selection-group"><span className="selection-label">Preferowane Godziny:</span><div className="selection-options">{['9:00 - 12:00', '12:00 - 15:00', '15:00 - 17:00'].map(time => (<button key={time} type="button" className={`toggle-btn ${selectedTimes.includes(time) ? 'selected' : ''}`} onClick={() => toggleTime(time)}>{time}</button>))}</div></div>
                                        <button type="submit" className="btn-cta primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}>Wyślij Zgłoszenie <ArrowRightIcon /></button>
                                        <p style={{ fontSize: '0.8rem', color: '#52525b', marginTop: '16px', textAlign: 'center' }}>100% spamu free. Twoje dane są bezpieczne.</p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactSection;
