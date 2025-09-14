import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = ({ offlineCapabilities }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="WifiOff" size={16} className="text-warning" />
          <span className="text-sm font-medium text-warning">Offline Mode</span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-warning hover:text-warning/80 transition-travel"
        >
          <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>
      </div>
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-warning/20">
          <p className="text-xs text-muted-foreground mb-3">
            Limited functionality available offline:
          </p>
          
          <div className="space-y-2">
            {offlineCapabilities?.map((capability, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon 
                  name={capability?.available ? "Check" : "X"} 
                  size={12} 
                  className={capability?.available ? "text-success" : "text-error"} 
                />
                <span className="text-xs text-muted-foreground">{capability?.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2 bg-background/50 rounded border border-border">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={12} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your conversations are saved locally and will sync when you're back online.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;