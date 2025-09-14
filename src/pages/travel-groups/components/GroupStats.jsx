import React from 'react';
import Icon from '../../../components/AppIcon';

const GroupStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      label: 'Total Groups',
      value: stats?.totalGroups,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'UserPlus',
      label: 'Your Groups',
      value: stats?.yourGroups,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Calendar',
      label: 'Upcoming Trips',
      value: stats?.upcomingTrips,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'Shield',
      label: 'Verified Groups',
      value: stats?.verifiedGroups,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{item?.value}</p>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupStats;