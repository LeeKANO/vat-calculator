
"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface RevenueChartProps {
    analysisYear: number;
    dailySales: number;
    marginPerUnit: number;
    realMonthlyRentalCost: number; // 실질 월 렌탈료
    realLumpSumCost: number;       // 실질 일시불 비용
}

const RevenueChart: React.FC<RevenueChartProps> = ({
    analysisYear,
    dailySales,
    marginPerUnit,
    realMonthlyRentalCost,
    realLumpSumCost
}) => {
    // Generate Data
    const data = React.useMemo(() => {
        const result = [];
        // Year 0 (Start)
        result.push({
            year: 0,
            rentalProfit: 0,
            lumpSumProfit: -realLumpSumCost, // Initial Investment
        });

        for (let y = 1; y <= analysisYear; y++) {
            const months = y * 12;

            // Revenue (Cumulative)
            const revenue = dailySales * 30 * months * marginPerUnit;

            // Rental Cost (Cumulative, capped at 36 months)
            const rentalMonths = Math.min(months, 36);
            const totalRentalCost = realMonthlyRentalCost * rentalMonths;
            const rentalProfit = revenue - totalRentalCost;

            // Lump Sum Profit (Revenue - Initial Investment)
            const lumpSumProfit = revenue - realLumpSumCost;

            result.push({
                year: y,
                rentalProfit,
                lumpSumProfit,
            });
        }
        return result;
    }, [analysisYear, dailySales, marginPerUnit, realMonthlyRentalCost, realLumpSumCost]);

    const formatYAxis = (value: number) => {
        if (Math.abs(value) >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
        if (Math.abs(value) >= 10000) return `${(value / 10000).toLocaleString()}만`;
        return value.toLocaleString();
    };

    return (
        <div className="w-full h-[300px] mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-white text-sm font-bold mb-4 text-center">누적 순수익 변화 (렌탈 vs 일시불)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="year"
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        unit="년"
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        tickFormatter={formatYAxis}
                        width={60}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#f8fafc' }}
                        formatter={(value: number) => [`${value.toLocaleString()}원`, '순수익']}
                        labelFormatter={(label) => `${label}년차`}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Line
                        type="monotone"
                        dataKey="rentalProfit"
                        name="렌탈 구매"
                        stroke="#3b82f6" // blue-500
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="lumpSumProfit"
                        name="일시불 구매"
                        stroke="#a855f7" // purple-500
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
