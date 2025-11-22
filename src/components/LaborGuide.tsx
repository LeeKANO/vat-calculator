import React from 'react';
import { AlertCircle, CheckCircle2, Shield, TrendingUp, Users, Clock, FileText, Scale, Phone } from 'lucide-react';

export default function LaborGuide() {
    return (
        <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-500">

            {/* HERO Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-8 sm:p-12 text-center shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-blue-200 uppercase bg-blue-800/50 rounded-full border border-blue-400/30 backdrop-blur-sm">
                        2025년 핵심 경영 가이드
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight break-keep">
                        "2025년, 노무 문제는<br className="hidden sm:block" /> <span className="text-blue-400">모르면 바로 리스크</span>가 됩니다."
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 font-medium leading-relaxed break-keep">
                        사장님의 시간을 빼앗는 노무 리스크,<br className="sm:hidden" /> 지금부터 제대로 관리해야 합니다.
                    </p>
                </div>
            </section>

            {/* Sub Hero Section */}
            <section className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border-l-4 border-indigo-500">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <Scale className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 break-keep">
                        직원은 한두 명이어도 <span className="text-indigo-600">법적 기준은 대기업과 동일</span>하게 적용됩니다.
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed break-keep">
                        작은 실수 한 번만으로도 <span className="font-semibold text-red-500">민원, 과태료, 추징</span>이 발생할 수 있습니다.
                    </p>
                </div>
            </section>

            {/* Section 1: 2025 Labor Trends */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        2025년 노무 트렌드 이슈 요약
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">2025년 소상공인 사업장이 직면한 핵심 노무 이슈</p>
                </div>
                <div className="p-6 sm:p-8">
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {[
                            "최저임금 10,030원 적용으로 임금 계산 복잡성 증가",
                            "주 52시간제 관리 미흡 단속 강화",
                            "포괄임금제 규제 강화로 시급과 수당 체계 재정비 필수",
                            "연차 및 주휴수당 분쟁 지속 증가",
                            "근로계약서 미작성 단속 상시화, 건당 최대 500만원 과태료",
                            "직장내 괴롭힘 및 성희롱 예방교육 의무화",
                            "퇴직금 분쟁 급증, 단시간 근로자까지 확대 적용"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200">
                                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-gray-700 font-medium text-sm sm:text-base break-keep">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-right text-xs text-gray-400">
                        참고: 관련 뉴스 자료 [1], [2]
                    </div>
                </div>
            </section>

            {/* Section 2: Why use a Labor Attorney */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6 text-orange-500" />
                        사장님들이 실제로 겪는 고민
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "직원 수는 적은데 민원과 분쟁은 왜 자꾸 생기는가",
                            "법이 너무 자주 바뀌어 무엇이 맞는지 모르겠다",
                            "직원과 대화할 때 신고를 걱정해야 할 만큼 불안하다"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5 shrink-0"></div>
                                <span className="text-gray-600 break-keep">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-slate-800 rounded-2xl p-8 shadow-lg text-white flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-orange-300">핵심 결론</h3>
                    <div className="space-y-4">
                        <p className="text-lg font-medium leading-relaxed">
                            "노무 관리는 감이 아니라 <br /><span className="text-2xl font-bold text-white">법 기준</span>입니다."
                        </p>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            전문가의 세팅 없이 자체적으로 처리하면 높은 확률로 분쟁과 민원으로 이어집니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Risks */}
            <section className="bg-red-50 rounded-2xl p-8 sm:p-10 border border-red-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-red-900 mb-2">노무 관리 미흡 시 발생하는 문제점</h2>
                    <p className="text-red-700">사장님이 가장 많이 겪는 대표적인 리스크</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[
                        { title: "임금체불 신고", desc: "평균 700만 원 ~ 2,000만 원 추징" },
                        { title: "근로계약서 미작성", desc: "건당 500만 원 과태료" },
                        { title: "연차/주휴수당 미정리", desc: "역산 지급과 가산금 발생" },
                        { title: "퇴직금 분쟁", desc: "평균 350만 원 ~ 1,200만 원 지급 명령" },
                        { title: "노동청 출석 요구", desc: "본업 중단 및 스트레스 증가" },
                        { title: "감정싸움의 신고화", desc: "사업장 이미지 타격" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-400">
                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-red-600 text-sm font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/60 rounded-xl p-6 text-center">
                    <p className="text-red-900 font-medium mb-2">
                        "사장님의 의도와 상관없이 법적 판단은 <span className="font-bold underline decoration-red-400 decoration-2 underline-offset-2">결과 중심</span>입니다."
                    </p>
                    <p className="text-red-800 text-sm">작은 오해가 바로 민원으로 이어질 수 있습니다.</p>
                </div>
            </section>

            {/* Section 4: Solutions */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">해결방안 제시</h2>
                    <p className="text-indigo-100 text-lg">노무관리를 받으면 무엇이 달라질까요?</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Benefit 1 */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="bg-indigo-50 p-4 rounded-full shrink-0">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">정기 노무관리로 리스크 최소 90% 차단</h3>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {[
                                    "근로계약서, 임금체계, 근로시간 기준 통합 정비",
                                    "연차 및 주휴 기준 재정리",
                                    "퇴직금 계산 기준 자동 설정",
                                    "직원과의 갈등 및 분쟁 즉시 대응",
                                    "노동청 사건 발생 시 근거 자료와 대응 체계 마련"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* Benefit 2 */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="bg-indigo-50 p-4 rounded-full shrink-0">
                            <FileText className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">업종별 맞춤 관리 제공</h3>
                            <p className="text-gray-600 mb-3">식당, 카페, 편의점, 학원, 도소매 등 업종 특성에 맞춘 노무 체크리스트 제공</p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100"></div>

                    {/* Benefit 3 */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="bg-indigo-50 p-4 rounded-full shrink-0">
                            <Phone className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">노무 즉시 대응 시스템 구축</h3>
                            <p className="text-gray-600 mb-2">직원과 갈등 발생 시 전문가가 대신 응대, 정리, 해결까지 진행</p>
                            <p className="text-indigo-600 font-semibold">사장님은 본업에만 집중할 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Service Introduction */}
            <section className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center text-white shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">서비스 소개</h2>
                <p className="text-slate-400 mb-10">우리는 사장님 사업장의 <span className="text-white font-bold">노무 방패</span> 역할을 합니다.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        "출퇴근프로그램 제공",
                        "근로계약서 세팅/재정비",
                        "임금/수당 체계 설계",
                        "4대보험 점검",
                        "퇴직금 계산/기준 확립",
                        "노동청 민원 대응",
                        "괴롭힘/성희롱 예방 컨설팅",
                        "업종별 리스크 진단 리포트"
                    ].map((item, idx) => (
                        <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
                            <div className="flex justify-center mb-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-200 break-keep">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Links */}
            <div className="text-center text-xs text-gray-400 mt-8 pb-4">
                <p>[1] 관련 뉴스 기사 링크 1</p>
                <p>[2] 관련 뉴스 기사 링크 2</p>
            </div>
        </div>
    );
}
