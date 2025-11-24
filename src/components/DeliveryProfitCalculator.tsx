"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Info, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

type Platform = 'baemin' | 'coupang' | 'yogiyo' | 'ddaengyo';
type Tier = 'A' | 'B' | 'C';

interface CalculationResult {
    platform: Platform;
    name: string;
    color: string;
    brokerageRate: number;
    brokerageFee: number;
    paymentFee: number;
    vat: number;
    totalFees: number;
    netProfitUnit: number;
    netProfitTotal: number;
    margin: number;
    diffFromDdaengyo: number;
    diffAnnual: number;
}

const adData = [
    {
        platform: '배달의민족',
        product: '우리가게클릭',
        billing: 'CPC (클릭당 과금)',
        cost: '50원 ~ 1,000원 (입찰)',
        features: "2025년 클릭당 단가 범위 확대 (기존 200~600원 → 50~1,000원), '자동입찰' 기능 도입",
        color: 'blue'
    },
    {
        platform: '배달의민족',
        product: '울트라콜',
        billing: '정액제',
        cost: '월 80,000원/깃발',
        features: "2025년 4월부터 단계적 폐지 진행 중. 주문 실적 중심의 '오픈리스트' 및 통합 UI로 개편됨에 따라 입지 축소",
        isDeleted: true,
        color: 'blue'
    },
    {
        platform: '쿠팡이츠',
        product: '스마트 광고',
        billing: 'CPC / CPM',
        cost: '50원 ~ 500원 (클릭)',
        features: "클릭당(CPC) 50~500원 또는 노출 1,000회당(CPM) 5,000~15,000원 수준으로 운영",
        color: 'green'
    },
    {
        platform: '요기요',
        product: '추천광고',
        billing: 'CPA (주문당 과금)',
        cost: '주문금액 × 설정율',
        features: "'주문이 발생할 때만' 비용 부과. 사장님이 직접 광고 요율 설정 가능 (예산 일 1만원~300만원 설정)",
        color: 'red'
    },
    {
        platform: '요기요',
        product: '요타임딜',
        billing: '할인형',
        cost: '할인금액 부담',
        features: "특정 시간대 고객에게 할인 제공. 영세 소상공인은 '사장님 포인트'로 비용 일부 환급 가능",
        color: 'red'
    },
    {
        platform: '땡겨요',
        product: '기본 노출',
        billing: '무료',
        cost: '0원',
        features: "별도의 광고비나 입점비 없음. 서울사랑상품권 등 지역화폐 사용 가능하여 고객 유입 유도",
        color: 'orange'
    }
];

