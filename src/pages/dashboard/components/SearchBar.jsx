import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const recentSearches = [
    "Paris, France",
    "Tokyo, Japan",
    "Bali, Indonesia",
    "New York, USA"
  ];

  const popularDestinations = [
    "Santorini, Greece",
    "Maldives",
    "Swiss Alps",
    "Dubai, UAE"
  ];

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      navigate(`/destination-details?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative mb-8">
      <div className="relative">
        <Input
          type="text"
          placeholder="Where would you like to go?"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e?.target?.value);
            setShowSuggestions(e?.target?.value?.length > 0);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-12 pr-16 py-4 text-lg"
        />
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-travel"
        >
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-travel-modal z-dropdown">
          <div className="p-4">
            {searchQuery?.length > 0 ? (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Search Results</h4>
                <button
                  onClick={() => handleSearch()}
                  className="w-full text-left p-2 hover:bg-muted rounded-md transition-travel"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                    <span>Search for "{searchQuery}"</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="w-full text-left p-2 hover:bg-muted rounded-md transition-travel flex items-center space-x-2"
                    >
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Destinations</h4>
                  {popularDestinations?.map((destination, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(destination)}
                      className="w-full text-left p-2 hover:bg-muted rounded-md transition-travel flex items-center space-x-2"
                    >
                      <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                      <span>{destination}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;