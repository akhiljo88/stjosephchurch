import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, TrendingUp, DollarSign, Calculator, Calendar, PiggyBank, Target, Lightbulb, CheckCircle } from 'lucide-react';
import type { User } from '../lib/auth';

interface FinancialPlanningAIProps {
  user: User;
  onClose: () => void;
}

interface PaymentPlan {
  months: number;
  monthlyAmount: number;
  totalInterest: number;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  color: string;
}

interface FinancialTip {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

const FinancialPlanningAI: React.FC<FinancialPlanningAIProps> = ({ user, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [showAdvancedTips, setShowAdvancedTips] = useState(false);

  // Calculate payment plans based on user's total due amount
  const generatePaymentPlans = (): PaymentPlan[] => {
    const totalAmount = user.total;
    
    return [
      {
        months: 3,
        monthlyAmount: Math.ceil(totalAmount / 3),
        totalInterest: 0,
        description: "Pay off quickly with higher monthly payments. Best for those with stable income.",
        difficulty: 'Challenging',
        color: 'from-red-600 to-red-700'
      },
      {
        months: 6,
        monthlyAmount: Math.ceil(totalAmount / 6),
        totalInterest: 0,
        description: "Balanced approach with moderate monthly payments. Recommended for most users.",
        difficulty: 'Moderate',
        color: 'from-blue-600 to-blue-700'
      },
      {
        months: 12,
        monthlyAmount: Math.ceil(totalAmount / 12),
        totalInterest: 0,
        description: "Lower monthly burden with extended timeline. Ideal for tight budgets.",
        difficulty: 'Easy',
        color: 'from-green-600 to-green-700'
      },
      {
        months: 18,
        monthlyAmount: Math.ceil(totalAmount / 18),
        totalInterest: 0,
        description: "Minimal monthly impact with maximum flexibility. Perfect for conservative budgets.",
        difficulty: 'Easy',
        color: 'from-purple-600 to-purple-700'
      }
    ];
  };

  const paymentPlans = generatePaymentPlans();

  // Financial tips based on AI analysis
  const financialTips: FinancialTip[] = [
    {
      icon: PiggyBank,
      title: "Create a Church Fund",
      description: "Set aside a small amount weekly specifically for church contributions. Even ₹25/week adds up to ₹1,300/year.",
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Calendar,
      title: "Automate Payments",
      description: "Set up automatic transfers to a separate account for church dues to avoid spending the money elsewhere.",
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: "Break Down by Category",
      description: "Focus on one category at a time: Monthly Collection first, then Cleaning, Common Work, and Funeral Fund.",
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: "Increase Gradually",
      description: "Start with what you can afford and increase payments as your financial situation improves.",
      color: 'from-amber-500 to-amber-600'
    }
  ];

  // Calculate affordability based on income and expenses
  const calculateAffordability = (plan: PaymentPlan): string => {
    if (monthlyIncome === 0) return "Enter your income to see affordability";
    
    const disposableIncome = monthlyIncome - monthlyExpenses;
    const percentage = (plan.monthlyAmount / disposableIncome) * 100;
    
    if (percentage <= 10) return "Very Affordable (≤10% of disposable income)";
    if (percentage <= 20) return "Affordable (≤20% of disposable income)";
    if (percentage <= 30) return "Manageable (≤30% of disposable income)";
    return "Challenging (>30% of disposable income)";
  };

  const getAffordabilityColor = (plan: PaymentPlan): string => {
    if (monthlyIncome === 0) return "text-gray-500";
    
    const disposableIncome = monthlyIncome - monthlyExpenses;
    const percentage = (plan.monthlyAmount / disposableIncome) * 100;
    
    if (percentage <= 10) return "text-green-600";
    if (percentage <= 20) return "text-blue-600";
    if (percentage <= 30) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl max-w-6xl max-h-[90vh] overflow-y-auto border-4 border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-red-900 font-serif">AI Financial Planning</h2>
                <p className="text-amber-600 font-serif">Smart payment strategies for {user.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Current Financial Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-100 p-4 rounded-xl text-center">
              <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-red-900 font-serif">Total Due</h3>
              <p className="text-2xl font-bold text-red-600">₹{user.total}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl text-center">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-red-900 font-serif">Monthly Collection</h3>
              <p className="text-xl font-bold text-blue-600">₹{user.monthlyCollection}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl text-center">
              <PiggyBank className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold text-red-900 font-serif">Other Dues</h3>
              <p className="text-xl font-bold text-green-600">₹{user.cleaning + user.commonWork + user.funeralFund}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold text-red-900 font-serif">Categories</h3>
              <p className="text-xl font-bold text-purple-600">4 Types</p>
            </div>
          </div>

          {/* Income and Expenses Input */}
          <div className="bg-amber-100 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-red-900 mb-4 font-serif flex items-center">
              <Calculator className="w-6 h-6 mr-2" />
              Personal Financial Information (Optional)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-red-900 font-semibold mb-2 font-serif">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={monthlyIncome || ''}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none font-serif"
                  placeholder="Enter your monthly income"
                />
              </div>
              <div>
                <label className="block text-red-900 font-semibold mb-2 font-serif">Monthly Expenses (₹)</label>
                <input
                  type="number"
                  value={monthlyExpenses || ''}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-red-500 focus:outline-none font-serif"
                  placeholder="Enter your monthly expenses"
                />
              </div>
            </div>
            {monthlyIncome > 0 && monthlyExpenses > 0 && (
              <div className="mt-4 p-4 bg-green-100 rounded-xl">
                <p className="text-green-800 font-semibold font-serif">
                  Disposable Income: ₹{monthlyIncome - monthlyExpenses} per month
                </p>
              </div>
            )}
          </div>

          {/* Payment Plans */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-900 mb-6 font-serif flex items-center">
              <TrendingUp className="w-7 h-7 mr-3" />
              AI-Recommended Payment Plans
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {paymentPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl shadow-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-amber-200 bg-white hover:border-amber-300'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center`}>
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      plan.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      plan.difficulty === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {plan.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-red-900 mb-2 font-serif">
                    {plan.months} Month Plan
                  </h4>
                  <p className="text-3xl font-bold text-gray-800 mb-2">₹{plan.monthlyAmount}/month</p>
                  <p className="text-gray-600 font-serif text-sm mb-4">{plan.description}</p>
                  
                  {monthlyIncome > 0 && (
                    <div className={`text-sm font-semibold ${getAffordabilityColor(plan)}`}>
                      {calculateAffordability(plan)}
                    </div>
                  )}
                  
                  {selectedPlan === plan && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-green-100 rounded-xl"
                    >
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800 font-serif">Plan Selected!</span>
                      </div>
                      <p className="text-green-700 text-sm font-serif">
                        You'll pay ₹{plan.monthlyAmount} per month for {plan.months} months to clear your dues.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Financial Tips */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-red-900 font-serif flex items-center">
                <Lightbulb className="w-7 h-7 mr-3" />
                Smart Financial Tips
              </h3>
              <button
                onClick={() => setShowAdvancedTips(!showAdvancedTips)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-serif text-sm transition-colors duration-300"
              >
                {showAdvancedTips ? 'Show Less' : 'Show More Tips'}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {financialTips.slice(0, showAdvancedTips ? financialTips.length : 2).map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white rounded-2xl shadow-lg border-2 border-amber-200"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${tip.color} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-red-900 mb-2 font-serif">{tip.title}</h4>
                    <p className="text-gray-700 font-serif text-sm">{tip.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-red-900 mb-4 font-serif flex items-center">
              <Calculator className="w-6 h-6 mr-2" />
              Payment Category Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">MC</span>
                </div>
                <p className="font-semibold text-blue-900 font-serif text-sm">Monthly Collection</p>
                <p className="text-blue-600 font-bold">₹{user.monthlyCollection}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">CL</span>
                </div>
                <p className="font-semibold text-green-900 font-serif text-sm">Cleaning</p>
                <p className="text-green-600 font-bold">₹{user.cleaning}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">CW</span>
                </div>
                <p className="font-semibold text-purple-900 font-serif text-sm">Common Work</p>
                <p className="text-purple-600 font-bold">₹{user.commonWork}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">FF</span>
                </div>
                <p className="font-semibold text-red-900 font-serif text-sm">Funeral Fund</p>
                <p className="text-red-600 font-bold">₹{user.funeralFund}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinancialPlanningAI;