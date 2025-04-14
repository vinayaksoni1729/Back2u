import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ItemCard, { ItemProps } from '../components/items/ItemCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

const Index = () => {
  const [recentItems, setRecentItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentItems = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'foundItems'),
          orderBy('foundDate', 'desc'),
          limit(4)
        );
        const querySnapshot = await getDocs(q);

        const items: ItemProps[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            title: data.title,
            image: data.imageUrl || '/placeholder.svg',
            category: data.category,
            location: data.location,
            date: data.foundDate,
            status: 'found'
          });
        });

        setRecentItems(items);
      } catch (error) {
        console.error('Error fetching recent items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentItems();
  }, []);

  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />

      {/* Recently Added Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added Items</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These items were recently found on campus. Take a look to see if anything belongs to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
              </>
            ) : recentItems.length > 0 ? (
              recentItems.map((item) => <ItemCard key={item.id} {...item} />)
            ) : (
              <p className="col-span-4 text-center text-gray-500">No items added recently.</p>
            )}
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
