export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    publishDate: string;
    readTime: string;
    tags: string[];
    imageUrl: string;
    imageAlt: string;
    audioUrl?: string;
}

export const blogPosts: BlogPost[] = [];
