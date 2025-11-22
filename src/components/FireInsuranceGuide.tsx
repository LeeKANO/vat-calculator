"use client";

import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert, Flame, Building, FileText } from 'lucide-react';

const FireInsuranceGuide = () => {
    return (
        <div className="w-full space-y-8">
            {/* 1. Headline Section */}
            <section className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold mb-4">
                            <Flame className="w-4 h-4" />
                            <span>사업자 필수 리스크 관리</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 break-keep">
                            “사장님, ‘설마’ 했던 전기 합선,<br className="hidden md:block" />
                            <span className="text-red-600">이웃 가게 피해 배상</span>까지 책임지시겠습니까?”
                        </h2>
                        <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed break-keep">
                            화재는 내 사업장의 자산만 태우는 것이 아닙니다.<br />
                            대법원 판례에 따르면, 임차한 상가에서 전기배선 관리 소홀로 불이 나 이웃 점포에 피해를 주면
                            <span className="bg-yellow-100 px-1 font-bold text-gray-900">임차인이 손해배상 책임의 70%</span>를 져야 할 수도 있습니다 <a href="https://casenote.kr/%EB%8C%80%EB%B2%95%EC%9B%90/99%EB%8B%A464384" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs align-top">[1]</a>.
                        </p>
                        <div className="bg-white bg-opacity-60 p-4 rounded-lg border border-orange-200 text-sm text-gray-600">
                            <p>CEO 포털이 제안하는 화재보험은 단순한 비용이 아니라, 예상치 못한 법적 배상 책임으로부터 사장님을 지키는 가장 강력한 방어벽입니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Why Join Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <ShieldAlert className="w-7 h-7 text-red-600" />
                    사업자가 화재보험에 꼭 가입해야 하는 이유
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Reason 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">1. “내 건물도 아닌데?” 임차인도 법적 배상 책임이 있습니다.</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            많은 사장님들이 ‘건물주가 화재보험을 들었으니 괜찮다’고 생각합니다. 하지만 판례는 다릅니다.
                            임차 건물의 전기배선 이상으로 화재 발생 시, 임차인의 관리 의무 소홀이 인정되면 임대인 및 이웃 점포에 대한 손해배상 책임이 발생합니다 <a href="https://www.lawtimes.co.kr/news/161744" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs align-top">[2]</a>.
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-500">
                            * 실제 판결에서 최초 발화 지점 상가 임차인에게 70%의 책임을 물은 사례 존재
                        </div>
                    </div>

                    {/* Reason 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">2. 화재 원인의 절반은 ‘통제 불가능’한 전기 문제입니다.</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            사장님이 아무리 조심해도, 벽 속의 낡은 배선이나 야간의 누전은 막을 수 없습니다.
                            음식점, 카페, 공장 등 전력 사용량이 많은 곳은 위험도가 더 높습니다.
                            화재보험은 이러한 ‘불가항력적 사고’로 인한 영업 중단 손실까지 보장합니다.
                        </p>
                    </div>

                    {/* Reason 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">3. 복구 기간 동안의 ‘매출 0원’을 버틸 수 있습니까?</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            화재가 발생하면 시설 복구비용뿐만 아니라, 복구 기간 동안의 고정비(월세, 인건비)와 영업 이익이 모두 사라집니다.
                        </p>
                        <div className="font-bold text-blue-600 text-sm">
                            보험 가입 시: 시설 복구비 + 집기비품비 + 영업중단 손실까지 보전 가능
                        </div>
                    </div>

                    {/* Reason 4 (Table) */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">4. 사고 후 실제 손실 예시 (CEO 포털 데이터)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="p-2 rounded-tl-lg">구분</th>
                                        <th className="p-2">피해 규모</th>
                                        <th className="p-2">영업중단 손실</th>
                                        <th className="p-2 rounded-tr-lg">총 피해액</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-2 font-medium">A 식당</td>
                                        <td className="p-2">3,200만원</td>
                                        <td className="p-2 text-red-600">1,800만원</td>
                                        <td className="p-2 font-bold">5,000만원</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium">B 카페</td>
                                        <td className="p-2">2,700만원</td>
                                        <td className="p-2 text-red-600">1,200만원</td>
                                        <td className="p-2 font-bold">3,900만원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-3 text-xs text-center font-bold text-gray-500">
                            ➡ 월 몇 만 원의 보험료로 수천만 원의 리스크를 헷지(Hedge)하세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Checklist Section */}
            <section className="bg-indigo-50 rounded-2xl p-6 sm:p-10">
                <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                    <FileText className="w-7 h-7" />
                    사업자 화재보험 체크리스트
                </h3>
                <p className="text-indigo-700 mb-6">CEO 포털에서 제안하는 가입 전 필수 체크리스트입니다.</p>

                <div className="space-y-6">
                    {/* Checklist Group 1 */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg text-indigo-800 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> 배상 책임 특약 확인 (가장 중요!)
                        </h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span><span className="font-bold">화재배상책임:</span> 타인의 신체/재산 피해 보장 여부</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span><span className="font-bold">임차자배상책임:</span> 임차한 건물이 탔을 때 건물주에게 배상하는 비용</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span><span className="font-bold">시설소유관리자배상책임:</span> 시설 결함으로 고객이 다쳤을 때 보장</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Checklist Group 2 */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <h4 className="font-bold text-lg text-indigo-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> 내 자산 가치 산정
                            </h4>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span><span className="font-bold">시설/인테리어:</span> 초기 투자 비용이 아닌, 현재 가치 고려</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span><span className="font-bold">재고자산:</span> 창고나 매장에 쌓여있는 물품의 평균 가액</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span><span className="font-bold">집기비품:</span> 커피머신, PC 등 고가 장비 목록화</span>
                                </li>
                            </ul>
                        </div>

                        {/* Checklist Group 3 */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <h4 className="font-bold text-lg text-indigo-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> 틈새 위험 보장
                            </h4>
                            <ul className="space-y-2 text-gray-700 text-sm">
                                <li className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span><span className="font-bold">점포휴업손해:</span> 복구 기간 동안의 매출 손실 보장 여부</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                    <span><span className="font-bold">법률비용손해:</span> 화재 관련 소송 발생 시 변호사 비용 등</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FAQ Section */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <HelpCircle className="w-7 h-7 text-green-600" />
                    FAQ (사장님이 자주 묻는 질문)
                </h3>

                <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                            <span className="text-green-600">Q.</span> 건물주가 화재보험을 들었다고 하던데요?
                        </div>
                        <div className="text-gray-700 text-sm pl-6 border-l-2 border-green-200">
                            <span className="font-bold text-green-700">A.</span> 건물주의 보험은 ‘건물’만 보장합니다. 사장님의 인테리어, 집기, 상품, 그리고 사장님의 과실로 인한 이웃 점포 피해는 건물주 보험으로 해결되지 않습니다. 임차인만의 보험이 반드시 필요합니다.
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                            <span className="text-green-600">Q.</span> 작은 평수인데 보험료가 비쌀까요?
                        </div>
                        <div className="text-gray-700 text-sm pl-6 border-l-2 border-green-200">
                            <span className="font-bold text-green-700">A.</span> 아닙니다. 업종과 면적에 따라 다르지만, 일반적인 소규모 매장은 월 1~3만 원대로 가입 가능한 상품이 많습니다. 커피 한 잔 값이면 수억 원의 배상 책임을 막을 수 있습니다.
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                            <span className="text-green-600">Q.</span> 예전에 가입한 보험이 있는데 괜찮을까요?
                        </div>
                        <div className="text-gray-700 text-sm pl-6 border-l-2 border-green-200">
                            <span className="font-bold text-green-700">A.</span> 3년 전과 비교해 인테리어를 새로 했거나, 고가의 장비를 들여놨다면 <span className="font-bold">‘목적물 가액’</span>을 증액해야 합니다. 현재 자산 가치에 맞게 리모델링하는 것을 추천합니다.
                        </div>
                    </div>
                </div>
            </section>

            {/* References Section */}
            <section className="border-t border-gray-200 pt-6 mt-8">
                <h4 className="text-sm font-bold text-gray-500 mb-3">참고 문헌 및 판례</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                    <li>
                        <a href="https://casenote.kr/%EB%8C%80%EB%B2%95%EC%9B%90/99%EB%8B%A464384" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">
                            [1] 대법원 2000. 7. 4. 선고 99다64384 판결 (임차인의 배상책임 관련)
                        </a>
                    </li>
                    <li>
                        <a href="https://www.lawtimes.co.kr/news/161744" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">
                            [2] 법률신문: 전기배선 관리 잘못으로 화재… 이웃 점포 피해 (2020.05.28)
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default FireInsuranceGuide;
