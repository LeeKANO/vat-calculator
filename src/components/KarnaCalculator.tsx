import React, { useState, useEffect } from 'react';
import { Calculator, Info, CheckCircle2, AlertCircle, TrendingUp, Coins, BarChart3 } from 'lucide-react';
import RevenueChart from './RevenueChart';

const KarnaCalculator: React.FC = () => {
    // --- Tax Brackets ---
    const taxBrackets = [
        { label: '1400만원 이하 (6.6%)', rate: 0.066, value: 'bracket1' },
        { label: '1400만원 초과 ~ 5000만원 이하 (16.5%)', rate: 0.165, value: 'bracket2' },
        { label: '5000만원 초과 ~ 8800만원 이하 (26.4%)', rate: 0.264, value: 'bracket3' },
        { label: '8800만원 초과 ~ 1억5000만원 이하 (38.5%)', rate: 0.385, value: 'bracket4' }, // Default
        { label: '1억5000만원 초과 ~ 3억원 이하 (41.8%)', rate: 0.418, value: 'bracket5' },
        { label: '3억원 초과 ~ 5억원 이하 (44.0%)', rate: 0.440, value: 'bracket6' },
        { label: '5억원 초과 (49.5%)', rate: 0.495, value: 'bracket7' },
    ];

    // --- State ---
    const [activeTab, setActiveTab] = useState<'tax' | 'roi'>('tax');
    const [selectedBracket, setSelectedBracket] = useState(taxBrackets[3]); // Default: 38.5%

    const [monthlyRent, setMonthlyRent] = useState<number>(847000); // 월 렌탈료 (VAT 포함)
    const [lumpSumPrice, setLumpSumPrice] = useState<number>(24200000); // 일시불 구매가 (VAT 포함)
    const [taxableRatio, setTaxableRatio] = useState<number>(20); // 과세매출 비율 (%)

    const [dailySales, setDailySales] = useState<number>(2); // ROI: 일 판매량
    const [marginPerUnit, setMarginPerUnit] = useState<number>(25000); // ROI: 영양제 개당 마진
    const [analysisYear, setAnalysisYear] = useState<number>(3); // 분석 기간 (년)

    // --- Calculations (Pharmacy Specific) ---
    // 렌탈 기본 계산
    const supplyAmount = Math.floor(monthlyRent / 1.1);
    const vatAmount = monthlyRent - supplyAmount;

    // 약국 특화 (과세/면세 안분)
    const vatRefund = Math.floor(vatAmount * (taxableRatio / 100));
    const vatNondeductible = vatAmount - vatRefund;
    const expenseForIncomeTax = supplyAmount + vatNondeductible;
    const incomeTaxSaving = Math.floor(expenseForIncomeTax * selectedBracket.rate);

    // 최종 결과
    const totalMonthlySaving = vatRefund + incomeTaxSaving;
    const realMonthlyCost = monthlyRent - totalMonthlySaving;
    const realDailyCost = Math.round(realMonthlyCost / 30);

    // Lump Sum Calculations (Pharmacy Specific)
    const lumpSumSupply = Math.floor(lumpSumPrice / 1.1);
    const lumpSumVat = lumpSumPrice - lumpSumSupply;
    const lumpSumVatRefund = Math.floor(lumpSumVat * (taxableRatio / 100));
    const lumpSumVatNondeductible = lumpSumVat - lumpSumVatRefund;
    const lumpSumExpenseForIncomeTax = lumpSumSupply + lumpSumVatNondeductible;
    const lumpSumIncomeTaxSaving = Math.floor(lumpSumExpenseForIncomeTax * selectedBracket.rate);
    const lumpSumTotalSaving = lumpSumVatRefund + lumpSumIncomeTaxSaving;
    const realLumpSumCost = lumpSumPrice - lumpSumTotalSaving;

    // ROI & Future Analysis
    const analysisMonths = analysisYear * 12;
    const rentalMonthsApplied = Math.min(analysisMonths, 36);
    const totalRentalCost = monthlyRent * rentalMonthsApplied;
    const totalRentalSaving = totalMonthlySaving * rentalMonthsApplied;
    const realTotalInvestmentRental = totalRentalCost - totalRentalSaving;

    // Revenue
    const totalMargin = dailySales * 30 * analysisMonths * marginPerUnit;

    // Net Profit
    const netProfitRental = totalMargin - realTotalInvestmentRental;
    const netProfitLumpSum = totalMargin - realLumpSumCost;

    // ROI
    const roiRental = (netProfitRental / realTotalInvestmentRental) * 100;
    const roiLumpSum = (netProfitLumpSum / realLumpSumCost) * 100;

    // 손익분기
    const breakEvenVolume = (realDailyCost / marginPerUnit).toFixed(1);


    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('ko-KR').format(Math.round(val)) + '원';
    };

    const formatPercent = (val: number) => {
        return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 }).format(val) + '%';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    💊 카르나 AI 헬스뷰어 계산기
                </h2>
                <p className="text-gray-600">
                    약사님의 실질 렌탈 부담액 및 ROI 수익률을 분석해드립니다
                </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-xl inline-flex">
                    <button
                        onClick={() => setActiveTab('tax')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'tax'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Calculator className="w-4 h-4" />
                        세무 절세 계산기
                    </button>
                    <button
                        onClick={() => setActiveTab('roi')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'roi'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <TrendingUp className="w-4 h-4" />
                        ROI 수익률 분석
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar - Shared Input Section */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-black" />
                            공통 설정
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    월 렌탈료 (VAT 포함)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={monthlyRent}
                                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-bold text-right pr-12 text-black"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <span className="text-black font-bold">원</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    일시불 구매가 (VAT 포함)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={lumpSumPrice}
                                        onChange={(e) => setLumpSumPrice(Number(e.target.value))}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-bold text-right pr-12 text-black"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <span className="text-black font-bold">원</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2 flex justify-between">
                                    <span>약국 과세매출 비율</span>
                                    <span className="text-blue-600 font-bold">{taxableRatio}%</span>
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="10"
                                        max="40"
                                        step="1"
                                        value={taxableRatio}
                                        onChange={(e) => setTaxableRatio(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-[10px] text-black font-bold px-1">
                                        <span>10%</span>
                                        <span>40%</span>
                                    </div>
                                    <p className="text-[10px] text-black font-bold bg-gray-50 p-2 rounded-lg leading-relaxed">
                                        💡 일반약, 의약외품 등 과세매출이 전체 매출에서 차지하는 비율
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    과세표준 구간 선택
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedBracket.value}
                                        onChange={(e) => {
                                            const bracket = taxBrackets.find(b => b.value === e.target.value);
                                            if (bracket) setSelectedBracket(bracket);
                                        }}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer text-black font-bold"
                                    >
                                        {taxBrackets.map((bracket) => (
                                            <option key={bracket.value} value={bracket.value}>
                                                {bracket.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    분석 기간 설정
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={analysisYear}
                                            onChange={(e) => setAnalysisYear(Number(e.target.value))}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-bold text-right pr-12 text-black"
                                            placeholder="3"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <span className="text-black font-bold">년</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'roi' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            영양제 개당 마진 (원)
                                        </label>
                                        <input
                                            type="number"
                                            value={marginPerUnit}
                                            onChange={(e) => setMarginPerUnit(Number(e.target.value))}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm font-bold text-right text-black"
                                            placeholder="25000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            일일 예상 영양제 판매량 (개)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={dailySales}
                                                onChange={(e) => setDailySales(Number(e.target.value))}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm font-bold text-right pr-28 text-black"
                                                placeholder="2"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                <span className="text-green-600 text-xs font-bold whitespace-nowrap">월 약 {dailySales * 30}개</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

                    {/* Tip Section */}
                    <div className={`rounded-2xl p-5 border ${activeTab === 'roi' ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
                        <div className="flex items-start gap-3">
                            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${activeTab === 'roi' ? 'text-green-600' : 'text-blue-600'}`} />
                            <div>
                                <h4 className={`font-bold text-sm mb-1 ${activeTab === 'roi' ? 'text-green-900' : 'text-blue-900'}`}>
                                    {activeTab === 'roi' ? 'ROI 분석 Insight' : '소득 구간별 Tip'}
                                </h4>
                                <p className={`text-sm break-keep ${activeTab === 'roi' ? 'text-green-800' : 'text-blue-800'}`}>
                                    {activeTab === 'roi'
                                        ? "일 판매량이 1개만 되어도 3년 누적 수익이 렌탈료를 상회합니다."
                                        : (selectedBracket.rate >= 0.385
                                            ? selectedBracket.rate >= 0.418
                                                ? "고소득 구간으로 절세 효과가 탁월합니다!"
                                                : "일반적인 약사님 구간으로, 세무 혜택이 가장 큽니다!"
                                            : "세율 구간이 높아질수록 절세 효과도 커집니다.")
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tax Evidence Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-gray-500" />
                            세무 처리 근거 (Fact Check)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm mb-1">1. 렌탈료 필요경비 인정</h4>
                                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                                    사업과 관련하여 발생한 렌탈료는 <strong>소득세법 제27조(필요경비의 계산)</strong>에 의거하여 전액 필요경비로 인정받습니다.
                                </p>
                                <a
                                    href="https://www.law.go.kr/법령/소득세법/제27조"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                                >
                                    소득세법 제27조 법령 보기 →
                                </a>
                            </div>
                            <div className="border-t border-gray-100 my-2"></div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm mb-1">2. 부가세 매입세액 공제</h4>
                                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                                    사업을 위해 사용된 재화/용역의 공급가액에 대한 부가가치세는 <strong>부가가치세법 제38조(공제하는 매입세액)</strong>에 따라 전액 환급(공제) 가능합니다.
                                </p>
                                <a
                                    href="https://www.law.go.kr/법령/부가가치세법/제38조"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                                >
                                    부가가치세법 제38조 법령 보기 →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* TAX MODE UI */}
                    {activeTab === 'tax' && (
                        <>
                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                    <p className="text-sm text-gray-500 mb-1">명목 월 렌탈료</p>
                                    <p className="text-lg font-bold text-gray-400 line-through decoration-gray-400">
                                        {formatCurrency(monthlyRent)}
                                    </p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                                    <p className="text-sm text-red-600 mb-1">월 총 절세액</p>
                                    <p className="text-xl font-bold text-red-600">
                                        -{formatCurrency(totalMonthlySaving)}
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center shadow-sm">
                                    <p className="text-sm text-blue-600 font-bold mb-1">실질 월 부담액</p>
                                    <p className="text-2xl font-extrabold text-blue-700">
                                        {formatCurrency(realMonthlyCost)}
                                    </p>
                                </div>
                            </div>

                            {/* Daily Burden Success Box */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
                                <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
                                    하루 실질 부담액은 <span className="text-green-600 bg-white px-2 py-0.5 rounded-lg border border-green-200">{formatCurrency(realDailyCost)}</span> 입니다!
                                </h3>
                                <p className="text-green-700 font-medium flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    하루에 영양제 {breakEvenVolume}개만 더 팔면 렌탈료 완전 해결!
                                </p>
                            </div>

                            {/* Cumulative Effect */}
                            <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-6 text-white mb-6">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-gray-700 pb-4">
                                    {analysisYear}년({analysisMonths}개월) 누적 효과 비교 분석
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left: Rental */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-blue-300">렌탈 구매 ({rentalMonthsApplied}개월)</h4>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center text-gray-300">
                                                <div className="flex flex-col">
                                                    <span>총 렌탈료</span>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">{formatCurrency(monthlyRent)} × {rentalMonthsApplied}개월</span>
                                                </div>
                                                <span className="line-through text-gray-500">{formatCurrency(totalRentalCost)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-red-300">
                                                <div className="flex flex-col">
                                                    <span>총 절세액</span>
                                                    <span className="text-[10px] text-red-400 mt-0.5">부가세 {formatCurrency(vatRefund * rentalMonthsApplied)} + 소득세 {formatCurrency(incomeTaxSaving * rentalMonthsApplied)}</span>
                                                </div>
                                                <span>-{formatCurrency(totalRentalSaving)}</span>
                                            </div>
                                            <div className="h-px bg-gray-700 my-2"></div>
                                            <div className="flex justify-between items-center font-bold text-lg">
                                                <div className="flex flex-col">
                                                    <span className="text-white">실질 총 투자액</span>
                                                    <span className="text-[10px] text-blue-400 font-normal mt-0.5">
                                                        {formatCurrency(totalRentalCost)} - {formatCurrency(totalRentalSaving)}
                                                    </span>
                                                </div>
                                                <span className="text-blue-300 whitespace-nowrap">{formatCurrency(realTotalInvestmentRental)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Lump Sum */}
                                    <div className="space-y-4 md:border-l md:border-gray-700 md:pl-8">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-purple-300">현금 일시불 구매</h4>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center text-gray-300">
                                                <div className="flex flex-col">
                                                    <span>총 구매가</span>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">공급가 {formatCurrency(lumpSumSupply)} + 부가세 {formatCurrency(lumpSumVat)}</span>
                                                </div>
                                                <span className="line-through text-gray-500">{formatCurrency(lumpSumPrice)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-red-300">
                                                <div className="flex flex-col">
                                                    <span>총 절세액</span>
                                                    <span className="text-[10px] text-red-400 mt-0.5">부가세 {formatCurrency(lumpSumVatRefund)} + 소득세 {formatCurrency(lumpSumIncomeTaxSaving)}</span>
                                                </div>
                                                <span className="whitespace-nowrap">-{formatCurrency(lumpSumTotalSaving)}</span>
                                            </div>
                                            <div className="h-px bg-gray-700 my-2"></div>
                                            <div className="flex justify-between items-center font-bold text-lg">
                                                <div className="flex flex-col">
                                                    <span className="text-white">실질 총 투자액</span>
                                                    <span className="text-[10px] text-purple-400 font-normal mt-0.5">
                                                        {formatCurrency(lumpSumPrice)} - {formatCurrency(lumpSumTotalSaving)}
                                                    </span>
                                                </div>
                                                <span className="text-purple-300 whitespace-nowrap">{formatCurrency(realLumpSumCost)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detail Table */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-gray-500" />
                                        상세 계산 내역
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                    {/* Left: Monthly Rental Detail */}
                                    <div className="divide-y divide-gray-100">
                                        <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">렌탈 구매 (월 기준)</span>
                                        </div>
                                        <div className="flex justify-between items-center px-6 py-4">
                                            <span className="text-gray-600 text-sm">명목 월 렌탈료</span>
                                            <span className="font-medium text-gray-900 whitespace-nowrap">{formatCurrency(monthlyRent)}</span>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-gray-50/50 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">부가세 환급</span>
                                                <span className="font-medium text-red-500 whitespace-nowrap">-{formatCurrency(vatRefund)}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">과세매출 비율({taxableRatio}%)만큼 환급받습니다.</p>
                                            <span className="text-[10px] text-red-400 font-medium bg-red-50 px-1.5 py-0.5 rounded w-fit whitespace-nowrap">
                                                {formatCurrency(vatAmount)} × {taxableRatio}% = {formatCurrency(vatRefund)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-gray-50/50 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">소득세 절감</span>
                                                <span className="font-medium text-red-500 whitespace-nowrap">-{formatCurrency(incomeTaxSaving)}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">매월 렌탈료가 경비로 처리되어 발생하는 소득세 절감분입니다.</p>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-blue-500 font-medium bg-blue-50 px-1.5 py-0.5 rounded w-fit whitespace-nowrap">
                                                    {formatCurrency(expenseForIncomeTax)} × {(selectedBracket.rate * 100).toFixed(1)}% = {formatCurrency(incomeTaxSaving)}
                                                </span>
                                                <span className="text-[10px] text-blue-600 font-bold bg-blue-100/50 px-1.5 py-0.5 rounded w-fit whitespace-nowrap">
                                                    1년 누적 절감액: {formatCurrency(incomeTaxSaving * 12)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-blue-50/30 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-900 text-sm">실질 월 부담액</span>
                                                <span className="font-bold text-blue-600 whitespace-nowrap">{formatCurrency(realMonthlyCost)}</span>
                                            </div>
                                            <p className="text-[10px] text-blue-400">실제 통장에서 나가는 돈에서 절세 혜택을 뺀 실질 비용입니다.</p>
                                            <span className="text-[10px] text-blue-500 font-medium bg-white px-1.5 py-0.5 rounded border border-blue-100 w-fit whitespace-nowrap">
                                                {formatCurrency(monthlyRent)} - ({formatCurrency(vatRefund)} + {formatCurrency(incomeTaxSaving)}) = {formatCurrency(realMonthlyCost)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-blue-50/30 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-900 text-sm">실질 일 부담액</span>
                                                <span className="font-bold text-blue-600 whitespace-nowrap">{formatCurrency(realDailyCost)}</span>
                                            </div>
                                            <span className="text-[10px] text-blue-500 font-medium bg-white px-1.5 py-0.5 rounded border border-blue-100 w-fit whitespace-nowrap">
                                                {formatCurrency(realMonthlyCost)} ÷ 30일 = {formatCurrency(realDailyCost)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right: Lump Sum Detail */}
                                    <div className="divide-y divide-gray-100">
                                        <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100">
                                            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">현금 일시불 구매</span>
                                        </div>
                                        <div className="flex justify-between items-center px-6 py-4">
                                            <span className="text-gray-600 text-sm">총 구매가(VAT포함)</span>
                                            <span className="font-medium text-gray-900 whitespace-nowrap">{formatCurrency(lumpSumPrice)}</span>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-gray-50/50 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">부가세 환급</span>
                                                <span className="font-medium text-red-500 whitespace-nowrap">-{formatCurrency(lumpSumVatRefund)}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">과세매출 비율({taxableRatio}%)만큼 환급받습니다.</p>
                                            <span className="text-[10px] text-red-400 font-medium bg-red-50 px-1.5 py-0.5 rounded w-fit whitespace-nowrap">
                                                {formatCurrency(lumpSumVat)} × {taxableRatio}% = {formatCurrency(lumpSumVatRefund)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-gray-50/50 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">소득세 절감</span>
                                                <span className="font-medium text-red-500 whitespace-nowrap">-{formatCurrency(lumpSumIncomeTaxSaving)}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400">구매 금액 중 불공제분 포함 전액 비용 처리 시 절세액입니다.</p>
                                            <span className="text-[10px] text-purple-500 font-medium bg-purple-50 px-1.5 py-0.5 rounded w-fit whitespace-nowrap">
                                                {formatCurrency(lumpSumExpenseForIncomeTax)} × {(selectedBracket.rate * 100).toFixed(1)}% = {formatCurrency(lumpSumIncomeTaxSaving)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col px-6 py-6 bg-purple-50/30 gap-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-900 text-sm">실질 총 투자액</span>
                                                <span className="font-bold text-purple-600 text-lg whitespace-nowrap">{formatCurrency(realLumpSumCost)}</span>
                                            </div>
                                            <p className="text-[10px] text-purple-400">구매가에서 모든 절세 혜택을 차감한 최종 실질 비용입니다.</p>
                                            <span className="text-[10px] text-purple-500 font-medium bg-white px-1.5 py-0.5 rounded border border-purple-100 w-fit whitespace-nowrap">
                                                {formatCurrency(lumpSumPrice)} - ({formatCurrency(lumpSumVatRefund)} + {formatCurrency(lumpSumIncomeTaxSaving)}) = {formatCurrency(realLumpSumCost)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}

                    {/* ROI MODE UI */}
                    {activeTab === 'roi' && (
                        <>
                            {/* Sales Simulation Box */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
                                <h3 className="text-lg font-bold text-green-900 mb-2">{analysisYear}년 예상 수익 (누적 마진)</h3>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Coins className="w-8 h-8 text-yellow-600" />
                                    <span className="text-4xl font-extrabold text-green-700">{formatCurrency(totalMargin)}</span>
                                </div>
                                <p className="text-sm text-green-800">
                                    일 {dailySales}개 판매 기준 × {analysisMonths}개월
                                </p>
                            </div>

                            {/* Comparison Table */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Option A: Rental */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
                                    <div className="absolute top-0 inset-x-0 h-2 bg-blue-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-bold text-gray-900">렌탈 구매 ({rentalMonthsApplied}개월)</h4>
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">월납입</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">실질 총 투자비용</p>
                                                <p className="text-sm text-gray-400 font-medium mb-0.5 line-through">
                                                    총 렌탈료 {formatCurrency(totalRentalCost)}
                                                </p>
                                                <p className="text-xl font-bold text-gray-900">{formatCurrency(realTotalInvestmentRental)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">예상 순수익</p>
                                                <p className={`text-xl font-bold ${netProfitRental >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                                                    {formatCurrency(netProfitRental)}
                                                </p>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-sm font-bold text-gray-600">ROI (투자수익률)</span>
                                                    <span className="text-2xl font-extrabold text-blue-600">{formatPercent(roiRental)}</span>
                                                </div>

                                                <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 shadow-sm mt-4">
                                                    <div className="flex items-center gap-1.5 mb-3 border-b border-blue-200 pb-2">
                                                        <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                                                        <span className="text-xs font-bold text-blue-800">상세 계산 근거 (Formula)</span>
                                                    </div>
                                                    <div className="space-y-4 text-left">
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="font-bold text-gray-700">1. 실질 투자금</span>
                                                                <span className="font-bold text-blue-700">{formatCurrency(realTotalInvestmentRental)}</span>
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 leading-relaxed bg-white/90 p-2.5 rounded-lg border border-blue-100 font-mono">
                                                                = {formatCurrency(totalRentalCost)} <span className="text-gray-400 font-sans">(총 렌탈료)</span><br />
                                                                - {formatCurrency(totalRentalSaving)} <span className="text-gray-400 font-sans">(총 절세액)</span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="font-bold text-gray-700">2. 예상 순수익</span>
                                                                <span className="font-bold text-blue-700">{formatCurrency(netProfitRental)}</span>
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 leading-relaxed bg-white/90 p-2.5 rounded-lg border border-blue-100 font-mono">
                                                                = {formatCurrency(totalMargin)} <span className="text-gray-400 font-sans">(총 마진)</span><br />
                                                                - {formatCurrency(realTotalInvestmentRental)} <span className="text-gray-400 font-sans">(투자금)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Option B: Lump Sum */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
                                    <div className="absolute top-0 inset-x-0 h-2 bg-purple-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-bold text-gray-900">일시불 현금 구매</h4>
                                            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">일시불</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">실질 총 투자비용</p>
                                                <p className="text-sm text-gray-400 font-medium mb-0.5 line-through">
                                                    정가 {formatCurrency(lumpSumPrice)}
                                                </p>
                                                <p className="text-xl font-bold text-gray-900">{formatCurrency(realLumpSumCost)}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">
                                                    * 절세혜택 {formatCurrency(lumpSumTotalSaving)} 차감
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">예상 순수익</p>
                                                <p className={`text-xl font-bold ${netProfitLumpSum >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                                                    {formatCurrency(netProfitLumpSum)}
                                                </p>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-sm font-bold text-gray-600">ROI (투자수익률)</span>
                                                    <span className="text-2xl font-extrabold text-purple-600">{formatPercent(roiLumpSum)}</span>
                                                </div>

                                                <div className="bg-purple-50/70 rounded-xl p-4 border border-purple-200 shadow-sm mt-4">
                                                    <div className="flex items-center gap-1.5 mb-3 border-b border-purple-200 pb-2">
                                                        <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                                                        <span className="text-xs font-bold text-purple-800">상세 계산 근거 (Formula)</span>
                                                    </div>
                                                    <div className="space-y-4 text-left">
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="font-bold text-gray-700">1. 실질 투자금</span>
                                                                <span className="font-bold text-purple-700">{formatCurrency(realLumpSumCost)}</span>
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 leading-relaxed bg-white/90 p-2.5 rounded-lg border border-purple-100 font-mono">
                                                                = {formatCurrency(lumpSumPrice)} <span className="text-black font-sans">(구매가)</span><br />
                                                                - {formatCurrency(lumpSumTotalSaving)} <span className="text-gray-400 font-sans">(총 절세액)</span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="font-bold text-gray-700">2. 예상 순수익</span>
                                                                <span className="font-bold text-purple-700">{formatCurrency(netProfitLumpSum)}</span>
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 leading-relaxed bg-white/90 p-2.5 rounded-lg border border-purple-100 font-mono">
                                                                = {formatCurrency(totalMargin)} <span className="text-gray-400 font-sans">(총 마진)</span><br />
                                                                - {formatCurrency(realLumpSumCost)} <span className="text-gray-400 font-sans">(투자금)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Box */}
                            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">
                                <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    분석 결과 요약
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span className="leading-relaxed">
                                            일일 <strong className="text-white text-base">{dailySales}개</strong> 판매 시,
                                            렌탈 방식의 ROI는 <strong className="text-blue-300 text-base">{formatPercent(roiRental)}</strong>,
                                            일시불 방식의 ROI는 <strong className="text-purple-300 text-base">{formatPercent(roiLumpSum)}</strong>입니다.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span className="leading-relaxed">
                                            실질 투자 비용은 렌탈이 <strong className="text-blue-300 text-base">{formatCurrency(realTotalInvestmentRental)}</strong>,
                                            일시불이 <strong className="text-purple-300 text-base">{formatCurrency(realLumpSumCost)}</strong>로
                                            <strong className="text-white block mt-1">
                                                {realTotalInvestmentRental < realLumpSumCost ? '✨ 렌탈 구매가 더 경제적입니다.' : '✨ 일시불 구매가 더 경제적입니다.'}
                                            </strong>
                                        </span>
                                    </li>
                                </ul>
                                <RevenueChart
                                    analysisYear={analysisYear}
                                    dailySales={dailySales}
                                    marginPerUnit={marginPerUnit}
                                    realMonthlyRentalCost={realMonthlyCost}
                                    realLumpSumCost={realLumpSumCost}
                                />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div >
    );
};

export default KarnaCalculator;
