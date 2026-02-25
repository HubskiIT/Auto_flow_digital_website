import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import ScrollReveal from '../common/ScrollReveal';

const LatestPostsSection = () => {
    const latestPosts = [...blogPosts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 3);

    const [featured, second, third] = latestPosts;

    return (
        <section id="latest-posts" className="section relative overflow-hidden py-28">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-[#08080f] to-dark-bg -z-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-[100px] -z-10" />

            <div className="container">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                Baza Wiedzy
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Najnowsze <span className="text-gradient">Artykuły</span>
                            </h2>
                            <p className="text-gray-500 mt-3 max-w-lg text-base leading-relaxed">
                                Praktyczna wiedza o AI i automatyzacji – case studies, poradniki i trendy.
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="group hidden md:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 shrink-0"
                        >
                            Wszystkie artykuły
                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </ScrollReveal>

                {latestPosts.length === 0 ? (
                    <ScrollReveal>
                        <div className="text-center py-24 text-gray-600">
                            <p className="text-5xl mb-4">📚</p>
                            <p className="text-lg font-medium text-white/30">Artykuły wkrótce</p>
                            <p className="text-sm text-white/20 mt-1">Pracujemy nad nową bazą wiedzy.</p>
                        </div>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal>
                        <div className="bento-grid">
                            {/* Featured / Main card */}
                            {featured && (
                                <Link to={`/blog/${featured.slug}`} className="bento-card bento-main">
                                    {featured.imageUrl && (
                                        <img
                                            src={featured.imageUrl}
                                            alt={featured.imageAlt}
                                            className="bento-card-img"
                                            loading="lazy"
                                        />
                                    )}
                                    <span className="bento-tag">🔥 Nowość</span>
                                    <span className="bento-read-time">⏱ {featured.readTime}</span>
                                    <div className="bento-content">
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {featured.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3>{featured.title}</h3>
                                        <p>{featured.excerpt.slice(0, 90)}…</p>
                                        <div className="bento-meta">
                                            <span>{featured.author}</span>
                                            <span>·</span>
                                            <span>{new Date(featured.publishDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Second card */}
                            {second && (
                                <Link to={`/blog/${second.slug}`} className="bento-card bento-small bento-bg-1">
                                    {second.imageUrl && (
                                        <img
                                            src={second.imageUrl}
                                            alt={second.imageAlt}
                                            className="bento-card-img"
                                            loading="lazy"
                                        />
                                    )}
                                    <span className="bento-read-time">⏱ {second.readTime}</span>
                                    <div className="bento-content">
                                        <div className="flex gap-2 mb-2 flex-wrap">
                                            {second.tags.slice(0, 1).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3>{second.title}</h3>
                                        <div className="bento-meta">
                                            <span>{new Date(second.publishDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Third card */}
                            {third && (
                                <Link to={`/blog/${third.slug}`} className="bento-card bento-small bento-bg-2">
                                    {third.imageUrl && (
                                        <img
                                            src={third.imageUrl}
                                            alt={third.imageAlt}
                                            className="bento-card-img"
                                            loading="lazy"
                                        />
                                    )}
                                    <span className="bento-read-time">⏱ {third.readTime}</span>
                                    <div className="bento-content">
                                        <div className="flex gap-2 mb-2 flex-wrap">
                                            {third.tags.slice(0, 1).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3>{third.title}</h3>
                                        <div className="bento-meta">
                                            <span>{new Date(third.publishDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </ScrollReveal>
                )}

                {/* Mobile CTA */}
                <div className="text-center md:hidden mt-8">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all"
                    >
                        Zobacz wszystkie wpisy
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestPostsSection;
