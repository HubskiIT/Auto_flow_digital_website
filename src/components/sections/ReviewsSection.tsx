import React from 'react';
import ScrollReveal from '../common/ScrollReveal';
import { StarIcon } from '../common/Icons';

const ReviewsSection = () => {
    return (
        <section id="reviews" className="section">
            <div className="container">
                <ScrollReveal>
                    <span className="section-title">Dowody Skuteczności</span>
                    <h2 className="section-headline">Liczby nie kłamią</h2>
                </ScrollReveal>
                <div className="grid-3">
                    <ScrollReveal delay={0}>
                        <div className="card">
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                            <h3>E-commerce Fashion</h3>
                            <p>"Wdrożenie bota AI do obsługi zwrotów i pytań o rozmiary zredukowało liczbę ticketów o 70%. Zespół wreszcie zajął się sprzedażą."</p>
                            <div style={{ marginTop: '20px', fontWeight: '700', color: '#06b6d4' }}>Oszczędność: 40h / tyg</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <div className="card">
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                            <h3>Agencja Nieruchomości</h3>
                            <p>"Lead scoring i automatyczne potwierdzenia spotkań sprawiły, że nasi agenci przestali jeździć na puste spotkania. Konwersja wzrosła dwukrotnie."</p>
                            <div style={{ marginTop: '20px', fontWeight: '700', color: '#06b6d4' }}>Wzrost konwersji: +210%</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <div className="card">
                            <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                            <h3>Usługi B2B</h3>
                            <p>"Automatyzacja generowania umów i faktur skróciła proces onboardingu klienta z 3 dni do 15 minut. Klienci są zachwyceni."</p>
                            <div style={{ marginTop: '20px', fontWeight: '700', color: '#06b6d4' }}>Czas procesu: -95%</div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
