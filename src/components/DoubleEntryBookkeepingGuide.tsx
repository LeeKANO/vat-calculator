import React from 'react';
import { TrendingUp, Shield, Building2, Calculator, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, XCircle, Coins, Clock, Search, AlertTriangle, Sparkles, ExternalLink } from 'lucide-react';

const DoubleEntryBookkeepingGuide = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-12">
            {/* Header Section */}
            <div className="text-center space-y-4 pt-8">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        복식부기
                    </span>{' '}
                    도입 효과
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    단순한 세금 신고를 넘어, 사업의 성장을 위한 필수적인 선택입니다.
                </p>
            </div>

            {/* Why Simple Bookkeeping Subjects Should Choose Double-Entry Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">
                    <span className="text-blue-600">간편장부 대상자</span>도 복식부기를 해야 하는 이유
                </h3>

                <div className="space-y-4 relative z-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                            <TrendingUp className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">세금이 20% 줄어듭니다</h4>
                            <p className="text-gray-600 text-sm">
                                간편장부 대상자가 복식부기로 신고하면 <strong>기장세액공제</strong>를 통해 산출세액의 20%를 공제받습니다. (최대 100만 원)
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500 flex-shrink-0 md:w-64">
                            예) 산출세액 500만 원 <br />
                            → <span className="text-blue-600 font-bold">100만 원 공제</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-indigo-100 p-3 rounded-xl flex-shrink-0">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">적자도 자산이 됩니다</h4>
                            <p className="text-gray-600 text-sm">
                                간편장부는 적자가 나도 '소득 0원'으로 끝나지만, 복식부기는 적자를 <strong>이월결손금</strong>으로 기록하여 향후 15년간 이익에서 뺄 수 있습니다.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500 flex-shrink-0 md:w-64">
                            예) 올해 -3,000만 원 적자 <br />
                            → <span className="text-indigo-600 font-bold">내년 세금 0원</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0">
                            <Coins className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">정부지원금 받기 수월</h4>
                            <p className="text-gray-600 text-sm">
                                대부분의 정책자금이나 정부지원금은 <strong>표준재무제표</strong>를 요구합니다. 복식부기를 해야만 재무상태표와 손익계산서가 발급되어 자금 조달이 유리해집니다.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500 flex-shrink-0 md:w-64">
                            <span className="text-emerald-600 font-bold">대출/지원금 심사 필수 서류</span> <br />
                            확보 가능
                        </div>
                    </div>
                </div>
            </div>



            {/* Persuasive Narrative Section */}
            <div className="space-y-12 py-8">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        사장님, <span className="text-red-600">"매출도 적은데 무슨 세무사야"</span>라고 생각하셨나요?
                    </h3>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        지금 아낀 기장료 월 10만 원이, 3년 뒤 <strong className="text-red-600 bg-red-50 px-1 rounded">'인테리어 비용 불인정'</strong>과 <strong className="text-red-600 bg-red-50 px-1 rounded">'세금 폭탄'</strong>으로 돌아옵니다.<br />
                        대박 난 식당들이 오픈 첫날부터 '장부'를 챙기는 진짜 이유를 알려드립니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-gray-400 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Clock className="w-24 h-24 text-gray-900" />
                        </div>
                        <div className="relative z-10">

                            <h4 className="text-xl font-bold text-gray-900 mb-4">"장사하기도 바빠 죽겠는데..."</h4>
                            <div className="space-y-3 text-gray-600">
                                <p className="italic border-l-2 border-gray-300 pl-4 py-1 bg-gray-50 rounded-r">
                                    "재료 손질하고 서빙하기도 바쁜데, 영수증 챙길 시간이 어디 있나요?"
                                </p>
                                <p>
                                    오픈 초기, 사장님의 머릿속은 온통 '신메뉴 개발'과 '단골 확보' 뿐입니다. 배달 앱 수수료 나가고, 알바비 주고 나면 통장에 남는 돈은 쥐꼬리만 하죠.
                                </p>
                                <p>
                                    "매출도 얼마 안 되는데 그냥 내가 홈택스로 대충 신고하지 뭐." 많은 사장님들이 비용을 아끼려고 세무사 없이 혼자 신고하거나, 추계신고(대략적인 신고)를 합니다. 당장은 월 10만 원이 굳으니 이득인 것 같죠? <strong className="text-red-600">하지만 이건 가게 기둥뿌리를 갉아먹는 선택입니다.</strong>
                                </p>
                                <div className="pt-2">
                                    <a href="https://www.taxwatch.co.kr/article/tax/2019/07/09/0017" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" /> 관련 기사: 세금 아끼려다 세금 폭탄 맞는다?
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-400 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Search className="w-24 h-24 text-orange-600" />
                        </div>
                        <div className="relative z-10">

                            <h4 className="text-xl font-bold text-gray-900 mb-4">버려지는 돈들: "사장님이 쓰레기통에 버린 건 '영수증'이 아니라 '미래의 순이익'입니다."</h4>
                            <div className="space-y-4 text-gray-600">
                                <p>지금 기장을 안 해서 놓치고 있는 돈, 얼마나 큰지 아시나요?</p>
                                <ul className="space-y-3">
                                    <li className="bg-orange-50 p-3 rounded-lg">
                                        <strong className="text-orange-800 block mb-1">📉 사라지는 '인테리어 비용'</strong>
                                        오픈할 때 인테리어와 주방 설비로 1억 원 쓰셨죠? 기장을 해서 이 적자를 장부에 남겨두면, 나중에 이익이 났을 때 <strong className="text-orange-700">세금을 '0원'</strong>으로 만들 수 있습니다(이월결손금). 기장을 안 하면 국세청은 사장님이 1억 원을 썼는지 모릅니다. 1억 원짜리 세금 할인 쿠폰을 그냥 날리는 셈입니다.
                                        <div className="mt-2 flex gap-2">
                                            <a href="https://www.save-tax.co.kr/blog/%EC%82%AC%EC%97%85-%EC%B4%88%EA%B8%B0-%EC%A0%81%EC%9E%90%EB%B6%80%ED%84%B0-%EC%84%B8%EB%AC%B4-%EA%B8%B0%EC%9E%A5%ED%95%B4%EC%95%BC-%EC%9D%B4%EB%93%9D%EC%9D%B8-%EC%9D%B4%EC%9C%A0-%EC%9D%B4" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                                <ExternalLink className="w-3 h-3" /> 사업 초기 적자부터 기장해야 하는 이유
                                            </a>
                                        </div>
                                    </li>
                                    <li className="bg-orange-50 p-3 rounded-lg">
                                        <strong className="text-orange-800 block mb-1">🥬 면세 재료비 공제(의제매입세액) 누락</strong>
                                        쌀, 야채, 고기 같은 면세 물품을 사도 계산서만 잘 챙기면 부가세를 깎아줍니다. 이걸 몰라서 못 챙기는 사장님이 태반입니다. 1년이면 수백만 원 차이가 납니다.
                                        <div className="mt-2 flex gap-2">
                                            <a href="https://help.jobis.co/hc/ko/articles/360006673893-%EC%9D%98%EC%A0%9C%EB%A7%A4%EC%9E%85%EC%84%B8%EC%95%A1%EA%B3%B5%EC%A0%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                                <ExternalLink className="w-3 h-3" /> 의제매입세액공제 알아보기
                                            </a>
                                        </div>
                                    </li>
                                    <li className="bg-orange-50 p-3 rounded-lg">
                                        <strong className="text-orange-800 block mb-1">⚠️ 알바비 신고의 함정</strong>
                                        "잠깐 일하는 거라 신고 안 해도 되겠지" 하고 현금으로 주셨나요? 나중에 그 알바생이 소득 신고를 하거나 실업급여를 신청하면, 가산세 폭탄은 물론 4대 보험료까지 한꺼번에 토해내야 합니다.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-24 h-24 text-red-600" />
                        </div>
                        <div className="relative z-10">

                            <h4 className="text-xl font-bold text-gray-900 mb-4">3년 뒤 찾아올 위기: "맛집으로 소문나는 순간, 국세청도 사장님을 지켜봅니다."</h4>
                            <div className="space-y-4 text-gray-600">
                                <p>3년 뒤, 가게가 대박 났다고 상상해 봅시다.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-red-50 p-4 rounded-xl text-center">
                                        <div className="text-red-600 font-bold mb-2">📩 세무조사 통지서</div>
                                        <p className="text-sm">
                                            "현금 매출이 너무 적습니다."<br />
                                            국세청 시스템이 동종 업계 평균과 비교해 이상 징후를 포착하면 과거 5년 치 장부를 다 뒤집니다.
                                        </p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl text-center">
                                        <div className="text-red-600 font-bold mb-2">🏦 2호점 대출 거절</div>
                                        <p className="text-sm">
                                            "소득 신고된 게 너무 적네요."<br />
                                            세금 아끼려고 소득을 낮게 신고했던 게 부메랑이 되어 사업 확장의 길을 막아버립니다.
                                        </p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-xl text-center">
                                        <div className="text-red-600 font-bold mb-2">💸 인테리어 비용 불인정</div>
                                        <p className="text-sm">
                                            "증빙 없으면 인정 안 됩니다."<br />
                                            부가세 아끼려고 현금으로 준 인테리어 비용, 나중에 경비 인정 못 받아 소득세 폭탄을 맞습니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-2 text-center">
                                    <a href="https://www.heumtax.com/contents/posts/self-employed-tax-audit" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 inline-flex items-center gap-1">
                                        <ExternalLink className="w-3 h-3" /> 자영업자 세무조사 사례 보기
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Sparkles className="w-32 h-32 text-white" />
                        </div>
                        <div className="relative z-10">

                            <h4 className="text-2xl font-bold mb-6">든든한 파트너: "세무 기장, 비용이 아니라 가장 남는 '장사 밑천'입니다."</h4>

                            <p className="text-blue-100 mb-6 text-lg">
                                세무 기장은 단순한 장부 정리가 아닙니다. 사장님이 안심하고 <strong className="text-white border-b-2 border-yellow-400">'맛'</strong>에만 집중할 수 있게 해주는 <strong className="text-white border-b-2 border-yellow-400">'가게 지킴이'</strong>입니다.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <h5 className="font-bold text-yellow-300 mb-2">🛡️ 초기 적자의 자산화</h5>
                                    <p className="text-sm text-blue-50">1억 원의 인테리어 비용과 초기 손실을 1원까지 기록해, 향후 15년간 세금을 막아주는 방패(이월결손금)로 만들어 드립니다.</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <h5 className="font-bold text-yellow-300 mb-2">💰 최대 100만 원 환급</h5>
                                    <p className="text-sm text-blue-50">복식부기로 장부를 쓰면 '기장세액공제'로 납부할 세금의 20%를 깎아드립니다. 기장료의 대부분을 돌려받는 셈입니다.</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <h5 className="font-bold text-yellow-300 mb-2">🏦 은행 프리패스 장부</h5>
                                    <p className="text-sm text-blue-50">언제든 은행에 제출할 수 있는 깔끔한 재무제표를 만들어, 2호점 확장과 프랜차이즈화의 자금줄을 뚫어드립니다.</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                    <h5 className="font-bold text-yellow-300 mb-2">🔎 꼼꼼한 절세 챙기기</h5>
                                    <p className="text-sm text-blue-50">의제매입세액공제, 배달 라이더 인건비, 카드 매출 세액공제까지 놓치기 쉬운 혜택을 알아서 챙겨드립니다.</p>
                                </div>
                            </div>

                            <div className="mt-8 text-center bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <p className="text-lg font-medium">
                                    "사장님은 <span className="text-yellow-300 font-bold">최고의 요리</span>를 만들어주세요.<br className="md:hidden" /> 복잡한 <span className="text-yellow-300 font-bold">세금</span>은 전문가가 알아서 수익으로 바꿔드리겠습니다."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Mandatory Subjects Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    복식부기 의무 대상자
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="text-center mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">도소매업 등</span>
                        </div>
                        <h4 className="text-xl font-bold text-center text-gray-800 mb-2">3억 원 이상</h4>
                        <p className="text-sm text-gray-500 text-center">직전 연도 수입금액 기준</p>
                        <p className="text-xs text-gray-400 text-center mt-2">농업, 임업, 어업, 광업, 도소매업, 부동산매매업 등</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="text-center mb-4">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">제조/음식업 등</span>
                        </div>
                        <h4 className="text-xl font-bold text-center text-gray-800 mb-2">1.5억 원 이상</h4>
                        <p className="text-sm text-gray-500 text-center">직전 연도 수입금액 기준</p>
                        <p className="text-xs text-gray-400 text-center mt-2">제조업, 숙박/음식업, 건설업, 운수업, 금융/보험업 등</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="text-center mb-4">
                            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">서비스업 등</span>
                        </div>
                        <h4 className="text-xl font-bold text-center text-gray-800 mb-2">7,500만 원 이상</h4>
                        <p className="text-sm text-gray-500 text-center">직전 연도 수입금액 기준</p>
                        <p className="text-xs text-gray-400 text-center mt-2">부동산임대업, 서비스업, 전문과학기술업, 교육서비스업 등</p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-red-800">전문직 사업자는 수입금액과 관계없이 무조건 복식부기 의무 대상입니다.</p>
                        <p className="text-xs text-red-600 mt-1">의사, 수의사, 약사, 변호사, 심판변론인, 변리사, 법무사, 공인회계사, 세무사, 경영지도사, 기술지도사, 감정평가사, 손해사정사, 통관업, 기술사, 건축사, 도선사, 측량사 등</p>
                    </div>
                </div>
            </div>

            {/* Comparison Table Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">간편장부 vs 복식부기 비교</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">구분</th>
                                <th scope="col" className="px-6 py-3">간편장부</th>
                                <th scope="col" className="px-6 py-3 rounded-tr-lg bg-blue-50 text-blue-700">복식부기 (추천)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">작성 방식</th>
                                <td className="px-6 py-4">가계부처럼 수입/지출 내역만 기록</td>
                                <td className="px-6 py-4 bg-blue-50/30 font-medium text-blue-900">자산, 부채, 자본의 흐름까지 정밀 기록</td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">난이도</th>
                                <td className="px-6 py-4">비교적 쉬움 (직접 작성 가능)</td>
                                <td className="px-6 py-4 bg-blue-50/30 font-medium text-blue-900">어려움 (세무 전문가 도움 필요)</td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">세금 혜택</th>
                                <td className="px-6 py-4">특별한 공제 혜택 없음</td>
                                <td className="px-6 py-4 bg-blue-50/30 font-medium text-blue-900">기장세액공제 (20%, 최대 100만원)</td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">결손금 처리</th>
                                <td className="px-6 py-4">이월결손금 공제 불가 (추계신고 시)</td>
                                <td className="px-6 py-4 bg-blue-50/30 font-medium text-blue-900">15년간 이월결손금 공제 가능</td>
                            </tr>
                            <tr className="bg-white rounded-bl-lg rounded-br-lg hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">가산세 리스크</th>
                                <td className="px-6 py-4 rounded-bl-lg">의무자가 아닐 경우 없음</td>
                                <td className="px-6 py-4 bg-blue-50/30 rounded-br-lg font-medium text-blue-900">무신고가산세 20% (의무 위반 시)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Main Diagram Section (Existing) */}
            <div className="relative">
                {/* Central Node */}
                <div className="flex justify-center mb-12">
                    <div className="relative z-10 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-blue-500/30">
                        <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                            CORE
                        </div>
                        <div className="text-center">
                            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <Building2 className="w-8 h-8 text-blue-300" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">복식부기</h3>
                            <p className="text-blue-200 text-sm font-medium">사업 성장의 핵심 기반</p>
                        </div>
                    </div>
                </div>

                {/* Connecting Lines (Visual only, hidden on mobile) */}
                <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-1/2 -z-10">
                    <svg className="w-full h-full" viewBox="0 0 800 400">
                        <path d="M400,0 Q400,100 200,150" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 4" />
                        <path d="M400,0 Q400,100 600,150" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 4" />
                        <path d="M400,0 Q400,100 100,250" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 4" />
                        <path d="M400,0 Q400,100 700,250" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 4" />
                    </svg>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {/* Benefit 1: Tax Credit */}
                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    기장세액공제
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">세금 혜택</span>
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        <span className="font-semibold">최대 100만 원 공제</span>
                                    </div>
                                    <p className="text-sm text-gray-500 pl-6">
                                        산출세액의 20%를 공제받아 실질적인 세금 부담을 줄일 수 있습니다. 간편장부 대상자가 복식부기로 신고할 경우 적용됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefit 2: Carryover Deduction */}
                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-50 p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                <Shield className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    이월결손금 공제
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">리스크 방어</span>
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                        <span className="font-semibold">향후 15년간 세금 차감</span>
                                    </div>
                                    <p className="text-sm text-gray-500 pl-6">
                                        사업 초기나 어려운 시기에 발생한 적자(결손금)를 장부에 기록해두면, 나중에 이익이 났을 때 그만큼 세금에서 깎아줍니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefit 3: Credit Rating */}
                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-50 p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
                                <Building2 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    대외 신용도 상승
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">자금 조달</span>
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                        <span className="font-semibold">재무제표 증명 가능</span>
                                    </div>
                                    <p className="text-sm text-gray-500 pl-6">
                                        투명한 회계 처리가 입증된 재무제표는 은행 대출, 정부 지원금, 투자 유치 심사에서 강력한 신뢰 지표가 됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefit 4: Cost Recognition */}
                    <div className="group bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-50 p-3 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                <Calculator className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    정밀한 비용 인정
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">정밀 관리</span>
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span className="font-semibold">감가상각비·충당금 반영</span>
                                    </div>
                                    <p className="text-sm text-gray-500 pl-6">
                                        차량, 비품 등의 감가상각비나 퇴직급여충당금 등 실제 지출되지 않았더라도 비용으로 인정받을 수 있는 항목들을 꼼꼼히 챙길 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* FAQ Section */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 text-center">자주 묻는 질문 (FAQ)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-500" />
                            복식부기, 혼자서 할 수 있나요?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            이론적으로는 가능하지만, 회계 지식이 없으면 매우 어렵고 시간이 많이 소요됩니다. 오류 발생 시 가산세 위험이 있으므로 세무 전문가에게 맡기는 것이 효율적입니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-500" />
                            의무 대상자가 간편장부로 신고하면?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            복식부기 의무자가 간편장부로 신고하면 <strong>무신고로 간주</strong>되어 산출세액의 20%에 달하는 무신고가산세가 부과됩니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-500" />
                            간편장부 대상자도 복식부기를 하면 좋나요?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            네, 강력 추천합니다! 간편장부 대상자가 복식부기로 신고하면 <strong>기장세액공제 20%</strong> 혜택을 받을 수 있어 절세 효과가 큽니다.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-blue-500" />
                            기장료는 얼마나 드나요?
                        </h4>
                        <p className="text-gray-600 text-sm">
                            업종과 매출액, 직원 수에 따라 다르지만, 일반적으로 월 10~20만 원 선입니다. 절세액과 시간 절약을 고려하면 비용 대비 효과가 매우 높습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center shadow-xl">
                <h3 className="text-2xl font-bold mb-4">복식부기, 어렵게 생각하지 마세요</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    전문 세무사의 도움을 받으면 복잡한 장부 작성도 쉽고 정확하게 해결할 수 있습니다.
                    지금 바로 상담을 받아보세요.
                </p>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                    무료 상담 신청하기
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default DoubleEntryBookkeepingGuide;
