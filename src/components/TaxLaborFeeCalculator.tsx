import React, { useState, useEffect } from 'react';
import { Calculator, Check, AlertCircle, TrendingDown, Edit2, FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const TaxLaborFeeCalculator = () => {
    const [revenue, setRevenue] = useState<number>(100000000); // Default 1억
    const [hasLabor, setHasLabor] = useState<boolean>(false);
    const [customRevenue, setCustomRevenue] = useState<string>('100000000');
    const [businessType, setBusinessType] = useState<'general' | 'service'>('general');

    // Standard Fee States (Editable)
    const [standardMonthlyInput, setStandardMonthlyInput] = useState<number>(100000);
    const [standardClosingInput, setStandardClosingInput] = useState<number>(300000);
    const [isStandardMonthlyEdited, setIsStandardMonthlyEdited] = useState<boolean>(false);
    const [isStandardClosingEdited, setIsStandardClosingEdited] = useState<boolean>(false);
    const [standardFilingInput, setStandardFilingInput] = useState<number>(0);
    const [isStandardFilingEdited, setIsStandardFilingEdited] = useState<boolean>(false);

    // Discounted Fee States (Editable)
    const [discountedMonthlyInput, setDiscountedMonthlyInput] = useState<number>(55000);
    const [isDiscountedMonthlyEdited, setIsDiscountedMonthlyEdited] = useState<boolean>(false);
    const [discountedFilingInput, setDiscountedFilingInput] = useState<number>(0);
    const [isDiscountedFilingEdited, setIsDiscountedFilingEdited] = useState<boolean>(false);

    // Reporting Agency States
    const [showReportingAgency, setShowReportingAgency] = useState<boolean>(false);

    // Proposal Accordion State
    const [isProposalOpen, setIsProposalOpen] = useState<boolean>(false);



    // Revenue options for dropdown
    const revenueOptions = [
        { label: '1억', value: 100000000 },
        { label: '2억', value: 200000000 },
        { label: '3억', value: 300000000 },
        { label: '4억', value: 400000000 },
        { label: '5억', value: 500000000 },
        { label: '6억', value: 600000000 },
        { label: '7억', value: 700000000 },
        { label: '8억', value: 800000000 },
        { label: '9억', value: 900000000 },
        { label: '10억', value: 1000000000 },
        { label: '직접입력', value: 0 },
    ];

    // Standard Monthly Fee Calculation (Individual)
    const calculateStandardMonthly = (rev: number) => {
        if (rev === 0) return 0;
        if (rev < 100000000) return 100000;
        if (rev < 300000000) return 120000;
        if (rev < 500000000) return 150000;
        if (rev < 1000000000) return 180000;
        if (rev < 2000000000) return 240000;
        if (rev < 3000000000) return 290000;
        if (rev < 4000000000) return 320000;
        if (rev < 5000000000) return 350000;
        if (rev < 7000000000) return 450000;
        if (rev < 10000000000) return 550000;
        return 750000; // Fallback
    };

    // Standard Closing Fee Calculation (Individual)
    const calculateStandardClosing = (rev: number) => {
        if (rev === 0) return 0;
        if (rev < 100000000) {
            return 300000 + (rev > 50000000 ? (rev - 50000000) * (25 / 10000) : 0);
        }
        if (rev < 300000000) {
            return 425000 + (rev - 100000000) * (13 / 10000);
        }
        if (rev < 500000000) {
            return 685000 + (rev - 300000000) * (8 / 10000);
        }
        if (rev < 1000000000) {
            return 845000 + (rev - 500000000) * (6 / 10000);
        }
        if (rev < 2000000000) {
            return 1145000 + (rev - 1000000000) * (2.5 / 10000);
        }
        if (rev < 3000000000) {
            return 1395000 + (rev - 2000000000) * (2.5 / 10000);
        }
        if (rev < 5000000000) {
            return 1645000 + (rev - 3000000000) * (2.5 / 10000);
        }
        if (rev < 10000000000) {
            return 2145000 + (rev - 5000000000) * (2.5 / 10000);
        }
        return 3000000; // Fallback
    };

    // Discounted Monthly Fee Calculation
    const calculateDiscountedMonthly = (rev: number, labor: boolean, type: 'general' | 'service') => {
        if (rev === 0) return 0;

        if (type === 'service') {
            // Service Industry (Academy/Beauty/Service)
            if (rev < 75000000) {
                return labor ? 77000 : 55000;
            }
            if (rev < 150000000) {
                return labor ? 88000 : 77000;
            }
            if (rev < 500000000) {
                return 88000;
            }
            return 132000;
        } else {
            // General Industry
            if (rev < 150000000) {
                return labor ? 77000 : 55000;
            }
            if (rev < 200000000) {
                return labor ? 88000 : 77000;
            }
            if (rev < 750000000) {
                return 88000;
            }
            return 132000;
        }
    };

    // Discounted Closing Fee Calculation
    const calculateDiscountedClosing = (rev: number, type: 'general' | 'service') => {
        if (rev === 0) return 0;

        if (type === 'service') {
            // Service Industry
            if (rev < 75000000) {
                return 220000; // Fixed 220k for under 75m
            }
            if (rev < 150000000) return 330000;
            if (rev < 200000000) return 440000;
            if (rev < 300000000) return 550000; // Interpolated
            if (rev < 400000000) return 660000; // 3억
            // After 300m (or 400m?), 220k per 100m. Prompt said "3억 66만원... 이후로는 억당 22만원"
            // Let's assume >= 300m follows the per 100m rule based on 220k/100m
            return Math.floor(rev / 100000000) * 220000;
        } else {
            // General Industry
            if (rev < 100000000) return 220000; // Fixed 220k for under 100m
            return Math.ceil(rev / 50000000) * 110000;
        }
    };

    // Update standard fees when revenue changes, unless manually edited
    useEffect(() => {
        setCustomRevenue(revenue === 0 ? '' : revenue.toString());

        if (!isStandardMonthlyEdited) {
            setStandardMonthlyInput(calculateStandardMonthly(revenue));
        }
        if (!isStandardClosingEdited) {
            setStandardClosingInput(Math.floor(calculateStandardClosing(revenue)));
        }
        if (!isDiscountedMonthlyEdited) {
            setDiscountedMonthlyInput(calculateDiscountedMonthly(revenue, hasLabor, businessType));
        }
        // Filing fees default to 0, no auto-calc needed unless specified, but we reset if revenue changes?
        // Keeping them as is or resetting to 0 could be an option. For now, let's keep them manual or 0.
        if (!isStandardFilingEdited) setStandardFilingInput(0);
        if (!isDiscountedFilingEdited) setDiscountedFilingInput(0);
    }, [revenue, hasLabor, businessType, isStandardMonthlyEdited, isStandardClosingEdited, isDiscountedMonthlyEdited, isStandardFilingEdited, isDiscountedFilingEdited]);

    const handleRevenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = Number(e.target.value);
        setRevenue(val);
        // Reset edit flags when revenue changes via dropdown to auto-update standard fees
        setIsStandardMonthlyEdited(false);
        setIsStandardClosingEdited(false);
        setIsStandardFilingEdited(false);
        setIsDiscountedMonthlyEdited(false);
        setIsDiscountedFilingEdited(false);
    };

    const handleCustomRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valStr = e.target.value.replace(/[^0-9]/g, '');
        const val = Number(valStr);
        setCustomRevenue(valStr);
        setRevenue(val);
        // Reset edit flags when revenue changes via input
        setIsStandardMonthlyEdited(false);
        setIsStandardClosingEdited(false);
        setIsStandardFilingEdited(false);
        setIsDiscountedMonthlyEdited(false);
        setIsDiscountedFilingEdited(false);
    };

    const discountedClosing = calculateDiscountedClosing(revenue, businessType);

    const monthlySavings = standardMonthlyInput - discountedMonthlyInput;
    const closingSavings = standardClosingInput - discountedClosing;
    // Filing fees are now separate/removed from total calculation or just displayed separately
    // The user asked to "remove the filing agency fee" row and "add a price table separately".
    // So we should probably remove them from the total savings calculation if they are no longer part of the comparison in the same way,
    // OR if the user just wants the visual row changed but the math kept?
    // "신고대리비용을 삭제해줘" (Delete the filing agency fee) implies removing it from the calculation too, or at least the input.
    // Since we removed the inputs, we should remove them from the total.
    const totalAnnualSavings = (monthlySavings * 12) + closingSavings;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(val).replace('₩', '') + '원';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Calculator className="w-8 h-8 text-teal-600" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">세무/노무 비용 계산기</h2>
                    </div>
                    <p className="text-gray-600 text-lg">
                        표준 세무 수수료와 비교하여 세무법인 해솔의 혜택을 확인해보세요.
                    </p>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">업종 선택</label>
                                <select
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value as 'general' | 'service')}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3 text-gray-900"
                                >
                                    <option value="general">일반 사업자</option>
                                    <option value="service">교습소/학원/미용실</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">연간 매출액 (VAT 별도)</label>
                                <div className="flex gap-2">
                                    <select
                                        className="block w-1/3 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3 text-gray-900"
                                        onChange={handleRevenueChange}
                                        value={revenueOptions.find(opt => opt.value === revenue)?.value || 0}
                                    >
                                        {revenueOptions.map((opt, idx) => (
                                            <option key={idx} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={customRevenue ? Number(customRevenue).toLocaleString() : ''}
                                        onChange={handleCustomRevenueChange}
                                        className="block w-2/3 rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-3 text-right text-gray-900"
                                        placeholder="0"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">* 매출액에 따라 기장료와 조정료가 달라집니다.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">인건비 신고 여부</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${!hasLabor ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="labor"
                                            checked={!hasLabor}
                                            onChange={() => setHasLabor(false)}
                                            className="sr-only"
                                        />
                                        <span className="font-bold">신고 없음</span>
                                    </label>
                                    <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${hasLabor ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="labor"
                                            checked={hasLabor}
                                            onChange={() => setHasLabor(true)}
                                            className="sr-only"
                                        />
                                        <span className="font-bold">신고 있음</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-teal-800">부가세 신고</span>
                                    <span className="text-sm font-bold text-teal-700">100,000원</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-teal-800">종합소득세 신고</span>
                                    <span className="text-sm font-bold text-teal-700">200,000원</span>
                                </div>
                                <div className="text-right text-xs text-teal-600 font-medium">
                                    (부가세 별도)
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Result Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Standard Fee Card (Left) */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-700">일반 세무사무실 평균</h3>
                            <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">직접 수정 가능</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 flex items-center gap-1">
                                    월 기장료 <Edit2 className="w-3 h-3 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    value={standardMonthlyInput.toLocaleString()}
                                    onChange={(e) => {
                                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                                        setStandardMonthlyInput(val);
                                        setIsStandardMonthlyEdited(true);
                                    }}
                                    className="w-32 text-right p-1 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-xl font-bold text-gray-800"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 flex items-center gap-1">
                                    조정료 (연 1회) <Edit2 className="w-3 h-3 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    value={standardClosingInput.toLocaleString()}
                                    onChange={(e) => {
                                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                                        setStandardClosingInput(val);
                                        setIsStandardClosingEdited(true);
                                    }}
                                    className="w-32 text-right p-1 border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none text-xl font-bold text-gray-800"
                                />
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">연간 총 비용</span>
                                    <span className="text-2xl font-bold text-gray-800">{formatCurrency(standardMonthlyInput * 12 + standardClosingInput)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Haesol Fee Card (Right) */}
                    <div className="bg-teal-50 rounded-xl p-6 border-2 border-teal-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            BEST CHOICE
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-teal-700">세무법인 해솔</h3>
                            <span className="text-xs font-medium bg-teal-200 text-teal-700 px-2 py-1 rounded">직접 수정 가능</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-teal-800 flex items-center gap-1">
                                    월 기장료 <Edit2 className="w-3 h-3 text-teal-400" />
                                </span>
                                <div className="text-right">
                                    <div className="text-xs text-red-500 font-medium mb-0.5">
                                        (월 {formatCurrency(monthlySavings)} 절약)
                                    </div>
                                    <input
                                        type="text"
                                        value={discountedMonthlyInput.toLocaleString()}
                                        onChange={(e) => {
                                            const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                                            setDiscountedMonthlyInput(val);
                                            setIsDiscountedMonthlyEdited(true);
                                        }}
                                        className="w-32 text-right p-1 border-b border-teal-300 bg-transparent focus:border-teal-500 focus:outline-none text-xl font-bold text-teal-700"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-teal-800">조정료 (연 1회)</span>
                                <div className="text-right">
                                    <div className="text-xs text-red-500 font-medium mb-0.5">
                                        ({formatCurrency(closingSavings)} 절약)
                                    </div>
                                    <span className="text-xl font-bold text-teal-700">{formatCurrency(discountedClosing)}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-teal-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-teal-900">연간 총 비용</span>
                                    <span className="text-2xl font-bold text-teal-700">{formatCurrency(discountedMonthlyInput * 12 + discountedClosing)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Total Savings */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg transform transition-all hover:scale-[1.01]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <TrendingDown className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-red-100">연간 총 절약 금액</h4>
                            <p className="text-sm text-red-50">세무법인 해솔과 함께하면 이만큼 절약됩니다!</p>
                        </div>
                    </div>
                    <div className="text-center sm:text-right">
                        <div className="flex gap-2">
                            <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                            <p>세무법인 해솔의 제안가는 부가세가 포함된 금액입니다.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Educational Content Section */}
            <div className="space-y-8 mb-12">
                {/* Section 1: Why not random accountant */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                        1. 세무사를 아무 데나 맡기면 안 되는 이유
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-teal-700 mb-2">1) 업종 특성 이해 부족</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                세무업무는 단순 신고 대행이 아니라 업종의 매출 구조, 비용 구조, 정책자금 요건을 이해해야 가능합니다.<br />
                                일반 세무사는 특정 업종(도소매, 음식점, 건설, 온라인몰 등)에 대한 전문성이 낮아 불필요한 세금 증가, 공제 누락, 신고 오류가 발생합니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-teal-700 mb-2">2) 대표 개인의 상황을 반영하지 않음</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                가업승계, 부동산 보유, 겸업, 가족 급여 지급 등 개인 상황을 고려하지 않으면 종합소득세·상속세·증여세 리스크가 커집니다.<br />
                                대부분 저가 세무사는 대표 개인과 사업 전체 구조를 검토하지 않습니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-teal-700 mb-2">3) 세무조사 리스크 관리 부재</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                접대비·인건비·임차료·가공거래·현금영수증 등은 업종별로 조사 포인트가 다릅니다.<br />
                                그걸 모르는 세무사를 선택하면 세무조사 대상 선정 확률이 높아지고, 대응도 제대로 못해 사업 중단 리스크가 커집니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-teal-700 mb-2">4) 기장료만 보고 선택 시 발생하는 문제</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                저가 기장료의 대부분은 직원 1명이 200~300개 업체를 동시에 처리하는 구조입니다. 이 경우 발생하는 문제는 다음과 같습니다.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm pl-2 space-y-1 bg-gray-50 p-3 rounded-lg">
                                <li>월 마감 누락</li>
                                <li>증빙 누락 방치</li>
                                <li>환급 가능 세액 미확인</li>
                                <li>수정신고 필요 여부 체크 안함</li>
                                <li>정책자금·보조금 연계 조언 없음</li>
                            </ul>
                            <p className="text-red-500 text-sm font-bold mt-2">
                                결과적으로 기장료로 아낀 비용보다 세금 손해가 훨씬 큽니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-teal-700 mb-2">5) 사업 운영 컨설팅 부재</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                세무는 비용절감, 정책자금, 고용·노무와 연결되어 있습니다.<br />
                                그러나 대부분의 일반 세무사는 정책자금 컨설팅, 노무비 구조조정, 비용절감 플랜을 전혀 제시하지 못합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Why not online service */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                        2. 온라인 세무서(저가 플랫폼)를 쓰면 안 되는 이유
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-indigo-700 mb-2">1) 자동화 위주의 기계적 신고</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                온라인 세무서비스는 입력 자료를 기계적으로 맞춰 신고하는 방식입니다. 업종별 공제, 누락 검증, 리스크 관리는 거의 없습니다.<br />
                                그래서 다음 문제가 발생합니다.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm pl-2 space-y-1 bg-gray-50 p-3 rounded-lg">
                                <li>비용처리 누락</li>
                                <li>경비 인정 가능 항목 판단 불가</li>
                                <li>부가세 환급 누락</li>
                                <li>고정자산 감가상각 누락</li>
                                <li>직원 인건비 처리 오류</li>
                                <li>매출·입금 불일치 미확인</li>
                            </ul>
                            <p className="text-red-500 text-sm font-bold mt-2">
                                결과적으로 환급받을 세금을 못 받거나 과다납부하는 경우가 많습니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-indigo-700 mb-2">2) 상담이 어려움</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                대표가 가장 필요할 때 상담이 안 됩니다. 대부분 자동응답, 챗봇, 템플릿 답변으로 끝나며 사업별 상담이 불가능합니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-indigo-700 mb-2">3) 세무조사 대응 불가</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                온라인 세무서비스는 세무조사 입회나 대응 지원을 하지 않습니다. 문제가 생기면 결국 대표가 혼자 감당해야 합니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-indigo-700 mb-2">4) 문제 발생 시 책임 소재가 불명확</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                일반 오프라인 세무사처럼 “기장 책임자의 서명”, “대리인 책임 범위”가 명확하지 않습니다. 신고 오류가 생겨도 책임 회피가 쉽습니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-indigo-700 mb-2">5) 정책자금·지원금·경비절감 플랜 없음</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                온라인 세무서비스는 정책자금(소상공인 정책자금, 희망리턴패키지, 경영안정자금), 노무·고용지원금, 비용절감, 법인전환 같은 전략을 전혀 제시하지 못합니다.<br />
                                결국 사업 성장과 절세의 핵심 기회를 놓치게 됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related News Links */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> 관련 뉴스 자료
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                        <li>
                            <a href="https://www.sejungilbo.com/news/articleView.html?idxno=53586" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-start gap-2">
                                <span className="text-gray-400 shrink-0">-</span>
                                <span>[세정일보] ‘종소세 세금플랫폼’에서 가산세 폭탄터졌다…“국세청 조치하라”</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.sejungilbo.com/news/articleView.html?idxno=53777" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-start gap-2">
                                <span className="text-gray-400 shrink-0">-</span>
                                <span>[세정일보] 세금신고 플랫폼 전산오류…기한후신고도 먹통 ‘2차 피해’ 우려</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.sejungilbo.com/news/articleView.html?idxno=53812" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-start gap-2">
                                <span className="text-gray-400 shrink-0">-</span>
                                <span>[세정일보] 세무사회, 삼쩜삼TA 무혐의 소식에…“불성실･탈세, 무자격 세무대리가 본질 유감”</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.sejungilbo.com/news/articleView.html?idxno=53927" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-start gap-2">
                                <span className="text-gray-400 shrink-0">-</span>
                                <span>[세정일보] 삼쩜삼發 소득세 환급대란 점검…국세청, 상반기 1천423명 추징</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%95%A8%EA%BB%98%ED%95%98%EB%8A%94%ED%9A%8C%EA%B3%84%EC%B2%9C%EC%82%AC&ackey=jc59chf2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-start gap-2">
                                <span className="text-gray-400 shrink-0">-</span>
                                <span>[네이버 검색] 함께하는 회계천사</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Company Proposal Images Accordion */}
            <div className="mt-4">
                <button
                    onClick={() => setIsProposalOpen(!isProposalOpen)}
                    className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
                >
                    <FileText className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                    세무법인 해솔 회사소개서 및 제안서 {isProposalOpen ? '접기' : '펼쳐보기'}
                    {isProposalOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    )}
                </button>

                {isProposalOpen && (
                    <div className="mt-4 space-y-0 transition-all duration-300 ease-in-out">
                        {/* Proposal Image 1 */}
                        <div className="w-full">
                            <img
                                src="/files/haesol_proposal/haesol_proposal_1.jpg"
                                alt="세무법인 해솔 제안서 1"
                                className="w-full h-auto block"
                            />
                        </div>

                        <div className="w-full">
                            <img
                                src="/files/haesol_proposal/haesol_building.png"
                                alt="세무법인 해솔 사옥"
                                className="w-full h-auto block"
                            />
                        </div>

                        {/* Member Grid Section (Moved) */}
                        <div className="bg-white p-6 border-t border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                                함께하는 세무법인 해솔 구성원
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {[
                                    { name: '김도형 회계사', branch: '해솔 본점', location: '부산 금정구', image: '/files/haesol_proposal/세무법인해솔 구성원/해솔 본점 김도형 회계사 부산 금정구 소재.jpg' },
                                    { name: '유정훈 세무사', branch: '해솔 부산진지점', location: '부산 연제구', image: '/files/haesol_proposal/세무법인해솔 구성원/해솔 부산진지점 유정훈세무사 부산 연제구 소재.jpg' },
                                    { name: '이환성 세무사', branch: '해솔 북부산지점', location: '부산 사상구', image: '/files/haesol_proposal/세무법인해솔 구성원/해솔 북부산지점 이환성세무사 부산 사상구 소재.jpg' },
                                    { name: '강재혁 세무사', branch: '해솔 이지지점', location: '부산 수영구', image: '/files/haesol_proposal/세무법인해솔 구성원/해솔 이지지점 강재혁세무사 부산 수영구 소재.jpg' },
                                    { name: '김병수 총괄이사', branch: '해솔 청안점', location: '부산 중구', image: '/files/haesol_proposal/세무법인해솔 구성원/해솔 청안점 김병수총괄이사 부산 중구 소재.jpg' },
                                ].map((member, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="w-full aspect-[3/4] relative rounded-lg overflow-hidden shadow-md mb-3">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs font-bold text-blue-600 mb-1">{member.branch}</div>
                                            <div className="text-sm font-bold text-gray-800 mb-0.5">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.location}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Team Gathering Photo */}
                        <div className="w-full mt-4">
                            <img
                                src="/files/haesol_proposal/세무법인해솔 구성원/세무법인해솔 임직원 송년회.jpg"
                                alt="세무법인 해솔 임직원 송년회"
                                className="w-full h-auto block rounded-lg"
                            />
                        </div>


                        {/* Proposal Images 2-15 */}
                        {/* Proposal Images 2-10 */}
                        {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
                            <div key={`proposal-${num}`} className="w-full">
                                <img
                                    src={`/files/haesol_proposal/haesol_proposal_${num}.jpg`}
                                    alt={`세무법인 해솔 제안서 ${num}`}
                                    className="w-full h-auto block"
                                />
                            </div>
                        ))}

                        {/* Chat Screenshots (Moved) */}
                        <div className="w-full bg-white p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                    <img
                                        src="/images/haesol_chat_1.jpg"
                                        alt="세무법인 해솔 고객 후기 1"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                    <img
                                        src="/images/haesol_chat_2.jpg"
                                        alt="세무법인 해솔 고객 후기 2"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                    <img
                                        src="/images/haesol_chat_3.jpg"
                                        alt="세무법인 해솔 고객 후기 3"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Proposal Images 11-15 */}
                        {Array.from({ length: 5 }, (_, i) => i + 11).map((num) => (
                            <div key={`proposal-${num}`} className="w-full">
                                <img
                                    src={`/files/haesol_proposal/haesol_proposal_${num}.jpg`}
                                    alt={`세무법인 해솔 제안서 ${num}`}
                                    className="w-full h-auto block"
                                />
                            </div>
                        ))}
                    </div>
                )}



                {/* Benefit Image */}
                <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src="/images/haesol_benefit.jpg"
                        alt="세무법인 해솔 혜택"
                        className="w-full h-auto"
                    />
                </div>

                {/* Total Benefit Banner */}
                <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-xl transform transition-all hover:scale-[1.01]">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">🎁 세무법인 해솔만의 특별한 혜택</h3>
                    <p className="text-indigo-100 mb-4">기장 계약 시 제공되는 무료 혜택의 총 가치는?</p>
                    <div className="text-4xl sm:text-5xl font-extrabold text-yellow-300 drop-shadow-md">
                        총 760,000원 상당
                    </div>
                    <p className="mt-4 text-sm text-indigo-200 opacity-80">
                        * 기장대행 1개월, 전문직 상담, 노무 서식, 마케팅 지원 등 포함
                    </p>
                </div>


            </div>
        </div >
    );
};

export default TaxLaborFeeCalculator;