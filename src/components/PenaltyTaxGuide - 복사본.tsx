"use client";

import React, { useState } from 'react';
import { AlertTriangle, FileText, Calendar, CheckCircle2 } from 'lucide-react';

const PenaltyTaxGuide = () => {
    const [activeTab, setActiveTab] = useState<'vat' | 'income'>('vat');

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    가산세 안내 가이드
                </h1>
            </div>

            {/* Sub Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                    onClick={() => setActiveTab('vat')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'vat'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    부가가치세 가산세
                </button>
                <button
                    onClick={() => setActiveTab('income')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'income'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    종합소득세 가산세
                </button>
            </div>

            {activeTab === 'vat' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            주요 부가가치세 가산세율 (2024/2025)
                        </h3>
                        <div className="overflow-x-auto bg-white rounded-lg border border-blue-200">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-blue-900 uppercase bg-blue-100">
                                    <tr>
                                        <th className="px-4 py-3">구분</th>
                                        <th className="px-4 py-3">위반 유형</th>
                                        <th className="px-4 py-3">가산세율</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-100">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>신고 불성실</td>
                                        <td className="px-4 py-3">무신고 (일반)</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 20%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">과소신고 (일반)</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 10%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>부정 행위</td>
                                        <td className="px-4 py-3">부정 무신고</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 40%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">부정 과소신고</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 40%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900">납부 지연</td>
                                        <td className="px-4 py-3">미납 · 과소납부</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">미납세액 × 경과일수 × 0.022%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>세금계산서</td>
                                        <td className="px-4 py-3">미발급</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">공급가액 × 2%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">지연발급</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">공급가액 × 1%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            주요 종합소득세 가산세율 (2024/2025)
                        </h3>
                        <div className="overflow-x-auto bg-white rounded-lg border border-green-200">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-green-900 uppercase bg-green-100">
                                    <tr>
                                        <th className="px-4 py-3">구분</th>
                                        <th className="px-4 py-3">위반 유형</th>
                                        <th className="px-4 py-3">가산세율</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-green-100">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>신고 불성실</td>
                                        <td className="px-4 py-3">무신고 (일반)</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 20%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">과소신고 (일반)</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 10%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900" rowSpan={2}>부정 행위</td>
                                        <td className="px-4 py-3">부정 무신고</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 40%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">부정 과소신고</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">납부세액 × 40%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900">납부 지연</td>
                                        <td className="px-4 py-3">미납 · 과소납부</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">미납세액 × 경과일수 × 0.022%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900">지급명세서</td>
                                        <td className="px-4 py-3">미제출 · 불분명</td>
                                        <td className="px-4 py-3 text-red-600 font-bold">지급금액 × 1%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Common Reduction Section */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    가산세 감면 (기한 후 신고 시)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">1개월 이내</div>
                        <div className="text-2xl font-bold text-blue-600">50% 감면</div>
                        <div className="text-xs text-gray-400 mt-2">법정신고기한 경과 후</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">1~3개월 이내</div>
                        <div className="text-2xl font-bold text-blue-500">30% 감면</div>
                        <div className="text-xs text-gray-400 mt-2">법정신고기한 경과 후</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">3~6개월 이내</div>
                        <div className="text-2xl font-bold text-blue-400">20% 감면</div>
                        <div className="text-xs text-gray-400 mt-2">법정신고기한 경과 후</div>
                    </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 bg-white p-3 rounded-lg border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p>
                        세무조사 통지 전 수정신고 또는 기한 후 신고를 하는 경우에만 감면이 적용됩니다.
                        납부지연 가산세는 감면 대상에서 제외됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PenaltyTaxGuide;
