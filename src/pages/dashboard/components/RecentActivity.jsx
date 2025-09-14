import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Flight to Tokyo confirmed',
      description: 'Your flight ANA 123 on March 15th has been confirmed',
      timestamp: '2 hours ago',
      icon: 'Plane',
      color: 'text-blue-600 bg-blue-50',
      actionText: 'View Details',
      actionPath: '/user-profile'
    },
    {
      id: 2,
      type: 'group',
      title: 'New group invitation',
      description: 'Sarah invited you to join "Europe Summer Trip 2024"',
      timestamp: '5 hours ago',
      icon: 'Users',
      color: 'text-purple-600 bg-purple-50',
      actionText: 'View Group',
      actionPath: '/travel-groups'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'New AI recommendation',
      description: 'Based on your preferences, we found 3 new destinations',
      timestamp: '1 day ago',
      icon: 'Sparkles',
      color: 'text-orange-600 bg-orange-50',
      actionText: 'View Suggestions',
      actionPath: '/destination-details'
    },
    {
      id: 4,
      type: 'itinerary',
      title: 'Itinerary updated',
      description: 'Your Bali trip itinerary has been optimized by AI',
      timestamp: '2 days ago',
      icon: 'Calendar',
      color: 'text-green-600 bg-green-50',
      actionText: 'View Itinerary',
      actionPath: '/itinerary-planner'
    },
    {
      id: 5,
      type: 'weather',
      title: 'Weather alert',
      description: 'Rain expected in Paris during your visit next week',
      timestamp: '3 days ago',
      icon: 'CloudRain',
      color: 'text-gray-600 bg-gray-50',
      actionText: 'Check Weather',
      actionPath: '/destination-details'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Recent Activity
          </h2>
          <p className="text-muted-foreground text-sm">
            Stay updated with your travel plans
          </p>
        </div>
        <Link
          to="/user-profile"
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-travel group">
            <div className={`p-2 rounded-lg ${activity?.color} group-hover:scale-110 transition-travel`}>
              <Icon name={activity?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {activity?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity?.timestamp}
                  </p>
                </div>
                
                <Link
                  to={activity?.actionPath}
                  className="ml-4 text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-travel"
                >
                  <span>{activity?.actionText}</span>
                  <Icon name="ExternalLink" size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center">
          <Link
            to="/user-profile"
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-2"
          >
            <span>View All Activities</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;