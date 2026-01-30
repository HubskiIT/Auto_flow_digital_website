import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, List, Settings, PieChart } from 'lucide-react';
import clsx from 'clsx';
import { ResearchSidebar } from '@/src/components/Calendar/ResearchSidebar';

interface CalendarLayoutProps {
    children: React.ReactNode;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 p-6 hidden md:block z-10 bg-[#020617]">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600" />
                    <span className="font-heading font-bold text-xl tracking-tight">Antigravity</span>
                </div>

                <nav className="flex flex-col gap-2">
                    <NavItem to="/calendar" icon={<LayoutGrid size={20} />} label="Calendar" />
                    <NavItem to="/calendar/list" icon={<List size={20} />} label="List View" />
                    <NavItem to="/calendar/analytics" icon={<PieChart size={20} />} label="Analytics" />
                    <div className="my-4 h-px bg-slate-800" />
                    <NavItem to="/calendar/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto relative">
                {children}
            </main>

            {/* Research Sidebar */}
            <ResearchSidebar />
        </div>
    );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <NavLink
        to={to}
        end={to === '/calendar'}
        className={({ isActive }) =>
            clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )
        }
    >
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </NavLink>
);
