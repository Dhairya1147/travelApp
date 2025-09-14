import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ destination, budget, preferences, onApplyRecommendation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Simulate AI recommendation generation
    const generateRecommendations = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockRecommendations = [
          {
            id: 1,
            type: 'activity',
            category: 'cultural',
            title: 'Visit Local Art Museum',
            description: 'Based on your interest in culture, this museum features contemporary local artists and has 40% fewer visitors on weekday mornings.',
            reason: 'Matches your cultural preferences and budget-friendly timing',
            cost: 15,
            duration: 120,
            crowdLevel: 'low',
            confidence: 92,
            timeSlot: '10:00 AM - 12:00 PM',
            location: 'Downtown Arts District',
            benefits: ['Avoid crowds', 'Student discount available', 'Free audio guide'],
            aiInsight: `Our AI analyzed 50,000+ visitor patterns and found Tuesday mornings have the lowest crowd density while maintaining full exhibit availability.`
          },
          {
            id: 2,
            type: 'route',
            category: 'optimization',
            title: 'Alternative Scenic Route',
            description: 'Take the coastal path instead of the main highway to your next destination. Only 15 minutes longer but 60% less traffic.',
            reason: 'Optimizes for scenic value while avoiding congestion',
            cost: 0,
            duration: 45,
            crowdLevel: 'low',
            confidence: 88,
            timeSlot: 'Flexible',
            location: 'Coastal Highway 101',
            benefits: ['Scenic views', 'Less traffic', 'Photo opportunities'],
            aiInsight: `Traffic analysis shows main route congestion peaks at 2-4 PM. Coastal route offers better experience with minimal time impact.`
          },
          {
            id: 3,
            type: 'dining',
            category: 'budget',
            title: 'Local Food Market Experience',
            description: 'Skip expensive tourist restaurants and explore the authentic local food market. Same quality food at 50% less cost.',
            reason: 'Maximizes authentic experience within budget constraints',
            cost: 25,
            duration: 90,
            crowdLevel: 'medium',
            confidence: 95,
            timeSlot: '11:30 AM - 1:00 PM',
            location: 'Central Market Square',
            benefits: ['Authentic cuisine', 'Budget-friendly', 'Cultural immersion'],
            aiInsight: `Price comparison of 200+ dining options shows market vendors offer 45% better value while maintaining quality ratings above 4.2 stars.`
          },
          {
            id: 4,
            type: 'accommodation',
            category: 'budget',
            title: 'Boutique Hostel Upgrade',
            description: 'Switch to a highly-rated boutique hostel with private rooms. Save $80/night while gaining local experience.',
            reason: 'Balances comfort, budget, and authentic local experience',
            cost: -80,
            duration: 0,
            crowdLevel: 'low',
            confidence: 87,
            timeSlot: 'Check-in after 3 PM',
            location: 'Historic Quarter',
            benefits: ['Cost savings', 'Local atmosphere', 'Social opportunities'],
            aiInsight: `Analysis of 1,000+ reviews shows this hostel scores higher on cleanliness and location than your current hotel booking.`
          },
          {
            id: 5,
            type: 'activity',
            category: 'adventure',
            title: 'Hidden Hiking Trail',
            description: 'Discover a lesser-known trail with stunning views. Perfect for your adventure preference and completely free.',
            reason: 'Matches adventure preference while staying budget-conscious',
            cost: 0,
            duration: 180,
            crowdLevel: 'low',
            confidence: 90,
            timeSlot: '7:00 AM - 10:00 AM',
            location: 'Northern Hills',
            benefits: ['Free activity', 'Unique views', 'Great for photos'],
            aiInsight: `Satellite imagery and user data reveal this trail offers 85% of the views of popular trails with only 15% of the foot traffic.`
          },
          {
            id: 6,
            type: 'timing',
            category: 'optimization',
            title: 'Optimal Visit Schedule',
            description: 'Rearrange your museum visits to Tuesday-Thursday for 30% less crowds and potential group discounts.',
            reason: 'Crowd prediction algorithm suggests better experience',
            cost: -20,
            duration: 0,
            crowdLevel: 'low',
            confidence: 94,
            timeSlot: 'Flexible',
            location: 'Various Museums',
            benefits: ['Avoid crowds', 'Group discounts', 'Better photos'],
            aiInsight: `Historical visitor data from 24 months shows Tuesday-Thursday visits result in 40% more positive reviews and 25% longer average visit duration.`
          }
        ];
        setRecommendations(mockRecommendations);
        setIsLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, [destination, budget, preferences]);

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: 'Sparkles' },
    { id: 'cultural', label: 'Cultural', icon: 'Palette' },
    { id: 'budget', label: 'Budget Optimization', icon: 'PiggyBank' },
    { id: 'optimization', label: 'Route & Timing', icon: 'Route' },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' }
  ];

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === activeCategory);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'activity': return 'MapPin';
      case 'route': return 'Route';
      case 'dining': return 'UtensilsCrossed';
      case 'accommodation': return 'Bed';
      case 'timing': return 'Clock';
      default: return 'Lightbulb';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success bg-success/10';
    if (confidence >= 80) return 'text-primary bg-primary/10';
    return 'text-warning bg-warning/10';
  };

  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bot" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-card-foreground">AI Recommendations</h2>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} />
          Refresh
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            className="flex items-center space-x-1"
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </Button>
        ))}
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="bg-background rounded-lg border border-border p-4 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Recommendations */}
      {!isLoading && (
        <div className="space-y-4">
          {filteredRecommendations?.map((recommendation) => (
            <div key={recommendation?.id} className="bg-background rounded-lg border border-border p-4 hover:shadow-travel-card transition-travel">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(recommendation?.type)} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-card-foreground">{recommendation?.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(recommendation?.confidence)}`}>
                        {recommendation?.confidence}% match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{recommendation?.description}</p>
                    <p className="text-xs text-primary font-medium">{recommendation?.reason}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onApplyRecommendation(recommendation)}
                >
                  Apply
                </Button>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                  <span className={recommendation?.cost < 0 ? 'text-success' : 'text-card-foreground'}>
                    {recommendation?.cost < 0 ? `Save $${Math.abs(recommendation?.cost)}` : `$${recommendation?.cost}`}
                  </span>
                </div>
                {recommendation?.duration > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-card-foreground">{recommendation?.duration} min</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(recommendation?.crowdLevel)}`}>
                    {recommendation?.crowdLevel} crowd
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-card-foreground truncate">{recommendation?.location}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendation?.benefits?.map((benefit, index) => (
                  <span key={index} className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>

              {/* AI Insight */}
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                <div className="flex items-start space-x-2">
                  <Icon name="Brain" size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">AI Insight</p>
                    <p className="text-xs text-muted-foreground">{recommendation?.aiInsight}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRecommendations?.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium text-card-foreground mb-2">No recommendations found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or refresh for new suggestions.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;