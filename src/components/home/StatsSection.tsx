
import React from 'react';

const stats = [
  {
    value: '500+',
    label: 'Items Found',
    description: 'Successfully reported by our community'
  },
  {
    value: '350+',
    label: 'Items Returned',
    description: 'Reunited with their owners'
  },
  {
    value: '95%',
    label: 'Success Rate',
    description: 'For items with complete information'
  },
  {
    value: '24h',
    label: 'Avg. Claim Time',
    description: 'For popular item categories'
  }
];

const StatsSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Difference on Campus</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every item returned strengthens our community. Here's our impact so far.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="text-lg font-medium text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
