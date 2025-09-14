import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TravelHistory = ({ travelHistory }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'grid'

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const formatDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  const TripCard = ({ trip, isSelected, onClick }) => (
    <div
      className={`bg-card border rounded-lg p-4 cursor-pointer transition-travel hover:shadow-travel-card ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
      }`}
      onClick={() => onClick(trip)}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={trip?.coverImage}
            alt={trip?.destination}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-foreground truncate">{trip?.destination}</h3>
            <div className="flex items-center gap-1 ml-2">
              {renderStars(trip?.rating)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={12} />
              <span>{new Date(trip.startDate)?.toLocaleDateString()} - {new Date(trip.endDate)?.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{formatDuration(trip?.startDate, trip?.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="DollarSign" size={12} />
              <span>₹{trip?.totalCost?.toLocaleString()}</span>
            </div>
          </div>
          {trip?.highlights && trip?.highlights?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {trip?.highlights?.slice(0, 2)?.map((highlight, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {highlight}
                </span>
              ))}
              {trip?.highlights?.length > 2 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{trip?.highlights?.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TripDetails = ({ trip }) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{trip?.destination}</h2>
          <p className="text-muted-foreground">{trip?.country}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedTrip(null)}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Trip Details</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span>{new Date(trip.startDate)?.toLocaleDateString()} - {new Date(trip.endDate)?.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span>{formatDuration(trip?.startDate, trip?.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span>{trip?.travelers} traveler{trip?.travelers > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                <span>₹{trip?.totalCost?.toLocaleString()} total cost</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Your Rating</h4>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(trip?.rating)}</div>
              <span className="text-sm text-muted-foreground">({trip?.rating}/5)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Trip Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {trip?.highlights?.map((highlight, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Accommodation</h4>
            <p className="text-sm text-muted-foreground">{trip?.accommodation}</p>
          </div>
        </div>
      </div>

      {trip?.photos && trip?.photos?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3">Trip Photos</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trip?.photos?.map((photo, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={photo?.caption || `${trip?.destination} photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {trip?.notes && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-2">Trip Notes</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{trip?.notes}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Travel History</h2>
          <p className="text-sm text-muted-foreground">
            Your travel experiences help improve AI recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
            <Icon name="Plane" size={14} />
            <span>{travelHistory?.length} trips</span>
          </div>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('timeline')}
            iconName="List"
          >
            Timeline
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            iconName="Grid3X3"
          >
            Grid
          </Button>
        </div>
      </div>
      {selectedTrip ? (
        <TripDetails trip={selectedTrip} />
      ) : (
        <div className={viewMode === 'timeline' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          {travelHistory?.map((trip) => (
            <TripCard
              key={trip?.id}
              trip={trip}
              isSelected={false}
              onClick={setSelectedTrip}
            />
          ))}
        </div>
      )}
      {travelHistory?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No trips yet</h3>
          <p className="text-muted-foreground mb-4">
            Start planning your first adventure to build your travel history
          </p>
          <Button iconName="Plus" iconPosition="left">
            Plan Your First Trip
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelHistory;