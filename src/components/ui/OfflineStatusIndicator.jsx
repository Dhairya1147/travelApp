import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const OfflineStatusIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showDetails, setShowDetails] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced', 'syncing', 'pending'
  const [cachedData, setCachedData] = useState({
    destinations: 12,
    itineraries: 3,
    groups: 2,
    lastSync: new Date()
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setSyncStatus('syncing');
      
      // Simulate sync process
      setTimeout(() => {
        setSyncStatus('synced');
        setCachedData(prev => ({
          ...prev,
          lastSync: new Date()
        }));
      }, 2000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setSyncStatus('pending');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusConfig = () => {
    if (isOffline) {
      return {
        icon: 'WifiOff',
        text: 'Offline',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        description: 'Using cached data'
      };
    }

    switch (syncStatus) {
      case 'syncing':
        return {
          icon: 'RefreshCw',
          text: 'Syncing',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          description: 'Updating data...',
          animate: true
        };
      case 'pending':
        return {
          icon: 'Clock',
          text: 'Pending',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          description: 'Changes will sync when online'
        };
      default:
        return {
          icon: 'Wifi',
          text: 'Online',
          color: 'text-success',
          bgColor: 'bg-success/10',
          description: 'All data synchronized'
        };
    }
  };

  const status = getStatusConfig();

  // Don't show indicator when online and synced
  if (!isOffline && syncStatus === 'synced') {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDetails(!showDetails)}
        className={`${status?.bgColor} ${status?.color} hover:opacity-80`}
      >
        <Icon 
          name={status?.icon} 
          size={14} 
          className={status?.animate ? 'animate-spin' : ''} 
        />
        <span className="ml-1 text-xs font-medium hidden sm:inline">
          {status?.text}
        </span>
      </Button>
      {/* Details Dropdown */}
      {showDetails && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-travel-modal z-dropdown animate-slide-in">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={status?.icon} size={16} className={status?.color} />
              <div>
                <h4 className="font-medium text-popover-foreground">{status?.text}</h4>
                <p className="text-xs text-muted-foreground">{status?.description}</p>
              </div>
            </div>

            {isOffline && (
              <div className="space-y-3">
                <div className="border-t border-border pt-3">
                  <h5 className="text-sm font-medium text-popover-foreground mb-2">
                    Available Offline
                  </h5>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Destinations</span>
                      <span>{cachedData?.destinations} cached</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Itineraries</span>
                      <span>{cachedData?.itineraries} saved</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Groups</span>
                      <span>{cachedData?.groups} available</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>
                      Last sync: {cachedData?.lastSync?.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {syncStatus === 'syncing' && (
              <div className="border-t border-border pt-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Synchronizing your travel data...</span>
                </div>
              </div>
            )}

            {syncStatus === 'pending' && (
              <div className="border-t border-border pt-3">
                <div className="text-xs text-muted-foreground">
                  <p>Your changes are saved locally and will sync automatically when you're back online.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineStatusIndicator;