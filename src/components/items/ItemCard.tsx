import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from 'lucide-react';

export interface ItemProps {
  id: string;
  title: string;
  image: string;
  category: string;
  location: string;
  date: string;
  status: 'found' | 'lost' | 'claimed';
  isReturned?: boolean; // Added this property
}

const ItemCard: React.FC<ItemProps> = ({
  id,
  title,
  image,
  category,
  location,
  date,
  status
}) => {
  return (
    <Link to={`/item/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image || "/placeholder.svg"} 
            alt={title}
            className="object-cover w-full h-full"
          />
          <Badge 
            className={`absolute top-2 right-2 ${
              status === 'found' ? 'bg-green-500' : 
              status === 'lost' ? 'bg-red-500' : 
              'bg-gray-500'
            }`}
          >
            {status === 'found' ? 'Found' : status === 'lost' ? 'Lost' : 'Claimed'}
          </Badge>
        </div>
        
        <CardContent className="pt-4 flex-grow">
          <div className="mb-1 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {category}
            </Badge>
          </div>
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 text-left mb-2">{title}</h3>
        </CardContent>
        
        <CardFooter className="text-sm text-gray-500 pt-0 flex flex-col items-start space-y-1">
          <div className="flex items-center space-x-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            <span className="truncate max-w-[200px]">{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;