"use client";

import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Filter, DollarSign, Briefcase, Zap, Truck, RefreshCw, AlertCircle, Gift } from 'lucide-react';

// Simulated Database of 2025 Policy Funds
const POLICY_FUNDS_DB = [
    {
        id: 1,
        title: "일반경영안정자금",
        category: "loan", // loan, subsidy, growth, reentry
        amount: "최대 7천만원",
        target: "일반 소상공인",
        desc: "업력 1년 이상 소상공인을 위한 운전자금 융자 지원",
        link: "https://ols.semas.or.kr"
    },
    {
        id: 2,
        title: "배달·택배비 지원",
        category: "subsidy",
        amount: "최대 30만원",
        target: "연매출 1.04억원 미만",
        desc: "배달앱 및 택배 배송비를 지출하는 소상공인에게 현금성 지원 (2025 신규)",
        link: "https://소상공인배달택배비지원.kr"
    },
    {
        id: 3,
        title: "전기요금 특별지원",
        category: "subsidy",
        amount: "최대 25만원",
        target: "연매출 6천만원 이하",
        desc: "영세 소상공인의 전기요금 인상분에 대한 부담 경감 지원",
        link: "https://소상공인전기요금특별지원.kr"
    },
    {
        id: 4,
        title: "소공인 특화자금",
        category: "loan",
        amount: "최대 5억원",
        target: "제조업 소공인 (10인 미만)",
        desc: "기계·금속·의류 등 제조업 영위 소공인을 위한 시설 및 운전 자금",
        link: "https://ols.semas.or.kr"
    },
    {
        id: 5,
        title: "성장기반자금 (자동화설비)",
        category: "amount",
        amount: "최대 2억원",
        target: "스마트 공장/상점 도입기업",
        desc: "키오스크, 서빙로봇 등 스마트 설비를 도입하는 소상공인 전용 자금",
        link: "https://ols.semas.or.kr"
    },
    {
        id: 6,
        title: "저신용 소상공인 자금",
        category: "loan",
        amount: "최대 3천만원",
        target: "NCB 744점 이하",
        desc: "신용도가 낮아 은행 이용이 어려운 소상공인을 위한 정책자금",
        link: "https://ols.semas.or.kr"
    },
    {
        id: 7,
        title: "희망리턴패키지 (재기지원)",
        category: "reentry",
        amount: "최대 2천만원",
        target: "폐업 예정 또는 기폐업자",
        desc: "점포 철거비, 사업정리 컨설팅, 재취업/재창업 교육 및 사업화 자금 지원",
        link: "https://www.sbiz.or.kr/nhrp/main.do"
    },
    {
        id: 8,
        title: "강한 소상공인 성장지원",
        category: "growth",
        amount: "최대 1억원",
        target: "혁신 아이디어 보유자",
        desc: "기업가 정신과 창의적 아이템을 보유한 소상공인을 라이프스타일 혁신기업으로 육성",
        link: "https://www.sbiz24.kr"
    },
    {
        id: 9,
        title: "스마트상점 기술보급",
        category: "growth",
        amount: "최대 1천만원",
        target: "전 업종 소상공인",
        desc: "키오스크, 테이블오더 등 스마트 기술 도입 비용의 일부를 보조 (배리어프리 필수)",
        link: "https://www.sbiz.or.kr"
    },
    {
        id: 10,
        title: "두루누리 사회보험료",
        category: "subsidy",
        amount: "보험료 80% 지원",
        target: "10인 미만, 월 270만원 미만",
        desc: "근로자의 고용보험 및 국민연금 보험료의 80%를 최대 36개월간 지원",
        link: "https://www.insurancesupport.or.kr"
    }
];

