
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { GoogleAnalytics } from '@/src/components/analytics/GoogleAnalytics';
import { LandingPage } from '@/src/pages/LandingPage';
import { CalendarPage } from '@/src/pages/CalendarPage';
import { AutomationsCatalogPage } from '@/src/pages/AutomationsCatalogPage';
import { BlogListPage } from '@/src/pages/BlogListPage';
import { BlogPostPage } from '@/src/pages/BlogPostPage';
import { OurWorkPage } from '@/src/pages/OurWorkPage';
import ScrollToTop from '@/src/components/common/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <GoogleAnalytics />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calendar/*" element={<CalendarPage />} />
                <Route path="/kalendarz" element={<CalendarPage />} />
                <Route path="/katalog-automatyzacji" element={<AutomationsCatalogPage />} />
                <Route path="/nasze-projekty" element={<OurWorkPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <HelmetProvider>
                <App />
                <Analytics />
                <SpeedInsights />
            </HelmetProvider>
        </React.StrictMode>
    );
}

