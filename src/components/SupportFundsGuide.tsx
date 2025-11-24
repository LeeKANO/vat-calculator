"use client";

import React from 'react';
import { Gift, DollarSign, Zap, Smartphone, RotateCcw, ExternalLink, HelpCircle } from 'lucide-react';

const SupportFundsGuide = () => {
    return (
        <div className="w-full space-y-8">
            {/* 1. Headline Section */}
            <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                            <Gift className="w-4 h-4" />
                            <span>2025년 소상공인 지원사업</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 break-keep">
                            2025년 소상공인 지원사업<br className="hidden md:block" />
                            <span className="text-emerald-600">총 8,170억 원 규모</span>
                        </h2>
                        <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed break-keep">
                            경영 부담 완화와 성장 촉진에 중점을 두고 있습니다.<br />
                            현금성 지원부터 정책자금, 디지털 전환, 폐업 지원까지 다양한 프로그램을 확인하세요.
                        </p>
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg border border-emerald-200 text-sm text-gray-600">
                            <p>CEO 포털에서 소상공인을 위한 2025년 필수 지원사업 정보를 정리했습니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Direct Support (Cash) */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-7 h-7 text-emerald-600" />
                    1. 경영 비용 직접 지원 (현금성)
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Delivery Support */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">배달·택배비 지원</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            연 매출 1억 400만 원 미만 소상공인에게 <span className="bg-emerald-100 px-1 font-bold">최대 30만 원</span> 지원
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-500">
                            * 2025년 신규 확대
                        </div>
                    </div>

                    {/* Electricity Support */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">전기요금 특별지원</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            연 매출 6,000만 원 이하 영세 사업자에게 <span className="bg-yellow-100 px-1 font-bold">최대 20~25만 원</span> 전기요금 감면
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-500">
                            * 공고 확인 필요
                        </div>
                    </div>

                    {/* Social Insurance */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">두루누리 사회보험료</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            10인 미만 사업장, 월 보수 270만 원 미만 신규 가입자 대상 고용보험·국민연금 <span className="bg-blue-100 px-1 font-bold">80% 지원</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Policy Funds */}
            <section className="bg-blue-50 rounded-2xl p-6 sm:p-10">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <DollarSign className="w-7 h-7" />
                    2. 정책자금 (융자)
                </h3>
                <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">소상공인 정책자금</h4>
                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span><span className="font-bold">일반경영안정자금:</span> 운영 자금 지원</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span><span className="font-bold">희망플러스 자금:</span> 저신용자를 위한 특별 자금</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span><span className="font-bold">대환대출 프로그램:</span> 고금리 대출을 저금리로 전환</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 4. Digital Transformation */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Smartphone className="w-7 h-7 text-purple-600" />
                    3. 디지털 전환 및 성장 지원
                </h3>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">스마트상점 기술보급</h4>

                    <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h5 className="font-bold text-purple-800 flex items-center gap-2 mb-2">
                            <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full">2025년 최신 공지</span>
                            배리어프리 키오스크 도입 의무화
                        </h5>
                        <p className="text-sm text-purple-700 leading-relaxed mb-2">
                            2025년 1월 28일부터 키오스크 등 무인단말기 신규 설치 시 <span className="font-bold">배리어프리 기능 탑재가 의무화</span>됩니다. (바닥면적 50㎡ 미만 제외)
                        </p>
                        <p className="text-xs text-purple-600">
                            * 2025년 소상공인 모집: 2월 말 공고, 3월부터 신청 예정
                        </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        키오스크, 서빙로봇 등 스마트 기기 도입 시 공급가액의 일부 지원
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg inline-block">
                            <p className="font-bold text-purple-700 text-sm">
                                최대 500~1,000만 원 지원
                            </p>
                        </div>
                        <a
                            href="https://www.sbiz.or.kr/smst/bbs/view.do?bbsSn=5523&key=2111306039167&maxList=10&pageIndex=1&sc=&sw=&recordCountPerPage=10"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1"
                        >
                            <ExternalLink className="w-4 h-4" />
                            공지사항 자세히 보기
                        </a>
                    </div>
                </div>
            </section>

            {/* 5. Business Closure & Re-entry */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <RotateCcw className="w-7 h-7 text-orange-600" />
                    4. 폐업 및 재기 지원
                </h3>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">희망리턴패키지</h4>
                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><span className="font-bold">점포 철거비 지원:</span> 폐업 시 비용 부담 경감</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><span className="font-bold">재취업/재창업 교육:</span> 새로운 시작을 위한 교육 프로그램</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">•</span>
                            <span><span className="font-bold">사업화 자금:</span> 최대 2,000만 원 지원</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* 6. Application Links */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-10">
                <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                    <ExternalLink className="w-7 h-7" />
                    주요 신청 사이트 모음
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <a
                        href="https://www.sbiz24.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">소상공인 24</h4>
                            <p className="text-xs text-gray-500">통합 접수</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </a>

                    <a
                        href="https://ols.semas.or.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">소상공인정책자금</h4>
                            <p className="text-xs text-gray-500">대출</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </a>

                    <a
                        href="https://소상공인배달택배비지원.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">배달·택배비 지원</h4>
                            <p className="text-xs text-gray-500">전용 사이트</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </a>

                    <a
                        href="https://소상공인전기요금특별지원.kr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">전기요금 특별지원</h4>
                            <p className="text-xs text-gray-500">전용 사이트</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </a>
                </div>
            </section>

            {/* References Section */}
            <section className="border-t border-gray-200 pt-6 mt-8">
                <h4 className="text-sm font-bold text-gray-500 mb-3">참고 자료</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                    <li>
                        <a href="https://blog.fassto.ai/contents/ecommerssue/2025_sme_support" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">
                            [1] 2025년 소상공인 지원사업 - Fassto Blog
                        </a>
                    </li>
                    <li>
                        <a href="https://jbsos.or.kr/bbs/board.php?bo_table=s_sub04_01&wr_id=413&page=1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">
                            [2] 전라북도 소상공인지원센터
                        </a>
                    </li>
                    <li>
                        <a href="https://www.korea.kr/news/policyNewsView.do?newsId=148931184" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">
                            [3] 대한민국 정책브리핑
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default SupportFundsGuide;