const DeliveryProfitCalculator = () => {
    const [menuPrice, setMenuPrice] = useState<number>(20000);
    const [foodCost, setFoodCost] = useState<number>(6000);
    const [deliveryFee, setDeliveryFee] = useState<number>(3000);
    const [quantity, setQuantity] = useState<number>(100);
    // Defaulting to Tier A (Highest Fee) for comparison as requested to hide selection
    const [tier] = useState<Tier>('A');

    const [results, setResults] = useState<CalculationResult[]>([]);

    // Platform configurations
    const platforms: Record<Platform, { name: string; color: string; fees: { A: number; B: number; C: number } }> = {
        baemin: {
            name: '배달의민족',
            color: 'blue',
            fees: { A: 7.8, B: 6.8, C: 2.0 }
        },
        coupang: {
            name: '쿠팡이츠',
            color: 'green',
            fees: { A: 7.8, B: 6.8, C: 2.0 }
        },
        yogiyo: {
            name: '요기요',
            color: 'red',
            fees: { A: 9.7, B: 9.7, C: 4.7 }
        },
        ddaengyo: {
            name: '땡겨요',
            color: 'orange',
            fees: { A: 2.0, B: 2.0, C: 2.0 }
        }
    };

    useEffect(() => {
        calculateAll();
    }, [menuPrice, foodCost, deliveryFee, quantity, tier]);

    const calculateAll = () => {
        const tempResults: CalculationResult[] = [];
        let ddaengyoProfit = 0;

        // First pass: Calculate for each platform
        (Object.keys(platforms) as Platform[]).forEach((p) => {
            let brokerageRate = platforms[p].fees[tier];

            if (p === 'yogiyo') {
                if (tier === 'C') brokerageRate = 4.7;
                else brokerageRate = 9.7;
            }
            // Ddaengyo is always 2.0
            if (p === 'ddaengyo') brokerageRate = 2.0;

            const brokerageFee = menuPrice * (brokerageRate / 100);
            const paymentFee = menuPrice * 0.03;
            const vat = (brokerageFee + paymentFee) * 0.1;
            const totalFees = brokerageFee + paymentFee + vat + deliveryFee;
            const netProfitUnit = menuPrice - foodCost - totalFees;
            const netProfitTotal = netProfitUnit * quantity;
            const margin = menuPrice > 0 ? (netProfitUnit / menuPrice) * 100 : 0;

            if (p === 'ddaengyo') {
                ddaengyoProfit = netProfitTotal;
            }

            tempResults.push({
                platform: p,
                name: platforms[p].name,
                color: platforms[p].color,
                brokerageRate,
                brokerageFee,
                paymentFee,
                vat,
                totalFees,
                netProfitUnit,
                netProfitTotal,
                margin,
                diffFromDdaengyo: 0,
                diffAnnual: 0
            });
        });

        // Second pass: Calculate difference
        const finalResults = tempResults.map(r => {
            const diff = ddaengyoProfit - r.netProfitTotal;
            return {
                ...r,
                diffFromDdaengyo: diff,
                diffAnnual: diff * 12
            };
        });

        setResults(finalResults);
    };

    const formatCurrency = (val: number) => {
        if (isNaN(val)) return '0';
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    <Calculator className="w-6 h-6" />
                    배달 수익 비교 계산기 (2025년형)
                </h2>
                <p className="text-sm text-gray-500">
                    플랫폼별 수수료와 수익을 한눈에 비교하세요.
                </p>
            </div>

            {/* Input Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                {/* Numeric Inputs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1">메뉴 판매가</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={menuPrice}
                                onChange={(e) => setMenuPrice(Number(e.target.value))}
                                className="w-full p-3 pl-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-bold text-black placeholder-gray-400 opacity-100"
                            />
                            <span className="absolute left-3 top-3.5 text-gray-400">₩</span>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1">원가 (재료비)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={foodCost}
                                onChange={(e) => setFoodCost(Number(e.target.value))}
                                className="w-full p-3 pl-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-bold text-black placeholder-gray-400 opacity-100"
                            />
                            <span className="absolute left-3 top-3.5 text-gray-400">₩</span>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1">배달비 (사장님)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={deliveryFee}
                                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                                className="w-full p-3 pl-8 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-bold text-black placeholder-gray-400 opacity-100"
                            />
                            <span className="absolute left-3 top-3.5 text-gray-400">₩</span>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold text-indigo-600 mb-1">월 판매 수량</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full p-3 pl-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-bold text-black placeholder-indigo-400 opacity-100"
                            />
                            <span className="absolute right-3 top-3.5 text-indigo-400 text-xs">건</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="p-4 whitespace-nowrap">플랫폼</th>
                                <th className="p-4 whitespace-nowrap text-center">중개수수료</th>
                                <th className="p-4 whitespace-nowrap text-right">건당 순수익</th>
                                <th className="p-4 whitespace-nowrap text-right bg-indigo-50 text-indigo-900">
                                    총 순수익 ({quantity}건)
                                </th>
                                <th className="p-4 whitespace-nowrap text-right text-orange-600">
                                    연간 차익 (12개월)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {results.map((res) => (
                                <tr key={res.platform} className={`hover:bg-gray-50 transition-colors ${res.platform === 'ddaengyo' ? 'bg-orange-50/50' : ''}`}>
                                    <td className="p-4 font-bold flex items-center gap-2">
                                        <div className={`w-2 h-8 rounded-full ${res.color === 'blue' ? 'bg-blue-500' :
                                                res.color === 'green' ? 'bg-green-500' :
                                                    res.color === 'red' ? 'bg-red-500' :
                                                        'bg-orange-500'
                                            }`}></div>
                                        {res.name}
                                        {res.platform === 'ddaengyo' && (
                                            <span className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded font-bold">추천</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center font-medium text-gray-600">
                                        {res.brokerageRate.toFixed(1)}%
                                    </td>
                                    <td className="p-4 text-right font-bold text-gray-900">
                                        {formatCurrency(res.netProfitUnit)}
                                        <div className="text-[10px] text-gray-400 font-normal">마진 {res.margin.toFixed(1)}%</div>
                                    </td>
                                    <td className="p-4 text-right font-extrabold text-indigo-900 bg-indigo-50/30">
                                        {formatCurrency(res.netProfitTotal)}
                                    </td>
                                    <td className="p-4 text-right">
                                        {res.platform === 'ddaengyo' ? (
                                            <span className="text-gray-400 text-xs">-</span>
                                        ) : (
                                            <div className="flex items-center justify-end gap-1 text-orange-600 font-bold">
                                                <TrendingUp className="w-4 h-4" />
                                                +{formatCurrency(res.diffAnnual)}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ddaengyo Promo Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">사장님, 아직도 비싼 수수료 내고 계신가요?</h3>
                        <p className="text-orange-100 text-sm">
                            땡겨요는 매출 구간 상관없이 <span className="font-bold underline text-white">단일 수수료 2.0%</span>입니다.
                            <br className="hidden sm:block" />
                            지금 바로 땡겨요로 갈아타고 <span className="font-bold text-yellow-300">연간 {formatCurrency(Math.max(...results.map(r => r.diffAnnual)))}</span> 더 벌어가세요!
                        </p>
                    </div>
                </div>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
                    땡겨요 입점 신청하기
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="text-xs text-gray-400 text-center">
                * 위 계산 결과는 예상치이며, 실제 정산 금액과 차이가 있을 수 있습니다.<br />
                * 부가세는 중개수수료와 결제수수료의 합계에 대해 10%가 부과됩니다.
            </div>

            {/* Advertising Comparison Section */}
            <div className="mt-12 space-y-4">
                <div className="text-center space-y-2 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">플랫폼별 주요 광고 상품 비교 (2025년)</h3>
                    <p className="text-sm text-gray-500">각 플랫폼의 광고 비용과 특징을 확인해보세요.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="p-4 whitespace-nowrap">플랫폼</th>
                                    <th className="p-4 whitespace-nowrap">주요 광고 상품</th>
                                    <th className="p-4 whitespace-nowrap">과금 방식</th>
                                    <th className="p-4 whitespace-nowrap">비용 (VAT 별도)</th>
                                    <th className="p-4 min-w-[300px]">특징 및 2025년 주요 이슈</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {adData.map((ad, idx) => (
                                    <tr key={idx} className={`hover:bg-gray-50 transition-colors ${ad.isDeleted ? 'bg-gray-50 text-gray-400' : 'text-gray-900'}`}>
                                        <td className="p-4 font-bold whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-6 rounded-full ${ad.color === 'blue' ? 'bg-blue-500' :
                                                        ad.color === 'green' ? 'bg-green-500' :
                                                            ad.color === 'red' ? 'bg-red-500' :
                                                                'bg-orange-500'
                                                    } ${ad.isDeleted ? 'bg-gray-400' : ''}`}></div>
                                                <span className={ad.isDeleted ? 'text-gray-400' : 'text-gray-900'}>{ad.platform}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium whitespace-nowrap">
                                            {ad.isDeleted ? <span className="line-through decoration-gray-400">{ad.product}</span> : <span className="text-gray-900">{ad.product}</span>}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-gray-900">
                                            {ad.isDeleted ? <span className="line-through decoration-gray-400">{ad.billing}</span> : ad.billing}
                                        </td>
                                        <td className="p-4 font-bold whitespace-nowrap">
                                            {ad.isDeleted ? <span className="line-through decoration-gray-400">{ad.cost}</span> : <span className="text-gray-900">{ad.cost}</span>}
                                        </td>
                                        <td className="p-4 text-xs leading-relaxed text-gray-900">
                                            {ad.features}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryProfitCalculator;
