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
    React.useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>AUTO FLOW <span className="text-accent">DIGITAL</span></a>
                <div className="desktop-menu">
                    <a href="#problem" className="nav-link" onClick={(e) => scrollToSection(e, 'problem')}>Problem</a>
                    <a href="#mission" className="nav-link" onClick={(e) => scrollToSection(e, 'mission')}>Misja</a>
                    <a href="#solutions" className="nav-link" onClick={(e) => scrollToSection(e, 'solutions')}>Rozwiązania</a>
                    <a href="#arsenal" className="nav-link" onClick={(e) => scrollToSection(e, 'arsenal')}>Arsenał</a>
                    <a href="#websites" className="nav-link" onClick={(e) => scrollToSection(e, 'websites')}>Strony WWW</a>
                    <a href="#process" className="nav-link" onClick={(e) => scrollToSection(e, 'process')}>Proces</a>
                    <Link to="/nasze-projekty" className="nav-link">Projekty</Link>
                    <Link to="/katalog-automatyzacji" className="nav-link" style={{ color: 'var(--accent-cyan)' }}>Katalog</Link>
                    <a href="#reviews" className="nav-link" onClick={(e) => scrollToSection(e, 'reviews')}>Opinie</a>
                    <a href="#audit" className="nav-link" style={{ color: '#06b6d4', fontWeight: 'bold' }} onClick={(e) => scrollToSection(e, 'audit')}>Audyt</a>
                    <a href="#faq" className="nav-link" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>

                </div>
                <div className="flex items-center gap-4">

                    <a href="#contact" className="btn-cta primary desktop-cta" onClick={(e) => scrollToSection(e, 'contact')}>Darmowa Konsultacja</a>
                </div>

                <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                    <Link to="/nasze-projekty" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Projekty</Link>
                    <Link to="/katalog-automatyzacji" className="mobile-nav-link" style={{ color: 'var(--accent-cyan)' }} onClick={() => setMobileMenuOpen(false)}>Katalog</Link>
                    <a href="#reviews" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'reviews'); setMobileMenuOpen(false); }}>Opinie</a>
                    <a href="#audit" className="mobile-nav-link" style={{ color: '#06b6d4' }} onClick={(e) => { scrollToSection(e, 'audit'); setMobileMenuOpen(false); }}>Audyt</a>
                    <a href="#faq" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'faq'); setMobileMenuOpen(false); }}>FAQ</a>
                    <a href="#contact" className="btn-cta primary" onClick={(e) => { scrollToSection(e, 'contact'); setMobileMenuOpen(false); }}>Darmowa Konsultacja</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
