import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TravelPreferences = ({ preferences, onUpdatePreferences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPreferences, setEditPreferences] = useState(preferences);

  const adventureLevels = [
    { id: 'relaxed', label: 'Relaxed Explorer', description: 'Comfortable accommodations, popular destinations' },
    { id: 'moderate', label: 'Moderate Adventurer', description: 'Mix of comfort and adventure, some off-path experiences' },
    { id: 'extreme', label: 'Extreme Adventurer', description: 'Remote locations, challenging activities, unique experiences' }
  ];

  const budgetRanges = [
    { id: 'budget', label: 'Budget Traveler', range: '₹500-1500/day', description: 'Hostels, local transport, street food' },
    { id: 'mid', label: 'Mid-Range', range: '₹1500-3000/day', description: 'Hotels, mix of activities, restaurant dining' },
    { id: 'luxury', label: 'Luxury', range: '₹3000+/day', description: 'Premium accommodations, exclusive experiences' }
  ];

  const accommodationTypes = [
    { id: 'hotel', label: 'Hotels', icon: 'Building' },
    { id: 'hostel', label: 'Hostels', icon: 'Users' },
    { id: 'airbnb', label: 'Vacation Rentals', icon: 'Home' },
    { id: 'resort', label: 'Resorts', icon: 'Palmtree' },
    { id: 'camping', label: 'Camping', icon: 'Tent' },
    { id: 'boutique', label: 'Boutique Hotels', icon: 'Star' }
  ];

  const activityInterests = [
    { id: 'culture', label: 'Cultural Sites', icon: 'Landmark' },
    { id: 'nature', label: 'Nature & Wildlife', icon: 'Trees' },
    { id: 'adventure', label: 'Adventure Sports', icon: 'Mountain' },
    { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Music' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { id: 'wellness', label: 'Wellness & Spa', icon: 'Heart' },
    { id: 'photography', label: 'Photography', icon: 'Camera' }
  ];

  const dietaryRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-allergy', label: 'Nut Allergy' }
  ];

  const handleSave = () => {
    onUpdatePreferences(editPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditPreferences(preferences);
    setIsEditing(false);
  };

  const updatePreference = (category, value) => {
    setEditPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const toggleArrayPreference = (category, itemId) => {
    setEditPreferences(prev => ({
      ...prev,
      [category]: prev?.[category]?.includes(itemId)
        ? prev?.[category]?.filter(id => id !== itemId)
        : [...prev?.[category], itemId]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Travel Preferences</h2>
          <p className="text-sm text-muted-foreground">
            Help our AI provide better recommendations by sharing your travel style
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            <Icon name="Brain" size={12} />
            <span>AI Learning: {preferences?.aiLearningScore}%</span>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              iconName="Settings"
              iconPosition="left"
            >
              Edit Preferences
            </Button>
          )}
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-8">
          {/* Adventure Level */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Adventure Level</h3>
            <div className="space-y-3">
              {adventureLevels?.map((level) => (
                <label key={level?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <input
                    type="radio"
                    name="adventureLevel"
                    value={level?.id}
                    checked={editPreferences?.adventureLevel === level?.id}
                    onChange={(e) => updatePreference('adventureLevel', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-foreground">{level?.label}</div>
                    <div className="text-sm text-muted-foreground">{level?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Budget Range</h3>
            <div className="space-y-3">
              {budgetRanges?.map((budget) => (
                <label key={budget?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <input
                    type="radio"
                    name="budgetRange"
                    value={budget?.id}
                    checked={editPreferences?.budgetRange === budget?.id}
                    onChange={(e) => updatePreference('budgetRange', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-foreground">{budget?.label}</div>
                    <div className="text-sm text-primary font-medium">{budget?.range}</div>
                    <div className="text-sm text-muted-foreground">{budget?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Accommodation Types */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Preferred Accommodations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {accommodationTypes?.map((type) => (
                <label key={type?.id} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editPreferences?.accommodationTypes?.includes(type?.id)}
                    onChange={() => toggleArrayPreference('accommodationTypes', type?.id)}
                  />
                  <Icon name={type?.icon} size={16} />
                  <span className="text-sm">{type?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Activity Interests */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Activity Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {activityInterests?.map((activity) => (
                <label key={activity?.id} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editPreferences?.activityInterests?.includes(activity?.id)}
                    onChange={() => toggleArrayPreference('activityInterests', activity?.id)}
                  />
                  <Icon name={activity?.icon} size={16} />
                  <span className="text-sm">{activity?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Dietary Restrictions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryRestrictions?.map((diet) => (
                <label key={diet?.id} className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editPreferences?.dietaryRestrictions?.includes(diet?.id)}
                    onChange={() => toggleArrayPreference('dietaryRestrictions', diet?.id)}
                  />
                  <span className="text-sm">{diet?.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button onClick={handleSave} iconName="Check" iconPosition="left">
              Save Preferences
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Adventure Level</h4>
              <div className="flex items-center gap-2">
                <Icon name="Mountain" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {adventureLevels?.find(l => l?.id === preferences?.adventureLevel)?.label}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Budget Range</h4>
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {budgetRanges?.find(b => b?.id === preferences?.budgetRange)?.label}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Preferred Accommodations</h4>
            <div className="flex flex-wrap gap-2">
              {preferences?.accommodationTypes?.map((typeId) => {
                const type = accommodationTypes?.find(t => t?.id === typeId);
                return (
                  <div key={typeId} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                    <Icon name={type?.icon} size={12} />
                    <span>{type?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Activity Interests</h4>
            <div className="flex flex-wrap gap-2">
              {preferences?.activityInterests?.map((activityId) => {
                const activity = activityInterests?.find(a => a?.id === activityId);
                return (
                  <div key={activityId} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    <Icon name={activity?.icon} size={12} />
                    <span>{activity?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {preferences?.dietaryRestrictions?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">Dietary Restrictions</h4>
              <div className="flex flex-wrap gap-2">
                {preferences?.dietaryRestrictions?.map((dietId) => {
                  const diet = dietaryRestrictions?.find(d => d?.id === dietId);
                  return (
                    <div key={dietId} className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs">
                      {diet?.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelPreferences;