import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ServiceOffer {
    price?: string;
    priceCurrency?: string;
    billingDuration?: string; // e.g., "P1M" for monthly
    description?: string;
}

interface ServiceSchemaProps {
    name: string;
    description: string;
    serviceType: string;
    provider?: {
        name: string;
        url: string;
    };
    areaServed?: string | string[];
    offers?: ServiceOffer;
    image?: string;
    url?: string;
}

/**
 * ServiceSchema Component
 * 
 * Implements Service structured data for better SERP visibility.
 * Benefits:
 * - Rich snippets with service details
 * - Price display in search results
 * - Better categorization by search engines
 * - Improved local SEO
 * 
 * @example
 * <ServiceSchema 
 *   name="AI Chatbot Development"
 *   description="Dedykowane AI chatboty wykorzystujące GPT-4 dla automatyzacji obsługi klienta"
 *   serviceType="Business Automation Service"
 *   offers={{
 *     price: "400-900",
 *     priceCurrency: "PLN",
 *     billingDuration: "P1M"
 *   }}
 * />
 */
export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
    name,
    description,
    serviceType,
    provider = {
        name: 'AutoFlow Digital',
        url: 'https://autoflowdigital.pl'
    },
    areaServed = 'PL',
    offers,
    image,
    url
}) => {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': name,
        'description': description,
        'serviceType': serviceType,
        'provider': {
            '@type': 'Organization',
            'name': provider.name,
            'url': provider.url
        },
        'areaServed': Array.isArray(areaServed)
            ? areaServed.map(area => ({ '@type': 'Country', 'name': area }))
            : { '@type': 'Country', 'name': areaServed }
    };

    if (image) {
        schema.image = image;
    }

    if (url) {
        schema.url = url;
    }

    if (offers) {
        schema.offers = {
            '@type': 'Offer',
            'price': offers.price,
            'priceCurrency': offers.priceCurrency || 'PLN',
        };

        if (offers.billingDuration) {
            schema.offers.priceSpecification = {
                '@type': 'UnitPriceSpecification',
                'billingDuration': offers.billingDuration
            };
        }

        if (offers.description) {
            schema.offers.description = offers.description;
        }
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

/**
 * Pre-configured service schemas for AutoFlow Digital services
 */
export const AutoFlowServices = {
    AIChatbot: () => (
        <ServiceSchema
            name="AI Chatbot Development"
            description="Dedykowane AI chatboty wykorzystujące GPT-4 do automatyzacji obsługi klienta. Dostępne 24/7, wielojęzyczne, z integracją z CRM i systemami rezerwacji."
            serviceType="Business Automation Service"
            offers={{
                price: '400-900',
                priceCurrency: 'PLN',
                billingDuration: 'P1M',
                description: 'Miesięczna opłata obejmująca hosting, API oraz wsparcie techniczne'
            }}
            image="https://autoflowdigital.pl/og-image.jpg"
            url="https://autoflowdigital.pl/uslugi/chatboty"
        />
    ),

    BusinessAutomation: () => (
        <ServiceSchema
            name="Automatyzacja Procesów Biznesowych"
            description="Kompleksowa automatyzacja procesów z wykorzystaniem Make.com, n8n i Zapier. Integracje z CRM, email marketing, generowanie raportów i wiele więcej."
            serviceType="Business Process Automation"
            image="https://autoflowdigital.pl/og-image.jpg"
            url="https://autoflowdigital.pl/uslugi/automatyzacje"
        />
    ),

    WebDevelopment: () => (
        <ServiceSchema
            name="Tworzenie Stron WWW"
            description="Nowoczesne strony internetowe zoptymalizowane pod SEO, z integracją systemów CRM, chatbotów i zaawansowaną automatyzacją. Vite, React, No-Code."
            serviceType="Web Development Service"
            image="https://autoflowdigital.pl/og-image.jpg"
            url="https://autoflowdigital.pl/uslugi/strony-www"
        />
    )
};
