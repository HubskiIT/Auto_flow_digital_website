
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
import { LandingPage } from '@/src/pages/LandingPage';
import { CalendarPage } from '@/src/pages/CalendarPage';
import { AutomationsCatalogPage } from '@/src/pages/AutomationsCatalogPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calendar/*" element={<CalendarPage />} />
                <Route path="/katalog-automatyzacji" element={<AutomationsCatalogPage />} />
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
