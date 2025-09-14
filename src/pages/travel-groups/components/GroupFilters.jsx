import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GroupFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const destinationOptions = [
    { value: '', label: 'All Destinations' },
    { value: 'bali', label: 'Bali, Indonesia' },
    { value: 'tokyo', label: 'Tokyo, Japan' },
    { value: 'paris', label: 'Paris, France' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'iceland', label: 'Iceland' },
    { value: 'peru', label: 'Peru' },
    { value: 'morocco', label: 'Morocco' }
  ];

  const travelStyleOptions = [
    { value: '', label: 'All Styles' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget' },
    { value: 'backpacking', label: 'Backpacking' }
  ];

  const budgetRangeOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-5000', label: 'Under ₹5000' },
    { value: '5000-10000', label: '₹5000 - ₹10,000' },
    { value: '10000-20000', label: '₹10,000 - ₹20,000' },
    { value: '20000-50000', label: '₹20,000 - ₹50,000' },
    { value: '50000+', label: 'Over ₹50,000' }
  ];

  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '1-3', label: '1-3 days' },
    { value: '4-7', label: '4-7 days' },
    { value: '8-14', label: '1-2 weeks' },
    { value: '15-30', label: '2-4 weeks' },
    { value: '30+', label: 'Over 1 month' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget-low', label: 'Budget: Low to High' },
    { value: 'budget-high', label: 'Budget: High to Low' },
    { value: 'members', label: 'Most Members' },
    { value: 'departure', label: 'Departure Date' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== false && value !== null
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-card-foreground flex items-center space-x-2">
          <Icon name="Filter" size={18} />
          <span>Filter Groups</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Search groups..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />

        {/* Destination */}
        <Select
          options={destinationOptions}
          value={filters?.destination || ''}
          onChange={(value) => handleFilterChange('destination', value)}
          placeholder="Select destination"
        />

        {/* Travel Style */}
        <Select
          options={travelStyleOptions}
          value={filters?.travelStyle || ''}
          onChange={(value) => handleFilterChange('travelStyle', value)}
          placeholder="Select travel style"
        />

        {/* Budget Range */}
        <Select
          options={budgetRangeOptions}
          value={filters?.budgetRange || ''}
          onChange={(value) => handleFilterChange('budgetRange', value)}
          placeholder="Select budget range"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Duration */}
        <Select
          options={durationOptions}
          value={filters?.duration || ''}
          onChange={(value) => handleFilterChange('duration', value)}
          placeholder="Select duration"
        />

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            placeholder="From date"
            value={filters?.dateFrom || ''}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            type="date"
            placeholder="To date"
            value={filters?.dateTo || ''}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
        </div>

        {/* Sort */}
        <Select
          options={sortOptions}
          value={filters?.sortBy || 'newest'}
          onChange={(value) => handleFilterChange('sortBy', value)}
          placeholder="Sort by"
        />
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters?.verifiedOnly ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('verifiedOnly', !filters?.verifiedOnly)}
          iconName="Shield"
          iconPosition="left"
        >
          Verified Only
        </Button>
        <Button
          variant={filters?.hasSpots ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('hasSpots', !filters?.hasSpots)}
          iconName="Users"
          iconPosition="left"
        >
          Has Open Spots
        </Button>
        <Button
          variant={filters?.departsThisMonth ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange('departsThisMonth', !filters?.departsThisMonth)}
          iconName="Calendar"
          iconPosition="left"
        >
          Departs This Month
        </Button>
      </div>
    </div>
  );
};

export default GroupFilters;