"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, DollarSign, PiggyBank, ArrowRight, CheckCircle, Info, Users, CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// --- Shared Constants & Logic (Duplicated from other components for independence) ---

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

interface TaxSavingCalculatorProps {
    revenue: number;
    setRevenue: (value: number) => void;
    expenses: number;
    setExpenses: (value: number) => void;
    vatMode: 'general' | 'simplified';
    setVatMode: (mode: 'general' | 'simplified') => void;
    yellowUmbrella: number; // Monthly payment
    setYellowUmbrella: (value: number) => void;
    employeeCount: number;
    setEmployeeCount: (value: number) => void;
    employeeSalary: number; // Monthly salary per employee
    setEmployeeSalary: (value: number) => void;
    cardSpending: number; // Monthly credit card spending
    setCardSpending: (value: number) => void;
    onReset: () => void;
}

const TaxSavingCalculator: React.FC<TaxSavingCalculatorProps> = ({
    revenue,
    setRevenue,
    expenses,
    setExpenses,
    vatMode,
    setVatMode,
    yellowUmbrella,
    setYellowUmbrella,
    employeeCount,
    setEmployeeCount,
    employeeSalary,
    setEmployeeSalary,
    cardSpending,
    setCardSpending,
    onReset
}) => {
    const [result, setResult] = useState({
        vat: 0,
        incomeTax: 0,
        totalTax: 0,
        vatSaving: 0,
        incomeTaxSaving: 0,
        totalSaving: 0,
        effectiveRate: 0,
        netIncome: 0,
        creditCardDeduction: 0,
        laborCost: 0,
        cardBenefit: 0,
        // Detailed Breakdowns
        cardPoints: 0,
        cardDiscount: 0,
        cardGift: 0,
        cardAnnualFee: 0,
        vatPurchaseDeduction: 0,
        incomeTaxYellowUmbrellaSaving: 0,
        yellowUmbrellaLimit: 0,
        actualYellowUmbrellaDeduction: 0,
    });

    useEffect(() => {
        calculate();
    }, [revenue, expenses, vatMode, yellowUmbrella, employeeCount, employeeSalary, cardSpending]);

    const calculate = () => {
        // --- 1. VAT Calculation ---
        let vat = 0;
        let vatSaving = 0;
        let creditCardDeduction = 0;
        let vatPurchaseDeduction = 0;

        if (vatMode === 'general') {
            // General: Revenue Tax - Purchase Tax
            const revenueSupply = Math.round(revenue / 1.1);
            const revenueTax = revenue - revenueSupply;
            const purchaseSupply = Math.round(expenses / 1.1);
            const purchaseTax = expenses - purchaseSupply;

            vat = Math.max(revenueTax - purchaseTax, 0);
            vatSaving = purchaseTax; // Input tax deduction is the saving
            vatPurchaseDeduction = purchaseTax;
        } else {
            // Simplified: Revenue * IndustryRate * 10% (Assume 15% rate for retail/food as default average)
            const industryRate = 0.15;
            const taxBeforeDeduction = Math.round(revenue * industryRate * 0.1);
            const purchaseDeduction = Math.round(expenses * 0.005); // 0.5% deduction

            // Credit Card Sales Deduction (Assume 90% of revenue is card/cash receipt for simulation)
            const estimatedCreditCardSales = revenue * 0.9;
            creditCardDeduction = Math.min(Math.round(estimatedCreditCardSales * 0.013), 10000000);

            vat = Math.max(taxBeforeDeduction - purchaseDeduction - creditCardDeduction, 0);
            vatSaving = purchaseDeduction + creditCardDeduction;
            vatPurchaseDeduction = purchaseDeduction;
        }

        // --- 2. Income Tax Calculation ---
        // Calculate Labor Cost (Not subject to VAT deduction, but deductible for Income Tax)
        const annualLaborCost = employeeCount * employeeSalary * 12;

        // Total Deductible Expenses for Income Tax = Operating Expenses + Labor Cost
        // Note: 'expenses' input is assumed to be VAT-inclusive operating expenses.
        // For Income Tax, we deduct the full expense amount (if simplified) or supply price (if general, but simplified logic often uses total).
        // To keep it simple and consistent with previous logic:
        // We treat 'expenses' as fully deductible.

        let income = Math.max(revenue - expenses - annualLaborCost, 0);

        // Yellow Umbrella Deduction Limit
        let yellowUmbrellaLimit = 0;
        if (income <= 40000000) yellowUmbrellaLimit = 5000000; // 40M or less -> 5M limit
        else if (income <= 100000000) yellowUmbrellaLimit = 3000000; // 40M ~ 100M -> 3M limit
        else yellowUmbrellaLimit = 2000000; // Over 100M -> 2M limit

        const annualYellowUmbrella = yellowUmbrella * 12;
        const actualYellowUmbrellaDeduction = Math.min(annualYellowUmbrella, yellowUmbrellaLimit);

        const basicDeduction = 1500000; // Standard basic deduction

        const calculateIncomeTax = (deduction: number) => {
            const taxable = Math.max(income - basicDeduction - deduction, 0);
            let tax = 0;
            for (let i = 0; i < TAX_BRACKETS.length; i++) {
                if (taxable <= TAX_BRACKETS[i].limit) {
                    tax = taxable * TAX_BRACKETS[i].rate - TAX_BRACKETS[i].deduction;
                    break;
                } else if (TAX_BRACKETS[i].limit === Infinity) {
                    tax = taxable * TAX_BRACKETS[i].rate - TAX_BRACKETS[i].deduction;
                }
            }
            return Math.max(tax, 0) * 1.1; // Include Local Tax (10%)
        };

        const currentIncomeTax = calculateIncomeTax(actualYellowUmbrellaDeduction);
        const noSavingIncomeTax = calculateIncomeTax(0);

        const incomeTaxSaving = noSavingIncomeTax - currentIncomeTax;

        // --- 3. Card Benefit Calculation (Based on Samsung BIZ THE iD. PLATINUM logic for simulation) ---
        const annualCardSpend = cardSpending * 12;
        const cardPoints = annualCardSpend * 0.012;

        // Discount Logic: 3% on 20% of spend, capped at 20k/month
        const cardDiscountMonthly = Math.min(cardSpending * 0.2 * 0.03, 20000);
        const cardDiscount = cardDiscountMonthly * 12;

        const cardGift = 150000;
        const cardAnnualFee = 240000;

        // Total Card Benefit (Net)
        const cardBenefit = Math.max(cardPoints + cardDiscount + cardGift - cardAnnualFee, 0);

        // --- 4. Total ---
        const totalTax = vat + currentIncomeTax;
        const totalSaving = vatSaving + incomeTaxSaving + cardBenefit;
        // Net Income = Revenue - Expenses - Labor - Tax + Card Benefit
        const netIncome = revenue - expenses - annualLaborCost - totalTax + cardBenefit;

        setResult({
            vat,
            incomeTax: currentIncomeTax,
            totalTax,
            vatSaving,
            incomeTaxSaving,
            totalSaving,
            effectiveRate: revenue > 0 ? (totalTax / revenue) * 100 : 0,
            netIncome,
            creditCardDeduction,
            laborCost: annualLaborCost,
            cardBenefit,
            // Breakdowns
            cardPoints,
            cardDiscount,
            cardGift,
            cardAnnualFee,
            vatPurchaseDeduction,
            incomeTaxYellowUmbrellaSaving: incomeTaxSaving,
            yellowUmbrellaLimit,
            actualYellowUmbrellaDeduction,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(value);
    };

    const dataPie = [
        { name: '순수익', value: result.netIncome },
        { name: '총 세금', value: result.totalTax },
        { name: '운영비용', value: expenses },
        { name: '인건비', value: result.laborCost },
    ].filter(item => item.value > 0);

    const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <PiggyBank className="w-8 h-8 text-green-600" />
                    통합 절세 계산기
                </h1>
                <button
                    onClick={onReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    초기화
                </button>
            </div>

            <div className="space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h3 className="text-sm font-bold text-red-800 mb-2">총 예상 세금</h3>
                        <p className="text-2xl font-extrabold text-red-600">{formatCurrency(result.totalTax)}</p>
                        <div className="text-xs text-red-500 mt-2 space-y-1">
                            <div className="flex justify-between">
                                <span>부가가치세:</span>
                                <span>{formatCurrency(result.vat)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>종합소득세:</span>
                                <span>{formatCurrency(result.incomeTax)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-sm font-bold text-green-800 mb-2">총 절세 효과</h3>
                        <p className="text-2xl font-extrabold text-green-600">{formatCurrency(result.totalSaving)}</p>
                        <div className="text-xs text-green-600 mt-2 space-y-1">
                            <div className="flex justify-between">
                                <span>부가세 절감:</span>
                                <span>{formatCurrency(result.vatSaving)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>소득세 절감:</span>
                                <span>{formatCurrency(result.incomeTaxSaving)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>카드 혜택:</span>
                                <span>{formatCurrency(result.cardBenefit)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-sm font-bold text-blue-800 mb-2">세후 순수익</h3>
                        <p className="text-2xl font-extrabold text-blue-600">{formatCurrency(result.netIncome)}</p>
                        <p className="text-xs text-blue-500 mt-1">비용 및 세금 차감 후</p>
                    </div>
                </div>

                {/* Main Input & Analysis */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calculator className="w-5 h-5" /> 기본 정보 입력
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">연간 매출액 (부가세 포함)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={revenue === 0 ? '' : revenue.toLocaleString()}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (!isNaN(Number(val))) setRevenue(Number(val));
                                            }}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-4 top-3 text-gray-400">원</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">연간 지출액 (매입+경비)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={expenses === 0 ? '' : expenses.toLocaleString()}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (!isNaN(Number(val))) setExpenses(Number(val));
                                            }}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-4 top-3 text-gray-400">원</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">* 인건비 제외 (아래 별도 입력)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">사업자 유형</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setVatMode('general')}
                                            className={`flex-1 py-2 rounded-lg font-bold border ${vatMode === 'general' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 text-gray-500'}`}
                                        >
                                            일반과세자
                                        </button>
                                        <button
                                            onClick={() => setVatMode('simplified')}
                                            className={`flex-1 py-2 rounded-lg font-bold border ${vatMode === 'simplified' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 text-gray-500'}`}
                                        >
                                            간이과세자
                                        </button>
                                    </div>
                                </div>

                                {/* Employee Inputs */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <Users className="w-4 h-4" /> 직원/인건비 정보
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 mb-1">직원 수</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={employeeCount}
                                                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-8"
                                                    placeholder="0"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-400 text-xs">명</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 mb-1">1인당 월 급여</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={employeeSalary === 0 ? '' : employeeSalary.toLocaleString()}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/,/g, '');
                                                        if (!isNaN(Number(val))) setEmployeeSalary(Number(val));
                                                    }}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-8"
                                                    placeholder="0"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                            </div>
                                        </div>
                                    </div>
                                    {result.laborCost > 0 && (
                                        <p className="text-xs text-indigo-600 mt-2 text-right">
                                            연간 총 인건비: <strong>{formatCurrency(result.laborCost)}</strong>
                                        </p>
                                    )}
                                </div>

                                {/* Card Spending Input */}
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> 사업자 카드 사용
                                    </h4>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">월 평균 카드 사용금액</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={cardSpending === 0 ? '' : cardSpending.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val))) setCardSpending(Number(val));
                                                }}
                                                className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-right pr-8"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                        </div>
                                        {result.cardBenefit > 0 && (
                                            <div className="mt-3 bg-white p-3 rounded-lg border border-blue-100">
                                                <p className="text-xs font-bold text-blue-800 mb-2">삼성카드 BIZ THE iD. PLATINUM 기준</p>
                                                <div className="space-y-1 text-xs text-gray-600">
                                                    <div className="flex justify-between">
                                                        <span>기프트 서비스:</span>
                                                        <span className="text-blue-600">+{formatCurrency(result.cardGift)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>포인트 적립 (1.2%):</span>
                                                        <span className="text-blue-600">+{formatCurrency(result.cardPoints)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>사업경비 할인 (3%):</span>
                                                        <span className="text-blue-600">+{formatCurrency(result.cardDiscount)}</span>
                                                    </div>
                                                    <div className="flex justify-between pt-1 border-t border-gray-100">
                                                        <span>연회비:</span>
                                                        <span className="text-red-500">-{formatCurrency(result.cardAnnualFee)}</span>
                                                    </div>
                                                    <div className="flex justify-between pt-1 border-t border-blue-100 font-bold">
                                                        <span className="text-blue-800">총 혜택 (순이익):</span>
                                                        <span className="text-blue-600">{formatCurrency(result.cardBenefit)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">노란우산공제 월 납입액</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={yellowUmbrella === 0 ? '' : yellowUmbrella.toLocaleString()}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (!isNaN(Number(val))) setYellowUmbrella(Number(val));
                                            }}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none font-bold"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-4 top-3 text-gray-400">원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">수익 및 세금 구조</h3>
                        <div className="flex-1 min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dataPie}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {dataPie.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">세금 상세 내역</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">부가가치세</p>
                                    <p className="text-xs text-gray-500">
                                        {vatMode === 'general' ? '매출세액 - 매입세액공제' : '매출세액 - (매입공제 + 신용카드발행공제)'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{formatCurrency(result.vat)}</p>
                                <div className="text-xs text-green-600">
                                    <p>매입공제: -{formatCurrency(result.vatPurchaseDeduction)}</p>
                                    {result.creditCardDeduction > 0 && <p>신용카드발행공제: -{formatCurrency(result.creditCardDeduction)}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <TrendingDown className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">종합소득세 (지방세 포함)</p>
                                    <p className="text-xs text-gray-500">과세표준 × 세율 - 누진공제</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{formatCurrency(result.incomeTax)}</p>
                                <div className="text-xs text-green-600">
                                    <p>노란우산 공제: -{formatCurrency(result.actualYellowUmbrellaDeduction)} (한도: {formatCurrency(result.yellowUmbrellaLimit)})</p>
                                    <p>노란우산 절세: -{formatCurrency(result.incomeTaxYellowUmbrellaSaving)}</p>
                                    {result.laborCost > 0 && <p>인건비 비용인정 효과 포함</p>}
                                </div>
                            </div>
                        </div>

                        {result.cardBenefit > 0 && (
                            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">사업자 카드 혜택</p>
                                        <p className="text-xs text-gray-500">포인트 적립 + 할인 + 기프트 (연회비 차감)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600">+{formatCurrency(result.cardBenefit)}</p>
                                    <div className="text-xs text-gray-500 text-right">
                                        <span>포인트: +{formatCurrency(result.cardPoints)} / </span>
                                        <span>할인: +{formatCurrency(result.cardDiscount)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tax Saving Tips Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                        <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            절세 체크리스트
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span><strong>사업자카드 사용:</strong> 지출 시 사업자카드를 사용하면 매입세액 공제 및 소득세 비용 처리가 간편해집니다.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span><strong>노란우산공제 가입:</strong> 연 최대 500만원(소득 구간별 상이) 소득공제로 소득세율 구간을 낮출 수 있습니다.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span><strong>인건비 신고:</strong> 직원 급여는 원천세 신고를 해야 비용으로 인정받아 소득세를 줄일 수 있습니다.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span><strong>청년창업 세액감면:</strong> 만 15~34세 청년 창업 시 5년간 소득세 50~100% 감면 가능 (조건 확인 필수)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                        <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            추가 절세 팁
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p>
                                <strong className="text-indigo-700">경조사비 처리:</strong> 거래처 경조사비는 건당 20만원까지 접대비로 인정됩니다. (청첩장, 부고장 보관 필수)
                            </p>
                            <p>
                                <strong className="text-indigo-700">차량 운행일지:</strong> 업무용 승용차 관련 비용을 1,500만원 이상 인정받으려면 운행일지 작성이 필요합니다.
                            </p>
                            <p>
                                <strong className="text-indigo-700">사업용 계좌:</strong> 복식부기의무자는 사업용 계좌를 사용하지 않으면 가산세가 부과될 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxSavingCalculator;
