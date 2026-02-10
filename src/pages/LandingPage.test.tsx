import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingPage } from './LandingPage';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

// Mock components that might cause issues or are not focus of the test
vi.mock('@/src/components/features/ChatDemo', () => ({
    default: () => <div data-testid="chat-demo">Chat Demo</div>
}));

// Mock Navbar and Footer to simplify
vi.mock('@/src/components/layout/Navbar', () => ({
    default: () => <nav data-testid="navbar">Navbar</nav>
}));

vi.mock('@/src/components/layout/Footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>
}));

vi.mock('@/src/components/common/DottedGlowBackground', () => ({
    default: () => <div data-testid="dotted-glow-background">Dotted Glow Background</div>
}));

vi.mock('@/src/components/common/InfiniteTicker', () => ({
    default: () => <div data-testid="infinite-ticker">Infinite Ticker</div>
}));

vi.mock('@/src/components/common/ScrollReveal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));


describe('LandingPage', () => {
    it('renders without crashing', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <LandingPage />
                </MemoryRouter>
            </HelmetProvider>
        );

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId('chat-demo')).toBeInTheDocument();

        // Check for some static text from sections to verify they are rendered
        // Note: Actual text might vary, sticking to mocked components or stable IDs is safer.
        // But let's check for a known section title if possible.
        expect(screen.getByText('Jak to działa')).toBeInTheDocument();
    });
});
