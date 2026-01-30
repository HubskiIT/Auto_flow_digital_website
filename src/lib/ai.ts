import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// Note: In production, use Edge Functions to hide this key. 
// For MVP, we use the client-side SDK with the key from .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const BRAND_SYSTEM_PROMPT = `
You are the elite social media strategist for "Antigravity".
Brand Voice: Futuristic, Elegant, Authoritative, yet slightly Playful.
Themes: Automation, AI, Time-saving, "Work less, achieve more".
Forbidden words: "Hustle", "Grind", "Generic", "Game-changer" (unless ironic).

Your goal is to write 5 viral post ideas based on the provided context or topic.
Format your response as a JSON array of objects with keys: "idea", "caption", "hashtags", "recommended_platform".
`;

export const generateContentIdeas = async (topic: string, trendContext?: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        ${BRAND_SYSTEM_PROMPT}

        Topic: ${topic}
        Trend Context: ${trendContext || "General industry trends"}

        Generate 3 distinct post ideas.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Generation Error:", error);
        return [];
    }
};

export const generateCaptionDraft = async (idea: string, platform: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `
        Draft a high-engagement caption for ${platform} based on this idea: "${idea}".
        Include 3-5 relevant hashtags.
        Tone: Futuristic & Premium.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return "Failed to generate caption.";
    }
};

export const generatePlatformVariations = async (topic: string, researchContext: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        ${BRAND_SYSTEM_PROMPT}

        CORE TOPIC: ${topic}
        RESEARCH CONTEXT (Real Data):
        ${researchContext}

        TASK: Based on the research, create 4 distinct social media posts optimized for viral reach.
        
        1. LINKEDIN: Professional, "Thought Leadership", structured with bullet points.
        2. INSTAGRAM: Visual hook description + Caption with high emoji usage.
        3. TIKTOK: Video Script (Hook -> Value -> CTA).
        4. FACEBOOK: Engaging, community-focused question or story.

        Return strictly a JSON object with keys: "linkedin", "instagram", "tiktok", "facebook".
        Each value should be an object with: "content" (string) and "hashtags" (array of strings).
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);

    } catch (error) {
        console.error("Variation Generation Error", error);
        return null;
    }
};
