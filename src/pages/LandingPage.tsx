import React, { useState } from 'react';
import { SEO } from '@/src/components/common/SEO';
import { SchemaOrg } from '@/src/components/seo/SchemaOrg';
import AuditSection from '@/src/components/sections/AuditSection';
import DottedGlowBackground from '@/src/components/common/DottedGlowBackground';
import InfiniteTicker from '@/src/components/common/InfiniteTicker';
import ScrollReveal from '@/src/components/common/ScrollReveal';
import ChatDemo from '@/src/components/features/ChatDemo';
import WebsitesSection from '@/src/components/sections/WebsitesSection';
import HeroSection from '@/src/components/sections/HeroSection';
import ProblemSection from '@/src/components/sections/ProblemSection';
import SolutionsSection from '@/src/components/sections/SolutionsSection';
import ArsenalSection from '@/src/components/sections/ArsenalSection';
import ProcessSection from '@/src/components/sections/ProcessSection';
import CaseStudiesSection from '@/src/components/sections/CaseStudiesSection';
import ReviewsSection from '@/src/components/sections/ReviewsSection';
import FaqSection from '@/src/components/sections/FaqSection';
import ContactSection from '@/src/components/sections/ContactSection';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import ROICalculator from '@/src/components/tools/ROICalculator';
import KnowledgeSection from '@/src/components/sections/KnowledgeSection';

export const LandingPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Add scroll listener logic if needed, or pass props
    // Re-implementing scrollToSection logic
    const scrollToSection = (e: React.MouseEvent, id: string) => {
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
            <SchemaOrg />
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

            {/* <ROICalculator /> - Removed for simplified narrative */}

            <ProblemSection />

            <AuditSection />

            {/* <section style={{ padding: '0 0 100px 0' }}><InfiniteTicker /></section> - Removed for simplified narrative */}

            <section id="demo" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <ScrollReveal>
                        <span className="section-title">Zobacz to w akcji</span>
                        <h2 className="section-headline">Jak to działa <span style={{ color: '#06b6d4' }}>naprawdę?</span></h2>
                        <ChatDemo />
                    </ScrollReveal>
                </div>
            </section>

            <SolutionsSection />

            <WebsitesSection />
            <ArsenalSection />

            <ProcessSection />
            <ReviewsSection />
            <CaseStudiesSection />
            <KnowledgeSection />

            {/* <FaqSection /> - Removed for simplified narrative */}
            <ContactSection />

            <Footer />
        </>
    );
};
