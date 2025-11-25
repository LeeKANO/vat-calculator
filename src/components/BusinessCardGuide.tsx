"use client";

import React from 'react';
import { CreditCard, Gift, TrendingUp, CheckCircle } from 'lucide-react';

interface BusinessCardGuideProps {
    monthlySpend: number;
    setMonthlySpend: (value: number) => void;
}

const BusinessCardGuide: React.FC<BusinessCardGuideProps> = ({ monthlySpend, setMonthlySpend }) => {
    // Card 1: Samsung BIZ THE iD. PLATINUM
    const platinum = {
        name: "BIZ THE iD. PLATINUM",
        annualFee: 240000,
        calculateBenefits: (spend: number) => {
            const annualSpend = spend * 12;

            // 1. Gift: 150,000 KRW (Fixed)
            const gift = 150000;

            // 2. Points: 1.2% of Total Spend
            const points = annualSpend * 0.012;

            // 3. 3% Discount (Gas, Electricity, 4 Major Insurances)
            // Cap: 20,000 KRW/month
            // Assumption: 20% of spend is eligible
            const potentialDiscountSpend = spend * 0.2;
            const monthlyDiscount = Math.min(potentialDiscountSpend * 0.03, 20000);
            const discount = monthlyDiscount * 12;

            return {
                gift,
                points,
                discount,
                total: gift + points + discount  // 사업경비 할인 포함 (240,000원)
            };
        }
    };

    // Card 2: Samsung BIZ iD BENEFIT
    const benefit = {
        name: "Samsung BIZ iD BENEFIT",
        annualFee: 30000,
        calculateBenefits: (spend: number) => {
            // Tiered Caps based on previous month spend
            // < 500k: No special discount (only 0.5% basic)
            // 500k - 1M: Cap 10k for 1.5%, Cap 10k for 3%
            // > 1M: Cap 20k for 1.5%, Cap 20k for 3%

            let cap15 = 0; // 4 Major Insurances, Gas, Electricity, etc.
            let cap30 = 0; // Operation Support (Gas stations, Internet, Security, etc.)

            if (spend >= 1000000) {
                cap15 = 20000;
                cap30 = 20000;
            } else if (spend >= 500000) {
                cap15 = 10000;
                cap30 = 10000;
            }

            // Assumption: 10% of spend on 1.5% category, 10% on 3% category
            const spend15 = spend * 0.1;
            const spend30 = spend * 0.1;

            const discount15 = Math.min(spend15 * 0.015, cap15);
            const discount30 = Math.min(spend30 * 0.03, cap30);

            // Remaining spend gets 0.5% basic discount
            const remainingSpend = Math.max(spend - spend15 - spend30, 0);
            const basicDiscount = remainingSpend * 0.005;

            const monthlyTotal = discount15 + discount30 + basicDiscount;

            return {
                discount15: discount15 * 12,
                discount30: discount30 * 12,
                basic: basicDiscount * 12,
                total: (discount15 + basicDiscount) * 12  // discount30 제외 (화면에 표시 안함)
            };
        }
    };

    const platinumBenefits = platinum.calculateBenefits(monthlySpend);
    const benefitBenefits = benefit.calculateBenefits(monthlySpend);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    사업자 카드 혜택 계산기
                </h1>
            </div>

            {/* Input Section */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
                <label className="block text-lg font-bold text-gray-800 mb-3">월 평균 카드 사용금액</label>
                <div className="relative max-w-md">
                    <input
                        type="text"
                        value={monthlySpend === 0 ? '' : monthlySpend.toLocaleString()}
                        onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '');
                            if (!isNaN(Number(val))) setMonthlySpend(Number(val));
                        }}
                        className="w-full p-4 text-xl border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-right pr-12"
                        placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">원</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">* 월 사용금액에 따라 연간 혜택이 자동으로 계산됩니다.</p>
            </div>

            {/* Cards Comparison */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                {/* Platinum Card */}
                <div className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 transition-colors bg-white shadow-sm flex flex-col h-full">
                    <div className="bg-gray-800 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{platinum.name}</h3>
                        <p className="text-gray-300 text-sm">프리미엄 사업자 카드의 정석</p>
                    </div>
                    <div className="p-6 space-y-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">연회비</span>
                            <span className="text-gray-900 font-bold">{formatCurrency(platinum.annualFee)}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><Gift className="w-4 h-4" /> 기프트 서비스</span>
                                <span className="font-medium text-blue-600">+{formatCurrency(platinumBenefits.gift)}</span>
                            </div>
                            <p className="text-xs text-gray-500 pl-5 -mt-1">매년 신세계 상품권 15만원 지급</p>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 포인트 적립 (1.2%)</span>
                                <span className="font-medium text-blue-600">+{formatCurrency(platinumBenefits.points)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 사업경비 할인 (3%)</span>
                            </div>
                            <p className="text-xs text-gray-500 pl-5 -mt-1">- 4대보험/전기요금/도시가스요금/주유/제휴 할인점</p>
                            <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1">
                                <p className="font-bold text-gray-700 mb-1">전월 이용금액대별 통합 월할인한도</p>
                                <div className="flex justify-between text-gray-600">
                                    <span>50만원 이상</span>
                                    <span>1만원 할인</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>100만원 이상</span>
                                    <span>2만원 할인</span>
                                </div>
                                <p className="text-blue-600 font-bold mt-1 pt-1 border-t border-gray-200">
                                    월 20,000원 X 12개월 = 240,000원 할인
                                </p>
                            </div>
                        </div>

                        {/* Business Support Additional Benefits */}
                        <div className="bg-gray-50 p-4 rounded-xl space-y-3 mt-auto">
                            <h4 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">사업지원 부가 혜택</h4>
                            <ul className="text-xs text-gray-600 space-y-1.5">
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>부가세 환급 편의지원 서비스 무료</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>전자세금계산서 월 250건 무료</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>호텔/공항 발렛파킹 무료 (월 5회)</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>공항 라운지 무료 이용 (일 2회, 연 6회)</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>호텔/패밀리레스토랑 3만원/2만원 현장할인</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">총 연간 혜택 (현금성)</span>
                                <span className="text-2xl font-extrabold text-blue-600">{formatCurrency(platinumBenefits.total)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                <span className="text-sm text-gray-500">연회비 차감 후 실질 혜택</span>
                                <span className={`text-lg font-bold ${platinumBenefits.total - platinum.annualFee > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {formatCurrency(platinumBenefits.total - platinum.annualFee)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefit Card */}
                <div className="border-2 border-blue-100 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors bg-white shadow-sm flex flex-col h-full">
                    <div className="bg-blue-600 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{benefit.name}</h3>
                        <p className="text-blue-100 text-sm">실속있는 사업자 필수 카드</p>
                    </div>
                    <div className="p-6 space-y-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">연회비</span>
                            <span className="text-gray-900 font-bold">{formatCurrency(benefit.annualFee)}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 4대보험/공과금 (1.5%)</span>
                                <span className="font-medium text-blue-600">+{formatCurrency(benefitBenefits.discount15)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 국내 가맹점 (0.5%)</span>
                                <span className="font-medium text-blue-600">+{formatCurrency(benefitBenefits.basic)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 주유/통신/렌탈/보안 (3%)</span>
                            </div>
                        </div>

                        {/* Additional Business Services */}
                        <div className="bg-gray-50 p-4 rounded-xl space-y-3 mt-auto">
                            <h4 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2">사업지원 부가 혜택</h4>
                            <ul className="text-xs text-gray-600 space-y-1.5">
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>부가세 환급 편의지원 서비스 무료</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>전자세금계산서 월 250건 무료</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                                    <span>공항 라운지 무료 이용 (연 2회)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-bold">총 연간 혜택 (현금성)</span>
                                <span className="text-2xl font-extrabold text-blue-600">{formatCurrency(benefitBenefits.total)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                <span className="text-sm text-gray-500">연회비 차감 후 실질 혜택</span>
                                <span className={`text-lg font-bold ${benefitBenefits.total - benefit.annualFee > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {formatCurrency(benefitBenefits.total - benefit.annualFee)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessCardGuide;
