import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Shield, TrendingUp, Users, FileText, Scale, Phone, Calculator, PiggyBank, ChevronRight, Info, AlertTriangle, Lock, ChevronDown, ChevronUp, X } from 'lucide-react';
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
// 1. Persuasive Labor Guide Content (Updated)
// ----------------------------------------------------------------------
function LaborGuideContent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="space-y-12">
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
                        사장님 필독
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 leading-tight break-keep">
                        "노동부는 근로자 편입니다.<br />
                        <span className="text-yellow-400">대표님을 보호하는 문구</span>가 필요합니다."
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed break-keep max-w-2xl mx-auto">
                        표준근로계약서만 믿고 계신가요? <br className="sm:hidden" />
                        작은 문구 하나가 수천만 원의 과태료를 막아줍니다.
                    </p>
                </div>
            </section>

            {/* Section 1: The Reality (Image 0 & 2) */}
            <section className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            사장님을 위협하는 현실
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-red-600 font-bold text-sm">1</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">오전 출근, 오후 도망 → 노동부 신고</p>
                                    <p className="text-sm text-gray-600">황당한 경우라도 근로계약서 미작성 시 과태료 최대 500만원이 부과됩니다.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-red-600 font-bold text-sm">2</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">사직서 받고 보냈는데 부당해고?</p>
                                    <p className="text-sm text-gray-600">"3일 뒤에 나오지 마세요" 한마디가 해고예고수당 + 6개월치 임금 지급 명령으로 돌아옵니다.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-red-600 font-bold text-sm">3</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">무단 퇴사로 인한 손해</p>
                                    <p className="text-sm text-gray-600">갑작스런 퇴사로 가게 문을 닫아도, 손해배상 청구는 현실적으로 어렵습니다.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="/images/labor/labor_01.png"
                            alt="근로계약서 비교"
                            className="w-full h-auto object-cover cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => setSelectedImage("/images/labor/labor_01.png")}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <p className="text-white font-bold text-lg">표준계약서 vs 방어형 계약서</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1.5: Fake 3.3% & Wage Strategy (New) */}
            <section className="space-y-12">
                {/* Part 1: Fake 3.3% Warning */}
                <div className="bg-red-50 rounded-3xl p-8 sm:p-12 border border-red-100">
                    <div className="text-center mb-10">
                        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-red-600 uppercase bg-red-100 rounded-full">
                            위험 경고
                        </div>
                        <h2 className="text-3xl font-bold text-red-900 mb-4">
                            "3.3% 프리랜서 계약, <span className="text-red-600">안전할까요?</span>"
                        </h2>
                        <p className="text-red-800 text-lg max-w-2xl mx-auto">
                            출퇴근 시간이 정해져 있고 업무 지시를 받는다면, <br className="sm:hidden" />
                            <strong>무조건 근로자</strong>입니다.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                가짜 3.3% 적발 시 폭탄
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                                    <span><strong>4대보험료 소급 징수:</strong> 최대 3년치 보험료 한꺼번에 부과 (사업주 부담분 + 근로자 부담분까지)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                                    <span><strong>과태료 부과:</strong> 미가입 기간에 따른 과태료 별도 부과</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0"></span>
                                    <span><strong>퇴직금 지급:</strong> 프리랜서라 안 줬던 퇴직금도 지급해야 함</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                해결책: 합법적 절세 설계
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                4대보험을 가입하더라도 <strong>비과세 수당</strong>과 <strong>두루누리 지원금</strong>을 활용하면, 3.3%보다 비용이 적게 들 수 있습니다.
                            </p>
                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                <span className="text-blue-700 font-bold text-sm">"오히려 4대보험 가입이 이득이 될 수 있습니다!"</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 2: Wage Strategy Visual (Image 0 Logic) */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            임금 항목 재정비의 마법
                        </h2>
                        <p className="text-gray-600 text-lg">
                            같은 월급이라도 <span className="text-blue-600 font-bold">어떻게 구성하느냐</span>에 따라 세금이 달라집니다.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Before */}
                        <div className="space-y-4">
                            <div className="text-center font-bold text-gray-500 mb-2">일반적인 월급 구성 (과세 100%)</div>
                            <div className="bg-gray-100 p-6 rounded-2xl text-center space-y-4 opacity-70">
                                <div className="text-2xl font-bold text-gray-800">월 300만원</div>
                                <div className="w-px h-8 bg-gray-300 mx-auto"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <div className="text-xs text-gray-500 mb-1">대표자 부담</div>
                                        <div className="font-bold text-gray-700">약 30만원</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <div className="text-xs text-gray-500 mb-1">근로자 부담</div>
                                        <div className="font-bold text-gray-700">약 30만원</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After */}
                        <div className="space-y-4 relative">
                            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 hidden lg:block text-blue-500">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                            <div className="text-center font-bold text-blue-600 mb-2">전략적 급여 설계 (비과세 활용)</div>
                            <div className="bg-blue-50 p-6 rounded-2xl text-center space-y-4 border-2 border-blue-100">
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold text-blue-900">월 300만원</div>
                                    <div className="text-sm text-blue-600 font-medium bg-white inline-block px-3 py-1 rounded-full shadow-sm">
                                        과세 250만 + <span className="text-red-500">비과세 50만</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    (식대 20 + 차량 20 + 육아 10 등)
                                </div>
                                <div className="w-px h-8 bg-blue-200 mx-auto"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                                        <div className="text-xs text-gray-500 mb-1">대표자 부담</div>
                                        <div className="font-bold text-blue-700">25만원 <span className="text-xs text-red-500">(-5만원)</span></div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                                        <div className="text-xs text-gray-500 mb-1">근로자 부담</div>
                                        <div className="font-bold text-blue-700">25만원 <span className="text-xs text-red-500">(-5만원)</span></div>
                                    </div>
                                </div>
                                <div className="bg-blue-600 text-white text-sm font-bold py-2 rounded-lg">
                                    총 10만원 절감 효과!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 3: Durunuri Support (Image 1 Logic) */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">
                                "비과세 설계로 <span className="text-yellow-400">두루누리 지원금</span>까지?"
                            </h2>
                            <p className="text-indigo-200 text-lg">
                                월 보수액을 270만원 미만으로 낮추면, 국민연금/고용보험 80%를 국가가 지원해줍니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 text-gray-900">
                            {/* Step 1 */}
                            <div className="bg-white/95 p-6 rounded-2xl text-center">
                                <div className="text-sm text-gray-500 mb-2">STEP 1</div>
                                <div className="font-bold text-lg mb-4">비과세 적용 전</div>
                                <div className="text-2xl font-bold text-gray-400 line-through mb-2">월 300만원</div>
                                <div className="text-red-500 font-bold text-sm">
                                    두루누리 지원 불가<br />
                                    (270만원 초과)
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex items-center justify-center text-white/50">
                                <ChevronRight className="w-10 h-10" />
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white p-6 rounded-2xl text-center border-4 border-yellow-400 shadow-2xl transform scale-105">
                                <div className="text-sm text-indigo-600 font-bold mb-2">STEP 2</div>
                                <div className="font-bold text-lg mb-4">비과세 최대 적용</div>
                                <div className="space-y-1 mb-4">
                                    <div className="text-2xl font-bold text-indigo-900">월 250만원</div>
                                    <div className="text-xs text-gray-500">(과세 소득 기준)</div>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-3">
                                    <div className="text-indigo-700 font-bold text-sm mb-1">두루누리 80% 지원!</div>
                                    <div className="text-xs text-gray-600">국민연금/고용보험 대폭 감소</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-white/10 p-6 rounded-2xl border border-white/20 text-center">
                            <h4 className="text-xl font-bold mb-4">💰 연간 절감 효과 시뮬레이션</h4>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-lg">
                                <span>직원 부담금 절감</span>
                                <span className="hidden sm:inline">+</span>
                                <span>두루누리 지원금</span>
                                <span className="hidden sm:inline">+</span>
                                <span>회사 부담금 절감</span>
                                <span className="hidden sm:inline">=</span>
                                <span className="text-3xl font-bold text-yellow-400">연 288만원 절감</span>
                            </div>
                            <p className="text-indigo-200 text-sm mt-4">
                                * 직원 1인당 기준 (월 급여 300만원 가정 시)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: The Solution - Strategic Contract (Image 2) */}
            <section className="bg-indigo-50 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-indigo-900 mb-4">사장님을 지키는 <span className="text-indigo-600">방어형 근로계약서</span></h2>
                    <p className="text-indigo-700 text-lg">법적 분쟁을 예방하는 강력한 조항들이 필요합니다.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            계약직 활용으로 부당해고 예방
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            수습 기간 설정 및 계약직 종료 조항을 통해 해고 관련 리스크를 원천 차단합니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-indigo-500" />
                            무단 퇴사 방지 조항
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            갑작스런 퇴사 시 임금 삭감 가능성 명시 및 손해배상 청구 근거를 마련합니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-indigo-500" />
                            징계 규정 명문화
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            무단 결근, 지각, 업무 태만 등에 대한 명확한 징계 규정이 있어야 실제 징계가 가능합니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-indigo-500" />
                            간편한 전자 서명
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            카카오톡으로 간편하게 서명하고 보관하여 분실 위험을 없앱니다.
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <img
                        src="/images/labor/labor_03.png"
                        alt="방어형 계약서 조항 예시"
                        className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => setSelectedImage("/images/labor/labor_03.png")}
                    />
                </div>
            </section>

            {/* Section 3: Comprehensive Wage System (Image 4) */}
            <section className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                        임금 체불 예방
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        "월급 다 줬는데 임금 체불이라니요?"<br />
                        <span className="text-blue-600">포괄임금제 설계</span>가 답입니다.
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        월급을 단순히 '기본급'으로만 명시하면, 나중에 연장/야간/휴일 수당을 별도로 청구받을 수 있습니다.
                        <br /><br />
                        <strong>임금 항목 재정비(임금 쪼개기)</strong>를 통해 기본급 안에 법정 수당을 미리 포함시켜야 합니다.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3">실제 피해 사례</h4>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                <span><strong>사례 1:</strong> 월급 400만원 지급했으나, 연장/야간 수당 미구분으로 2년치 수당 추가 지급 판결 (외국인 근로자 사례)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                <span><strong>사례 2:</strong> 시급 13,000원 지급했으나, 주휴수당 미포함 주장으로 2.5년치 주휴수당 3명분 추가 지급</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="/images/labor/labor_05.png"
                            alt="포괄임금제 설명"
                            className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => setSelectedImage("/images/labor/labor_05.png")}
                        />
                    </div>
                </div>
            </section>

            {/* Section 4: Real Proof (Image 1 & 3) */}
            <section className="bg-slate-50 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">실제 관리 사례</h2>
                    <p className="text-gray-600">대표자가 작성하기 쉬운 양식과 전자 서명 시스템으로 완벽하게 방어합니다.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="/images/labor/labor_02.png"
                            alt="실제 관리 사례 1"
                            className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => setSelectedImage("/images/labor/labor_02.png")}
                        />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="/images/labor/labor_04.png"
                            alt="실제 관리 사례 2"
                            className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => setSelectedImage("/images/labor/labor_04.png")}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">이제 노무 리스크에서 해방되세요</h2>
                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                    복잡한 법적 문제는 전문가에게 맡기고, 사장님은 사업의 성장에만 집중하실 수 있도록 돕겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://yslabor.kr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors duration-200 text-lg flex items-center justify-center gap-2"
                    >
                        무료 노무 상담 신청하기
                        <ChevronRight className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.goyong.co.kr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-900 transition-colors duration-200 text-lg flex items-center justify-center gap-2 border border-indigo-400/30"
                    >
                        지원금 찾기!
                        <ChevronRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
}

// ----------------------------------------------------------------------
// 2. Comprehensive Wage Calculator
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
