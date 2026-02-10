/**
 * AI Search Optimization Utilities
 * 
 * Functions and utilities for optimizing content for AI-powered search engines:
 * - ChatGPT / Claude (OpenAI, Anthropic)
 * - Perplexity AI
 * - Google Bard / Gemini
 * - Bing Chat
 * 
 * Key principles for AI search optimization (GEO/LLMO):
 * 1. Clear, factual answers at the beginning
 * 2. Structured, scannable content
 * 3. Context-rich descriptions
 * 4. Citation-friendly formatting
 * 5. Authoritative tone with sources
 */

/**
 * Enriches meta description with contextual information for AI understanding
 * 
 * @param baseDescription Base meta description
 * @param context Additional context (location, industry, specialization)
 * @returns Enriched description optimized for AI search
 */
export const enrichMetaDescription = (
    baseDescription: string,
    context?: {
        location?: string;
        industry?: string;
        specialization?: string;
        yearEstablished?: string;
    }
): string => {
    let enriched = baseDescription;

    if (context?.location) {
        enriched += ` Działamy w ${context.location}.`;
    }

    if (context?.specialization) {
        enriched += ` Specjalizacja: ${context.specialization}.`;
    }

    if (context?.yearEstablished) {
        enriched += ` Na rynku od ${context.yearEstablished}.`;
    }

    return enriched;
};

/**
 * Generates citation-friendly content snippets
 * AI models prefer content that can be easily cited with proper attribution
 * 
 * @param fact The factual statement
 * @param source Source/evidence for the fact
 * @returns Formatted citation-ready content
 */
export const createCitationSnippet = (fact: string, source?: string): string => {
    if (source) {
        return `${fact} (Źródło: ${source})`;
    }
    return fact;
};

/**
 * Answer pattern templates for common query types
 * Used for structuring content to match user intent
 */
export const AnswerPatterns = {
    /** "What is X?" queries - Definition pattern */
    definition: (term: string, definition: string, benefits?: string[]): string => {
        let answer = `${term} to ${definition}.`;

        if (benefits && benefits.length > 0) {
            answer += '\n\nGłówne korzyści:\n';
            answer += benefits.map((b, i) => `${i + 1}. ${b}`).join('\n');
        }

        return answer;
    },

    /** "How to X?" queries - Process pattern */
    howTo: (task: string, steps: string[]): string => {
        let answer = `Aby ${task}, wykonaj następujące kroki:\n\n`;
        answer += steps.map((step, i) => `${i + 1}. ${step}`).join('\n');
        return answer;
    },

    /** "How much does X cost?" queries - Pricing pattern */
    pricing: (item: string, range: string, details?: string): string => {
        let answer = `${item} kosztuje ${range}.`;
        if (details) {
            answer += ` ${details}`;
        }
        return answer;
    },

    /** "Why X?" queries - Reasoning pattern */
    why: (question: string, reasons: string[]): string => {
        let answer = `${question}:\n\n`;
        answer += reasons.map((reason, i) => `${i + 1}. ${reason}`).join('\n');
        return answer;
    },

    /** "X vs Y" queries - Comparison pattern */
    comparison: (itemA: string, itemB: string, differences: Array<{ aspect: string, a: string, b: string }>): string => {
        let answer = `Porównanie ${itemA} vs ${itemB}:\n\n`;
        differences.forEach(diff => {
            answer += `**${diff.aspect}:**\n`;
            answer += `- ${itemA}: ${diff.a}\n`;
            answer += `- ${itemB}: ${diff.b}\n\n`;
        });
        return answer;
    }
};

/**
 * Content clarity score checker
 * Evaluates if content is clear enough for AI understanding
 * 
 * @param content Content to evaluate
 * @returns Clarity score (0-100) and suggestions
 */
