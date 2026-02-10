import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import clsx from 'clsx';

export const CalendarGrid: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="bg-[#0f172a]/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-slate-100">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <p className="text-slate-400 text-sm">Manage your content schedule</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm font-medium hover:bg-slate-800 rounded-md transition-colors">
                        Today
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden">
                {/* Weekday Headers */}
                {weekDays.map(day => (
                    <div key={day} className="bg-[#0f172a]/80 p-3 text-center text-sm font-semibold text-slate-500">
                        {day}
                    </div>
                ))}

                {/* Days */}
                {dateRange.map((day, idx) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div
                            key={day.toString()}
                            className={clsx(
                                "min-h-[120px] p-3 transition-colors bg-[#0f172a]",
                                !isCurrentMonth && "bg-[#0f172a]/30 text-slate-600",
                                isCurrentMonth && "hover:bg-slate-800/30 cursor-pointer group"
                            )}
                            onClick={() => setSelectedDate(day)}
                        >
                            <div className="flex justify-between items-start">
                                <span className={clsx(
                                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                    isToday ? "bg-cyan-500 text-white" : "text-slate-400",
                                    !isCurrentMonth && "opacity-50"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded-full text-slate-400 hover:text-cyan-400 transition-all">
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Placeholder for posts */}
                            <div className="mt-2 space-y-1">
                                {isToday && (
                                    <div className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-2 py-1 rounded truncate">
                                        🚀 Launch Day
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
