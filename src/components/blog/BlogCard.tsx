import { Link } from 'react-router-dom';
import { BlogPost } from '@/src/data/blogPosts';

interface BlogCardProps {
    post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link to={`/blog/${post.slug}`} className="blog-card">
            <div className="blog-card__image">
                <img src={post.imageUrl} alt={post.imageAlt} loading="lazy" />
            </div>
            <div className="blog-card__content">
                <div className="blog-card__meta">
                    <span className="blog-card__date">{new Date(post.publishDate).toLocaleDateString('pl-PL')}</span>
                    <span className="blog-card__read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <div className="blog-card__tags">
                    {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="blog-card__tag">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
};
