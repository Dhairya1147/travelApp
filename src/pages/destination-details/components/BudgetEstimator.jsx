import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BudgetEstimator = ({ destination }) => {
  const [estimatorData, setEstimatorData] = useState({
    travelers: 2,
    duration: 5,
    travelStyle: 'mid-range',
    startDate: '',
    endDate: ''
  });

  const [budgetBreakdown, setBudgetBreakdown] = useState({
    accommodation: 0,
    food: 0,
    activities: 0,
    transport: 0,
    miscellaneous: 0,
    total: 0
  });

  const [aiSuggestions, setAiSuggestions] = useState([]);

  const travelStyleOptions = [
    { value: 'budget', label: 'Budget Traveler', description: 'Hostels, street food, free activities' },
    { value: 'mid-range', label: 'Mid-Range', description: 'Hotels, restaurants, paid attractions' },
    { value: 'luxury', label: 'Luxury', description: 'Premium hotels, fine dining, exclusive experiences' }
  ];

  const costMultipliers = {
    budget: { accommodation: 35, food: 25, activities: 20, transport: 15, miscellaneous: 10 },
    'mid-range': { accommodation: 120, food: 60, activities: 45, transport: 30, miscellaneous: 25 },
    luxury: { accommodation: 300, food: 150, activities: 100, transport: 80, miscellaneous: 70 }
  };

  useEffect(() => {
    calculateBudget();
    generateAISuggestions();
  }, [estimatorData]);

  const calculateBudget = () => {
    const multipliers = costMultipliers?.[estimatorData?.travelStyle];
    const { travelers, duration } = estimatorData;

    const accommodation = multipliers?.accommodation * duration;
    const food = multipliers?.food * travelers * duration;
    const activities = multipliers?.activities * travelers * duration;
    const transport = multipliers?.transport * travelers;
    const miscellaneous = multipliers?.miscellaneous * travelers * duration;
    const total = accommodation + food + activities + transport + miscellaneous;

    setBudgetBreakdown({
      accommodation,
      food,
      activities,
      transport,
      miscellaneous,
      total
    });
  };

  const generateAISuggestions = () => {
    const suggestions = [
      {
        id: 1,
        type: 'savings',
        icon: 'TrendingDown',
        title: 'Save 25% on accommodation',
        description: 'Book 3+ nights at Oceanview Resort for group discount',
        savings: Math.round(budgetBreakdown?.accommodation * 0.25)
      },
      {
        id: 2,
        type: 'timing',
        icon: 'Calendar',
        title: 'Better timing available',
        description: 'Visit in February to save $200 on overall costs',
        savings: 200
      },
      {
        id: 3,
        type: 'alternative',
        icon: 'MapPin',
        title: 'Similar destination nearby',
        description: 'Consider Coastal Bay - 30% cheaper with similar attractions',
        savings: Math.round(budgetBreakdown?.total * 0.3)
      }
    ];

    setAiSuggestions(suggestions);
  };

  const handleInputChange = (field, value) => {
    setEstimatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getBudgetColor = (amount) => {
    if (amount < 1000) return 'text-success';
    if (amount < 2000) return 'text-warning';
    return 'text-error';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-travel-card">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Calculator" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Budget Estimator</h3>
      </div>
      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          label="Travelers"
          type="number"
          value={estimatorData?.travelers}
          onChange={(e) => handleInputChange('travelers', parseInt(e?.target?.value) || 1)}
          min="1"
          max="10"
        />
        
        <Input
          label="Duration (days)"
          type="number"
          value={estimatorData?.duration}
          onChange={(e) => handleInputChange('duration', parseInt(e?.target?.value) || 1)}
          min="1"
          max="30"
        />
        
        <Select
          label="Travel Style"
          options={travelStyleOptions}
          value={estimatorData?.travelStyle}
          onChange={(value) => handleInputChange('travelStyle', value)}
        />
        
        <Input
          label="Start Date"
          type="date"
          value={estimatorData?.startDate}
          onChange={(e) => handleInputChange('startDate', e?.target?.value)}
        />
      </div>
      {/* Budget Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost Categories */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            {Object.entries(budgetBreakdown)?.filter(([key]) => key !== 'total')?.map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={
                      category === 'accommodation' ? 'Building' :
                      category === 'food' ? 'UtensilsCrossed' :
                      category === 'activities' ? 'MapPin' :
                      category === 'transport' ? 'Car' : 'ShoppingBag'
                    } 
                    size={16} 
                    className="text-primary" 
                  />
                  <span className="text-sm font-medium text-foreground capitalize">
                    {category}
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  {formatCurrency(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Summary */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Trip Summary</h4>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatCurrency(budgetBreakdown?.total)}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                Total estimated cost
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(budgetBreakdown?.total / estimatorData?.travelers)} per person
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily budget per person:</span>
              <span className="font-medium text-foreground">
                {formatCurrency((budgetBreakdown?.total / estimatorData?.travelers) / estimatorData?.duration)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travel style:</span>
              <span className="font-medium text-foreground capitalize">
                {estimatorData?.travelStyle?.replace('-', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium text-foreground">
                {estimatorData?.duration} days
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* AI Optimization Suggestions */}
      <div className="border-t border-border pt-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Bot" size={20} className="text-primary" />
          <span>AI Cost Optimization</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {aiSuggestions?.map((suggestion) => (
            <div key={suggestion?.id} className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={suggestion?.icon} 
                  size={20} 
                  className={`mt-0.5 ${
                    suggestion?.type === 'savings' ? 'text-success' :
                    suggestion?.type === 'timing' ? 'text-primary' : 'text-accent'
                  }`} 
                />
                <div className="flex-1">
                  <h5 className="font-medium text-foreground text-sm mb-1">
                    {suggestion?.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mb-2">
                    {suggestion?.description}
                  </p>
                  <div className="text-xs font-semibold text-success">
                    Save {formatCurrency(suggestion?.savings)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1">
            <Icon name="Calendar" size={16} className="mr-2" />
            Create Itinerary
          </Button>
          <Button variant="outline" className="flex-1">
            <Icon name="Download" size={16} className="mr-2" />
            Export Budget
          </Button>
          <Button variant="outline" className="flex-1">
            <Icon name="Share2" size={16} className="mr-2" />
            Share with Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimator;