import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import GroupCard from './GroupCard';
import GroupFilters from './GroupFilters';

const GroupDiscovery = ({ groups, onJoinGroup, onLeaveGroup, currentUserId }) => {
  const [filters, setFilters] = useState({
    search: '',
    destination: '',
    travelStyle: '',
    budgetRange: '',
    duration: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest',
    verifiedOnly: false,
    hasSpots: false,
    departsThisMonth: false
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      destination: '',
      travelStyle: '',
      budgetRange: '',
      duration: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'newest',
      verifiedOnly: false,
      hasSpots: false,
      departsThisMonth: false
    });
  };

  // Filter and sort groups based on current filters
  const filteredGroups = groups?.filter(group => {
    // Search filter
    if (filters?.search && !group?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !group?.destination?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Destination filter
    if (filters?.destination && !group?.destination?.toLowerCase()?.includes(filters?.destination?.toLowerCase())) {
      return false;
    }

    // Travel style filter
    if (filters?.travelStyle && group?.travelStyle !== filters?.travelStyle) {
      return false;
    }

    // Budget range filter
    if (filters?.budgetRange) {
      const [min, max] = filters?.budgetRange?.split('-')?.map(v => v === '+' ? Infinity : parseInt(v));
      if (group?.budget < min || (max !== Infinity && group?.budget > max)) {
        return false;
      }
    }

    // Duration filter
    if (filters?.duration) {
      const [min, max] = filters?.duration?.split('-')?.map(v => v === '+' ? Infinity : parseInt(v));
      if (group?.duration < min || (max !== Infinity && group?.duration > max)) {
        return false;
      }
    }

    // Date range filters
    if (filters?.dateFrom && new Date(group.tripDate) < new Date(filters.dateFrom)) {
      return false;
    }
    if (filters?.dateTo && new Date(group.tripDate) > new Date(filters.dateTo)) {
      return false;
    }

    // Verified only filter
    if (filters?.verifiedOnly && group?.verificationStatus !== 'verified') {
      return false;
    }

    // Has spots filter
    if (filters?.hasSpots && group?.members?.length >= group?.maxMembers) {
      return false;
    }

    // Departs this month filter
    if (filters?.departsThisMonth) {
      const now = new Date();
      const tripDate = new Date(group.tripDate);
      if (tripDate?.getMonth() !== now?.getMonth() || tripDate?.getFullYear() !== now?.getFullYear()) {
        return false;
      }
    }

    return true;
  });

  // Sort filtered groups
  const sortedGroups = [...filteredGroups]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'budget-low':
        return a?.budget - b?.budget;
      case 'budget-high':
        return b?.budget - a?.budget;
      case 'members':
        return b?.members?.length - a?.members?.length;
      case 'departure':
        return new Date(a.tripDate) - new Date(b.tripDate);
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="Compass" size={20} />
          <span>Discover Groups</span>
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {sortedGroups?.length} group{sortedGroups?.length !== 1 ? 's' : ''} found
          </span>
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none border-r"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <GroupFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
      {sortedGroups?.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">No Groups Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms to find more groups.
          </p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
        }>
          {sortedGroups?.map(group => (
            <GroupCard
              key={group?.id}
              group={group}
              onJoinGroup={onJoinGroup}
              onLeaveGroup={onLeaveGroup}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupDiscovery;