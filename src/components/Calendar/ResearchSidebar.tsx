import React, { useState } from 'react';
import { Search, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { generateContentIdeas } from '@/src/lib/ai';

export const ResearchSidebar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleResearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            // In Phase 2, this will also call Firecrawl. 
            // For Phase 1 MVP, we ask Gemini directly about the topic.
            const ideas = await generateContentIdeas(query, "Live Trend Data (Simulated for MVP)");
            setResults(ideas);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-80 border-l border-slate-800 bg-[#020617] p-6 hidden xl:block overflow-y-auto">
            <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-cyan-400" size={20} />
                Trend Research
            </h3>

            <div className="relative mb-8">
                <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-slate-200 focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
                    placeholder="Search topic (e.g. AI Agents)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
                />
                <button
                    onClick={handleResearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                </button>
            </div>

            <div className="space-y-4">
                {results.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-cyan-500/30 transition-all group">
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs uppercase font-bold text-cyan-500 tracking-wider">
                                {item.recommended_platform || 'IG'}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity">
                                <Sparkles size={14} />
                            </button>
                        </div>
                        <h4 className="font-medium text-slate-200 mb-2 text-sm">{item.idea}</h4>
                        <p className="text-xs text-slate-500 line-clamp-3 italic">"{item.caption}"</p>
                    </div>
                ))}

                {!loading && results.length === 0 && (
                    <div className="text-center text-slate-600 text-sm mt-10">
                        <Sparkles className="mx-auto mb-3 opacity-20" size={32} />
                        <p>Enter a topic to generate<br />viral content ideas.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
