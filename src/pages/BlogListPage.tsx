import { useState } from 'react';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { SEO } from '@/src/components/common/SEO';
import { Breadcrumbs } from '@/src/components/navigation/Breadcrumbs';
import { BlogCard } from '@/src/components/blog/BlogCard';
import { blogPosts } from '@/src/data/blogPosts';

export const BlogListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Blog AutoFlow Digital - Automatyzacja AI i No-Code"
                description="Dowiedz się więcej o automatyzacji biznesu, sztucznej inteligencji i rozwiązaniach no-code. Praktyczne przewodniki i case study."
                url="https://autoflowdigital.pl/blog"
            />
            <Navbar scrolled={true} />

            <main className="blog-list-page">
                <div className="blog-hero">
                    <div className="container">
                        <h1 className="blog-hero__title">Blog AutoFlow Digital</h1>
                        <p className="blog-hero__subtitle">
                            Odkrywaj świat automatyzacji AI i no-code. Praktyczne porady, case study i najnowsze trendy.
                        </p>
                    </div>
                </div>

                <div className="container blog-content">
                    <div className="blog-filters">
                        <input
                            type="search"
                            placeholder="Szukaj artykułów..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="blog-search"
                        />
                        <div className="blog-tags">
                            <button
                                className={`blog-tag-filter ${!selectedTag ? 'active' : ''}`}
                                onClick={() => setSelectedTag(null)}
                            >
                                Wszystkie
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`blog-tag-filter ${selectedTag === tag ? 'active' : ''}`}
                                    onClick={() => setSelectedTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="blog-grid">
                        {filteredPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="blog-no-results">
                            <p>Nie znaleziono artykułów pasujących do kryteriów wyszukiwania.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};
