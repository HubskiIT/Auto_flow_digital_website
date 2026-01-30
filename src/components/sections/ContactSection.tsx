import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { ArrowRightIcon, CheckCircleIcon } from '../common/Icons';

const ContactSection = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    const toggleTime = (time: string) => {
        setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
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
                alert('Dziękujemy! Skontaktujemy się z Tobą wkrótce.');
                (e.target as HTMLFormElement).reset();
                setSelectedDays([]);
                setSelectedTimes([]);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.');
        }
    };

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

                        <form className="contact-form" onSubmit={handleContactSubmit}>
                            <h3 style={{ marginBottom: '24px' }}>Zarezerwuj Termin</h3>
                            <div className="form-row">
                                <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Imię</label><input type="text" name="firstName" className="form-input" placeholder="Twoje imię" required /></div>
                                <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Nazwisko</label><input type="text" name="lastName" className="form-input" placeholder="Twoje nazwisko" required /></div>
                            </div>
                            <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Email Firmowy</label><input type="email" name="email" className="form-input" placeholder="name@company.com" required /></div>
                            <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Telefon</label><input type="tel" name="phone" className="form-input" placeholder="+48 ..." required /></div>
                            <div className="form-group"><label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Opis Oczekiwań / Wyzwanie</label><textarea name="description" className="form-textarea" rows={3} placeholder="Co chcesz usprawnić w swojej firmie? Jakie masz oczekiwania?" required></textarea></div>
                            <div className="selection-group"><span className="selection-label">Preferowane Dni:</span><div className="selection-options">{['Pon', 'Wt', 'Śr', 'Czw', 'Pt'].map(day => (<button key={day} type="button" className={`toggle-btn ${selectedDays.includes(day) ? 'selected' : ''}`} onClick={() => toggleDay(day)}>{day}</button>))}</div></div>
                            <div className="selection-group"><span className="selection-label">Preferowane Godziny:</span><div className="selection-options">{['9:00 - 12:00', '12:00 - 15:00', '15:00 - 17:00'].map(time => (<button key={time} type="button" className={`toggle-btn ${selectedTimes.includes(time) ? 'selected' : ''}`} onClick={() => toggleTime(time)}>{time}</button>))}</div></div>
                            <button type="submit" className="btn-cta primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}>Wyślij Zgłoszenie <ArrowRightIcon /></button>
                            <p style={{ fontSize: '0.8rem', color: '#52525b', marginTop: '16px', textAlign: 'center' }}>100% spamu free. Twoje dane są bezpieczne.</p>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactSection;