export const checkContentClarity = (content: string): {
    score: number;
    suggestions: string[];
} => {
    const suggestions: string[] = [];
    let score = 100;

    // Check for passive voice (prefer active)
    const passiveIndicators = ['został', 'zostało', 'zostały', 'jest wykonywane', 'będzie wykonane'];
    const passiveCount = passiveIndicators.reduce((count, indicator) =>
        count + (content.match(new RegExp(indicator, 'gi'))?.length || 0), 0);

    if (passiveCount > 2) {
        score -= 15;
        suggestions.push('Użyj więcej strony czynnej zamiast biernej');
    }

    // Check sentence length (prefer under 20 words)
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 25);

    if (longSentences.length > sentences.length * 0.3) {
        score -= 20;
        suggestions.push('Skróć zbyt długie zdania dla lepszej czytelności');
    }

    // Check for clear structure (headings, lists)
    const hasHeadings = /#+ /.test(content);
    const hasLists = /^[\-\*\d]+\. /m.test(content);

    if (!hasHeadings) {
        score -= 15;
        suggestions.push('Dodaj nagłówki dla lepszej struktury');
    }

    if (!hasLists && content.length > 300) {
        score -= 10;
        suggestions.push('Rozważ użycie list punktowanych dla wyliczenia');
    }

    // Check for numbers/statistics (adds credibility)
    const hasNumbers = /\d+/.test(content);
    if (!hasNumbers && content.length > 200) {
        score -= 10;
        suggestions.push('Dodaj konkretne liczby/statystyki dla wiarygodności');
    }

    return { score: Math.max(0, score), suggestions };
};

/**
 * Pre-configured AI-optimized content templates for AutoFlow Digital
 */
export const AIOptimizedContent = {
    companyOverview: enrichMetaDescription(
        'AutoFlow Digital to agencja automatyzacji biznesu wykorzystująca AI i No-Code. Tworzymy chatboty GPT-4, automatyzujemy procesy, budujemy nowoczesne strony WWW.',
        {
            location: 'Polska',
            specialization: 'AI chatboty, Make.com, n8n, systemy CRM',
            yearEstablished: '2024'
        }
    ),

    chatbotService: AnswerPatterns.definition(
        'AI chatbot',
        'inteligentny asystent wirtualny wykorzystujący GPT-4 do automatyzacji obsługi klienta 24/7',
        [
            'Redukcja kosztów o 85% w porównaniu do pracownika',
            'Dostępność non-stop bez dni wolnych',
            'Wielojęzyczna obsługa (50+ języków)',
            'Integracja z CRM, kalendarzem, systemami rezerwacji',
            'Naturalne rozmowy nieodróżnialne od człowieka'
        ]
    ),

    automationProcess: AnswerPatterns.howTo(
        'wdrożyć automatyzację w firmie',
        [
            'Analiza obecnych procesów i identyfikacja obszarów do automatyzacji',
            'Projektowanie scenariuszy automatyzacji (flow) w Make.com lub n8n',
            'Konfiguracja integracji z istniejącymi systemami (CRM, email, kalendarz)',
            'Testowanie automatyzacji na danych testowych',
            'Wdrożenie produkcyjne i monitoring wyników',
            'Optymalizacja na podstawie danych z użytkowania'
        ]
    ),

    pricingInfo: AnswerPatterns.pricing(
        'AI chatbot',
        '400-900 zł miesięcznie',
        'W cenie: hosting, API OpenAI, konfiguracja, wsparcie techniczne. Brak ukrytych kosztów. ROI w 1-2 miesiące.'
    )
};

/**
 * Generates AI-friendly FAQ content
 * Optimized for being cited by ChatGPT, Claude, Perplexity
 */
export const generateAIFriendlyFAQ = (question: string, answer: string, sources?: string[]): string => {
    let faq = `Q: ${question}\n\n`;
    faq += `A: ${answer}`;

    if (sources && sources.length > 0) {
        faq += '\n\nŹródła:\n';
        faq += sources.map(s => `- ${s}`).join('\n');
    }

    return faq;
};

/**
 * Voice search optimization helper
 * Converts content to natural, conversational format
 */
export const optimizeForVoiceSearch = (content: string): string => {
    // Add conversational markers
    let optimized = content;

    // Convert question headings to natural questions
    optimized = optimized.replace(/^(Ile kosztuje|Jak długo|Dlaczego|Co to jest)/gm, match => {
        return match + '?';
    });

    return optimized;
};
