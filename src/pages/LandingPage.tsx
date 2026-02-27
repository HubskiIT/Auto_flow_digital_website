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
import { useTheme } from '@/src/hooks/useTheme';
import StickyCTA from '@/src/components/common/StickyCTA';

export const LandingPage: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const scrollToSection = (e?: React.MouseEvent | React.TouchEvent, id: string = 'contact') => {
        if (e && 'preventDefault' in e) e.preventDefault();
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
                color={theme === 'light' ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.05)"}
                glowColor={theme === 'light' ? "rgba(37, 99, 235, 0.4)" : "rgba(6, 182, 212, 0.5)"}
                speedScale={0.3}
            />

            <Navbar
                scrolled={scrolled}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                scrollToSection={scrollToSection}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <HeroSection scrollToContact={(e) => scrollToSection(e, 'contact')} />

            <ProblemSection />

            <AuditSection />

            <section id="demo" className="section" style={{ background: theme === 'light' ? 'rgba(241, 245, 249, 0.5)' : 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <ScrollReveal>
                        <span className="section-title">Zobacz to w akcji</span>
                        <h2 className="section-headline">Jak to działa <span style={{ color: theme === 'light' ? 'var(--accent-blue)' : '#06b6d4' }}>naprawdę?</span></h2>
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

            <ContactSection />
            <StickyCTA onClick={() => scrollToSection()} />
            <Footer />
        </>
    );
};
