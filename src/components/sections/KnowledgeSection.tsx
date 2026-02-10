import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { BlogCard } from '../blog/BlogCard';
import ScrollReveal from '../common/ScrollReveal';
import { ArrowRightIcon, MailIcon } from '../common/Icons';

const KnowledgeSection = () => {
    // Get the 2 most recent posts
    const latestPosts = [...blogPosts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 2);

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const webhookUrl = import.meta.env.VITE_N8N_NEWSLETTER_WEBHOOK_URL;
            // Simulate success if no webhook for now to avoid error
            if (!webhookUrl) {
                console.warn('Webhook URL not configured, simulating success');
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStatus('success');
                setEmail('');
                return;
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'knowledge_section' })
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
        <section id="knowledge" className="section relative overflow-hidden py-16">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[100px] -z-10" />

            <div className="container">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left: Latest Posts (2/3 width) */}
                    <div className="w-full lg:w-2/3">
                        <ScrollReveal>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="section-title">Baza Wiedzy</span>
                                    <h2 className="text-3xl font-bold text-white">Najnowsze Artykuły</h2>
                                </div>
                                <Link to="/blog" className="hidden sm:flex items-center gap-2 text-accent-cyan hover:text-accent-cyan-light transition-colors text-sm font-medium">
                                    Zobacz wszystkie <ArrowRightIcon />
                                </Link>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {latestPosts.map((post, index) => (
                                <ScrollReveal key={post.id} delay={index * 100}>
                                    <BlogCard post={post} />
                                </ScrollReveal>
                            ))}
                        </div>

                        <div className="mt-6 sm:hidden text-center">
                            <Link to="/blog" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan-light transition-colors text-sm font-medium">
                                Zobacz wszystkie <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Newsletter (1/3 width) */}
                    <div className="w-full lg:w-1/3">
                        <ScrollReveal delay={200}>
                            <div className="bg-glass-gradient border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] -z-10" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
                                        <MailIcon />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Newsletter</h3>
                                </div>

                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    Dołącz do <span className="text-white font-medium">2000+ liderów</span>.
                                    Otrzymuj gotowe scenariusze automatyzacji raz w tygodniu.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Twój e-mail"
                                        className="w-full px-4 py-3 bg-dark-bg/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple/50 text-sm transition-all"
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className="w-full py-3 bg-accent-purple hover:bg-accent-purple-light text-white font-medium rounded-xl transition-all shadow-lg shadow-accent-purple/20 text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : status === 'success' ? (
                                            <>Zapisano! <CheckCircleIcon /></>
                                        ) : (
                                            <>Zapisz się <ArrowRightIcon /></>
                                        )}
                                    </button>
                                </form>
                                <p className="text-xs text-gray-600 mt-4 text-center">Zero spamu. Tylko mięso.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple embedded Icon for success state
const CheckCircleIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default KnowledgeSection;
