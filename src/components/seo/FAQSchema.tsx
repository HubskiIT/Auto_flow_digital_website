interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSchemaProps {
    faqs: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            <section className="faq-section">
                <div className="container">
                    <h2 className="faq-title">Często Zadawane Pytania</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <details key={index} className="faq-item">
                                <summary className="faq-question">{faq.question}</summary>
                                <div className="faq-answer">{faq.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

// FAQ data for AI chatbots (example usage)
export const aiChatbotFAQs: FAQItem[] = [
    {
        question: "Ile kosztuje AI recepcjonistka?",
        answer: "Koszt AI recepcjonistki to zazwyczaj 400-900 zł miesięcznie (OpenAI API, Voice AI, hosting), co stanowi 8-10x mniej niż pensja człowieka. Zwrot z inwestycji następuje zwykle w ciągu 1-2 miesięcy."
    },
    {
        question: "Czy AI recepcjonistka zastąpi moich pracowników?",
        answer: "Nie, AI recepcjonistka wspiera, nie zastępuje. Recepcjoniści mogą skupić się na zadaniach wymagających empatii i obsłudze VIP-ów, podczas gdy AI zajmuje się rutynowymi zapytaniami i rezerwacjami."
    },
    {
        question: "Jak długo trwa wdrożenie AI recepcjonistki?",
        answer: "Średni czas wdrożenia to 7-14 dni. Obejmuje to: analizę potrzeb, konfigurację scenariuszy rozmów, integrację z systemami (kalendarz, CRM) oraz testy z prawdziwymi klientami."
    },
    {
        question: "Czy AI recepcjonistka działa 24/7?",
        answer: "Tak! AI recepcjonistka jest dostępna 24 godziny na dobę, 7 dni w tygodniu, bez dni wolnych. Klienci mogą dzwonić lub pisać o każdej porze, nawet o 2 w nocy."
    },
    {
        question: "Czy klienci zauważą, że rozmawiają z AI?",
        answer: "Nowoczesne modele GPT-4 są tak zaawansowane, że 85% klientów nie odróżnia ich od człowieka. Rozmowy są naturalne, płynne i empatyczne. Możesz też otwarcie poinformować klientów, że korzystasz z AI asystenta."
    },
    {
        question: "Jakie języki obsługuje AI recepcjonistka?",
        answer: "AI recepcjonistka obsługuje ponad 50 języków, w tym polski, angielski, niemiecki, francuski, hiszpański i wiele innych. Możesz obsługiwać klientów międzynarodowych bez angażowania wielojęzycznego zespołu."
    }
];
