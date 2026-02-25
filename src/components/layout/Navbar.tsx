import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '../common/Icons';
import ThemeToggle from '../common/ThemeToggle';

interface NavbarProps {
    scrolled: boolean;
    mobileMenuOpen?: boolean;
    setMobileMenuOpen?: (open: boolean) => void;
    scrollToSection?: (e: React.MouseEvent, id: string) => void;
    theme?: 'dark' | 'light';
    toggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, mobileMenuOpen = false, setMobileMenuOpen = () => { }, scrollToSection = () => { }, theme = 'dark', toggleTheme = () => { } }) => {
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
                    <a href="#solutions" className="nav-link" onClick={(e) => scrollToSection(e, 'solutions')}>Automatyzacja</a>
                    <a href="#websites" className="nav-link" onClick={(e) => scrollToSection(e, 'websites')}>Strony WWW</a>
                    <a href="#cases" className="nav-link" onClick={(e) => scrollToSection(e, 'cases')}>Branże</a>
                    <a href="#process" className="nav-link" onClick={(e) => scrollToSection(e, 'process')}>Proces</a>
                    <a href="#reviews" className="nav-link" onClick={(e) => scrollToSection(e, 'reviews')}>Opinie</a>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    <a href="#contact" className="btn-cta primary desktop-cta" onClick={(e) => scrollToSection(e, 'contact')}>Darmowa Konsultacja</a>
                </div>

                <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    <a href="#solutions" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'solutions'); setMobileMenuOpen(false); }}>Automatyzacja</a>
                    <a href="#websites" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'websites'); setMobileMenuOpen(false); }}>Strony WWW</a>
                    <a href="#cases" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'cases'); setMobileMenuOpen(false); }}>Branże</a>
                    <a href="#process" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'process'); setMobileMenuOpen(false); }}>Proces</a>
                    <a href="#reviews" className="mobile-nav-link" onClick={(e) => { scrollToSection(e, 'reviews'); setMobileMenuOpen(false); }}>Opinie</a>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    </div>
                    <a href="#contact" className="btn-cta primary" onClick={(e) => { scrollToSection(e, 'contact'); setMobileMenuOpen(false); }}>Darmowa Konsultacja</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
