import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SEO } from '@/src/components/common/SEO';
import { RelatedPosts } from '@/src/components/blog/RelatedPosts';
import { AudioPlayer } from '@/src/components/blog/AudioPlayer';
import { blogPosts } from '@/src/data/blogPosts';

export const BlogPostPage: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const publishDate = new Date(post.publishDate);

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole
        },
        "publisher": {
            "@type": "Organization",
            "name": "AutoFlow Digital",
            "logo": {
                "@type": "ImageObject",
                "url": "https://autoflowdigital.pl/logo.png"
            }
        },
        "datePublished": post.publishDate,
        "dateModified": post.publishDate,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://autoflowdigital.pl/blog/${post.slug}`
        }
    };

    return (
        <div className="bp-page">
            <SEO
                title={post.title}
                description={post.excerpt}
                url={`https://autoflowdigital.pl/blog/${post.slug}`}
                image={post.imageUrl}
                type="article"
            />

            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>

            <Navbar scrolled={true} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} scrollToSection={scrollToSection} />

            <main className="bp-main">
                {/* ── HERO ── */}
                <section className="bp-hero">
                    {/* Breadcrumb */}
                    <nav className="bp-breadcrumb">
                        <Link to="/blog">BLOG</Link>
                        {post.tags[0] && (
                            <>
                                <span className="bp-breadcrumb-sep"> / </span>
                                <span>{post.tags[0].toUpperCase()}</span>
                            </>
                        )}
                    </nav>

                    {/* Title */}
                    <h1 className="bp-title">{post.title}</h1>

                    {/* Lead */}
                    <p className="bp-lead">{post.excerpt}</p>

                    {/* Author row */}
                    <div className="bp-author-row">
                        <div className="bp-author-avatar">
                            {post.author.charAt(0)}
                        </div>
                        <div className="bp-author-info">
                            <span className="bp-author-name">{post.author}</span>
                            <span className="bp-author-meta">
                                <time dateTime={post.publishDate}>
                                    {publishDate.toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                                <span className="bp-dot">·</span>
                                <span>{post.readTime} czytania</span>
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bp-tags">
                        {post.tags.map(tag => (
                            <span key={tag} className="bp-tag">{tag}</span>
                        ))}
                    </div>
                </section>

                {/* ── HERO IMAGE ── */}
                {post.imageUrl && (
                    <div className="bp-image-wrap">
                        <img
                            src={post.imageUrl}
                            alt={post.imageAlt}
                            className="bp-image"
                        />
                    </div>
                )}

                {/* ── CONTENT ── */}
                <article className="bp-content">
                    {post.audioUrl && (
                        <div className="mb-8">
                            <AudioPlayer src={post.audioUrl} title={`Posłuchaj: ${post.title}`} />
                        </div>
                    )}
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* ── CTA ── */}
                <div className="bp-cta-box">
                    <h3 className="bp-cta-title">Gotowy na automatyzację swojego biznesu?</h3>
                    <p className="bp-cta-text">
                        Umów się na bezpłatną konsultację i dowiedz się, jak AI może odciążyć Twój zespół.
                    </p>
                    <a href="/kalendarz" className="bp-cta-btn">
                        Umów bezpłatną konsultację →
                    </a>
                </div>
            </main>

            <RelatedPosts currentPost={post} allPosts={blogPosts} />
            <Footer />
        </div>
    );
};
