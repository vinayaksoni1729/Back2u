
import React from 'react';
import { Search, Flag, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Search Lost Items',
    description: 'Browse through items that have been found on campus by others.',
    icon: Search,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Verify your authenticity',
    description: 'Give some details about your lost item to help us verify its authenticity.',
    icon: Flag,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Claim Your Item',
    description: 'Found your belonging? Verify and arrange to collect it securely.',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600'
  }
];

const HowItWorksSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Back2U Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find lost items or report found ones in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-4 mx-auto`}>
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
