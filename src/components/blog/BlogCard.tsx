import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/src/data/blogPosts';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
    const formattedDate = new Date(post.publishDate).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <Link
            to={`/blog/${post.slug}`}
            className={`group relative flex flex-col bg-[#0d0d14] border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] ${featured ? 'md:col-span-2' : ''}`}
        >
            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 50%)',
                }}
            />

            {/* Image */}
            <div className={`relative w-full overflow-hidden ${featured ? 'h-72' : 'h-52'}`}>
                <img
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/30 to-transparent" />

                {/* Read time badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-white/70 font-medium">{post.readTime}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6 gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-white leading-snug group-hover:text-violet-200 transition-colors duration-300 ${featured ? 'text-2xl' : 'text-lg'}`}>
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow">
                    {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {post.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs font-medium text-white/80">{post.author.split(' ')[0]}</p>
                            <p className="text-[11px] text-gray-600">{formattedDate}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        Czytaj
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};
