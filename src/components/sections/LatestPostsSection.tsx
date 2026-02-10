import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { BlogCard } from '../blog/BlogCard';
import ScrollReveal from '../common/ScrollReveal';

const LatestPostsSection = () => {
    // Get the 3 most recent posts
    const latestPosts = [...blogPosts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 3);

    return (
        <section id="latest-posts" className="section relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] -z-10" />

            <div className="container">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="section-title">Baza Wiedzy</span>
                        <h2 className="section-headline mb-6">Najnowsze Artykuły</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Poznaj najnowsze trendy w automatyzacji, praktyczne poradniki i case studies.
                            Dzielimy się wiedzą, która pomaga firmom rosnąć szybciej.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {latestPosts.map((post, index) => (
                        <ScrollReveal key={post.id} delay={index * 100}>
                            <BlogCard post={post} />
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={300}>
                    <div className="text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-glass-gradient border border-white/10 rounded-full text-white font-medium hover:bg-white/5 transition-all group"
                        >
                            Zobacz wszystkie wpisy
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
