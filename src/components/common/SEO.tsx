import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    canonical?: string;
    keywords?: string[];
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    robotsDirectives?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title = 'AutoFlow Digital | Agencja Automatyzacji AI & No-Code',
    description = 'Zwiększ zyski i oszczędzaj czas dzięki automatyzacji AI. Tworzymy dedykowane systemy dla nowoczesnych firm.',
    image = 'https://hubskiit.github.io/Auto_flow_digital_website/og-image.jpg',
    url = 'https://autoflowdigital.pl/',
    type = 'website',
    canonical,
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
    robotsDirectives = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
}) => {
    const siteTitle = title === 'AutoFlow Digital' || title === 'AutoFlow Digital | Agencja Automatyzacji AI & No-Code' ? title : `${title} | AutoFlow Digital`;
    const canonicalUrl = canonical || url;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
            <meta name="robots" content={robotsDirectives} />
            <link rel="canonical" href={canonicalUrl} />
            {author && <meta name="author" content={author} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="AutoFlow Digital" />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            {author && <meta property="twitter:creator" content={author} />}
        </Helmet>
    );
};
