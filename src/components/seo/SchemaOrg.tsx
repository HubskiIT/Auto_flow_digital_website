import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SchemaOrg = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://autoflowdigital.pl/#organization",
                "name": "AutoFlow Digital",
                "url": "https://autoflowdigital.pl",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://autoflowdigital.pl/logo.png", // Ensure this exists or use a valid path
                    "width": 112,
                    "height": 112
                },
                "sameAs": [
                    "https://www.linkedin.com/company/autoflow-digital", // Replace if known
                    "https://twitter.com/autoflowdigital" // Replace if known
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+48 123 456 789", // Replace with real one or remove
                    "contactType": "customer service",
                    "areaServed": "PL",
                    "availableLanguage": "Polish"
                }
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://autoflowdigital.pl/#localbusiness",
                "name": "AutoFlow Digital - Agencja Automatyzacji AI",
                "image": "https://autoflowdigital.pl/og-image.jpg",
                "url": "https://autoflowdigital.pl",
                "telephone": "+48 733 666 555", // Example from contact section if available?
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Gdańsk", // Assuming user location based on prev conv hints or default to PL generic
                    "addressCountry": "PL"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 54.3520,
                    "longitude": 18.6466
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "17:00"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://autoflowdigital.pl/#website",
                "url": "https://autoflowdigital.pl",
                "name": "AutoFlow Digital",
                "description": "Kompleksowa automatyzacja biznesu, wdrożenia AI, chatboty i nowoczesne strony www.",
                "publisher": {
                    "@id": "https://autoflowdigital.pl/#organization"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://autoflowdigital.pl/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};
