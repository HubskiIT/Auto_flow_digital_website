import FirecrawlApp from '@mendable/firecrawl-js';
import { generateContentIdeas } from './ai';

// Initialize Firecrawl
// Requires VITE_FIRECRAWL_API_KEY in .env.local
const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY || '';

let firecrawlApp: FirecrawlApp | null = null;

if (FIRECRAWL_API_KEY) {
    firecrawlApp = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });
} else {
    console.warn("Missing VITE_FIRECRAWL_API_KEY. Research features will be simulated.");
}

export interface ResearchResult {
    title: string;
    url: string;
    content: string;
    source: 'web' | 'mock';
}

/**
 * Scans the internet for a given topic using Firecrawl.
 * If no key is present, returns simulated "viral" data.
 */
export const scanTrends = async (topic: string): Promise<ResearchResult[]> => {
    if (!firecrawlApp) {
        // Simulation Mode
        await new Promise(r => setTimeout(r, 2000));
        return [
            {
                title: `Why ${topic} is taking over 2026`,
                url: 'https://techcrunch.com/mock-article',
                content: `${topic} is the biggest shift since the iPhone. Experts say adoption is growing 300% YoY. Key drivers: efficiency, cost reduction, and AI integration.`,
                source: 'mock'
            },
            {
                title: `The Hidden Dangers of ${topic}`,
                url: 'https://wired.com/mock-article',
                content: `While ${topic} offers benefits, privacy concerns remain. New regulations in EU are targeting...`,
                source: 'mock'
            }
        ];
    }

    try {
        // 1. Search for recent high-quality articles
        const searchResponse = await firecrawlApp.search(topic, {
            pageOptions: {
                fetchPageContent: true // Get the content directly
            },
            searchOptions: {
                limit: 3
            }
        });

        if (!searchResponse.success || !searchResponse.data) {
            throw new Error("Firecrawl search failed");
        }

        // Map to our interface
        return searchResponse.data.map((item: any) => ({
            title: item.title || "Untitled",
            url: item.url,
            content: item.markdown || item.content || "",
            source: 'web'
        }));

    } catch (error) {
        console.error("Firecrawl Error:", error);
        return [];
    }
};

/**
 * Analyzes research results and prepares them for content generation
 */
export const synthesizeResearch = (results: ResearchResult[]) => {
    return results.map(r => `SOURCE: ${r.title} (${r.url})\nCONTENT: ${r.content.substring(0, 500)}...`).join("\n\n");
};
