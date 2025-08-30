// @ts-nocheck
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  badge: string;
  pricePerPaper: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  features: PlanFeature[];
  badgeColor: string;
  isPopular?: boolean;
  gradient: string;
}

const Plans: React.FC = () => {
    const navigate = useNavigate();
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'Basic',
      pricePerPaper: 8,
      originalPrice: 5000,
      currentPrice: 2000,
      discount: 60,
      badgeColor: 'from-gray-400 to-gray-600',
      gradient: 'from-gray-50 to-gray-100',
      features: [
        { text: '100 Papers', included: true },
        { text: '500 Online Test Attempts', included: true },
        { text: '6 Months Validity', included: true },
      ]
    },
    {
      id: 'essential',
      name: 'Essential',
      badge: 'Value',
      pricePerPaper: 9,
      originalPrice: 8000,
      currentPrice: 3200,
      discount: 60,
      badgeColor: 'from-green-400 to-green-600',
      gradient: 'from-green-50 to-green-100',
      features: [
        { text: '200 Papers', included: true },
        { text: '1000 Online Test Attempts', included: true },
        { text: '8 Months Validity', included: true },
      ]
    },
    {
      id: 'super-plus',
      name: 'Super-Plus',
      badge: 'Best Value',
      pricePerPaper: 10,
      originalPrice: 30000,
      currentPrice: 10000,
      discount: 67,
      badgeColor: 'from-purple-400 to-purple-600',
      gradient: 'from-purple-50 to-purple-100',
      features: [
        { text: '1000 Papers', included: true },
        { text: '10000 Online Test Attempts', included: true },
        { text: '12 Months Validity', included: true },
      ]
    },
    {
      id: 'super',
      name: 'Super',
      badge: 'Popular',
      pricePerPaper: 12,
      originalPrice: 15000,
      currentPrice: 6000,
      discount: 60,
      badgeColor: 'from-blue-400 to-blue-600',
      gradient: 'from-blue-50 to-blue-100',
      features: [
        { text: '500 Papers', included: true },
        { text: '5000 Online Test Attempts', included: true },
        { text: '12 Months Validity', included: true },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Premium',
      pricePerPaper: 14,
      originalPrice: 7500,
      currentPrice: 3500,
      discount: 53,
      badgeColor: 'from-orange-400 to-orange-600',
      gradient: 'from-orange-50 to-orange-100',
      features: [
        { text: '250 Papers', included: true },
        { text: '2500 Online Test Attempts', included: true },
        { text: '12 Months Validity', included: true },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: 'Ultimate',
      pricePerPaper: 16,
      originalPrice: 50000,
      currentPrice: 20000,
      discount: 60,
      badgeColor: 'from-red-400 to-red-600',
      gradient: 'from-red-50 to-red-100',
      features: [
        { text: '2000 Papers', included: true },
        { text: '20000 Online Test Attempts', included: true },
        { text: '24 Months Validity', included: true },
      ]
    }
  ];

  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen  py-6 px-4 font-local2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex gap-2 items-center  text-xl md:text-xl font-bold text-gray-900 mb-[5px]">
             <Button
                    onClick={() => navigate(-1)}
                     shape="square" className="flex items-center justify-center">
                      <ArrowLeft size={18} />
                    </Button>Choose Your Perfect Plan
          </div>
           <h3 className="text-md text-gray-600 mb-4 ml-[56px]">
            Select from our comprehensive range of plans designed to meet every learning need
          </h3>
          {/* <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Select from our comprehensive range of plans designed to meet every learning need
          </p> */}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-black text-gray-900">₹{plan.pricePerPaper}</span>
                    <span className="text-gray-500 ml-1 text-lg">/paper</span>
                  </div>
                  <div className={`bg-gradient-to-r ${plan.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-md`}>
                    {plan.badge}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{plan.name}</h3>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center group">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mr-4 shadow-md">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Original Price:</span>
                    <span className="text-red-500 line-through font-medium">
                      ₹{formatPrice(plan.originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      You Save: {plan.discount}% off
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{formatPrice(plan.originalPrice - plan.currentPrice)}
                    </span>
                  </div>
                </div>

                {/* Final Price and Button */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-gray-900 mb-2">
                      ₹ {formatPrice(plan.currentPrice)}
                    </div>
                    <div className="text-sm text-gray-500">Total Price</div>
                  </div>
                  
                  <button className={`
                    w-full py-3 px-4 rounded-xl font-bold text-white text-lg
                    bg-gradient-to-r ${plan.badgeColor} 
                    hover:shadow-2xl transform hover:scale-105 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-opacity-50
                    shadow-lg
                  `}>
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
         
        </div>
      </div>
    </div>
  );
};

export default Plans;