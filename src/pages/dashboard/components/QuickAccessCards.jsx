import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessCards = () => {
  const quickActions = [
    {
      title: "Explore Destinations",
      description: "Discover amazing places to visit",
      icon: "MapPin",
      path: "/destination-details",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      iconBg: "bg-blue-100"
    },
    {
      title: "Plan Itinerary",
      description: "Create your perfect travel schedule",
      icon: "Calendar",
      path: "/itinerary-planner",
      color: "bg-green-50 text-green-600 border-green-200",
      iconBg: "bg-green-100"
    },
    {
      title: "Travel Groups",
      description: "Join or create travel groups",
      icon: "Users",
      path: "/travel-groups",
      color: "bg-purple-50 text-purple-600 border-purple-200",
      iconBg: "bg-purple-100"
    },
    {
      title: "AI Travel Buddy",
      description: "Get personalized recommendations",
      icon: "Bot",
      path: "/ai-travel-buddy",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {quickActions?.map((action, index) => (
        <Link
          key={index}
          to={action?.path}
          className={`${action?.color} border rounded-xl p-6 hover:shadow-travel-card transition-travel group`}
        >
          <div className="flex items-start space-x-4">
            <div className={`${action?.iconBg} p-3 rounded-lg group-hover:scale-110 transition-travel`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{action?.title}</h3>
              <p className="text-sm opacity-80">{action?.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessCards;