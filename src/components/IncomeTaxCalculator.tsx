"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Info, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TAX_BRACKETS = [
    { limit: 14000000, rate: 0.06, deduction: 0 },
    { limit: 50000000, rate: 0.15, deduction: 1260000 },
    { limit: 88000000, rate: 0.24, deduction: 5760000 },
    { limit: 150000000, rate: 0.35, deduction: 15440000 },
    { limit: 300000000, rate: 0.38, deduction: 19940000 },
    { limit: 500000000, rate: 0.40, deduction: 25940000 },
    { limit: 1000000000, rate: 0.42, deduction: 35940000 },
    { limit: Infinity, rate: 0.45, deduction: 65940000 },
];

interface IncomeTaxCalculatorProps {
    revenue: number;
    setRevenue: (value: number) => void;
    expenses: number;
    setExpenses: (value: number) => void;
    deductions: number;
    setDeductions: (value: number) => void;
    yellowUmbrella: number;
    setYellowUmbrella: (value: number) => void;
    onReset: () => void;
}

const IncomeTaxCalculator: React.FC<IncomeTaxCalculatorProps> = ({
    revenue,
    setRevenue,
    expenses,
    setExpenses,
    deductions,
    setDeductions,
    yellowUmbrella,
    setYellowUmbrella,
    onReset
}) => {
    const [result, setResult] = useState({
        taxableIncome: 0,
        incomeTax: 0,
        localTax: 0,
        totalTax: 0,
        effectiveRate: 0,
        bracket: { rate: 0, deduction: 0 },
        yellowUmbrellaDeduction: 0, // 실제 공제받는 금액
        nextLowerBracketGap: 0,
        nextLowerBracketLimit: 0,
        nextLowerBracketRate: 0,
    });

    useEffect(() => {
        calculate();
    }, [revenue, expenses, deductions, yellowUmbrella]);

    const calculate = () => {
        const income = Math.max(revenue - expenses, 0); // 사업소득금액

        // 노란우산공제 한도 계산 (2025년 개정)
        let yellowUmbrellaLimit = 0;
        if (income <= 40000000) {
            yellowUmbrellaLimit = 6000000;
        } else if (income <= 60000000) {
            yellowUmbrellaLimit = 5000000;
        } else if (income <= 100000000) {
            yellowUmbrellaLimit = 4000000;
        } else {
            yellowUmbrellaLimit = 2000000;
        }

        const actualYellowUmbrellaDeduction = Math.min(yellowUmbrella, yellowUmbrellaLimit);

        // 과세표준 = 사업소득금액 - (기본공제 + 노란우산공제)
        const taxableIncome = Math.max(income - deductions - actualYellowUmbrellaDeduction, 0);

        let incomeTax = 0;
        let appliedBracket = TAX_BRACKETS[0];
        let nextLowerBracketGap = 0;
        let nextLowerBracketLimit = 0;
        let nextLowerBracketRate = 0;

        for (let i = 0; i < TAX_BRACKETS.length; i++) {
            const bracket = TAX_BRACKETS[i];
            if (taxableIncome <= bracket.limit) {
                incomeTax = taxableIncome * bracket.rate - bracket.deduction;
                appliedBracket = bracket;

                // Calculate gap to lower bracket if not in the lowest bracket
                if (i > 0) {
                    const lowerBracket = TAX_BRACKETS[i - 1];
                    nextLowerBracketLimit = lowerBracket.limit;
                    nextLowerBracketRate = lowerBracket.rate;
                    nextLowerBracketGap = taxableIncome - lowerBracket.limit;
                }
                break;
            } else if (bracket.limit === Infinity) {
                incomeTax = taxableIncome * bracket.rate - bracket.deduction;
                appliedBracket = bracket;

                // Logic for the highest bracket
                const lowerBracket = TAX_BRACKETS[TAX_BRACKETS.length - 2];
                nextLowerBracketLimit = lowerBracket.limit;
                nextLowerBracketRate = lowerBracket.rate;
                nextLowerBracketGap = taxableIncome - lowerBracket.limit;
            }
        }

        incomeTax = Math.max(incomeTax, 0);
        const localTax = Math.floor(incomeTax * 0.1);
        const totalTax = incomeTax + localTax;

        setResult({
            taxableIncome,
            incomeTax,
            localTax,
            totalTax,
            effectiveRate: revenue > 0 ? (totalTax / revenue) * 100 : 0,
            bracket: appliedBracket,
            yellowUmbrellaDeduction: actualYellowUmbrellaDeduction,
            nextLowerBracketGap,
            nextLowerBracketLimit,
            nextLowerBracketRate,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    };

    const dataPie = [
        { name: '순수익(세후)', value: Math.max(revenue - expenses - result.totalTax, 0) },
        { name: '총 세금', value: result.totalTax },
        { name: '필요경비', value: expenses },
    ];

    const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-8 h-8 text-green-600" />
                    종합소득세 계산기
                </h1>
                <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    초기화
                </button>
            </div>

            <div className="space-y-6">
                {/* Row 1: Input & Chart */}
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    {/* Left: Input Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">기본 정보 입력</h3>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">연간 매출액</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={revenue === 0 ? '' : revenue.toLocaleString()}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(Number(val))) setRevenue(Number(val));
                                        }}
                                        className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">원</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">필요 경비 (매입 + 기타)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={expenses === 0 ? '' : expenses.toLocaleString()}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(Number(val))) setExpenses(Number(val));
                                        }}
                                        className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">원</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">소득공제 (기본공제 등)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={deductions === 0 ? '' : deductions.toLocaleString()}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(Number(val))) setDeductions(Number(val));
                                        }}
                                        className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="1500000"
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">원</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">* 본인 기본공제 150만원 자동 입력됨</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    노란우산공제 납입액
                                    <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full font-medium">절세 꿀팁</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={yellowUmbrella === 0 ? '' : yellowUmbrella.toLocaleString()}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(Number(val))) setYellowUmbrella(Number(val));
                                        }}
                                        className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">원</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    * 사업소득금액에 따라 최대 600만원까지 공제 가능 (2025년 개정)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Chart Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">수익 구조 분석</h3>
                        <div className="flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dataPie}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {dataPie.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 2: Result & Yellow Umbrella */}
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    {/* Left: Result Section */}
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm h-full">
                        <h3 className="text-lg font-bold text-green-900 mb-4">계산 결과</h3>
                        <div className="space-y-3 mb-5">
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>과세표준</span>
                                <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
                            </div>
                            {result.yellowUmbrellaDeduction > 0 && (
                                <div className="flex justify-between text-sm text-yellow-700 font-bold bg-yellow-100/50 p-1.5 rounded">
                                    <span>노란우산공제 적용</span>
                                    <span>- {formatCurrency(result.yellowUmbrellaDeduction)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>적용 세율</span>
                                <span className="font-medium">{result.bracket.rate * 100}% (누진공제 {formatCurrency(result.bracket.deduction)})</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>종합소득세</span>
                                <span className="font-medium">{formatCurrency(result.incomeTax)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span>지방소득세 (10%)</span>
                                <span className="font-medium">{formatCurrency(result.localTax)}</span>
                            </div>
                        </div>
                        <div className="border-t border-green-200 pt-4 flex justify-between items-end">
                            <span className="text-base text-gray-900 font-bold">총 예상 납부액</span>
                            <span className="text-3xl font-extrabold text-green-600">{formatCurrency(result.totalTax)}</span>
                        </div>

                        {/* Optimization Tip inside Result Box */}
                        {result.nextLowerBracketGap > 0 && (
                            <div className="mt-4 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                                <div className="flex items-start gap-2">
                                    <TrendingDown className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-indigo-800 leading-relaxed">
                                            <span className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">{formatCurrency(result.nextLowerBracketGap)}</span> 더 비용 처리 시,
                                            세율 <span className="font-bold">{result.bracket.rate * 100}%</span> → <span className="font-bold text-indigo-600">{result.nextLowerBracketRate * 100}%</span> 인하 효과!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Yellow Umbrella Table */}
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-sm h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Info className="w-5 h-5 text-yellow-700" />
                            <h3 className="text-lg font-bold text-yellow-800">2025년 노란우산공제 한도</h3>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg border border-yellow-100">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-yellow-900 uppercase bg-yellow-100">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 font-bold">사업소득금액</th>
                                        <th scope="col" className="px-3 py-2 font-bold">최대 공제 한도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-3 py-2">4천만원 이하</td>
                                        <td className="px-3 py-2 font-bold text-yellow-600">600만원</td>
                                    </tr>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-3 py-2">4천만원 ~ 6천만원</td>
                                        <td className="px-3 py-2 font-bold text-yellow-600">500만원</td>
                                    </tr>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-3 py-2">6천만원 ~ 1억원</td>
                                        <td className="px-3 py-2 font-bold text-yellow-600">400만원</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2">1억원 초과</td>
                                        <td className="px-3 py-2 font-bold text-yellow-600">200만원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Row 3: Tax Rates & Deductible Expenses */}
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    {/* Left: Tax Rates Table */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm h-full">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">2024/2025 종합소득세 세율표</h3>
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                            <table className="w-full text-xs text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 font-bold">과세표준</th>
                                        <th scope="col" className="px-3 py-2 font-bold">세율</th>
                                        <th scope="col" className="px-3 py-2 font-bold">누진공제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TAX_BRACKETS.map((bracket, index) => (
                                        <tr key={index} className={`border-b last:border-0 ${result.bracket.rate === bracket.rate ? 'bg-green-50 font-bold text-green-800' : ''}`}>
                                            <td className="px-3 py-2">
                                                {index === 0 ? `${formatCurrency(bracket.limit)} 이하` :
                                                    index === TAX_BRACKETS.length - 1 ? `${formatCurrency(TAX_BRACKETS[index - 1].limit)} 초과` :
                                                        `${formatCurrency(TAX_BRACKETS[index - 1].limit)} ~ ${formatCurrency(bracket.limit)}`}
                                            </td>
                                            <td className="px-3 py-2">{bracket.rate * 100}%</td>
                                            <td className="px-3 py-2">{formatCurrency(bracket.deduction)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right: Deductible Expenses Table */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-blue-700" />
                            <h3 className="text-lg font-bold text-blue-800">주요 비용처리 가능 항목</h3>
                        </div>
                        <div className="overflow-x-auto bg-white rounded-lg border border-blue-100">
                            <table className="w-full text-xs text-left text-gray-600">
                                <thead className="text-xs text-blue-900 uppercase bg-blue-100">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 font-bold w-1/4">구분</th>
                                        <th scope="col" className="px-3 py-2 font-bold">상세 항목</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-blue-50">
                                        <td className="px-3 py-2 font-bold text-blue-700">인건비</td>
                                        <td className="px-3 py-2">급여, 임금, 퇴직금, 일용직 급여, 4대보험, 식대</td>
                                    </tr>
                                    <tr className="border-b border-blue-50">
                                        <td className="px-3 py-2 font-bold text-blue-700">임차료</td>
                                        <td className="px-3 py-2">사무실 월세, 관리비, 전기/수도/가스요금</td>
                                    </tr>
                                    <tr className="border-b border-blue-50">
                                        <td className="px-3 py-2 font-bold text-blue-700">차량/운반</td>
                                        <td className="px-3 py-2">유류비, 수리비, 보험료, 퀵서비스, 택배비</td>
                                    </tr>
                                    <tr className="border-b border-blue-50">
                                        <td className="px-3 py-2 font-bold text-blue-700">사업지원</td>
                                        <td className="px-3 py-2">접대비, 경조사비, 광고선전비, 포장비</td>
                                    </tr>
                                    <tr className="border-b border-blue-50">
                                        <td className="px-3 py-2 font-bold text-blue-700">금융/보험</td>
                                        <td className="px-3 py-2">대출이자, 화재보험료 (원금 제외)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 font-bold text-blue-700">기타</td>
                                        <td className="px-3 py-2">사무용품, 도서인쇄, 수선, 회의, 통신비</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-blue-600 mt-2 text-right font-medium">
                            * 적격증빙(세금계산서, 현금영수증, 신용카드매출전표) 수취 필수
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeTaxCalculator;
