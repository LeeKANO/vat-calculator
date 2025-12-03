"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, DollarSign, PiggyBank, ArrowRight, CheckCircle, Info, Users, CreditCard, Table, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// --- Shared Constants & Logic ---

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
    freelancerCount: number;
    setFreelancerCount: (value: number) => void;
    freelancerPayment: number; // Monthly payment per freelancer
    setFreelancerPayment: (value: number) => void;
    cardSpending: number; // Monthly credit card spending
    setCardSpending: (value: number) => void;
    industryGroup: 'retail' | 'manufacturing' | 'service';
    setIndustryGroup: (value: 'retail' | 'manufacturing' | 'service') => void;
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
    freelancerCount,
    setFreelancerCount,
    freelancerPayment,
    setFreelancerPayment,
    cardSpending,
    setCardSpending,
    industryGroup,
    setIndustryGroup,
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
        insuranceCost: 0, // 4대보험 (사업주 부담분)
        freelancerCost: 0, // 3.3% 프리랜서 비용
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
        bookkeepingTaxCredit: 0,
    });

    const [isDoubleEntry, setIsDoubleEntry] = useState<boolean>(false);
    const [creditCardSales, setCreditCardSales] = useState<number>(0);

    // State for VAT Refund Calculator
    const [refundInput, setRefundInput] = useState<number>(expenses);
    const [refundAmount, setRefundAmount] = useState<number>(0);
    const [isRefundCalculatorOpen, setIsRefundCalculatorOpen] = useState<boolean>(true);

    useEffect(() => {
        if (revenue > 0 && creditCardSales === 0) {
            setCreditCardSales(Math.round(revenue * 0.9));
        }
    }, [revenue]);

    useEffect(() => {
        calculate();
    }, [revenue, expenses, vatMode, yellowUmbrella, employeeCount, employeeSalary, freelancerCount, freelancerPayment, cardSpending, isDoubleEntry, industryGroup, creditCardSales]);

    useEffect(() => {
        if (expenses > 0 && refundInput === 0) {
            setRefundInput(expenses);
        }
    }, [expenses]);

    useEffect(() => {
        const supply = Math.round(refundInput / 1.1);
        const vat = refundInput - supply;
        setRefundAmount(vat);
    }, [refundInput]);

    const calculate = () => {
        // 0. Pre-check: If Revenue is 0, reset everything
        if (revenue === 0) {
            setResult({
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
                insuranceCost: 0,
                freelancerCost: 0,
                cardBenefit: 0,
                cardPoints: 0,
                cardDiscount: 0,
                cardGift: 0,
                cardAnnualFee: 0,
                vatPurchaseDeduction: 0,
                incomeTaxYellowUmbrellaSaving: 0,
                yellowUmbrellaLimit: 0,
                actualYellowUmbrellaDeduction: 0,
                bookkeepingTaxCredit: 0,
            });
            return;
        }

        // --- 1. VAT Calculation ---
        let vat = 0;
        let vatSaving = 0;
        let creditCardDeduction = 0;
        let vatPurchaseDeduction = 0;

        if (vatMode === 'general') {
            const revenueSupply = Math.round(revenue / 1.1);
            const revenueTax = revenue - revenueSupply;
            const purchaseSupply = Math.round(expenses / 1.1);
            const purchaseTax = expenses - purchaseSupply;

            vat = Math.max(revenueTax - purchaseTax, 0);
            vatSaving = purchaseTax;
            vatPurchaseDeduction = purchaseTax;
        } else {
            const industryRate = 0.15;
            const taxBeforeDeduction = Math.round(revenue * industryRate * 0.1);
            const purchaseDeduction = Math.round(expenses * 0.005);

            creditCardDeduction = Math.min(Math.round(creditCardSales * 0.013), 10000000);

            vat = Math.max(taxBeforeDeduction - purchaseDeduction - creditCardDeduction, 0);
            vatSaving = purchaseDeduction + creditCardDeduction;
            vatPurchaseDeduction = purchaseDeduction;
        }

        // --- 2. Income Tax Calculation ---
        // Regular Employees (4 Major Insurance)
        const insuranceRate = 0.105;
        const annualSalary = employeeCount * employeeSalary * 12;
        const insuranceCost = Math.round(annualSalary * insuranceRate);

        // Freelancers (3.3% Business Income)
        const annualFreelancerCost = freelancerCount * freelancerPayment * 12;

        const annualLaborCost = annualSalary + insuranceCost + annualFreelancerCost;

        let income = Math.max(revenue - expenses - annualLaborCost, 0);

        // Yellow Umbrella Deduction Limit (2025)
        let yellowUmbrellaLimit = 0;
        if (income <= 40000000) yellowUmbrellaLimit = 6000000;
        else if (income <= 60000000) yellowUmbrellaLimit = 5000000;
        else if (income <= 100000000) yellowUmbrellaLimit = 4000000;
        else yellowUmbrellaLimit = 2000000;

        const annualYellowUmbrella = yellowUmbrella * 12;
        const actualYellowUmbrellaDeduction = Math.min(annualYellowUmbrella, yellowUmbrellaLimit);

        const basicDeduction = 1500000;

        const calculateIncomeTax = (deduction: number) => {
            const taxable = Math.max(income - basicDeduction - deduction, 0);
            let tax = 0;
            for (let i = 0; i < TAX_BRACKETS.length; i++) {
                if (taxable <= TAX_BRACKETS[i].limit) {
                    tax = taxable * TAX_BRACKETS[i].rate - TAX_BRACKETS[i].deduction;
                    break; // IMPORTANT: Break once the correct bracket is found
                }
            }
            return Math.max(tax, 0);
        };

        // 1. Calculate Tax WITHOUT Yellow Umbrella (for comparison)
        const baseTaxNoYU = calculateIncomeTax(0);
        const localTaxNoYU = Math.floor(baseTaxNoYU * 0.1);
        const totalTaxNoYU = baseTaxNoYU + localTaxNoYU;

        // 2. Calculate Tax WITH Yellow Umbrella (Base for current scenario)
        const baseTaxWithYU = calculateIncomeTax(actualYellowUmbrellaDeduction);

        // Pure Yellow Umbrella Saving (Tax No YU - Tax With YU)
        const localTaxWithYU_NoCredit = Math.floor(baseTaxWithYU * 0.1);
        const totalTaxWithYU_NoCredit = baseTaxWithYU + localTaxWithYU_NoCredit;
        let pureYUSaving = totalTaxNoYU - totalTaxWithYU_NoCredit;

        // Defensive check: If no Yellow Umbrella payment, saving must be 0
        if (yellowUmbrella === 0) {
            pureYUSaving = 0;
        }

        // 3. Apply Bookkeeping Credit to the Tax WITH YU
        let bookkeepingTaxCredit = 0;
        let isMandatory = false;

        // Determine Mandatory Status based on Industry Group
        if (industryGroup === 'retail') {
            if (revenue >= 300000000) isMandatory = true;
        } else if (industryGroup === 'manufacturing') {
            if (revenue >= 150000000) isMandatory = true;
        } else if (industryGroup === 'service') {
            if (revenue >= 75000000) isMandatory = true;
        }

        // Credit applies ONLY if NOT mandatory AND Double Entry is selected AND NOT General Taxpayer
        if (isDoubleEntry && !isMandatory && vatMode !== 'general') {
            bookkeepingTaxCredit = Math.min(baseTaxWithYU * 0.2, 1000000);
        }

        const finalIncomeTax = Math.max(baseTaxWithYU - bookkeepingTaxCredit, 0);
        const localTax = Math.floor(finalIncomeTax * 0.1);
        const currentIncomeTax = finalIncomeTax + localTax;

        // Total Saving (compared to No YU, No Credit)
        const incomeTaxSaving = totalTaxNoYU - currentIncomeTax;

        // --- 3. Card Benefit Calculation ---
        const annualCardSpend = cardSpending * 12;
        const cardPoints = annualCardSpend * 0.012;
        const cardDiscountMonthly = Math.min(cardSpending * 0.2 * 0.03, 20000);
        const cardDiscount = cardDiscountMonthly * 12;
        const cardGift = 150000;
        const cardAnnualFee = 240000;
        const cardBenefit = Math.max(cardPoints + cardDiscount + cardGift - cardAnnualFee, 0);

        // --- 4. Total ---
        const totalTax = vat + currentIncomeTax;
        const totalSaving = vatSaving + incomeTaxSaving + cardBenefit;
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
            insuranceCost,
            freelancerCost: annualFreelancerCost,
            cardBenefit,
            cardPoints,
            cardDiscount,
            cardGift,
            cardAnnualFee,
            vatPurchaseDeduction,
            incomeTaxYellowUmbrellaSaving: pureYUSaving,
            yellowUmbrellaLimit,
            actualYellowUmbrellaDeduction,
            bookkeepingTaxCredit,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg text-gray-900">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <PiggyBank className="w-6 h-6 text-green-600" />
                    통합 절세 계산기
                </h1>
                <button
                    onClick={onReset}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    초기화
                </button>
            </div>

            <div className="space-y-4">
                <div className="space-y-4">
                    {/* Main Grid: Left (Inputs & Tax Rates) vs Right (Calculators & Info) */}
                    <div className="grid md:grid-cols-2 gap-4 items-start">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* 1. Basic Info Inputs */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <Calculator className="w-4 h-4" /> 기본 정보 입력
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">연간 매출액 (부가세 포함)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={revenue === 0 ? '' : revenue.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val))) setRevenue(Number(val));
                                                }}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold text-sm text-gray-900"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">신용카드/현금영수증 매출액 (발행공제용)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={creditCardSales === 0 ? '' : creditCardSales.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val))) setCreditCardSales(Number(val));
                                                }}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold text-sm text-gray-900"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-0.5">* 카드 사용액(지출)이 아닌 매출액입니다.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">연간 지출액 (매입+경비)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={expenses === 0 ? '' : expenses.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val))) setExpenses(Number(val));
                                                }}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold text-sm text-gray-900"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-0.5">* 인건비 제외 (아래 별도 입력)</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">사업자 유형</label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setVatMode('general')}
                                                className={`flex-1 py-1.5 rounded-lg font-bold text-xs border ${vatMode === 'general' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                일반과세자
                                            </button>
                                            <button
                                                onClick={() => setVatMode('simplified')}
                                                className={`flex-1 py-1.5 rounded-lg font-bold text-xs border ${vatMode === 'simplified' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                간이과세자
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">업종 (복식부기 의무 판단용)</label>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            <button
                                                onClick={() => setIndustryGroup('retail')}
                                                className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs border text-left flex justify-between items-center ${industryGroup === 'retail' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                <span>도소매 등</span>
                                                <span className="text-[10px] font-normal opacity-70">3억 이상 의무</span>
                                            </button>
                                            <button
                                                onClick={() => setIndustryGroup('manufacturing')}
                                                className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs border text-left flex justify-between items-center ${industryGroup === 'manufacturing' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                <span>제조/음식/숙박 등</span>
                                                <span className="text-[10px] font-normal opacity-70">1.5억 이상 의무</span>
                                            </button>
                                            <button
                                                onClick={() => setIndustryGroup('service')}
                                                className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs border text-left flex justify-between items-center ${industryGroup === 'service' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                <span>서비스/임대 등</span>
                                                <span className="text-[10px] font-normal opacity-70">7,500만 이상 의무</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">기장 방식 (기장세액공제)</label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsDoubleEntry(false)}
                                                className={`flex-1 py-1.5 rounded-lg font-bold text-xs border ${!isDoubleEntry ? 'bg-gray-100 border-gray-300 text-gray-600' : 'border-gray-200 text-gray-400'}`}
                                            >
                                                간편장부
                                            </button>
                                            <button
                                                onClick={() => setIsDoubleEntry(true)}
                                                className={`flex-1 py-1.5 rounded-lg font-bold text-xs border ${isDoubleEntry ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 text-gray-500'}`}
                                            >
                                                복식부기
                                            </button>
                                        </div>
                                        {isDoubleEntry && (
                                            <div className="mt-1">
                                                {(() => {
                                                    let isMandatory = false;
                                                    if (industryGroup === 'retail' && revenue >= 300000000) isMandatory = true;
                                                    else if (industryGroup === 'manufacturing' && revenue >= 150000000) isMandatory = true;
                                                    else if (industryGroup === 'service' && revenue >= 75000000) isMandatory = true;

                                                    if (isMandatory) {
                                                        return (
                                                            <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                                                                <Info className="w-3 h-3" /> 의무 대상자는 세액공제 제외
                                                            </p>
                                                        );
                                                    } else if (vatMode === 'general') {
                                                        return (
                                                            <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                                                                <Info className="w-3 h-3" /> 일반과세자는 세액공제 제외
                                                            </p>
                                                        );
                                                    } else {
                                                        return (
                                                            <p className="text-[10px] text-indigo-600 font-medium">
                                                                * 산출세액의 20% (최대 100만원) 공제 적용됨
                                                            </p>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Employee & Freelancer Inputs */}
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-3">
                                        {/* Regular Employees */}
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
                                                <Users className="w-3 h-3" /> 정규직 직원 (4대보험)
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-600 mb-1">직원 수</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={employeeCount}
                                                            onChange={(e) => setEmployeeCount(Number(e.target.value))}
                                                            className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-6 text-xs text-gray-900"
                                                            placeholder="0"
                                                        />
                                                        <span className="absolute right-2 top-1.5 text-gray-400 text-[10px]">명</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-600 mb-1">1인당 월 급여</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={employeeSalary === 0 ? '' : employeeSalary.toLocaleString()}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/,/g, '');
                                                                if (!isNaN(Number(val))) setEmployeeSalary(Number(val));
                                                            }}
                                                            className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-6 text-xs text-gray-900"
                                                            placeholder="0"
                                                        />
                                                        <span className="absolute right-2 top-1.5 text-gray-400 text-[10px]">원</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Freelancers */}
                                        <div className="pt-2 border-t border-gray-200">
                                            <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
                                                <Users className="w-3 h-3" /> 3.3% 사업소득자 (프리랜서)
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-600 mb-1">인원 수</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={freelancerCount}
                                                            onChange={(e) => setFreelancerCount(Number(e.target.value))}
                                                            className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-6 text-xs text-gray-900"
                                                            placeholder="0"
                                                        />
                                                        <span className="absolute right-2 top-1.5 text-gray-400 text-[10px]">명</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-600 mb-1">1인당 월 지급액</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={freelancerPayment === 0 ? '' : freelancerPayment.toLocaleString()}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/,/g, '');
                                                                if (!isNaN(Number(val))) setFreelancerPayment(Number(val));
                                                            }}
                                                            className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-right pr-6 text-xs text-gray-900"
                                                            placeholder="0"
                                                        />
                                                        <span className="absolute right-2 top-1.5 text-gray-400 text-[10px]">원</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {result.laborCost > 0 && (
                                            <div className="text-[10px] text-indigo-600 mt-2 text-right space-y-0.5 pt-2 border-t border-gray-200">
                                                {result.insuranceCost > 0 && <p>4대보험(사업주분): +{formatCurrency(result.insuranceCost)}</p>}
                                                {result.freelancerCost > 0 && <p>프리랜서 총 지급액: +{formatCurrency(result.freelancerCost)}</p>}
                                                <p>연간 총 인건비: <strong>{formatCurrency(result.laborCost)}</strong></p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expense Target Bar */}
                            {(() => {
                                const taxable = Math.max(revenue - expenses - result.laborCost - 1500000 - result.actualYellowUmbrellaDeduction, 0);
                                let currentBracketIndex = 0;
                                for (let i = 0; i < TAX_BRACKETS.length; i++) {
                                    if (taxable <= TAX_BRACKETS[i].limit) {
                                        currentBracketIndex = i;
                                        break;
                                    } else if (TAX_BRACKETS[i].limit === Infinity) {
                                        currentBracketIndex = i;
                                    }
                                }

                                if (currentBracketIndex > 0) {
                                    const lowerLimit = TAX_BRACKETS[currentBracketIndex - 1].limit;
                                    const neededExpense = taxable - lowerLimit;
                                    const currentRate = TAX_BRACKETS[currentBracketIndex].rate * 100;
                                    const targetRate = TAX_BRACKETS[currentBracketIndex - 1].rate * 100;

                                    // Calculate progress for visual bar (clamped between 0 and 100)
                                    // We want to show how "close" they are to the lower limit.
                                    // Let's define the "range" of the current bracket.
                                    const currentLimit = TAX_BRACKETS[currentBracketIndex].limit === Infinity ? taxable * 1.5 : TAX_BRACKETS[currentBracketIndex].limit;
                                    const bracketRange = currentLimit - lowerLimit;
                                    const positionInBracket = taxable - lowerLimit;
                                    const progressPercentage = Math.min(Math.max((positionInBracket / bracketRange) * 100, 5), 100); // Min 5% for visibility

                                    return (
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl shadow-lg text-white relative overflow-hidden">
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-end mb-2">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-indigo-100 mb-0.5">세율 구간 낮추기</h3>
                                                        <p className="text-lg font-bold">
                                                            <span className="text-yellow-300">{formatCurrency(neededExpense)}</span> 더 비용처리하면?
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-indigo-200 mb-0.5">세율 변화</div>
                                                        <div className="text-xl font-extrabold flex items-center gap-1">
                                                            <span className="opacity-80">{currentRate}%</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                            <span className="text-yellow-300">{targetRate}%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Progress Bar Container */}
                                                <div className="h-3 bg-black/20 rounded-full overflow-hidden relative">
                                                    {/* Target Marker (Left side is the goal) */}
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 z-20 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>

                                                    {/* Current Position Bar */}
                                                    <div
                                                        className="h-full bg-yellow-300 rounded-r-full transition-all duration-1000 ease-out relative"
                                                        style={{ width: `${Math.min((neededExpense / (bracketRange * 0.5)) * 100, 100)}%` }}
                                                    >
                                                        {/* Pulse effect at the tip */}
                                                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse"></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-[10px] text-indigo-200 mt-1.5 font-medium">
                                                    <span>▼ {targetRate}% 구간 진입 ({formatCurrency(lowerLimit)})</span>
                                                    <span>현재 과세표준: {formatCurrency(taxable)}</span>
                                                </div>
                                            </div>

                                            {/* Background Decoration */}
                                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                                                <TrendingDown className="w-24 h-24" />
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            {/* 2. 2024/2025 Income Tax Rates Table */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-base font-bold text-gray-800 mb-3">2024/2025 종합소득세 세율표</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[10px] text-left text-gray-900">
                                        <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                                            <tr>
                                                <th className="p-1.5">과세표준</th>
                                                <th className="p-1.5">세율</th>
                                                <th className="p-1.5 text-right">누진공제</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {TAX_BRACKETS.map((bracket, index) => {
                                                const taxable = Math.max(revenue - expenses - result.laborCost - 1500000 - result.actualYellowUmbrellaDeduction, 0);
                                                const isCurrent = (index === 0 && taxable <= bracket.limit) ||
                                                    (index > 0 && taxable > TAX_BRACKETS[index - 1].limit && taxable <= bracket.limit);

                                                return (
                                                    <tr key={index} className={isCurrent ? "bg-green-100 text-green-900 font-bold" : ""}>
                                                        <td className="p-1.5">
                                                            {index === 0 ? `${formatCurrency(bracket.limit)} 이하` :
                                                                index === TAX_BRACKETS.length - 1 ? `${formatCurrency(TAX_BRACKETS[index - 1].limit)} 초과` :
                                                                    `${formatCurrency(TAX_BRACKETS[index - 1].limit)} ~ ${formatCurrency(bracket.limit)}`}
                                                        </td>
                                                        <td className="p-1.5">{(bracket.rate * 100).toFixed(0)}%</td>
                                                        <td className="p-1.5 text-right">{formatCurrency(bracket.deduction)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 3. VAT Refund Calculator (Moved to Left Column) */}
                            <div className="bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
                                <button
                                    onClick={() => setIsRefundCalculatorOpen(!isRefundCalculatorOpen)}
                                    className="w-full p-4 flex items-center justify-between text-left hover:bg-blue-100/50 transition-colors"
                                >
                                    <h3 className="text-base font-bold text-blue-800 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" /> 부가세 환급금 계산기 (단순 계산)
                                    </h3>
                                    {isRefundCalculatorOpen ? (
                                        <ChevronUp className="w-5 h-5 text-blue-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-blue-400" />
                                    )}
                                </button>

                                {isRefundCalculatorOpen && (
                                    <div className="p-4 pt-0 space-y-3 border-t border-blue-100/50">
                                        <div>
                                            <label className="block text-xs font-bold text-blue-700 mb-1">지출 금액 (부가세 포함)</label>
                                            <input
                                                type="text"
                                                value={refundInput === 0 ? '' : refundInput.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val))) setRefundInput(Number(val));
                                                }}
                                                className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-right text-sm text-gray-900"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                            <span className="text-sm text-blue-700">예상 환급금 (부가세액)</span>
                                            <span className="text-lg font-bold text-blue-600">{formatCurrency(refundAmount)}</span>
                                        </div>
                                        <div className="bg-white p-2 rounded-lg border border-blue-100 text-[10px] text-gray-600 space-y-0.5">
                                            <p className="font-bold text-blue-800 mb-0.5">ⓘ 환급 시기 안내</p>
                                            <p>• <span className="text-blue-600 font-bold">일반 환급:</span> 확정신고 기한 후 <span className="text-red-500 font-bold">30일 이내</span></p>
                                            <p>• <span className="text-blue-600 font-bold">조기 환급:</span> 신고 기한 후 <span className="text-red-500 font-bold">15일 이내</span> (수출, 설비투자 등)</p>
                                            <p className="text-gray-400 mt-0.5">* 일반과세자만 환급 가능 (간이과세자 불가)</p>
                                            <div className="mt-1 pt-1 border-t border-blue-100 text-blue-800">
                                                <p>• <span className="font-bold">공급가액</span> = 합계금액 ÷ 1.1</p>
                                                <p>• <span className="font-bold">부가세액</span> = 합계금액 - 공급가액</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* 4. Card Spending Input */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
                                    <CreditCard className="w-3 h-3" /> 사업자 카드 사용
                                </h4>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-600 mb-1">월 평균 카드 사용금액</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={cardSpending === 0 ? '' : cardSpending.toLocaleString()}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (!isNaN(Number(val))) setCardSpending(Number(val));
                                            }}
                                            className="w-full p-1.5 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-right pr-6 text-xs text-gray-900"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-2 top-1.5 text-gray-400 text-[10px]">원</span>
                                    </div>
                                    {result.cardBenefit > 0 && (
                                        <div className="mt-2 bg-white p-2 rounded-lg border border-blue-100">
                                            <p className="text-[10px] font-bold text-blue-800 mb-1">삼성카드 BIZ THE iD. PLATINUM 기준</p>
                                            <div className="space-y-0.5 text-[10px] text-gray-600">
                                                <div className="flex justify-between">
                                                    <span>기프트:</span>
                                                    <span className="text-blue-600">+{formatCurrency(result.cardGift)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>포인트:</span>
                                                    <span className="text-blue-600">+{formatCurrency(result.cardPoints)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>할인:</span>
                                                    <span className="text-blue-600">+{formatCurrency(result.cardDiscount)}</span>
                                                </div>
                                                <div className="flex justify-between pt-0.5 border-t border-gray-100">
                                                    <span>연회비:</span>
                                                    <span className="text-red-500">-{formatCurrency(result.cardAnnualFee)}</span>
                                                </div>
                                                <div className="flex justify-between pt-0.5 border-t border-blue-100 font-bold">
                                                    <span className="text-blue-800">총 혜택:</span>
                                                    <span className="text-blue-600">{formatCurrency(result.cardBenefit)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 5. Yellow Umbrella Input & Benefits */}
                            <div className="space-y-2">
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <label className="block text-xs font-bold text-gray-700 mb-1">노란우산공제 월 납입액</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={yellowUmbrella === 0 ? '' : yellowUmbrella.toLocaleString()}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (!isNaN(Number(val))) setYellowUmbrella(Number(val));
                                            }}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-sm text-gray-900"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 top-2 text-gray-400 text-xs">원</span>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                    <h4 className="text-xs font-bold text-yellow-800 mb-2 flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" /> 노란우산공제 혜택 (10년 납입 기준)
                                    </h4>
                                    <div className="space-y-1 text-xs text-gray-900">
                                        <div className="flex justify-between text-blue-700">
                                            <span>절세 효과 (매년)</span>
                                            <span className="font-bold">+{formatCurrency(result.incomeTaxYellowUmbrellaSaving)}</span>
                                        </div>
                                        <div className="flex justify-between text-blue-700">
                                            <span>예상 복리 이자 (3.3%)</span>
                                            <span className="font-bold">
                                                +{formatCurrency(Math.round(result.actualYellowUmbrellaDeduction * 10 * 0.18))}
                                            </span>
                                        </div>
                                        <div className="pt-1.5 border-t border-yellow-300 flex justify-between font-bold text-red-600">
                                            <span>총 혜택 (절세x10년 + 이자)</span>
                                            <span>
                                                +{formatCurrency((result.incomeTaxYellowUmbrellaSaving * 10) + Math.round(result.actualYellowUmbrellaDeduction * 10 * 0.18))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 6. 2025 Yellow Umbrella Limits */}
                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                <h3 className="text-base font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                    <Info className="w-4 h-4" /> 2025년 노란우산공제 한도
                                </h3>
                                <div className="overflow-x-auto bg-white rounded-lg border border-yellow-100">
                                    <table className="w-full text-[10px] text-left">
                                        <thead className="bg-yellow-100 text-yellow-800 font-bold border-b border-yellow-200">
                                            <tr>
                                                <th className="p-1.5">사업소득금액</th>
                                                <th className="p-1.5 text-right">최대 공제 한도</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-yellow-50">
                                            <tr>
                                                <td className="p-1.5">4천만원 이하</td>
                                                <td className="p-1.5 text-right font-bold text-yellow-700">600만원</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5">4천만원 ~ 6천만원</td>
                                                <td className="p-1.5 text-right font-bold text-yellow-700">500만원</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5">6천만원 ~ 1억원</td>
                                                <td className="p-1.5 text-right font-bold text-yellow-700">400만원</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5">1억원 초과</td>
                                                <td className="p-1.5 text-right font-bold text-yellow-700">200만원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 7. Major Deductible Expenses */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <h3 className="text-base font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> 주요 비용처리 가능 항목
                                </h3>
                                <div className="overflow-x-auto bg-white rounded-lg border border-blue-100">
                                    <table className="w-full text-[10px] text-left">
                                        <thead className="bg-blue-100 text-blue-800 font-bold border-b border-blue-200">
                                            <tr>
                                                <th className="p-1.5 w-16">구분</th>
                                                <th className="p-1.5">상세 항목</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-blue-50">
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">인건비</td>
                                                <td className="p-1.5 text-gray-600">급여, 임금, 퇴직금, 일용직 급여, 4대보험, 식대</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">임차료</td>
                                                <td className="p-1.5 text-gray-600">사무실 월세, 관리비, 전기/수도/가스요금</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">차량/운반</td>
                                                <td className="p-1.5 text-gray-600">유류비, 수리비, 보험료, 퀵서비스, 택배비</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">사업지원</td>
                                                <td className="p-1.5 text-gray-600">접대비, 경조사비, 광고선전비, 포장비</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">금융/보험</td>
                                                <td className="p-1.5 text-gray-600">대출이자, 화재보험료 (원금 제외)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-1.5 font-bold text-blue-700">기타</td>
                                                <td className="p-1.5 text-gray-600">사무용품, 도서인쇄, 수선, 회의, 통신비</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-[10px] text-blue-500 mt-1.5 text-right">* 적격증빙(세금계산서, 현금영수증, 신용카드매출전표) 수취 필수</p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h3 className="text-xs font-bold text-gray-600 mb-1">절세 전 예상 세금</h3>
                            <p className="text-xl font-extrabold text-gray-500 line-through decoration-gray-400 decoration-2">
                                {formatCurrency(result.totalTax + result.vatSaving + result.incomeTaxSaving)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">공제/감면 적용 전</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <h3 className="text-xs font-bold text-green-800 mb-1">총 절세 효과</h3>
                            <p className="text-xl font-extrabold text-green-600">{formatCurrency(result.totalSaving)}</p>
                            <div className="text-[10px] text-green-600 mt-1 space-y-0.5">
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
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <h3 className="text-xs font-bold text-red-800 mb-1">총 예상 납부세액</h3>
                            <p className="text-xl font-extrabold text-red-600">{formatCurrency(result.totalTax)}</p>
                            <div className="text-[10px] text-red-500 mt-1 space-y-0.5">
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
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="text-xs font-bold text-blue-800 mb-1">세후 순수익</h3>
                            <p className="text-xl font-extrabold text-blue-600">{formatCurrency(result.netIncome)}</p>
                            <p className="text-[10px] text-blue-500 mt-0.5">비용 및 세금 차감 후</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            적용된 절세/공제 항목 상세
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* VAT Deductions */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-gray-600 border-b pb-1">부가가치세 절감</h4>
                                <ul className="space-y-1 text-xs">
                                    <li className="flex justify-between items-center">
                                        <span className="text-gray-500">매입세액 공제</span>
                                        <span className="font-bold text-gray-800">{formatCurrency(result.vatPurchaseDeduction)}</span>
                                    </li>
                                    {result.creditCardDeduction > 0 && (
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">신용카드 발행공제</span>
                                            <span className="font-bold text-gray-800">{formatCurrency(result.creditCardDeduction)}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Income Tax Deductions */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-gray-600 border-b pb-1">소득세 절감</h4>
                                <ul className="space-y-1 text-xs">
                                    <li className="flex justify-between items-center">
                                        <span className="text-gray-500">노란우산 공제 ({formatCurrency(result.actualYellowUmbrellaDeduction)})</span>
                                        <span className="font-bold text-green-600">-{formatCurrency(result.incomeTaxYellowUmbrellaSaving)}</span>
                                    </li>
                                    {result.laborCost > 0 && (
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">인건비 비용처리 ({formatCurrency(result.laborCost)})</span>
                                            <span className="font-bold text-green-600">비용인정</span>
                                        </li>

                                    )}
                                    {result.bookkeepingTaxCredit > 0 && (
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">기장세액공제 (복식부기)</span>
                                            <span className="font-bold text-green-600">-{formatCurrency(result.bookkeepingTaxCredit * 1.1)}</span>
                                        </li>
                                    )}
                                    {result.bookkeepingTaxCredit > 0 && (
                                        <li className="text-[10px] text-gray-400 text-right pt-0.5">
                                            (지방소득세 절감 포함)
                                        </li>
                                    )}
                                    <li className="flex justify-between items-center">
                                        <span className="text-gray-500">기본 공제</span>
                                        <span className="font-bold text-gray-800">150만원</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card Benefits */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-gray-600 border-b pb-1">카드 혜택</h4>
                                {result.cardBenefit > 0 ? (
                                    <ul className="space-y-1 text-xs">
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">포인트 적립 (1.2%)</span>
                                            <span className="font-bold text-blue-600">+{formatCurrency(result.cardPoints)}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">사업경비 할인 (3%)</span>
                                            <span className="font-bold text-blue-600">+{formatCurrency(result.cardDiscount)}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">기프트 서비스</span>
                                            <span className="font-bold text-blue-600">+{formatCurrency(result.cardGift)}</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="text-gray-500">연회비 차감</span>
                                            <span className="font-bold text-red-500">-{formatCurrency(result.cardAnnualFee)}</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <p className="text-[10px] text-gray-400">적용된 카드 혜택이 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tax Saving Tips Section */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                            <h3 className="text-base font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                절세 체크리스트
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-gray-700">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                                    <span><strong>사업자카드 사용:</strong> 지출 시 사업자카드를 사용하면 매입세액 공제 및 소득세 비용 처리가 간편해집니다.</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-gray-700">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                                    <span><strong>노란우산공제 가입:</strong> 연 최대 600만원(2025년 기준) 소득공제로 소득세율 구간을 낮출 수 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-gray-700">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                                    <span><strong>인건비 신고:</strong> 직원 급여는 원천세 신고를 해야 비용으로 인정받아 소득세를 줄일 수 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-gray-700">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                                    <span><strong>청년창업 세액감면:</strong> 만 15~34세 청년 창업 시 5년간 소득세 50~100% 감면 가능 (조건 확인 필수)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                            <h3 className="text-base font-bold text-indigo-800 mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                추가 절세 팁
                            </h3>
                            <div className="space-y-2 text-xs text-gray-700">
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
        </div >
    );
};

export default TaxSavingCalculator;
