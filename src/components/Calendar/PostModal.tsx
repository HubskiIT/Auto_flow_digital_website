import React, { useState } from 'react';
import { X, Sparkles, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import clsx from 'clsx';
import { supabase } from '@/src/lib/supabase';

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    date?: Date | null;
}

export const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, date }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState<'IG' | 'FB' | 'LinkedIn' | 'X' | 'TikTok'>('IG');
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!title && !content) {
            alert("Please enter a title or some content context first!");
            return;
        }
        setIsGenerating(true);
        try {
            const { generateCaptionDraft } = await import('@/src/lib/ai');
            const draft = await generateCaptionDraft(title || content, platform);
            setContent(draft);
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        // Basic save logic placeholder
        const { error } = await supabase.from('posts').insert({
            title,
            content,
            platform,
            date: date?.toISOString(),
            status: 'draft'
        });

        if (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post');
        } else {
            onClose();
            // Trigger refresh (needs context or callback)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h3 className="text-xl font-heading font-bold text-white">New Post</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Platform Selector */}
                    <div className="flex gap-4">
                        {['IG', 'FB', 'LinkedIn', 'X', 'TikTok'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p as any)}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                                    platform === p
                                        ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                                        : "border-slate-700 text-slate-400 hover:border-slate-500"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Content</label>
                        <div className="relative">
                            <textarea
                                className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                placeholder="Write your caption here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-xs font-bold text-white shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
                            >
                                <Sparkles size={14} />
                                {isGenerating ? 'Dreaming...' : 'Auto-Generate'}
                            </button>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Schedule Date</label>
                            <input
                                type="datetime-local"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-300 focus:border-cyan-500/50 outline-none"
                                defaultValue={date?.toISOString().slice(0, 16)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Post Title (Internal)</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-slate-300 focus:border-cyan-500/50 outline-none"
                                placeholder="e.g. Monday Motivation"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 hover:bg-slate-800 rounded-lg text-slate-400 font-medium transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-lg font-bold transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                        Save Post
                    </button>
                </div>
            </div>
        </div>
    );
};
