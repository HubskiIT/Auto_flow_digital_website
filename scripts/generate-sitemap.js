import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://autoflowdigital.pl';

// Static routes with priority and changefreq
const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/katalog-automatyzacji', changefreq: 'weekly', priority: '0.9' },
];

// Function to get last modified date from file stats
const getLastModified = (filePath) => {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
};

// Dynamic blog posts detection
const getBlogPosts = () => {
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
    if (fs.existsSync(blogDataPath)) {
        // This is a simplified version - in production, you'd parse the actual file
        // For now, we'll return empty array. Implement proper parsing as needed.
        return [];
    }
    return [];
};

const generateSitemap = () => {
    const blogPosts = getBlogPosts();
    const allRoutes = [
        ...staticRoutes,
        ...blogPosts.map(post => ({
            path: `/blog/${post.slug}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: post.date
        }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${allRoutes.map(route => `
    <url>
        <loc>${DOMAIN}${route.path}</loc>
        <lastmod>${route.lastmod || getLastModified(path.join(__dirname, 'index.html'))}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>
    `).join('')}
</urlset>`;

    const publicDir = path.join(__dirname, '..', 'public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`✅ Sitemap generated at ${sitemapPath}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
};

generateSitemap();

