"use client";

import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const TaxSchedule = () => {
    return (
        <div className="max-w-5xl mx-auto mb-8">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">사업자 세무안내</h2>
                <p className="text-gray-600 mb-4">
                    사업자는 다음과 같은 기간에 신고를 진행해야 합니다.<br />
                    만약 해당 기간에 신고를 놓칠 경우, 무신고 가산세, 납부불성실 가산세가 있으며, 신고를 제대로 하지 않을 경우, 신고불성실 가산세가 붙게 됩니다.
                </p>
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg inline-block">
                    <AlertCircle className="w-4 h-4" />
                    <span>무신고 가산세: 납부세액의 20%, 납부불성실 가산세: 1년에 약 10%</span>
                </div>
            </div>

            {/* Timeline Image */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 overflow-hidden">
                <div className="relative w-full h-auto min-h-[300px] flex justify-center items-center bg-gray-50 rounded-lg p-4">
                    <Image
                        src="/tax_schedule_timeline.png"
                        alt="세무 일정 타임라인"
                        width={1000}
                        height={500}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Explanations */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-3">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">확정신고란?</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        과세기간(6개월) 전체에 대한 실적을 최종적으로 확정하여 신고하는 것입니다.
                        법인사업자와 개인사업자 모두 해당되며, 이미 신고한 예정신고 내용을 포함하여
                        최종적인 세액을 계산하고 정산하는 절차입니다.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-3">
                        <HelpCircle className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-bold text-gray-900">예정신고란?</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        확정신고 기간(6개월)의 중간에 미리 세금을 신고하고 납부하는 제도입니다.
                        국가의 조기 세수 확보와 사업자의 일시 납부 부담을 분산하기 위해 시행됩니다.
                        법인사업자는 의무적으로 신고해야 하며, 개인사업자는 원칙적으로 세무서에서 고지된 금액을 납부합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaxSchedule;
