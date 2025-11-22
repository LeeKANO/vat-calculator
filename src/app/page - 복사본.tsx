"use client";

import { useState } from 'react';
import VATCalculator from '@/components/VATCalculator';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import TaxSchedule from '@/components/TaxSchedule';
import YellowUmbrellaGuide from '@/components/YellowUmbrellaGuide';
import PenaltyTaxGuide from '@/components/PenaltyTaxGuide';
import FireInsuranceGuide from '@/components/FireInsuranceGuide';
import LaborGuide from '@/components/LaborGuide';
import BusinessCardGuide from '@/components/BusinessCardGuide';
import { Calculator, Calendar, DollarSign, Shield, AlertTriangle, Flame, Briefcase, CreditCard } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'vat' | 'income' | 'schedule' | 'yellow' | 'penalty' | 'fire' | 'labor' | 'card'>('schedule');

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Responsive Container: Full width on mobile/tablet, constrained on large PC (xl+) */}
      <div className="w-full max-w-none xl:max-w-4xl mx-auto transition-all duration-300">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 break-keep">
            소상공인 사업자를 위한 통합 컨설팅
          </h1>
          <p className="text-base sm:text-lg text-gray-600 break-keep">
            부가가치세, 종합소득세 등 복잡한 세금 계산을 쉽고 간편하게
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 bg-white p-2 rounded-xl shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'schedule'
                ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            세무 일정표
          </button>
          <button
            onClick={() => setActiveTab('vat')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'vat'
                ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            부가가치세
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'income'
                ? 'bg-green-50 text-green-600 shadow-sm ring-1 ring-green-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
            종합소득세
          </button>
          <button
            onClick={() => setActiveTab('yellow')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'yellow'
                ? 'bg-yellow-50 text-yellow-600 shadow-sm ring-1 ring-yellow-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            노란우산
          </button>
          <button
            onClick={() => setActiveTab('penalty')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'penalty'
                ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            가산세
          </button>
          <button
            onClick={() => setActiveTab('fire')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'fire'
                ? 'bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
            화재보험
          </button>
          <button
            onClick={() => setActiveTab('labor')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'labor'
                ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
            노무가이드
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'card'
                ? 'bg-purple-50 text-purple-600 shadow-sm ring-1 ring-purple-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            사업자카드
          </button>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'vat' && <VATCalculator />}
          {activeTab === 'income' && <IncomeTaxCalculator />}
          {activeTab === 'schedule' && <TaxSchedule />}
          {activeTab === 'yellow' && <YellowUmbrellaGuide />}
          {activeTab === 'penalty' && <PenaltyTaxGuide />}
          {activeTab === 'fire' && <FireInsuranceGuide />}
          {activeTab === 'labor' && <LaborGuide />}
          {activeTab === 'card' && <BusinessCardGuide />}
        </div>
      </div>
    </main>
  );
}
