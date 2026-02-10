import React from 'react';

interface AnswerBoxProps {
    question: string;
    answer: string;
    type?: 'paragraph' | 'list' | 'table';
    items?: string[];
    className?: string;
}

/**
 * AnswerBoxOptimization Component
 * 
 * Optimizes content for Featured Snippets and Answer Boxes in search results.
 * Follows Google's guidelines for snippet-worthy content:
 * - Question format in heading
 * - Concise answer (40-60 words for paragraph, 3-8 items for lists)
 * - Clear, structured formatting
 * 
 * Benefits:
 * - Increased visibility in SERP (position 0)
 * - Better voice search optimization
 * - Improved CTR from search results
 * - Enhanced AI search citations (ChatGPT, Perplexity)
 * 
 * @example
 * <AnswerBoxOptimization 
 *   question="Ile kosztuje AI chatbot?"
 *   answer="AI chatbot kosztuje 400-900 zł miesięcznie, co stanowi 8-10x mniej niż pensja pracownika..."
 *   type="paragraph"
 * />
 */
export const AnswerBoxOptimization: React.FC<AnswerBoxProps> = ({
    question,
    answer,
    type = 'paragraph',
    items,
    className = ''
}) => {
    return (
        <div className={`answer-box-optimized ${className}`} itemScope itemType="https://schema.org/Question">
            <h3 itemProp="name" className="text-xl font-semibold mb-3">
                {question}
            </h3>

            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                {type === 'paragraph' && (
                    <p itemProp="text" className="text-base leading-relaxed">
                        {answer}
                    </p>
                )}

                {type === 'list' && items && (
                    <div itemProp="text">
                        <p className="mb-2">{answer}</p>
                        <ul className="list-disc pl-6 space-y-1">
                            {items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {type === 'table' && (
                    <p itemProp="text">{answer}</p>
                )}
            </div>
        </div>
    );
};

/**
 * HowToSchema Component
 * 
 * Implements HowTo structured data for step-by-step guides.
 * Perfect for process pages and tutorials.
 * 
 * @example
 * <HowToSchema 
 *   name="Jak wdrożyć AI chatbota w firmie"
 *   steps={[
 *     { name: "Analiza potrzeb", text: "Określamy cele..." },
 *     { name: "Projektowanie scenariuszy", text: "Tworzymy flow..." }
 *   ]}
 * />
 */
interface HowToStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

interface HowToSchemaProps {
    name: string;
    description?: string;
    steps: HowToStep[];
    totalTime?: string; // ISO 8601 duration, e.g., "PT30M" for 30 minutes
    estimatedCost?: {
        currency: string;
        value: string;
    };
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
    name,
    description,
    steps,
    totalTime,
    estimatedCost
}) => {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': name,
        'step': steps.map((step, index) => ({
            '@type': 'HowToStep',
            'position': index + 1,
            'name': step.name,
            'text': step.text,
            ...(step.image && { 'image': step.image }),
            ...(step.url && { 'url': step.url })
        }))
    };

    if (description) {
        schema.description = description;
    }

    if (totalTime) {
        schema.totalTime = totalTime;
    }

    if (estimatedCost) {
        schema.estimatedCost = {
            '@type': 'MonetaryAmount',
            'currency': estimatedCost.currency,
            'value': estimatedCost.value
        };
    }

    return (
        <script type="application/ld+json">
            {JSON.stringify(schema)}
        </script>
    );
};

/**
 * Pre-built Answer Box optimizations for common queries
 */
export const CommonAnswerBoxes = {
    AIReceptionistCost: () => (
        <AnswerBoxOptimization
            question="Ile kosztuje AI recepcjonistka?"
            answer="AI recepcjonistka kosztuje 400-900 zł miesięcznie (OpenAI API, Voice AI, hosting), co stanowi 8-10x mniej niż pensja człowieka. Zwrot z inwestycji następuje zwykle w ciągu 1-2 miesięcy."
            type="paragraph"
        />
    ),

    AutomationBenefits: () => (
        <AnswerBoxOptimization
            question="Jakie korzyści daje automatyzacja biznesu?"
            answer="Automatyzacja biznesu przynosi następujące korzyści:"
            type="list"
            items={[
                "Oszczędność czasu - nawet 20-30 godzin tygodniowo",
                "Redukcja kosztów operacyjnych o 40-60%",
                "Eliminacja błędów ludzkich w powtarzalnych zadaniach",
                "Dostępność 24/7 bez dodatkowych kosztów",
                "Skalowalność bez proporcjonalnego wzrostu kosztów",
                "Lepsza analityka i raportowanie w czasie rzeczywistym"
            ]}
        />
    ),

    ImplementationTime: () => (
        <AnswerBoxOptimization
            question="Jak długo trwa wdrożenie automatyzacji?"
            answer="Średni czas wdrożenia automatyzacji to 7-14 dni. Obejmuje to analizę potrzeb, konfigurację scenariuszy, integrację z systemami (kalendarz, CRM) oraz testy z prawdziwymi użytkownikami."
            type="paragraph"
        />
    )
};
