
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/src/components/common/SEO';
import { CalendarLayout } from '@/src/components/Calendar/CalendarLayout';
import { CalendarGrid } from '@/src/components/Calendar/CalendarGrid';
import { ContentBank } from '@/src/components/Calendar/ContentBank';
import { PostModal } from '@/src/components/Calendar/PostModal';
import { Plus } from 'lucide-react';

export const CalendarPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <CalendarLayout>
            <SEO
                title="Content Calendar"
                description="Planuj i automatyzuj swoje treści w social media."
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-2">Content Calendar</h2>
                        <p className="text-slate-400">Plan, generate, and schedule your social media presence.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                    >
                        <Plus size={20} />
                        New Post
                    </button>
                </div>

                <CalendarGrid />

                <ContentBank />

                <PostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    date={selectedDate}
                />
            </motion.div>
        </CalendarLayout>
    );
};
