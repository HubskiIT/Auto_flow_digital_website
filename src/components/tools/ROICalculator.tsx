import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, ChartIcon, CheckCircleIcon } from '../common/Icons';

const ROICalculator = () => {
    const [employees, setEmployees] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(60);
    const [hoursPerWeek, setHoursPerWeek] = useState(5);

    const [savingsYearly, setSavingsYearly] = useState(0);
    const [savingsMonthly, setSavingsMonthly] = useState(0);
    const [hoursSavedMonthly, setHoursSavedMonthly] = useState(0);

    // Automation cost assumption for ROI (e.g., 5000 PLN setup + 500 PLN/mo maintenance)
    // This is just a rough estimate for the "Return in X months" metric
    const estimatedImplementationCost = 6000;

    useEffect(() => {
        // Calculate costs
        const weeklyCostPerEmployee = hourlyRate * hoursPerWeek;
        const totalWeeklyCost = weeklyCostPerEmployee * employees;

        const monthly = totalWeeklyCost * 4;
        const yearly = monthly * 12;

        // Assume automation saves 80% of this time
        const efficientyFactor = 0.8;

        setSavingsMonthly(Math.round(monthly * efficientyFactor));
        setSavingsYearly(Math.round(yearly * efficientyFactor));
        setHoursSavedMonthly(Math.round(employees * hoursPerWeek * 4 * efficientyFactor));

    }, [employees, hourlyRate, hoursPerWeek]);

    const roiMonths = Math.max(1, Math.round(estimatedImplementationCost / savingsMonthly * 10) / 10);

    return (
        <section id="audit" className="py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ile <span className="text-gradient">Tracisz</span> Bez Automatyzacji?
                    </h2>
                    <p className="text-xl text-text-secondary">
                        Sprawdź potencjał oszczędności w Twojej firmie. Większość firm nie zdaje sobie sprawy, ile kosztują "drobne" manualne zadania.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Calculator Inputs */}
                    <div className="card p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl">
                        <div className="space-y-8">
                            {/* Employees Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-lg font-medium">Liczba pracowników biurowych</label>
                                    <span className="text-2xl font-bold text-accent">{employees}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={employees}
                                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between text-xs text-text-secondary mt-1">
                                    <span>1 osoba</span>
                                    <span>50 osób</span>
                                </div>
                            </div>

                            {/* Hourly Rate Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-lg font-medium">Średnia stawka godzinowa (brutto)</label>
                                    <span className="text-2xl font-bold text-accent">{hourlyRate} PLN</span>
                                </div>
                                <input
                                    type="range"
                                    min="30"
                                    max="300"
                                    step="10"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between text-xs text-text-secondary mt-1">
                                    <span>30 PLN</span>
                                    <span>300 PLN</span>
                                </div>
                            </div>

                            {/* Hours Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-lg font-medium">Godziny powtarzalnych zadań / tyg. (na osobę)</label>
                                    <span className="text-2xl font-bold text-accent">{hoursPerWeek}h</span>
                                </div>
                                <p className="text-sm text-text-secondary mb-3">
                                    Np. kopiowanie danych, raporty, emaile, faktury
                                </p>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                                <div className="flex justify-between text-xs text-text-secondary mt-1">
                                    <span>1h</span>
                                    <span>20h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                        <div className="relative bg-black/40 border border-accent/20 rounded-2xl p-8 backdrop-blur-xl">
                            <h3 className="text-xl text-text-secondary mb-6 flex items-center gap-2">
                                <ChartIcon /> Twój Potencjał Oszczędności
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Rocznie w kieszeni</p>
                                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-accent">
                                        {savingsYearly.toLocaleString()} PLN
                                    </div>
                                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                                        <CheckCircleIcon /> Odzyskany budżet na rozwój
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-xs text-text-secondary mb-1">Oszczędność miesięczna</p>
                                        <p className="text-2xl font-bold text-white">{savingsMonthly.toLocaleString()} PLN</p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <p className="text-xs text-text-secondary mb-1">Odzyskane godziny (mies)</p>
                                        <p className="text-2xl font-bold text-white">{hoursSavedMonthly}h</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-sm mb-4">
                                        Koszt wdrożenia automatyzacji zwraca się średnio po <span className="text-accent font-bold">{roiMonths} mies.</span>
                                    </p>
                                    <a href="#contact" className="btn-cta primary w-full justify-center text-center group flex items-center gap-2 !bg-accent !text-white hover:!bg-accent-hover transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                                        Zatrzymaj Straty – Umów Audyt
                                        <ArrowRightIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
