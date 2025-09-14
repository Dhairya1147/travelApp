import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalitySelector = ({ currentPersonality, onPersonalityChange, isVisible, onToggle }) => {
  const personalities = [
    {
      id: 'adventure',
      name: 'Adventure Seeker',
      icon: 'Mountain',
      color: 'bg-orange-500',
      description: 'Bold recommendations for thrill-seekers',
      traits: ['Off-the-beaten-path suggestions', 'Outdoor activities focus', 'Risk-tolerant advice']
    },
    {
      id: 'budget',
      name: 'Budget Conscious',
      icon: 'PiggyBank',
      color: 'bg-green-500',
      description: 'Cost-effective travel solutions',
      traits: ['Money-saving tips', 'Free activity suggestions', 'Budget accommodation focus']
    },
    {
      id: 'luxury',
      name: 'Luxury Traveler',
      icon: 'Crown',
      color: 'bg-purple-500',
      description: 'Premium experiences and comfort',
      traits: ['High-end recommendations', 'Comfort prioritized', 'Exclusive experiences']
    },
    {
      id: 'cultural',
      name: 'Cultural Explorer',
      icon: 'Globe',
      color: 'bg-blue-500',
      description: 'Deep cultural immersion focus',
      traits: ['Historical insights', 'Local customs guidance', 'Authentic experiences']
    },
    {
      id: 'family',
      name: 'Family Friendly',
      icon: 'Users',
      color: 'bg-pink-500',
      description: 'Safe and suitable for all ages',
      traits: ['Kid-friendly activities', 'Safety prioritized', 'Group accommodation']
    },
    {
      id: 'business',
      name: 'Business Traveler',
      icon: 'Briefcase',
      color: 'bg-gray-600',
      description: 'Efficient and professional focus',
      traits: ['Time-efficient routes', 'Business amenities', 'Professional networking']
    }
  ];

  const currentPersonalityData = personalities?.find(p => p?.id === currentPersonality);

  if (!isVisible) {
    return (
      <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${currentPersonalityData?.color} rounded-lg flex items-center justify-center`}>
            <Icon name={currentPersonalityData?.icon} size={16} color="white" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">{currentPersonalityData?.name}</p>
            <p className="text-xs text-muted-foreground">{currentPersonalityData?.description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
        >
          <Icon name="Settings" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-card-foreground">AI Personality</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Choose how your AI buddy should approach recommendations and advice
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {personalities?.map((personality) => (
          <button
            key={personality?.id}
            onClick={() => onPersonalityChange(personality?.id)}
            className={`p-3 rounded-lg border text-left transition-travel ${
              currentPersonality === personality?.id
                ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${personality?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={personality?.icon} size={18} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-card-foreground">{personality?.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{personality?.description}</p>
                <div className="space-y-1">
                  {personality?.traits?.map((trait, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span className="text-xs text-muted-foreground">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
              {currentPersonality === personality?.id && (
                <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Your AI buddy learns from your interactions and will adapt its personality over time to better match your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalitySelector;