import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';

const BENEFITS = [
    {
        icon: '⚡',
        title: 'Gotowe scenariusze AI',
        desc: 'Automatyzacje gotowe do skopiowania – bez kodowania',
    },
    {
        icon: '📊',
        title: 'Case Studies co tydzień',
        desc: 'Realne liczby: ROI, oszczędności, czas wdrożenia',
    },
    {
        icon: '🔭',
        title: 'Trendy przed rynkiem',
        desc: 'Dowiedz się o nowych narzędziach, zanim zrobią to konkurenci',
    },
];

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
        <section className="section relative overflow-hidden py-28">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-[#0a0a14] -z-20" />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -z-10" />

            <div className="container relative z-10">
                <ScrollReveal>
                    <div className="max-w-5xl mx-auto">
                        {/* Pill label */}
                        <div className="flex justify-center mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                Newsletter – Bezpłatny
                            </span>
                        </div>

                        {/* Grid: left text + right form */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">

                            {/* LEFT – copy & benefits */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                                    Bądź o krok przed <span className="text-gradient">AI rewolucją</span>
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                    Cotygodniowa dawka wiedzy dla liderów, którzy chcą skalować biznes z pomocą sztucznej inteligencji.
                                </p>

                                {/* Benefits list */}
                                <ul className="space-y-5">
                                    {BENEFITS.map((b) => (
                                        <li key={b.title} className="flex items-start gap-4">
                                            <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-lg">
                                                {b.icon}
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm">{b.title}</p>
                                                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* RIGHT – form card */}
                            <div className="relative">
                                {/* Ambient glow */}
                                <div className="absolute -inset-6 bg-violet-600/10 rounded-3xl blur-2xl" />

                                <div className="relative bg-[#0d0d18] border border-white/[0.08] rounded-2xl p-8 md:p-10">
                                    {status === 'success' ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                                                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Jesteś na liście! 🎉</h3>
                                            <p className="text-gray-400 text-sm">Sprawdź skrzynkę i potwierdź subskrypcję.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-7">
                                                <h3 className="text-2xl font-bold text-white mb-1">Dołącz do 2000+ liderów</h3>
                                                <p className="text-gray-500 text-sm">Wypisz się w każdej chwili – zero spamu.</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Twój firmowy e-mail"
                                                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={status === 'loading'}
                                                    className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-900/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                                >
                                                    {status === 'loading' ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            Zapisuję...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Zapisz się bezpłatnie
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                            </svg>
                                                        </>
                                                    )}
                                                </button>

                                                {status === 'error' && (
                                                    <p className="text-red-400 text-xs text-center">Coś poszło nie tak. Spróbuj ponownie.</p>
                                                )}
                                            </form>

                                            {/* Subscriber avatars */}
                                            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.05]">
                                                <div className="flex -space-x-2">
                                                    {['AF', 'MK', 'PW', 'JN'].map((initials, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-7 h-7 rounded-full border-2 border-[#0d0d18] flex items-center justify-center text-[10px] font-bold text-white"
                                                            style={{
                                                                background: `hsl(${i * 80 + 240}, 70%, 50%)`,
                                                            }}
                                                        >
                                                            {initials}
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-gray-500 text-xs">
                                                    Dołącz do <span className="text-gray-300 font-medium">2000+</span> subskrybentów
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default NewsletterSection;
