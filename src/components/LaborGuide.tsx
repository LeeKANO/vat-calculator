import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Shield, TrendingUp, Users, FileText, Scale, Phone, Calculator, PiggyBank, ChevronRight, Info, AlertTriangle, Lock, ChevronDown, ChevronUp, X, Download } from 'lucide-react';
import Image from 'next/image';

export default function LaborGuide() {
    const [activeTab, setActiveTab] = useState<'guide' | 'calculator' | 'tax-saving'>('guide');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                <button
                    onClick={() => setActiveTab('guide')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
                        ${activeTab === 'guide'
                            ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
                            : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    노무 가이드
                </button>
                <button
                    onClick={() => setActiveTab('calculator')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
                        ${activeTab === 'calculator'
                            ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200'
                            : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                    포괄임금 계산기
                </button>
                <button
                    onClick={() => setActiveTab('tax-saving')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
                        ${activeTab === 'tax-saving'
                            ? 'bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200'
                            : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5" />
                    인건비 절세 꿀팁
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px]">
                {activeTab === 'guide' && <LaborGuideContent />}
                {activeTab === 'calculator' && <WageCalculator />}
                {activeTab === 'tax-saving' && <LaborTaxSaving />}
            </div>
        </div>
    );
}
// ----------------------------------------------------------------------
// 1. Persuasive Labor Guide Content (Flat Version)
// ----------------------------------------------------------------------
function LaborGuideContent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="space-y-16">
            {/* Image Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full size"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* HERO Section */}
            <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-8 sm:p-16 text-center shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-yellow-400 uppercase bg-yellow-900/30 rounded-full border border-yellow-500/30 backdrop-blur-sm">
                        노무법인 윤솔
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 leading-tight break-keep">
                        "사장님, <span className="text-yellow-400">노무 리스크</span>는<br />
                        예방이 최선입니다."
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed break-keep max-w-2xl mx-auto">
                        과태료 폭탄, 임금 체불, 부당 해고...<br />
                        전문가의 관리로 완벽하게 방어하고 지원금까지 챙겨드립니다.
                    </p>
                </div>
            </section>

            {/* Section 1: Risks */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                        사장님을 위협하는 3대 리스크
                    </h2>
                    <p className="text-gray-600 mt-2">지금 대비하지 않으면 큰 손실로 이어질 수 있습니다.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-red-800 mb-2 text-lg">1. 급여명세서 미발송</h4>
                            <p className="text-gray-600">단순 미발송도 건당 과태료 부과, 최대 500만원까지 부과될 수 있습니다.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-red-800 mb-2 text-lg">2. 임금 체불 (포괄임금제 미비)</h4>
                            <p className="text-gray-600">월급을 다 줬어도, 기본급과 수당을 구분하지 않으면 연장/야간 수당을 또 줘야 할 수 있습니다.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-red-800 mb-2 text-lg">3. 부당 해고 분쟁</h4>
                            <p className="text-gray-600">"내일부터 나오지 마" 한마디에 해고예고수당(1개월) + 부당해고 구제(수개월치 임금) 폭탄을 맞습니다.</p>
                        </div>
                    </div>
                    <div>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-300">
                            <img
                                src="/images/labor/labor_01.png"
                                alt="노무 리스크"
                                className="w-full h-auto object-cover cursor-pointer"
                                onClick={() => setSelectedImage("/images/labor/labor_01.png")}
                            />
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-3">▲ 클릭하여 확대보기 (표준계약서 vs 방어형 계약서)</p>
                    </div>
                </div>
            </section>

            {/* Section 2: Wage Design */}
            <section className="bg-blue-50 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        "해결책 1: <span className="text-blue-600">포괄임금제 설계</span>"
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        월급을 통으로 주지 않고, <strong>기본급 + 식대 + 연장수당</strong> 등으로 세분화하여 근로계약서에 명시해야 합니다.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-6 text-center text-lg">임금 쪼개기 예시 (월 300만원 기준)</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-500 font-medium">기존 (위험)</span>
                                <div className="text-right">
                                    <div className="font-bold text-red-500 text-lg">기본급 300만원</div>
                                    <div className="text-xs text-red-400">연장수당 별도 청구 위험</div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <span className="text-blue-600 font-bold">개선 (안전)</span>
                                <div className="text-right">
                                    <div className="font-bold text-blue-800 text-lg">기본급 230 + 식대 20 + 연장 50</div>
                                    <div className="text-xs text-blue-600">법적 수당 모두 포함됨</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src="/images/labor/labor_05.png"
                            alt="포괄임금제 설명"
                            className="w-full h-auto rounded-2xl shadow-lg cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => setSelectedImage("/images/labor/labor_05.png")}
                        />
                    </div>
                </div>
            </section>

            {/* Section 3: Tax Saving */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        "해결책 2: <span className="text-emerald-600">4대보험료 절감</span>"
                    </h2>
                    <p className="text-gray-600 text-lg">
                        비과세 항목과 정부 지원금을 활용하여 고정 비용을 줄입니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
                        <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <PiggyBank className="w-6 h-6" /> 비과세 수당 활용
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            식대(20만), 차량유지비(20만), 육아수당(10만) 등은 세금과 4대보험료가 부과되지 않습니다.
                        </p>
                        <div className="bg-emerald-50 p-3 rounded-lg text-emerald-700 font-bold text-center">
                            월 50만원 비과세 시 → 연간 약 60만원 절감
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
                        <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6" /> 두루누리 지원금
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            월 보수 270만원 미만 근로자는 국민연금/고용보험의 80%를 국가가 지원합니다.
                        </p>
                        <div className="bg-emerald-50 p-3 rounded-lg text-emerald-700 font-bold text-center">
                            비과세로 소득 낮춰서 지원금 받기 가능!
                        </div>
                    </div>
                </div>
                <div className="bg-emerald-900 text-white p-6 rounded-2xl text-center">
                    <span className="text-xl">직원 1인당 연간 <span className="font-bold text-yellow-400">최대 288만원</span>까지 비용을 줄일 수 있습니다.</span>
                </div>
            </section>

            {/* Section 4: Subsidies */}
            <section className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-16 text-white text-center">
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-yellow-400 uppercase bg-white/10 rounded-full">
                    놓치면 손해
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-10">
                    "인건비 지원금, <span className="text-yellow-400">다 챙겨받고 계신가요?</span>"
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="text-4xl mb-4">🌱</div>
                        <h4 className="font-bold text-xl mb-2">청년일자리도약</h4>
                        <p className="text-indigo-200 mb-4">만 34세 이하 채용</p>
                        <div className="text-yellow-400 font-bold text-2xl">
                            연 720만원
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="text-4xl mb-4">👴</div>
                        <h4 className="font-bold text-xl mb-2">시니어 인턴십</h4>
                        <p className="text-indigo-200 mb-4">만 60세 이상 채용</p>
                        <div className="text-yellow-400 font-bold text-2xl">
                            최대 520만원
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="text-4xl mb-4">🧪</div>
                        <h4 className="font-bold text-xl mb-2">기업부설연구소</h4>
                        <p className="text-indigo-200 mb-4">연구 인력 배치</p>
                        <div className="text-yellow-400 font-bold text-2xl">
                            세액공제 25%
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Proposal PDF Link */}
            <div className="mt-4">
                <a
                    href="/files/yunsol_labor_guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
                >
                    <Download className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                    노무법인 윤솔 회사소개서 및 제안서 확인하기
                </a>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
function WageCalculator() {
    const [totalSalary, setTotalSalary] = useState<number>(3000000);
    const [weeklyWorkHours, setWeeklyWorkHours] = useState<number>(40);
    const [weeklyOvertimeHours, setWeeklyOvertimeHours] = useState<number>(0);
    const [nonTaxable, setNonTaxable] = useState<number>(200000); // 식대 등
    const [showNonTaxableGuide, setShowNonTaxableGuide] = useState<boolean>(false);

    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculateWage();
    }, [totalSalary, weeklyWorkHours, weeklyOvertimeHours, nonTaxable]);

    const calculateWage = () => {
        // 2025 Minimum Wage
        const MINIMUM_WAGE_2025 = 10030;

        // 1. Basic Hours (Monthly)
        // (Weekly Hours + Weekly Holiday 8h) * 4.345 (365/7/12)
        // Standard 40h -> 209h
        const weeksPerMonth = 4.345;
        const weeklyHolidayHours = weeklyWorkHours >= 15 ? 8 : 0;
        const monthlyBasicHours = Math.round((weeklyWorkHours + weeklyHolidayHours) * weeksPerMonth);

        // 2. Overtime Hours (Monthly)
        // Overtime * 1.5
        const monthlyOvertimeHours = Math.round(weeklyOvertimeHours * weeksPerMonth * 1.5);

        // 3. Total Paid Hours
        const totalPaidHours = monthlyBasicHours + monthlyOvertimeHours;

        // 4. Taxable Salary
        const taxableSalary = totalSalary - nonTaxable;

        // 5. Hourly Rate (Reverse Calculation)
        const hourlyRate = Math.round(taxableSalary / totalPaidHours);

        // 6. Breakdown
        const basicPay = hourlyRate * monthlyBasicHours;
        const overtimePay = hourlyRate * monthlyOvertimeHours;

        setResult({
            hourlyRate,
            monthlyBasicHours,
            monthlyOvertimeHours,
            basicPay,
            overtimePay,
            totalPaidHours,
            isMinimumWageViolation: hourlyRate < MINIMUM_WAGE_2025,
            minimumWage: MINIMUM_WAGE_2025
        });
    };

    const formatCurrency = (val: number) => new Intl.NumberFormat('ko-KR').format(val);

    return (
        <div className="space-y-6">
            <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-2">포괄임금 역산 계산기</h2>
                <p className="text-blue-200">월 지급 총액을 기준으로 기본급과 고정연장수당을 계산합니다.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        급여 조건 입력
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">월 지급 총액 (세전)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={totalSalary}
                                    onChange={(e) => setTotalSalary(Number(e.target.value))}
                                    className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400 font-medium">원</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">비과세 수당 (식대 등)</label>
                                <button
                                    onClick={() => setShowNonTaxableGuide(!showNonTaxableGuide)}
                                    className="text-xs text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1"
                                >
                                    비과세 항목 예시 보기
                                    {showNonTaxableGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={nonTaxable}
                                    onChange={(e) => setNonTaxable(Number(e.target.value))}
                                    className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400 font-medium">원</span>
                            </div>

                            {/* Non-taxable Guide Table */}
                            {showNonTaxableGuide && (
                                <div className="mt-3 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                                            <tr>
                                                <th className="px-3 py-2">항목</th>
                                                <th className="px-3 py-2 text-right">월 한도</th>
                                                <th className="px-3 py-2">비고</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-3 py-2 font-medium">식대</td>
                                                <td className="px-3 py-2 text-right text-blue-600 font-bold">20만원</td>
                                                <td className="px-3 py-2 text-gray-500 text-xs">사내 급식 미제공 시</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-2 font-medium">자가운전보조금</td>
                                                <td className="px-3 py-2 text-right text-blue-600 font-bold">20만원</td>
                                                <td className="px-3 py-2 text-gray-500 text-xs">본인 차량 업무 사용</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-2 font-medium">자녀보육수당</td>
                                                <td className="px-3 py-2 text-right text-blue-600 font-bold">20만원</td>
                                                <td className="px-3 py-2 text-gray-500 text-xs">6세 이하 자녀 (자녀 수 무관)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-3 py-2 font-medium">연구활동비</td>
                                                <td className="px-3 py-2 text-right text-blue-600 font-bold">20만원</td>
                                                <td className="px-3 py-2 text-gray-500 text-xs">기업부설연구소 연구원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="p-2 bg-blue-50 text-xs text-blue-700 border-t border-blue-100">
                                        * 위 항목들은 조건 충족 시 합산하여 적용 가능합니다. (예: 식대+운전 = 40만원)
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-1">* 비과세 수당을 제외한 금액으로 시급이 계산됩니다.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">주 소정근로시간</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={weeklyWorkHours}
                                        onChange={(e) => setWeeklyWorkHours(Number(e.target.value))}
                                        className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-400 font-medium">시간</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">주 고정연장시간</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={weeklyOvertimeHours}
                                        onChange={(e) => setWeeklyOvertimeHours(Number(e.target.value))}
                                        className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <span className="absolute right-4 top-3.5 text-gray-400 font-medium">시간</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    {result && (
                        <>
                            <div className={`p-6 rounded-2xl shadow-sm border-2 ${result.isMinimumWageViolation ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">계산 결과</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">계산된 통상시급</span>
                                        <span className="text-xl font-bold text-gray-900">{formatCurrency(result.hourlyRate)} 원</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">2025년 최저시급</span>
                                        <span className="text-gray-700 font-medium">{formatCurrency(result.minimumWage)} 원</span>
                                    </div>
                                </div>

                                {result.isMinimumWageViolation ? (
                                    <div className="flex items-start gap-3 bg-red-100 p-4 rounded-xl text-red-800 text-sm font-medium">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <span>최저임금 미달입니다! 기본급이나 수당을 조정하여 최저임금 이상으로 설정해야 합니다.</span>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-3 bg-blue-100 p-4 rounded-xl text-blue-800 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                                        <span>최저임금법을 준수하고 있습니다.</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">급여 구성 항목 (근로계약서 기재용)</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 font-medium">기본급 ({result.monthlyBasicHours}시간)</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(result.basicPay)} 원</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 font-medium">고정연장수당 ({Math.round(result.monthlyOvertimeHours / 1.5)}시간 × 1.5)</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(result.overtimePay)} 원</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 font-medium">비과세 수당</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(nonTaxable)} 원</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">합계</span>
                                        <span className="text-xl font-bold text-blue-600">{formatCurrency(totalSalary)} 원</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-sm text-gray-600">
                <div className="flex items-center gap-2 font-bold text-gray-800 mb-2">
                    <Info className="w-4 h-4" />
                    참고 사항
                </div>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>본 계산기는 2025년 최저임금(10,030원)을 기준으로 합니다.</li>
                    <li>주휴수당은 주 15시간 이상 근무 시 자동으로 기본급(209시간 기준)에 포함되어 계산됩니다.</li>
                    <li>포괄임금제는 2025년부터 규제가 강화될 예정이므로, 실제 근로시간 관리가 중요합니다.</li>
                </ul>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// 3. Tax Saving Tips (Based on NTS Data)
// ----------------------------------------------------------------------
function LaborTaxSaving() {
    return (
        <div className="space-y-8">
            <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">인건비 관련 절세 가이드</h2>
                    <p className="text-emerald-100">국세청 자료 기반, 직원을 채용하면 받을 수 있는 세금 혜택 총정리</p>
                </div>
                <PiggyBank className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 text-emerald-800/50" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Tip 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors group">
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <Users className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">고용증대 세액공제</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                전년 대비 상시 근로자 수가 증가했다면 세금을 공제받을 수 있습니다.
                                청년 정규직 고용 시 혜택이 가장 큽니다.
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm">
                                <p className="font-semibold text-emerald-700 mb-1">공제 금액 (수도권 기준, 1인당)</p>
                                <ul className="space-y-1 text-gray-600">
                                    <li className="flex justify-between">
                                        <span>청년 및 취약계층</span>
                                        <span className="font-bold">최대 1,100만원</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>일반 상시근로자</span>
                                        <span className="font-bold">최대 700만원</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tip 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors group">
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <Shield className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">사회보험료 세액공제</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                고용이 증가한 중소기업에 대해 사업주가 부담하는 4대보험료 증가분의 일부를 세금에서 깎아줍니다.
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm">
                                <p className="font-semibold text-emerald-700 mb-1">공제율 (청년/경력단절여성)</p>
                                <ul className="space-y-1 text-gray-600">
                                    <li className="flex justify-between">
                                        <span>공제율</span>
                                        <span className="font-bold">100% (전액)</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>일반 근로자</span>
                                        <span className="font-bold">50%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tip 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors group">
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <TrendingUp className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">중소기업 취업자 소득세 감면</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                직원의 소득세를 감면해주어 실질 급여를 높여주는 효과가 있습니다. (사업주가 신청 대행)
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>청년 (15~34세): 5년간 90% 감면</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>고령자, 장애인: 3년간 70% 감면</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>연간 한도: 200만원</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tip 4 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors group">
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <FileText className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">인건비 비용 처리 & 증빙</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                가족 직원도 실제 근무 시 비용 인정이 가능합니다. 단, 증빙 관리가 필수입니다.
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                                    <span>급여대장, 근로계약서, 출퇴근 기록 필수</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                                    <span>원천세 신고 및 지급명세서 제출 필수</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                                    <span>통장 이체 내역 (금융 증빙) 보관</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl text-center">
                <p className="text-gray-600 text-sm mb-2">
                    * 위 내용은 국세청 및 조세특례제한법을 바탕으로 요약된 내용이며, 실제 적용 시 요건 충족 여부에 따라 달라질 수 있습니다.
                </p>
                <p className="text-gray-500 text-xs">
                    정확한 세액 공제 가능 여부는 세무 전문가와 상담하시기 바랍니다.
                </p>
            </div>
        </div>
    );
}
