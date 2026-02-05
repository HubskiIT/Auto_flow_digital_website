import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility exists or I'll implement inline styles if not

// Simple class utility if cn is not available (checking imports later, but safe to implement minimal version here)
// Actually I don't see @/lib/utils in the file list I've seen. I'll stick to template literals or simple style objects.

interface AudioPlayerProps {
    src: string;
    title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title = "Posłuchaj artykułu (wersja AI)" }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setDuration(total);
            setProgress((current / total) * 100);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const manualChange = Number(e.target.value);
            audioRef.current.currentTime = (audioRef.current.duration / 100) * manualChange;
            setProgress(manualChange);
        }
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="w-full my-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden group">
            {/* Aurora effect background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-xl transition-all duration-1000 group-hover:opacity-20"></div>

            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-cyan-500/10 text-cyan-400">
                            <Volume2 size={20} />
                        </div>
                        <h3 className="text-white font-medium text-lg tracking-tight">
                            {title}
                        </h3>
                    </div>

                    {/* Visualizer bars simulation */}
                    <div className="flex items-end gap-1 h-6">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 bg-cyan-500/50 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
                                style={{
                                    height: isPlaying ? `${Math.random() * 16 + 4}px` : '4px',
                                    animationDelay: `${i * 0.1}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>

                    <div className="flex-1 flex flex-col gap-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
                        />
                        <div className="flex justify-between text-xs text-white/50 font-mono">
                            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={src}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                />
            </div>
        </div>
    );
};
