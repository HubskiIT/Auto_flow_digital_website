import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://autoflowdigital.pl';

const routes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/katalog-automatyzacji', changefreq: 'weekly', priority: '0.9' },
    { path: '/calendar', changefreq: 'monthly', priority: '0.7' }
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `
    <url>
        <loc>${DOMAIN}${route.path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>
    `).join('')}
</urlset>`;

    const publicDir = path.join(__dirname, 'public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`✅ Sitemap metadata generated at ${sitemapPath}`);
};

generateSitemap();
