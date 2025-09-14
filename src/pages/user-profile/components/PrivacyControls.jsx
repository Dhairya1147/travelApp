import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = ({ privacySettings, onUpdatePrivacy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSettings, setEditSettings] = useState(privacySettings);

  const privacyOptions = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      options: [
        { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
        { value: 'friends', label: 'Travel Connections Only', description: 'Only people you\'ve traveled with' },
        { value: 'private', label: 'Private', description: 'Only you can see your profile' }
      ]
    },
    {
      id: 'locationSharing',
      title: 'Location Sharing',
      description: 'Share your location for better recommendations',
      options: [
        { value: 'always', label: 'Always', description: 'Share location for personalized suggestions' },
        { value: 'trips', label: 'During Trips Only', description: 'Share location only when traveling' },
        { value: 'never', label: 'Never', description: 'Don\'t share location data' }
      ]
    },
    {
      id: 'dataUsage',
      title: 'Data Usage for AI',
      description: 'How your data is used to improve recommendations',
      options: [
        { value: 'full', label: 'Full Personalization', description: 'Use all data for best recommendations' },
        { value: 'limited', label: 'Limited Data', description: 'Use only basic preferences' },
        { value: 'minimal', label: 'Minimal Data', description: 'Use only essential data' }
      ]
    }
  ];

  const communicationSettings = [
    { id: 'showEmail', label: 'Show email to travel connections', description: 'Allow verified travel partners to see your email' },
    { id: 'showPhone', label: 'Show phone to group members', description: 'Share phone number with confirmed group members' },
    { id: 'allowMessages', label: 'Allow messages from other travelers', description: 'Receive messages from verified users' },
    { id: 'showTravelHistory', label: 'Show travel history', description: 'Display your past trips on your profile' },
    { id: 'showReviews', label: 'Show reviews and ratings', description: 'Display reviews you\'ve written publicly' }
  ];

  const dataRetentionOptions = [
    { id: 'searchHistory', label: 'Search History', description: 'Keep search history for 6 months to improve suggestions' },
    { id: 'locationHistory', label: 'Location History', description: 'Store location data for personalized recommendations' },
    { id: 'interactionData', label: 'Interaction Data', description: 'Track app usage to enhance user experience' },
    { id: 'preferenceData', label: 'Preference Learning', description: 'Remember your choices to provide better matches' }
  ];

  const handleSave = () => {
    onUpdatePrivacy(editSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSettings(privacySettings);
    setIsEditing(false);
  };

  const updateSetting = (category, key, value) => {
    setEditSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [key]: value
      }
    }));
  };

  const toggleBooleanSetting = (category, key) => {
    setEditSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [key]: !prev?.[category]?.[key]
      }
    }));
  };

  const getPrivacyIcon = (level) => {
    switch (level) {
      case 'public': case'always': case'full':
        return { icon: 'Globe', color: 'text-success' };
      case 'friends': case'trips': case'limited':
        return { icon: 'Users', color: 'text-warning' };
      case 'private': case'never': case'minimal':
        return { icon: 'Lock', color: 'text-error' };
      default:
        return { icon: 'Shield', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Privacy & Data Controls</h2>
          <p className="text-sm text-muted-foreground">
            Manage how your data is used and shared to enhance your travel experience
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Settings"
            iconPosition="left"
          >
            Edit Privacy Settings
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-8">
          {/* Main Privacy Options */}
          {privacyOptions?.map((section) => (
            <div key={section?.id}>
              <h3 className="font-medium text-foreground mb-2">{section?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{section?.description}</p>
              <div className="space-y-3">
                {section?.options?.map((option) => (
                  <label key={option?.value} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                    <input
                      type="radio"
                      name={section?.id}
                      value={option?.value}
                      checked={editSettings?.main?.[section?.id] === option?.value}
                      onChange={(e) => updateSetting('main', section?.id, e?.target?.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={getPrivacyIcon(option?.value)?.icon} size={16} className={getPrivacyIcon(option?.value)?.color} />
                        <span className="font-medium text-foreground">{option?.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option?.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Communication Settings */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Communication Preferences</h3>
            <div className="space-y-3">
              {communicationSettings?.map((setting) => (
                <label key={setting?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editSettings?.communication?.[setting?.id]}
                    onChange={() => toggleBooleanSetting('communication', setting?.id)}
                  />
                  <div>
                    <div className="font-medium text-foreground">{setting?.label}</div>
                    <div className="text-sm text-muted-foreground">{setting?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Data Retention & Learning</h3>
            <div className="space-y-3">
              {dataRetentionOptions?.map((option) => (
                <label key={option?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editSettings?.dataRetention?.[option?.id]}
                    onChange={() => toggleBooleanSetting('dataRetention', option?.id)}
                  />
                  <div>
                    <div className="font-medium text-foreground">{option?.label}</div>
                    <div className="text-sm text-muted-foreground">{option?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button onClick={handleSave} iconName="Check" iconPosition="left">
              Save Privacy Settings
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current Settings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {privacyOptions?.map((section) => {
              const currentValue = privacySettings?.main?.[section?.id];
              const currentOption = section?.options?.find(opt => opt?.value === currentValue);
              const iconConfig = getPrivacyIcon(currentValue);
              
              return (
                <div key={section?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={iconConfig?.icon} size={16} className={iconConfig?.color} />
                    <h4 className="font-medium text-foreground">{section?.title}</h4>
                  </div>
                  <p className="text-sm text-primary font-medium">{currentOption?.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{currentOption?.description}</p>
                </div>
              );
            })}
          </div>

          {/* Data Usage Benefits */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">How Your Data Improves Your Experience</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Location data helps find nearby attractions and restaurants</li>
                  <li>• Travel history enables personalized destination recommendations</li>
                  <li>• Preference learning suggests activities you'll love</li>
                  <li>• Group data helps match you with compatible travel partners</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" iconName="Download">
              Download My Data
            </Button>
            <Button variant="outline" size="sm" iconName="Trash2">
              Delete Account
            </Button>
            <Button variant="outline" size="sm" iconName="FileText">
              Privacy Policy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;