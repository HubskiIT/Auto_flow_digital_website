import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '../common/Icons';

interface NavbarProps {
    scrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    scrollToSection: (e: React.MouseEvent, id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, mobileMenuOpen, setMobileMenuOpen, scrollToSection }) => {
    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo">AUTO FLOW <span className="text-accent">DIGITAL</span></div>
                <div className="desktop-menu">
                    <a href="#problem" className="nav-link" onClick={(e) => scrollToSection(e, 'problem')}>Problem</a>
                    <a href="#mission" className="nav-link" onClick={(e) => scrollToSection(e, 'mission')}>Misja</a>
                    <a href="#solutions" className="nav-link" onClick={(e) => scrollToSection(e, 'solutions')}>Rozwiązania</a>
                    <a href="#arsenal" className="nav-link" onClick={(e) => scrollToSection(e, 'arsenal')}>Arsenał</a>
                    <a href="#websites" className="nav-link" onClick={(e) => scrollToSection(e, 'websites')}>Strony WWW</a>
                    <a href="#process" className="nav-link" onClick={(e) => scrollToSection(e, 'process')}>Proces</a>
                    <a href="#reviews" className="nav-link" onClick={(e) => scrollToSection(e, 'reviews')}>Opinie</a>
                    <a href="#faq" className="nav-link" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
                    import {Link} from 'react-router-dom';

                // ... inside component
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/calendar" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors hidden xl:block">
                        App / Login
                    </Link>
                    <a href="#contact" className="btn-cta primary desktop-cta" onClick={(e) => scrollToSection(e, 'contact')}>Darmowa Konsultacja</a>
                </div>

                <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    <a href="#problem" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'problem'); setMobileMenuOpen(false); }}>Problem</a>
                    <a href="#mission" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'mission'); setMobileMenuOpen(false); }}>Misja</a>
                    <a href="#solutions" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'solutions'); setMobileMenuOpen(false); }}>Rozwiązania</a>
                    <a href="#arsenal" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'arsenal'); setMobileMenuOpen(false); }}>Arsenał</a>
                    <a href="#websites" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'websites'); setMobileMenuOpen(false); }}>Strony WWW</a>
                    <a href="#process" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'process'); setMobileMenuOpen(false); }}>Proces</a>
                    <a href="#reviews" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'reviews'); setMobileMenuOpen(false); }}>Opinie</a>
                    <a href="#faq" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'faq'); setMobileMenuOpen(false); }}>FAQ</a>
                    <a href="#contact" className="btn-cta primary" onClick={(e) => { scrollToSection(e, 'contact'); setMobileMenuOpen(false); }}>Darmowa Konsultacja</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
