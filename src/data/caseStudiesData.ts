import React from 'react';

export interface CaseStudy {
    id: string;
    industry: string;
    title: string;
    description: string;
    screenshot: string;
    automations: string[];
    results: string[];
    iconName: 'ShoppingBag' | 'Dumbbell' | 'Hammer' | 'Smile' | 'Home' | 'Megaphone';
    bgColor: string;
}

export const caseStudiesData: CaseStudy[] = [
    {
        id: 'candy-company',
        industry: 'E-commerce / Cukiernictwo',
        title: 'Candy Company - Automatyzacja Sprzedaży Online',
        description: 'Lokalna cukiernia z ambicjami e-commerce zmagała się z 65% porzuconymi koszykami, chaotyczną obsługą klienta (4h dziennie na maile/DM) i niemożnością skalowania bez zatrudniania. Wdrożyliśmy kompleksowy ekosystem AI + automatyzacji, który zamienił firmę w samosterującą maszynę sprzedażową.',
        screenshot: '/candy-company-mockup.png',
        automations: [
            'AI Chatbot 24/7 - odpowiedzi na pytania o produkty, alergeny, dostępność',
            'Abandoned Cart Recovery - automatyczne SMS/Email z przypomnieniem + 10% kod rabatowy',
            'Smart Inventory Sync - powiadomienia o dostępności ulubionych produktów klientów',
            'Auto-upsell System - "Klienci kupujący X również zamówili Y" w koszyku',
            'Social Media Scheduler - 3 posty tygodniowo na Instagram/Facebook z auto-generowaniem treści',
            'Customer Feedback Loop - automatyczna ankieta po dostawie + analiza sentiment AI'
        ],
        results: [
            'Recovery koszyków: +25%',
            'Czas obsługi: 4h/dzień → 45min/dzień',
            'ROAS: 4x → 7x',
            'Przychód miesięczny: +35%',
            'Nowi klienci: +180/miesiąc'
        ],
        iconName: 'ShoppingBag',
        bgColor: 'rgba(236, 72, 153, 0.1)' // Pink for candy/sweets
    }
];
