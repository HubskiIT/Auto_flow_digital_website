import { Link } from 'react-router-dom';
import { BlogPost } from '@/src/data/blogPosts';

interface RelatedPostsProps {
    currentPost: BlogPost;
    allPosts: BlogPost[];
    maxPosts?: number;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
    currentPost,
    allPosts,
    maxPosts = 3
}) => {
    // Calculate relevance score based on shared tags
    const getRelevanceScore = (post: BlogPost): number => {
        const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
        return sharedTags.length;
    };

    // Get related posts (excluding current post)
    const relatedPosts = allPosts
        .filter(post => post.id !== currentPost.id)
        .map(post => ({
            ...post,
            relevanceScore: getRelevanceScore(post)
        }))
        .filter(post => post.relevanceScore > 0) // Only posts with at least 1 shared tag
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
        .slice(0, maxPosts);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="related-posts">
            <div className="container">
                <h2 className="related-posts__title">Powiązane Artykuły</h2>
                <div className="related-posts__grid">
                    {relatedPosts.map(post => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="related-post-card"
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.imageAlt}
                                className="related-post-card__image"
                                loading="lazy"
                            />
                            <div className="related-post-card__content">
                                <div className="related-post-card__tags">
                                    {post.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="related-post-card__tag">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="related-post-card__title">{post.title}</h3>
                                <p className="related-post-card__excerpt">{post.excerpt}</p>
                                <span className="related-post-card__read-more">Czytaj więcej →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
