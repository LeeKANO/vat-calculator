"use client";

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingDown, Info, ExternalLink, DollarSign, Search } from 'lucide-react';

const INDUSTRY_RATES = [
    { name: '소매업, 음식점업', rate: 0.15 },
    { name: '제조업, 운수업', rate: 0.20 },
    { name: '숙박업', rate: 0.25 },
    { name: '건설업, 정보통신업', rate: 0.30 },
    { name: '금융, 전문과학기술', rate: 0.40 },
    { name: '부동산임대업', rate: 0.40 },
    { name: '기타 서비스업', rate: 0.30 },
];

const VATCalculator = () => {
    const [mode, setMode] = useState<'general' | 'simplified'>('general');
    const [revenue, setRevenue] = useState<number>(0);
    const [purchase, setPurchase] = useState<number>(0);
    const [industryRate, setIndustryRate] = useState<number>(0.15);
    const [selectedIndustry, setSelectedIndustry] = useState<{ name: string, rate: number } | null>(null);

    const [creditCardSales, setCreditCardSales] = useState<number>(0);

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [result, setResult] = useState({
        vat: 0,
        supplyValue: 0,
        effectiveRate: 0,
        taxCredit: 0, // Added to track the credit amount
    });

    const filteredIndustries = INDUSTRY_RATES.filter(item =>
        item.name.includes(searchTerm)
    );

    const handleIndustrySelect = (rate: number, name: string) => {
        setIndustryRate(rate);
        setSelectedIndustry({ name, rate });
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        calculate();
    }, [revenue, purchase, mode, industryRate, creditCardSales]);

    const calculate = () => {
        let vat = 0;
        let supplyValue = 0;
        let taxCredit = 0;

        if (mode === 'general') {
            // 일반과세자: 매출세액 - 매입세액
            // 매출액(공급대가) = 공급가액 + 부가세(10%)
            // 공급가액 = 매출액 / 1.1
            const revenueSupply = Math.round(revenue / 1.1);
            const revenueTax = revenue - revenueSupply;

            const purchaseSupply = Math.round(purchase / 1.1);
            const purchaseTax = purchase - purchaseSupply;

            vat = revenueTax - purchaseTax; // 환급 가능 (음수 허용)
            supplyValue = revenueSupply;
        } else {
            // 간이과세자: 공급대가 * 업종별 부가가치율 * 10%
            // 매입세액 공제: 매입액(공급대가) * 0.5%
            const taxBeforeDeduction = Math.round(revenue * industryRate * 0.1);
            const purchaseDeduction = Math.round(purchase * 0.005);

            // 신용카드 등 발행세액 공제: 발행금액 * 1.3% (연간 1,000만원 한도)
            const creditCardDeduction = Math.min(Math.round(creditCardSales * 0.013), 10000000);
            taxCredit = creditCardDeduction;

            vat = Math.max(taxBeforeDeduction - purchaseDeduction - creditCardDeduction, 0); // 환급 불가
            supplyValue = revenue;
        }

        setResult({
            vat,
            supplyValue,
            effectiveRate: revenue > 0 ? (vat / revenue) * 100 : 0,
            taxCredit,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    };

    const dataPie = [
        { name: '순수익(예상)', value: revenue - result.vat - (purchase / 1.1) },
        { name: '부가가치세', value: result.vat },
        { name: '매입비용(공급가)', value: Math.round(purchase / 1.1) },
    ];

    const dataBar = [
        {
            name: '금액',
            매출액: revenue,
            [result.vat < 0 ? '환급세액' : '납부세액']: Math.abs(result.vat),
        },
    ];

    const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Calculator className="w-8 h-8 text-blue-600" />
                    사업자 부가세 계산기
                </h1>
                <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                >
                    국세청 홈택스 바로가기 <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                        <button
                            className={`flex-1 py-2 rounded-md font-medium transition-all ${mode === 'general' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setMode('general')}
                        >
                            일반과세자
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-md font-medium transition-all ${mode === 'simplified' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setMode('simplified')}
                        >
                            간이과세자
                        </button>
                    </div>

                    <div className="space-y-4">
                        {mode === 'simplified' && (
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    업종 선택
                                    <span className="text-xs text-blue-500 ml-2 font-normal">(업종별 부가가치율 적용)</span>
                                </label>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <span className={selectedIndustry ? 'text-gray-900' : 'text-gray-400'}>
                                            {selectedIndustry
                                                ? `${selectedIndustry.name} (부가율: ${selectedIndustry.rate * 100}%)`
                                                : '업종을 검색하여 선택하세요'}
                                        </span>
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                            <div className="p-2 sticky top-0 bg-white border-b border-gray-100">
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
                                                    placeholder="업종명 검색..."
                                                    autoFocus
                                                />
                                            </div>
                                            {filteredIndustries.length > 0 ? (
                                                filteredIndustries.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm flex justify-between items-center"
                                                        onClick={() => handleIndustrySelect(item.rate, item.name)}
                                                    >
                                                        <span className="font-medium">{item.name}</span>
                                                        <span className="text-gray-500 ml-2">({item.rate * 100}%)</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500">검색 결과가 없습니다.</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">매출액 (공급대가: 부가세 포함)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={revenue === 0 ? '' : revenue.toLocaleString()}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/,/g, '');
                                        if (!isNaN(Number(val))) setRevenue(Number(val));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-gray-400">원</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">매입액 (지출액: 부가세 포함)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={purchase === 0 ? '' : purchase.toLocaleString()}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/,/g, '');
                                        if (!isNaN(Number(val))) setPurchase(Number(val));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-gray-400">원</span>
                            </div>
                        </div>

                        {mode === 'simplified' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    신용카드·현금영수증 발행금액
                                    <span className="text-xs text-blue-500 ml-2 font-normal">(1.3% 세액공제)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={creditCardSales === 0 ? '' : creditCardSales.toLocaleString()}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(Number(val))) setCreditCardSales(Number(val));
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400">원</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">계산 결과</h3>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-600">{result.vat < 0 ? '환급 예상 세액' : '예상 납부 세액'}</span>
                            <span className={`text-3xl font-bold ${result.vat < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                                {formatCurrency(Math.abs(result.vat))}
                            </span>
                        </div>
                        {mode === 'simplified' && result.taxCredit > 0 && (
                            <div className="flex justify-between items-center text-sm text-blue-600 mb-1">
                                <span>신용카드 발행 세액공제</span>
                                <span>- {formatCurrency(result.taxCredit)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>부가율 (매출액 대비)</span>
                            <span>{result.effectiveRate.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                {/* Visual Section */}
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 h-[300px]">
                        <h3 className="text-sm font-semibold text-gray-500 mb-4">매출 대비 세액 비율</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataBar}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                <Legend />
                                <Bar dataKey="매출액" fill="#8884d8" />
                                <Bar dataKey={result.vat < 0 ? '환급세액' : '납부세액'} fill={result.vat < 0 ? '#FF8042' : '#FF8042'} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tax Saving Tips */}
            <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                    절세 꿀팁 & 가이드
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-5 h-5 text-green-700" />
                            <h3 className="font-bold text-green-900">적격증빙 수취 필수</h3>
                        </div>
                        <p className="text-sm text-green-800 leading-relaxed">
                            사업과 관련된 모든 지출은 세금계산서, 현금영수증(지출증빙용), 신용카드 매출전표를 꼭 챙기세요. 간이과세자도 매입세액 공제(0.5%)를 받을 수 있습니다.
                        </p>
                    </div>

                    <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5 text-orange-700" />
                            <h3 className="font-bold text-orange-900">의제매입세액 공제</h3>
                        </div>
                        <p className="text-sm text-orange-800 leading-relaxed">
                            음식점업은 면세 농산물 구입 시 의제매입세액 공제를 받을 수 있습니다. 계산서나 신용카드 영수증을 꼼꼼히 모아두세요.
                        </p>
                    </div>

                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Calculator className="w-5 h-5 text-purple-700" />
                            <h3 className="font-bold text-purple-900">유형 전환 고려</h3>
                        </div>
                        <p className="text-sm text-purple-800 leading-relaxed">
                            초기 인테리어 비용 등 매입이 매출보다 많다면 일반과세자가 유리할 수 있습니다(환급 가능). 간이과세자는 환급이 불가능합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VATCalculator;
