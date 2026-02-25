import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { BlogCard } from '../blog/BlogCard';
import ScrollReveal from '../common/ScrollReveal';

const LatestPostsSection = () => {
    const latestPosts = [...blogPosts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 3);

    return (
        <section id="latest-posts" className="section relative overflow-hidden py-28">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-[#08080f] to-dark-bg -z-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-[100px] -z-10" />

            <div className="container">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                Baza Wiedzy
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Najnowsze <span className="text-gradient">Artykuły</span>
                            </h2>
                            <p className="text-gray-500 mt-3 max-w-lg text-base leading-relaxed">
                                Praktyczna wiedza o AI i automatyzacji – case studies, poradniki i trendy dla liderów biznesu.
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

                {/* Featured + Side layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {latestPosts.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 120}>
                            <BlogCard post={post} featured={index === 0} />
                        </ScrollReveal>
                    ))}
                </div>

                {/* Mobile CTA */}
                <ScrollReveal delay={300}>
                    <div className="text-center md:hidden">
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
                </ScrollReveal>
            </div>
        </section>
    );
};

export default LatestPostsSection;
