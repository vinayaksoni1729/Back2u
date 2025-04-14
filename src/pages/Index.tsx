
import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      
      {/* Recent Items Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added Items</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These items were recently found on campus. Take a look to see if anything belongs to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be replaced with actual ItemCard components with data */}
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="mt-10 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-700 hover:bg-purple-50"
              asChild
            >
              <Link to="/found-items">View All Found Items</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Found something on campus?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help a fellow student reunite with their lost belongings by reporting what you've found.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-purple-700 hover:bg-gray-100"
            asChild
          >
            <Link to="/report-found">Report Found Item</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