export default function PolicyFundsFinder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all"); // all, loan, subsidy, growth, reentry, live (new)
    const [liveNews, setLiveNews] = useState<{ title: string; link: string; desc: string; date: string; status?: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Filter Logic
    const filteredData = POLICY_FUNDS_DB.filter(item => {
        const matchesSearch = item.title.includes(searchTerm) || item.desc.includes(searchTerm) || item.target.includes(searchTerm);
        const matchesFilter = filter === "all" || item.category === filter;
        return matchesSearch && matchesFilter;
    });

    const handleExternalSearch = () => {
        window.open(`https://search.naver.com/search.naver?query=2025년 소상공인 ${searchTerm ? searchTerm : "정책자금"}`, '_blank');
    };

    const fetchLiveNews = async () => {
        setIsLoading(true);
        try {
            const query = searchTerm || "소상공인 정책자금";
            const res = await fetch(`/api/crawl?query=${encodeURIComponent(query)}`);
            const json = await res.json();
            if (json.success) {
                setLiveNews(json.data);
                setFilter('live'); // Switch to live view
            }
        } catch (error) {
            console.error("Live fetch failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg text-center">
                <h2 className="text-3xl font-extrabold mb-4">정책자금 & 지원금 통합 검색</h2>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                    2025년 최신 소상공인 정책자금과 지원사업을 한눈에 찾아보세요.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="사업명, 지원 내용, 키워드 검색 (예: 전기요금, 대출)"
                        className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-2xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchLiveNews()} // Allow Enter to trigger live search
                    />
                    <button
                        onClick={fetchLiveNews}
                        className="absolute inset-y-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg font-bold text-sm transition-colors flex items-center gap-1"
                    >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        기업마당 조회
                    </button>
                </div>
            </section>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                {[
                    { key: 'all', label: '전체', icon: RefreshCw },
                    { key: 'loan', label: '정책자금(대출)', icon: DollarSign },
                    { key: 'subsidy', label: '현금 지원금', icon: Gift },
                    { key: 'growth', label: '성장·스마트', icon: Zap },
                    { key: 'reentry', label: '폐업·재기', icon: RefreshCw },
                ].map((type) => (
                    <button
                        key={type.key}
                        onClick={() => setFilter(type.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all
                            ${filter === type.key
                                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                    </button>
                ))}
                {/* Live News Tab Button */}
                <button
                    onClick={() => setFilter('live')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all
                        ${filter === 'live'
                            ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200'
                            : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}
                >
                    <Briefcase className="w-4 h-4" />
                    기업마당 공고
                </button>
            </div>

            {/* LIVE DATA VIEW */}
            {filter === 'live' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            실시간 기업마당 지원사업 공고 ({liveNews.length}건)
                        </h3>
                        {liveNews.length === 0 && !isLoading && (
                            <span className="text-sm text-gray-500">검색 버튼을 눌러보세요.</span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-2" />
                            <p className="text-gray-500">기업마당 최신 공고를 불러오는 중입니다...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* List Header (Desktop) */}
                            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b border-gray-200 text-sm font-bold text-gray-600">
                                <div className="col-span-2 text-center">진행상태</div>
                                <div className="col-span-6">공고명 / 소관부처</div>
                                <div className="col-span-2 text-center">등록일</div>
                                <div className="col-span-2 text-center">링크</div>
                            </div>

                            {/* List Items */}
                            <div className="divide-y divide-gray-100">
                                {liveNews.map((news, idx) => (
                                    <div key={idx} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-blue-50 transition-colors group">
                                        {/* Mobile: Header Row */}
                                        <div className="flex justify-between items-center mb-2 md:mb-0 md:col-span-2 md:justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${news.status?.includes('마감')
                                                    ? 'bg-gray-100 text-gray-500'
                                                    : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {news.status || '접수중'}
                                            </span>
                                            <span className="text-gray-400 text-xs md:hidden">{news.date}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="mb-3 md:mb-0 md:col-span-6">
                                            <a href={news.link} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 group-hover:text-blue-600 block mb-1">
                                                {news.title}
                                            </a>
                                            <p className="text-xs text-gray-500">{news.desc}</p>
                                        </div>

                                        {/* Desktop: Date */}
                                        <div className="hidden md:block md:col-span-2 text-center text-sm text-gray-500">
                                            {news.date}
                                        </div>

                                        {/* Action */}
                                        <div className="md:col-span-2 text-center">
                                            <a
                                                href={news.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
                                            >
                                                공고보기 <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* STATIC DATA VIEW (Only if filter is NOT live) */}
            {filter !== 'live' && (
                <div className="grid md:grid-cols-2 gap-4">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold
                                    ${item.category === 'loan' ? 'bg-blue-100 text-blue-700' :
                                            item.category === 'subsidy' ? 'bg-emerald-100 text-emerald-700' :
                                                item.category === 'reentry' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-purple-100 text-purple-700'}`}>
                                        {item.category === 'loan' ? '융자' :
                                            item.category === 'subsidy' ? '지원금' :
                                                item.category === 'reentry' ? '재기지원' : '성장지원'}
                                    </span>
                                    <span className="text-gray-400 text-xs">2025년</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                                    {item.desc}
                                </p>

                                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between mb-4">
                                    <div className="text-xs text-gray-500">
                                        <span className="block mb-1 font-bold">지원 대상</span>
                                        {item.target}
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-gray-500 mb-1 font-bold">지원 규모</span>
                                        <span className="text-blue-600 font-bold">{item.amount}</span>
                                    </div>
                                </div>

                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-bold text-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    자세히 보기 (신청)
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-500 mb-2">검색 결과가 없습니다.</h3>
                            <p className="text-gray-400 text-sm mb-4">해당하는 지원사업을 찾지 못했습니다.</p>
                            <button
                                onClick={handleExternalSearch}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                            >
                                네이버에서 '{searchTerm}' 검색하기
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="text-center text-xs text-gray-400 mt-8">
                * 본 검색 결과는 소상공인시장진흥공단 및 정부 부처의 2025년 공고를 기반으로 제공됩니다.<br />
                정확한 요건은 반드시 개별 공고문을 확인하시기 바랍니다.
            </div>
        </div>
    );
}
