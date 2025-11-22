"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Shield, PiggyBank, Info, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const YellowUmbrellaGuide = () => {
    const [activeTab, setActiveTab] = useState<'benefits' | 'calculator'>('benefits');

    // Calculator State
    const [monthlyPayment, setMonthlyPayment] = useState<number>(250000);
    const [duration, setDuration] = useState<number>(10);
    const [interestRate, setInterestRate] = useState<number>(3.3); // 3.3%로 변경
    const [calculationResult, setCalculationResult] = useState<{
        principal: number;
        interest: number;
        total: number;
        simpleInterestTotal: number; // 단리 총액
        simpleInterest: number; // 단리 이자
        yearlyData: { year: number; principal: number; interest: number; total: number; simpleTotal: number }[];
    } | null>(null);

    useEffect(() => {
        calculateInterest();
    }, [monthlyPayment, duration, interestRate]);

    const calculateInterest = () => {
        // 노란우산공제: 연 복리 (분기별 복리 가정)
        // 은행: 연 단리 가정

        const yearlyData = [];
        const quarterlyRate = interestRate / 100 / 4;
        const totalQuarters = duration * 4;

        // 복리 계산 (기수불: 매 분기 초 납입 가정)
        // Total = A * ((1+r)^n - 1) / r * (1+r)
        const r = quarterlyRate;
        const n = totalQuarters;
        const P = monthlyPayment * 3; // 분기 납입액

        const totalAmount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalPrincipal = monthlyPayment * 12 * duration;
        const totalInterest = totalAmount - totalPrincipal;

        // 단리 계산 (일반 적금)
        // 이자 = 원금 * 이율 * 기간
        // 적금 이자 공식: 월납입액 * n(n+1)/2 * (연이율/12)
        const months = duration * 12;
        const simpleInterest = monthlyPayment * (months * (months + 1) / 2) * (interestRate / 100 / 12);
        const simpleTotal = totalPrincipal + simpleInterest;

        // 차트용 데이터 생성 (연도별)
        for (let y = 1; y <= duration; y++) {
            const q = y * 4;
            const m = y * 12;

            // 복리 (누적)
            const yTotalCompound = P * ((Math.pow(1 + r, q) - 1) / r) * (1 + r);

            // 단리 (누적)
            const ySimpleInterest = monthlyPayment * (m * (m + 1) / 2) * (interestRate / 100 / 12);
            const yPrincipal = monthlyPayment * 12 * y;
            const yTotalSimple = yPrincipal + ySimpleInterest;

            yearlyData.push({
                year: y,
                principal: yPrincipal,
                interest: Math.round(yTotalCompound - yPrincipal),
                total: Math.round(yTotalCompound),
                simpleTotal: Math.round(yTotalSimple)
            });
        }

        setCalculationResult({
            principal: totalPrincipal,
            interest: Math.round(totalInterest),
            total: Math.round(totalAmount),
            simpleInterestTotal: Math.round(simpleTotal),
            simpleInterest: Math.round(simpleInterest),
            yearlyData
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Shield className="w-8 h-8 text-yellow-500" />
                    노란우산공제 가이드
                </h1>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('benefits')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'benefits' ? 'bg-white shadow text-yellow-600' : 'text-gray-500'}`}
                    >
                        혜택 안내
                    </button>
                    <button
                        onClick={() => setActiveTab('calculator')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'calculator' ? 'bg-white shadow text-yellow-600' : 'text-gray-500'}`}
                    >
                        복리 이자 계산기
                    </button>
                </div>
            </div>

            {activeTab === 'benefits' ? (
                <div className="space-y-8">
                    {/* 2025 Deduction Limits */}
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                        <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            2025년 소득공제 한도 상향 (개정)
                        </h3>
                        <div className="overflow-x-auto bg-white rounded-lg border border-yellow-100 shadow-sm">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-yellow-900 uppercase bg-yellow-100">
                                    <tr>
                                        <th className="px-4 py-3">사업소득금액</th>
                                        <th className="px-4 py-3">최대 공제 한도</th>
                                        <th className="px-4 py-3">예상 절세효과 (최대)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-4 py-3">4천만원 이하</td>
                                        <td className="px-4 py-3 font-bold text-yellow-600">600만원</td>
                                        <td className="px-4 py-3">약 39~99만원</td>
                                    </tr>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-4 py-3">4천만원 ~ 6천만원</td>
                                        <td className="px-4 py-3 font-bold text-yellow-600">500만원</td>
                                        <td className="px-4 py-3">약 82~132만원</td>
                                    </tr>
                                    <tr className="border-b border-yellow-50">
                                        <td className="px-4 py-3">6천만원 ~ 1억원</td>
                                        <td className="px-4 py-3 font-bold text-yellow-600">400만원</td>
                                        <td className="px-4 py-3">약 105~154만원</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">1억원 초과</td>
                                        <td className="px-4 py-3 font-bold text-yellow-600">200만원</td>
                                        <td className="px-4 py-3">약 77~99만원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-yellow-700 mt-2">
                            * 법인 대표자의 경우 총급여 8천만원 이하까지 가입 가능 (2025년 완화)
                        </p>
                    </div>

                    {/* Key Benefits Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="font-bold text-gray-800">연 복리 이자 적용</h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                납입 원금 전액에 대해 연 복리 이자가 적립됩니다. 폐업 시 목돈 마련을 위한 퇴직금 성격의 자금으로 활용할 수 있습니다.
                                <br />
                                <span className="text-blue-600 font-medium mt-1 block">현재 이율: 연 3.3% (2025년 1월 기준, 변동금리)</span>
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="font-bold text-gray-800">법적 수급권 보호</h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                공제금은 법에 의해 압류, 양도, 담보제공이 금지되어 있습니다. 사업 실패 등 위기 상황에서도 생활 안정과 사업 재기를 위한 자금으로 안전하게 보호됩니다.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-purple-600" />
                                </div>
                                <h4 className="font-bold text-gray-800">대출 지원</h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                공제 부금 납입 연체 없이 정상 납부 중인 경우, 임의해약환급금의 90% 이내에서 대출을 활용할 수 있습니다. (의료, 재해 등 자금 필요 시 유용)
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <PiggyBank className="w-6 h-6 text-orange-600" />
                                </div>
                                <h4 className="font-bold text-gray-800">복지 서비스</h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                상해보험 무료 가입(2년간), 휴양 시설 이용, 건강검진 할인, 복지몰 이용 등 다양한 소상공인 복지 서비스를 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Input Section */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-800 mb-4">계산 조건 입력</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">월 납입금</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={monthlyPayment.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value.replace(/,/g, ''));
                                                    if (!isNaN(val)) setMonthlyPayment(val);
                                                }}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                                            />
                                            <span className="absolute right-4 top-3 text-gray-400">원</span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            {[50000, 250000, 500000, 1000000].map(amount => (
                                                <button
                                                    key={amount}
                                                    onClick={() => setMonthlyPayment(amount)}
                                                    className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50"
                                                >
                                                    {amount / 10000}만원
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">납입 기간 (년)</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            value={duration}
                                            onChange={(e) => setDuration(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                                            <span>1년</span>
                                            <span className="font-bold text-yellow-600">{duration}년</span>
                                            <span>30년</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">적용 이율 (연)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                                            />
                                            <span className="absolute right-4 top-3 text-gray-400">%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">* 기준이율 3.3% (폐업 공제금 기준)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 h-[400px]">
                                <h3 className="font-bold text-gray-800 mb-4">복리 vs 단리 자산 성장 비교</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={calculationResult?.yearlyData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="year" label={{ value: '년수', position: 'insideBottomRight', offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `${value / 10000}만`} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                        <Legend />
                                        <Area type="monotone" dataKey="total" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="노란우산 (복리)" />
                                        <Area type="monotone" dataKey="simpleTotal" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" fill="none" name="일반 적금 (단리)" />
                                        <Area type="monotone" dataKey="principal" stroke="#E5E7EB" strokeWidth={1} fill="none" name="납입 원금" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Section (Full Width) */}
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                        <h3 className="font-bold text-yellow-900 mb-4 flex justify-between items-end">
                            <span>예상 수령액 비교</span>
                            <span className="text-sm font-normal text-gray-600">
                                총 납입: {formatCurrency(calculationResult?.principal || 0)}
                            </span>
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Yellow Umbrella */}
                            <div className="bg-white p-5 rounded-xl border border-yellow-200 shadow-sm">
                                <div className="text-sm font-bold text-yellow-800 mb-2">노란우산 (복리)</div>
                                <div className="text-2xl font-bold text-yellow-700 break-all mb-1">
                                    {formatCurrency(calculationResult?.total || 0)}
                                </div>
                                <div className="text-sm text-yellow-600">
                                    이자 수익: +{formatCurrency(calculationResult?.interest || 0)}
                                </div>
                            </div>

                            {/* Bank */}
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <div className="text-sm font-bold text-gray-600 mb-2">일반 적금 (단리)</div>
                                <div className="text-2xl font-bold text-gray-600 break-all mb-1">
                                    {formatCurrency(calculationResult?.simpleInterestTotal || 0)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    이자 수익: +{formatCurrency(calculationResult?.simpleInterest || 0)}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-yellow-100 text-center shadow-sm">
                            <span className="text-sm text-gray-500 block mb-2">복리 효과로 더 받는 금액</span>
                            <span className="text-3xl font-bold text-red-500">
                                + {formatCurrency((calculationResult?.total || 0) - (calculationResult?.simpleInterestTotal || 0))}
                            </span>
                        </div>
                    </div>

                    {/* Note Section (Full Width) */}
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex gap-3 items-start">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800 leading-relaxed">
                            <strong>참고:</strong>
                            <br />- 노란우산공제: 연 3.3% 기준 (폐업 시 공제금 이율 기준, 변동금리), 분기별 복리 가정.
                            <br />- 일반 은행 적금: 연 3.3% 기준, 단리 가정.
                            <br />- 실제 수령액은 세법 개정 및 이율 변동에 따라 달라질 수 있습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YellowUmbrellaGuide;
