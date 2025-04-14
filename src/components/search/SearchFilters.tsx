
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onDateChange: (date: string) => void;
}

const categories = [
  "All Categories",
  "Electronics",
  "Books",
  "Clothing",
  "Accessories",
  "Keys",
  "IDs & Cards",
  "Others"
];

const locations = [
  "All Locations",
  "Library",
  "Student Center",
  "Science Building",
  "Engineering Building",
  "Cafeteria",
  "Gym",
  "Dormitories",
  "Outdoor Areas"
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onLocationChange,
  onDateChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for items..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className={`mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          <div>
            <Select onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={onLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input 
              type="date" 
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
