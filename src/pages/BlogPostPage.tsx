import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SEO } from '@/src/components/common/SEO';
import { Breadcrumbs } from '@/src/components/navigation/Breadcrumbs';
import { RelatedPosts } from '@/src/components/blog/RelatedPosts';
import { AudioPlayer } from '@/src/components/blog/AudioPlayer';
import { blogPosts } from '@/src/data/blogPosts';

export const BlogPostPage: React.FC = () => {
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
        <div className="min-h-screen flex flex-col">
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

            <Navbar scrolled={true} />

            <article className="blog-post-page">
                <header className="blog-post-header">
                    <div className="container">
                        <div className="blog-post-meta">
                            <time dateTime={post.publishDate}>
                                {publishDate.toLocaleDateString('pl-PL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span className="separator">•</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h1 className="blog-post-title">{post.title}</h1>
                        <p className="blog-post-excerpt">{post.excerpt}</p>
                        <div className="blog-post-author">
                            <div className="blog-post-author-info">
                                <span className="blog-post-author-name">{post.author}</span>
                                <span className="blog-post-author-role">{post.authorRole}</span>
                            </div>
                        </div>
                        <div className="blog-post-tags">
                            {post.tags.map(tag => (
                                <span key={tag} className="blog-post-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="blog-post-image">
                    <img src={post.imageUrl} alt={post.imageAlt} />
                </div>

                <div className="container">
                    <div className="blog-post-content">
                        {post.audioUrl && (
                            <div className="mb-8">
                                <AudioPlayer src={post.audioUrl} title={`Posłuchaj artykułu: ${post.title}`} />
                            </div>
                        )}
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
                    </div>

                    <div className="blog-post-cta">
                        <h3>Gotowy na Automatyzację Swojego Biznesu?</h3>
                        <p>Umów się na bezpłatną konsultację i dowiedz się, jak AI może pomóc Twojej firmie.</p>
                        <a href="/kalendarz" className="cta-button">Umów Bezpłatną Konsultację</a>
                    </div>
                </div>
            </article>

            <RelatedPosts currentPost={post} allPosts={blogPosts} />

            <Footer />
        </div>
    );
};
