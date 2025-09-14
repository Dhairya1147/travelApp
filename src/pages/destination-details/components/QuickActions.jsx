import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ destination, onCreateItinerary }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSaveToFavorites = () => {
    setIsSaved(!isSaved);
    // Here you would typically make an API call to save/unsave
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const text = `Check out ${destination?.name} - an amazing travel destination!`;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard?.writeText(url);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const quickActionButtons = [
    {
      id: 'save',
      label: isSaved ? 'Saved' : 'Save to Favorites',
      icon: isSaved ? 'Heart' : 'Heart',
      variant: isSaved ? 'default' : 'outline',
      onClick: handleSaveToFavorites,
      className: isSaved ? 'text-error' : ''
    },
    {
      id: 'itinerary',
      label: 'Create Itinerary',
      icon: 'Calendar',
      variant: 'default',
      onClick: onCreateItinerary
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'Share2',
      variant: 'outline',
      onClick: () => setShowShareMenu(!showShareMenu)
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-travel-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {quickActionButtons?.map((action) => (
          <div key={action?.id} className="relative">
            <Button
              variant={action?.variant}
              onClick={action?.onClick}
              className={`w-full ${action?.className || ''}`}
            >
              <Icon 
                name={action?.icon} 
                size={16} 
                className={`mr-2 ${action?.id === 'save' && isSaved ? 'fill-current' : ''}`} 
              />
              {action?.label}
            </Button>
            
            {/* Share Menu */}
            {action?.id === 'share' && showShareMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-travel-modal z-dropdown">
                <div className="p-2">
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-travel"
                  >
                    <Icon name="Copy" size={16} />
                    <span>Copy Link</span>
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-travel"
                  >
                    <Icon name="MessageCircle" size={16} />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-travel"
                  >
                    <Icon name="Facebook" size={16} />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-travel"
                  >
                    <Icon name="Twitter" size={16} />
                    <span>Twitter</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Travel Group Actions */}
      <div className="border-t border-border pt-4">
        <h4 className="font-medium text-foreground mb-3">Travel Groups</h4>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Users" size={16} className="mr-2" />
            Invite Friends to Join
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Search" size={16} className="mr-2" />
            Find Travel Companions
          </Button>
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Bot" size={20} className="text-primary" />
          <h4 className="font-medium text-foreground">AI Suggestions</h4>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-3">
            Based on your travel history and preferences, here are some personalized suggestions:
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-foreground">Visit during shoulder season (Feb-Mar) for 30% savings</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-foreground">Book accommodation 2 months ahead for best rates</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-foreground">Consider 5-day itinerary for optimal experience</span>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency & Safety Info */}
      <div className="border-t border-border pt-4 mt-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Safety & Emergency</span>
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Emergency Number:</span>
            <span className="font-medium text-foreground">+1-911</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tourist Helpline:</span>
            <span className="font-medium text-foreground">+1-800-TRAVEL</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Safety Rating:</span>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="font-medium text-success">Very Safe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;