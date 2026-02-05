import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            let label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Custom labels for specific paths
            if (segment === 'katalog-automatyzacji') label = 'Katalog Automatyzacji';
            if (segment === 'kalendarz') label = 'Kalendarz';
            if (segment === 'blog') label = 'Blog';

            crumbs.push({ label, path: currentPath });
        });

        setBreadcrumbs(crumbs);
    }, [location]);

    if (breadcrumbs.length <= 1) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.label,
            "item": `https://autoflowdigital.pl${crumb.path}`
        }))
    };

    return (
        <>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol className="breadcrumbs__list">
                    {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.path} className="breadcrumbs__item">
                            {index < breadcrumbs.length - 1 ? (
                                <>
                                    <Link to={crumb.path} className="breadcrumbs__link">
                                        {crumb.label}
                                    </Link>
                                    <span className="breadcrumbs__separator">/</span>
                                </>
                            ) : (
                                <span className="breadcrumbs__current" aria-current="page">
                                    {crumb.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};
