import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/search/SearchFilters';
import ItemCard, { ItemProps } from '../components/items/ItemCard';
import { db } from '../firebaseConfig'; // Adjust the path if needed
import { collection, getDocs, query, where } from 'firebase/firestore';

const FoundItems = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDate, setSelectedDate] = useState('');
  
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        console.log("Starting to fetch items from Firebase...");
        
        // Try without the where clause first to see if you get any documents
        const q = collection(db, "foundItems");
        const querySnapshot = await getDocs(q);
        
        console.log("Query returned:", querySnapshot.size, "documents");
        
        const fetchedItems: ItemProps[] = [];
        querySnapshot.forEach((doc) => {
          console.log("Document data:", doc.id, doc.data());
          const data = doc.data();
          fetchedItems.push({
            id: doc.id,
            title: data.title,
            image: data.imageUrl || '/placeholder.svg',
            category: data.category,
            location: data.location,
            date: data.foundDate,
            status: 'found'
          });
        });
        
        console.log("Processed items:", fetchedItems);
        setItems(fetchedItems);
      } catch (err) {
        console.error("Error fetching documents: ", err);
        setError("Failed to load items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || item.location.includes(selectedLocation);
    const matchesDate = !selectedDate || item.date === selectedDate;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Found Items</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through items that have been found on campus. If you recognize something as yours, you can claim it.
          </p>
        </div>
        
        <SearchFilters
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onLocationChange={setSelectedLocation}
          onDateChange={setSelectedDate}
        />
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FoundItems;