import React, { useState } from 'react';
import { SEO } from '@/src/components/common/SEO';
import AuditSection from '@/src/components/sections/AuditSection';
import DottedGlowBackground from '@/src/components/common/DottedGlowBackground';
import ChatDemo from '@/src/components/features/ChatDemo';
import ScrollReveal from '@/src/components/common/ScrollReveal';
import InfiniteTicker from '@/src/components/common/InfiniteTicker';
import HeroSection from '@/src/components/sections/HeroSection';
import ProblemSection from '@/src/components/sections/ProblemSection';
import MissionSection from '@/src/components/sections/MissionSection';
import SolutionsSection from '@/src/components/sections/SolutionsSection';
import VisionSection from '@/src/components/sections/VisionSection';
import ArsenalSection from '@/src/components/sections/ArsenalSection';
import WebsitesSection from '@/src/components/sections/WebsitesSection';
import ProcessSection from '@/src/components/sections/ProcessSection';
import CaseStudiesSection from '@/src/components/sections/CaseStudiesSection';
import ReviewsSection from '@/src/components/sections/ReviewsSection';
import LatestPostsSection from '@/src/components/sections/LatestPostsSection';
import NewsletterSection from '@/src/components/sections/NewsletterSection';
import FaqSection from '@/src/components/sections/FaqSection';
import ContactSection from '@/src/components/sections/ContactSection';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import ROICalculator from '@/src/components/tools/ROICalculator';

export const LandingPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Add scroll listener logic if needed, or pass props
    // Re-implementing scrollToSection logic
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
            <SEO />
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

            <HeroSection scrollToContact={(e) => scrollToSection(e, 'contact')} />

            <ROICalculator />

            <ProblemSection />

            <MissionSection />

            <AuditSection />

            <section style={{ padding: '0 0 100px 0' }}><InfiniteTicker /></section>

            <section id="demo" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <ScrollReveal>
                        <span className="section-title">Zobacz to w akcji</span>
                        <h2 className="section-headline">Jak to działa <span style={{ color: '#06b6d4' }}>naprawdę?</span></h2>
                        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>To nie magia. To precyzyjnie zaprojektowany system. Zobacz, co dzieje się "pod maską", gdy Twój klient wysyła wiadomość.</p>
                        <ChatDemo />
                    </ScrollReveal>
                </div>
            </section>

            <SolutionsSection />
            <VisionSection />
            <ArsenalSection />

            <WebsitesSection />
            <ProcessSection />
            <CaseStudiesSection />
            <ReviewsSection />

            <LatestPostsSection />
            <NewsletterSection />

            <FaqSection />
            <ContactSection />
            <Footer />
        </>
    );
};
