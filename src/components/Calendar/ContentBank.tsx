import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Video, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { scanTrends, synthesizeResearch, ResearchResult } from '@/src/lib/research';
import { generatePlatformVariations } from '@/src/lib/ai';

export const ContentBank: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [status, setStatus] = useState('');
    const [generatedContent, setGeneratedContent] = useState<any>(null);

    const handleDeepResearch = async () => {
        if (!topic) return;
        setIsScanning(true);
        setStatus('🔎 Scanning the internet for viral signals...');
        setGeneratedContent(null);

        try {
            // 1. Scan Trends
            const results = await scanTrends(topic);
            setStatus(`🧠 Analyzing ${results.length} high-signal sources...`);

            // 2. Synthesize
            const context = synthesizeResearch(results);

            // 3. Generate Variations
            setStatus('✨ Generating viral hooks for 4 platforms...');
            const variations = await generatePlatformVariations(topic, context);

            setGeneratedContent(variations);
        } catch (e) {
            console.error(e);
            setStatus('❌ Scan failed. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Layers size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-heading font-bold text-white">Content Engine</h2>
                    <p className="text-slate-400 text-sm">Deep Scan &rarr; 4x Viral Drafts</p>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic (e.g. 'AI Agents in 2026')..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleDeepResearch()}
                />
                <button
                    onClick={handleDeepResearch}
                    disabled={isScanning}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all px-6 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isScanning ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                    {isScanning ? 'Scanning...' : 'Scan & Generate'}
                </button>
            </div>

            {/* Status Indicator */}
            {isScanning && (
                <div className="text-center py-12">
                    <div className="inline-block relative">
                        <div className="w-16 h-16 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-4 mx-auto"></div>
                    </div>
                    <p className="text-cyan-400 animate-pulse font-mono tracking-wide">{status}</p>
                </div>
            )}

            {/* Results Grid */}
            {generatedContent && !isScanning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <PlatformCard
                        icon={<Linkedin />}
                        name="LinkedIn"
                        color="bg-blue-700"
                        data={generatedContent.linkedin}
                    />
                    <PlatformCard
                        icon={<Instagram />}
                        name="Instagram"
                        color="bg-pink-600"
                        data={generatedContent.instagram}
                    />
                    <PlatformCard
                        icon={<Video />}
                        name="TikTok"
                        color="bg-black border-slate-700"
                        data={generatedContent.tiktok}
                    />
                    <PlatformCard
                        icon={<Facebook />}
                        name="Facebook"
                        color="bg-blue-600"
                        data={generatedContent.facebook}
                    />
                </motion.div>
            )}
        </div>
    );
};

const PlatformCard = ({ icon, name, color, data }: any) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors group">
        <div className={`p-3 flex items-center gap-2 ${color} text-white`}>
            {icon}
            <span className="font-bold text-sm tracking-widest">{name.toUpperCase()}</span>
        </div>
        <div className="p-4 space-y-3">
            <div className="h-40 overflow-y-auto text-sm text-slate-300 whitespace-pre-wrap scrollbar-thin scrollbar-thumb-slate-700">
                {data.content}
            </div>
            <div className="pt-3 border-t border-slate-800">
                <div className="flex flex-wrap gap-1">
                    {data.hashtags?.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] text-cyan-400 bg-cyan-900/20 px-1.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <button className="w-full py-2 mt-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors">
                Save Draft
            </button>
        </div>
    </div>
);
