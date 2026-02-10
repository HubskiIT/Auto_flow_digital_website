import React from 'react';
import { Breadcrumbs } from '@/src/components/navigation/Breadcrumbs';
import DottedGlowBackground from '@/src/components/common/DottedGlowBackground';
import ScrollReveal from '@/src/components/common/ScrollReveal';
import CaseStudyCard from '@/src/components/common/CaseStudyCard';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { caseStudiesData } from '@/src/data/caseStudiesData';
import { Helmet } from 'react-helmet-async';

export const OurWorkPage: React.FC = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <Helmet>
                <title>Nasze Projekty - AutoFlow Digital | Portfolio Automatyzacji</title>
                <meta name="description" content="Zobacz prawdziwe projekty automatyzacji AI zrealizowane przez AutoFlow Digital. Case studies z branż e-commerce, usług i produkcji z konkretnymi wynikami biznesowymi." />
                <meta property="og:title" content="Nasze Projekty - AutoFlow Digital" />
                <meta property="og:description" content="Zobacz prawdziwe projekty automatyzacji AI zrealizowane przez AutoFlow Digital." />
                <link rel="canonical" href="https://autoflowdigital.pl/nasze-projekty" />
            </Helmet>

            <DottedGlowBackground
                gap={40}
                radius={1}
                color="rgba(255, 255, 255, 0.05)"
                glowColor="rgba(6, 182, 212, 0.5)"
                speedScale={0.3}
            />

            <Navbar
                scrolled={scrolled}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                scrollToSection={scrollToSection}
            />

            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="container">
                    <Breadcrumbs />
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                            <span className="section-title">Portfolio</span>
                            <h1 className="section-headline" style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
                                Nasze <span style={{ color: '#06b6d4' }}>Projekty</span>
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '60px' }}>
                                Prawdziwe case studies firm, które zautomatyzowały swoje procesy i osiągnęły wymierne rezultaty.
                                Od local businessu po e-commerce – zobacz, jak AI i automatyzacja transformują każdą branżę.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Case Studies Grid */}
                    <div className="case-study-grid">
                        {caseStudiesData.map((caseStudy, index) => (
                            <ScrollReveal key={caseStudy.id} delay={index * 100}>
                                <CaseStudyCard
                                    industry={caseStudy.industry}
                                    title={caseStudy.title}
                                    description={caseStudy.description}
                                    screenshot={caseStudy.screenshot}
                                    automations={caseStudy.automations}
                                    results={caseStudy.results}
                                    iconName={caseStudy.iconName}
                                    bgColor={caseStudy.bgColor}
                                />
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <ScrollReveal>
                        <div style={{
                            marginTop: '100px',
                            padding: '60px 40px',
                            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.6))',
                            border: '1px solid rgba(6, 182, 212, 0.2)',
                            borderRadius: '24px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

                            <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                                Gotowy na własną transformację?
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 40px', position: 'relative', zIndex: 1 }}>
                                Każdy z tych projektów zaczynał się od darmowej konsultacji. Zobacz, jakie procesy możemy zautomatyzować w Twojej firmie.
                            </p>
                            <a
                                href="/#contact"
                                className="btn-cta primary"
                                style={{ padding: '18px 40px', fontSize: '1.1rem', position: 'relative', zIndex: 1 }}
                            >
                                Umów Bezpłatną Konsultację
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </>
    );
};
