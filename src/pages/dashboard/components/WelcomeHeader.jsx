import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, currentTrip }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
            {getCurrentGreeting()}, {userName}!
          </h1>
          <p className="text-primary-foreground/80 text-sm lg:text-base">
            Ready to explore your next adventure?
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-white/10 rounded-lg p-3">
            <Icon name="MapPin" size={24} />
          </div>
        </div>
      </div>
      {currentTrip && (
        <div className="mt-4 bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/80">Current Trip</p>
              <p className="font-medium">{currentTrip?.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Days left</p>
              <p className="font-medium">{currentTrip?.daysLeft}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeHeader;