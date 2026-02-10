import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './SEO';

describe('SEO', () => {
    it('renders default title and meta tags', async () => {
        render(
            <HelmetProvider>
                <SEO />
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(document.title).toBe('AutoFlow Digital | Agencja Automatyzacji AI & No-Code');
            expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
                'content',
                'Zwiększ zyski i oszczędzaj czas dzięki automatyzacji AI. Tworzymy dedykowane systemy dla nowoczesnych firm.'
            );
        });
    });

    it('renders custom title and description', async () => {
        render(
            <HelmetProvider>
                <SEO title="Test Page" description="Test Description" />
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(document.title).toBe('Test Page | AutoFlow Digital');
            expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Test Description');
        });
    });
});
