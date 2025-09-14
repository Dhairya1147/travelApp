import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick, userLocation, currentTime }) => {
  const quickActions = [
    {
      id: 'restaurant',
      label: 'Find Restaurants',
      icon: 'UtensilsCrossed',
      description: 'Nearby dining',
      color: 'bg-orange-500',
      query: 'Find restaurants near me with good ratings'
    },
    {
      id: 'navigation',
      label: 'Get Directions',
      icon: 'Navigation',
      description: 'Navigation assistance',
      color: 'bg-blue-500',
      query: 'Help me navigate to my destination'
    },
    {
      id: 'emergency',
      label: 'Emergency Help',
      icon: 'Phone',
      description: 'Emergency contacts',
      color: 'bg-red-500',
      query: 'Show me emergency contacts and services'
    },
    {
      id: 'culture',
      label: 'Local Customs',
      icon: 'Globe',
      description: 'Cultural guidance',
      color: 'bg-green-500',
      query: 'Tell me about local customs and etiquette'
    },
    {
      id: 'weather',
      label: 'Weather Update',
      icon: 'Cloud',
      description: 'Current conditions',
      color: 'bg-sky-500',
      query: 'What\'s the weather like today?'
    },
    {
      id: 'translate',
      label: 'Translate',
      icon: 'Languages',
      description: 'Language help',
      color: 'bg-purple-500',
      query: 'Help me translate something'
    }
  ];

  const contextualSuggestions = [
    {
      id: 'morning-coffee',
      label: 'Morning Coffee',
      icon: 'Coffee',
      query: 'Find the best coffee shops for breakfast',
      condition: () => currentTime >= 6 && currentTime <= 10
    },
    {
      id: 'lunch-spots',
      label: 'Lunch Spots',
      icon: 'UtensilsCrossed',
      query: 'Recommend lunch places nearby',
      condition: () => currentTime >= 11 && currentTime <= 14
    },
    {
      id: 'evening-activities',
      label: 'Evening Fun',
      icon: 'Sunset',
      query: 'What can I do this evening?',
      condition: () => currentTime >= 17 && currentTime <= 21
    },
    {
      id: 'nightlife',
      label: 'Nightlife',
      icon: 'Moon',
      query: 'Show me nightlife options',
      condition: () => currentTime >= 21 || currentTime <= 2
    }
  ];

  const activeContextualSuggestions = contextualSuggestions?.filter(suggestion => 
    suggestion?.condition()
  );

  return (
    <div className="space-y-4">
      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              onClick={() => onActionClick(action?.query)}
              className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-muted/50 transition-travel"
            >
              <div className={`w-8 h-8 ${action?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={action?.icon} size={16} color="white" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">{action?.label}</p>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Contextual Suggestions */}
      {activeContextualSuggestions?.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-2">
            {activeContextualSuggestions?.map((suggestion) => (
              <Button
                key={suggestion?.id}
                variant="secondary"
                size="sm"
                onClick={() => onActionClick(suggestion?.query)}
                className="flex items-center space-x-2"
              >
                <Icon name={suggestion?.icon} size={14} />
                <span>{suggestion?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Location-based suggestions */}
      {userLocation && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Near You</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onActionClick('What attractions are near my current location?')}
              className="flex items-center space-x-2"
            >
              <Icon name="MapPin" size={14} />
              <span>Nearby Attractions</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onActionClick('Find public transportation options from here')}
              className="flex items-center space-x-2"
            >
              <Icon name="Bus" size={14} />
              <span>Transportation</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onActionClick('Show me local events happening today')}
              className="flex items-center space-x-2"
            >
              <Icon name="Calendar" size={14} />
              <span>Local Events</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;