import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema Component
 * 
 * Implements structured data for breadcrumb navigation.
 * Benefits:
 * - Enhanced SERP display with breadcrumb trail
 * - Improved navigation understanding for search engines
 * - Better user experience in search results
 * 
 * @example
 * <BreadcrumbSchema items={[
 *   { name: 'Home', url: 'https://autoflowdigital.pl' },
 *   { name: 'Usługi', url: 'https://autoflowdigital.pl/uslugi' },
 *   { name: 'AI Chatboty', url: 'https://autoflowdigital.pl/uslugi/chatboty' }
 * ]} />
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': item.url
        }))
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

/**
 * Helper function to generate breadcrumb items from URL path
 * @param pathname Current URL pathname
 * @param baseUrl Base URL of the site
 * @returns Array of breadcrumb items
 */
export const generateBreadcrumbsFromPath = (pathname: string, baseUrl: string = 'https://autoflowdigital.pl'): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
        { name: 'Home', url: baseUrl }
    ];

    let currentPath = '';
    const pathNameMap: Record<string, string> = {
        'katalog-automatyzacji': 'Katalog Automatyzacji',
        'blog': 'Blog',
        'uslugi': 'Usługi',
        'chatboty': 'AI Chatboty',
        'automatyzacje': 'Automatyzacje',
        'strony-www': 'Strony WWW',
        'kontakt': 'Kontakt',
        'o-nas': 'O Nas'
    };

    paths.forEach(segment => {
        currentPath += `/${segment}`;
        const name = pathNameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        breadcrumbs.push({
            name,
            url: `${baseUrl}${currentPath}`
        });
    });

    return breadcrumbs;
};
