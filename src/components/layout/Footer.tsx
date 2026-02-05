import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, LinkedinIcon, MailIcon, TiktokIcon, YoutubeIcon } from '../common/Icons';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>AUTO FLOW <span style={{ color: '#06b6d4' }}>DIGITAL</span></h3>
                        <p>Twój partner w cyfrowej transformacji. Automatyzujemy nudę, abyś Ty mógł zająć się biznesem.</p>
                        <a href="mailto:contact@autoflowdigital.pl" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', marginTop: '16px', textDecoration: 'none' }}>
                            <MailIcon /> contact@autoflowdigital.pl
                        </a>
                    </div>
                    <div className="footer-col"><h4>Nawigacja</h4><div className="footer-links"><a href="#solutions" className="footer-link">Automatyzacja</a><a href="#websites" className="footer-link">Strony WWW</a><a href="#cases" className="footer-link">Branże</a><a href="#process" className="footer-link">Proces</a><a href="#reviews" className="footer-link">Opinie</a><a href="#contact" className="footer-link">Kontakt</a></div></div>
                    <div className="footer-col"><h4>Prawne</h4><div className="footer-links"><a href="#" className="footer-link">Polityka Prywatności</a><a href="#" className="footer-link">Regulamin</a><a href="#" className="footer-link">RODO</a></div></div>
                    <div className="footer-col">
                        <h4>Social Media</h4>
                        <div className="social-links" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href="https://www.linkedin.com/company/autoflowdigital" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><LinkedinIcon /></a>
                            <a href="https://www.instagram.com/autoflowdigital" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><InstagramIcon /></a>
                            <a href="#" className="social-icon" aria-label="Facebook"><FacebookIcon /></a>
                            <a href="#" className="social-icon" aria-label="TikTok"><TiktokIcon /></a>
                            <a href="#" className="social-icon" aria-label="YouTube"><YoutubeIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">&copy; {new Date().getFullYear()} Auto Flow Digital. Wszelkie prawa zastrzeżone.</div>
                    <div style={{ color: '#52525b', fontSize: '0.8rem' }}>Designed for Future.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
