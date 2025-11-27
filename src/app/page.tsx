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
import SupportFundsGuide from '@/components/SupportFundsGuide';
import DeliveryProfitCalculator from '@/components/DeliveryProfitCalculator';
import TaxSavingCalculator from '@/components/TaxSavingCalculator';
import TaxLaborFeeCalculator from '@/components/TaxLaborFeeCalculator';
import { Calculator, Calendar, DollarSign, Shield, AlertTriangle, Flame, Briefcase, CreditCard, Gift, Bike, PiggyBank, Coins } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'vat' | 'income' | 'schedule' | 'yellow' | 'penalty' | 'fire' | 'labor' | 'card' | 'support' | 'delivery' | 'saving' | 'fee'>('schedule');

  // Global Shared State
  const [globalRevenue, setGlobalRevenue] = useState<number>(0);
  const [globalExpenses, setGlobalExpenses] = useState<number>(0);
  const [globalCardSpending, setGlobalCardSpending] = useState<number>(0);
  const [globalEmployeeCount, setGlobalEmployeeCount] = useState<number>(0);
  const [globalEmployeeSalary, setGlobalEmployeeSalary] = useState<number>(0);
  const [globalFreelancerCount, setGlobalFreelancerCount] = useState<number>(0);
  const [globalFreelancerPayment, setGlobalFreelancerPayment] = useState<number>(0);
  const [globalYellowUmbrella, setGlobalYellowUmbrella] = useState<number>(0);

  // VATCalculator specific states
  const [vatMode, setVatMode] = useState<'general' | 'simplified'>('general');
  const [vatIndustryRate, setVatIndustryRate] = useState<number>(0.15);
  const [vatCreditCardSales, setVatCreditCardSales] = useState<number>(0);
  const [vatSelectedIndustry, setVatSelectedIndustry] = useState<{ name: string, rate: number } | null>(null);

  // IncomeTaxCalculator specific states
  const [incomeDeductions, setIncomeDeductions] = useState<number>(1500000);

  // YellowUmbrellaGuide states
  const [yellowMonthlyPayment, setYellowMonthlyPayment] = useState<number>(250000);
  const [yellowDuration, setYellowDuration] = useState<number>(10);
  const [yellowInterestRate, setYellowInterestRate] = useState<number>(3.3);

  // TaxSavingCalculator specific states
  const [savingVatMode, setSavingVatMode] = useState<'general' | 'simplified'>('general');

  // Reset functions
  const resetVAT = () => {
    setVatMode('general');
    setGlobalRevenue(0);
    setGlobalExpenses(0);
    setVatIndustryRate(0.15);
    setVatCreditCardSales(0);
    setVatSelectedIndustry(null);
  };

  const resetIncome = () => {
    setGlobalRevenue(0);
    setGlobalExpenses(0);
    setIncomeDeductions(1500000);
    setGlobalYellowUmbrella(0);
    setGlobalEmployeeCount(0);
    setGlobalEmployeeSalary(0);
    setGlobalFreelancerCount(0);
    setGlobalFreelancerPayment(0);
  };

  const resetYellow = () => {
    setYellowMonthlyPayment(250000);
    setYellowDuration(10);
    setYellowInterestRate(3.3);
  };

  const resetSaving = () => {
    setGlobalRevenue(0);
    setGlobalExpenses(0);
    setSavingVatMode('general');
    setGlobalYellowUmbrella(0);
    setGlobalEmployeeCount(0);
    setGlobalEmployeeSalary(0);
    setGlobalFreelancerCount(0);
    setGlobalFreelancerPayment(0);
    setGlobalCardSpending(0);
  };

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
            onClick={() => setActiveTab('saving')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'saving'
                ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5" />
            절세 계산기
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
          <button
            onClick={() => setActiveTab('support')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'support'
                ? 'bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
            지원금
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'delivery'
                ? 'bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
            배달수수료
          </button>
          <button
            onClick={() => setActiveTab('fee')}
            className={`w-full py-3 px-3 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap
              ${activeTab === 'fee'
                ? 'bg-teal-50 text-teal-600 shadow-sm ring-1 ring-teal-200'
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
            세무비용
          </button>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'vat' && <VATCalculator
            mode={vatMode}
            setMode={setVatMode}
            revenue={globalRevenue}
            setRevenue={setGlobalRevenue}
            purchase={globalExpenses}
            setPurchase={setGlobalExpenses}
            industryRate={vatIndustryRate}
            setIndustryRate={setVatIndustryRate}
            creditCardSales={vatCreditCardSales}
            setCreditCardSales={setVatCreditCardSales}
            selectedIndustry={vatSelectedIndustry}
            setSelectedIndustry={setVatSelectedIndustry}
            onReset={resetVAT}
          />}
          {activeTab === 'income' && <IncomeTaxCalculator
            revenue={globalRevenue}
            setRevenue={setGlobalRevenue}
            expenses={globalExpenses}
            setExpenses={setGlobalExpenses}
            deductions={incomeDeductions}
            setDeductions={setIncomeDeductions}
            yellowUmbrella={globalYellowUmbrella}
            setYellowUmbrella={setGlobalYellowUmbrella}
            employeeCount={globalEmployeeCount}
            setEmployeeCount={setGlobalEmployeeCount}
            employeeSalary={globalEmployeeSalary}
            setEmployeeSalary={setGlobalEmployeeSalary}
            yellowDuration={yellowDuration}
            yellowInterestRate={yellowInterestRate}
            onReset={resetIncome}
          />}
          {activeTab === 'schedule' && <TaxSchedule />}
          {activeTab === 'saving' && <TaxSavingCalculator
            revenue={globalRevenue}
            setRevenue={setGlobalRevenue}
            expenses={globalExpenses}
            setExpenses={setGlobalExpenses}
            vatMode={savingVatMode}
            setVatMode={setSavingVatMode}
            yellowUmbrella={globalYellowUmbrella}
            setYellowUmbrella={setGlobalYellowUmbrella}
            employeeCount={globalEmployeeCount}
            setEmployeeCount={setGlobalEmployeeCount}
            employeeSalary={globalEmployeeSalary}
            setEmployeeSalary={setGlobalEmployeeSalary}
            freelancerCount={globalFreelancerCount}
            setFreelancerCount={setGlobalFreelancerCount}
            freelancerPayment={globalFreelancerPayment}
            setFreelancerPayment={setGlobalFreelancerPayment}
            cardSpending={globalCardSpending}
            setCardSpending={setGlobalCardSpending}
            onReset={resetSaving}
          />}
          {activeTab === 'yellow' && <YellowUmbrellaGuide
            monthlyPayment={yellowMonthlyPayment}
            setMonthlyPayment={setYellowMonthlyPayment}
            duration={yellowDuration}
            setDuration={setYellowDuration}
            interestRate={yellowInterestRate}
            setInterestRate={setYellowInterestRate}
            onReset={resetYellow}
          />}
          {activeTab === 'penalty' && <PenaltyTaxGuide />}
          {activeTab === 'fire' && <FireInsuranceGuide />}
          {activeTab === 'labor' && <LaborGuide />}
          {activeTab === 'card' && <BusinessCardGuide
            monthlySpend={globalCardSpending}
            setMonthlySpend={setGlobalCardSpending}
          />}
          {activeTab === 'support' && <SupportFundsGuide />}
          {activeTab === 'delivery' && <DeliveryProfitCalculator />}
          {activeTab === 'fee' && <TaxLaborFeeCalculator />}
        </div>
      </div>
    </main>
  );
}
