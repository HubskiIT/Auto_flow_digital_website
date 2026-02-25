import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                body: JSON.stringify({ email, source: 'newsletter_section' }),
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
        <section className="relative overflow-hidden py-5 border-y border-white/[0.06]">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[#0b0b15] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-blue-600/5 -z-10" />

            <div className="container">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">

                        {/* Left: label + copy */}
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="hidden md:flex w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 items-center justify-center text-sm">
                                📬
                            </span>
                            <div>
                                <p className="text-white font-semibold text-sm leading-tight">Newsletter AI</p>
                                <p className="text-gray-500 text-xs">Trendy + scenariusze każdy tydzień</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-8 bg-white/[0.07] shrink-0" />

                        {/* Center: form */}
                        {status === 'success' ? (
                            <div className="flex-grow flex items-center gap-2 text-green-400 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Zapisano! Sprawdź skrzynkę e-mail.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex-grow flex gap-2 max-w-md">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                        <svg className="h-3.5 w-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Twój e-mail"
                                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="shrink-0 px-4 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all disabled:opacity-60 flex items-center gap-1.5 whitespace-nowrap"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Zapisz się</>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="absolute bottom-0 left-0 text-red-400 text-xs mt-1">Błąd – spróbuj ponownie</p>
                                )}
                            </form>
                        )}

                        {/* Right: blog CTA */}
                        <div className="shrink-0 ml-auto">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-all group"
                            >
                                Baza wiedzy
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default NewsletterSection;
