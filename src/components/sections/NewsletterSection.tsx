import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const webhookUrl = import.meta.env.VITE_N8N_NEWSLETTER_WEBHOOK_URL;
            if (!webhookUrl) throw new Error('Webhook URL not configured');

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'newsletter_section' })
            });

            if (!response.ok) throw new Error('Submission failed');

            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="section relative overflow-hidden py-24">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-[#0B0F19] -z-20" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10 mix-blend-overlay" />

            <div className="container relative z-10">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto relative">
                        {/* Glass Container */}
                        <div className="bg-glass-gradient border border-white/10 rounded-3xl p-8 md:p-16 text-center backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">

                            {/* Decorative Glows */}
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-purple/20 rounded-full blur-[80px] group-hover:bg-accent-purple/30 transition-all duration-500" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-blue/20 rounded-full blur-[80px] group-hover:bg-accent-blue/30 transition-all duration-500" />

                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-medium mb-6">
                                Newsletter
                            </span>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Dołącz do <span className="text-gradient">2000+ Liderów</span> Automatyzacji
                            </h2>

                            <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                                Otrzymuj cotygodniową dawkę wiedzy o AI, gotowe scenariusze automatyzacji i ekskluzywne porady, których nie publikujemy na blogu.
                            </p>

                            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative flex flex-col md:flex-row gap-4">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Twój firmowy e-mail"
                                        className="w-full pl-11 pr-4 py-4 bg-dark-card border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 transition-all hover:bg-white/5"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="px-8 py-4 bg-accent-purple hover:bg-accent-purple-light text-white font-medium rounded-xl transition-all shadow-lg shadow-accent-purple/20 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center relative overflow-hidden group"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : status === 'success' ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Zapisano!
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Zapisz się
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </form>

                            <p className="text-gray-500 text-sm mt-6">
                                Zero spamu. Wypisz się w każdym momencie.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default NewsletterSection;
