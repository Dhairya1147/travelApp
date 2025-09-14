import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ itinerary, onLocationSelect, onRouteOptimize }) => {
  const [mapView, setMapView] = useState('standard');
  const [showCrowdData, setShowCrowdData] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [routeOptions, setRouteOptions] = useState([]);
  const mapRef = useRef(null);

  // Mock location data for the itinerary
  const locations = itinerary?.days?.flatMap((day, dayIndex) => 
    day?.activities?.map((activity, activityIndex) => ({
      id: `${dayIndex}-${activityIndex}`,
      dayIndex,
      activityIndex,
      title: activity?.title,
      location: activity?.location || `Location ${activityIndex + 1}`,
      lat: 37.7749 + (Math.random() - 0.5) * 0.1, // Mock coordinates around SF
      lng: -122.4194 + (Math.random() - 0.5) * 0.1,
      crowdLevel: activity?.crowdLevel,
      cost: activity?.cost,
      type: activity?.type || 'activity'
    }))
  );

  const crowdData = [
    { lat: 37.7849, lng: -122.4094, level: 'high', radius: 500 },
    { lat: 37.7649, lng: -122.4294, level: 'medium', radius: 300 },
    { lat: 37.7549, lng: -122.4394, level: 'low', radius: 200 }
  ];

  const alternativeRoutes = [
    {
      id: 1,
      name: 'Scenic Route',
      description: 'Takes coastal path with beautiful views',
      duration: '45 min',
      distance: '12.5 km',
      crowdLevel: 'low',
      savings: 0,
      highlights: ['Ocean views', 'Photo spots', 'Less traffic']
    },
    {
      id: 2,
      name: 'Express Route',
      description: 'Fastest route via highway',
      duration: '28 min',
      distance: '15.2 km',
      crowdLevel: 'high',
      savings: 0,
      highlights: ['Fastest option', 'Direct path', 'Highway access']
    },
    {
      id: 3,
      name: 'Budget Route',
      description: 'Uses public transportation',
      duration: '52 min',
      distance: '18.1 km',
      crowdLevel: 'medium',
      savings: 15,
      highlights: ['Cost effective', 'Local experience', 'Eco-friendly']
    }
  ];

  useEffect(() => {
    setRouteOptions(alternativeRoutes);
  }, []);

  const getCrowdColor = (level) => {
    switch (level) {
      case 'low': return '#059669';
      case 'medium': return '#D97706';
      case 'high': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'restaurant': return 'UtensilsCrossed';
      case 'hotel': return 'Bed';
      case 'attraction': return 'Camera';
      case 'transport': return 'Car';
      default: return 'MapPin';
    }
  };

  const handleRouteSelect = (route) => {
    onRouteOptimize(route);
  };

  const filteredLocations = selectedDay === -1 
    ? locations 
    : locations?.filter(loc => loc?.dayIndex === selectedDay);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Interactive Map</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={showCrowdData ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCrowdData(!showCrowdData)}
          >
            <Icon name="Users" size={16} />
            Crowd Data
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Navigation" size={16} />
            Directions
          </Button>
        </div>
      </div>
      {/* Map Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-card-foreground">View:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {['standard', 'satellite', 'terrain']?.map((view) => (
              <Button
                key={view}
                variant={mapView === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setMapView(view)}
                className="rounded-none border-0"
              >
                {view?.charAt(0)?.toUpperCase() + view?.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-card-foreground">Day:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={selectedDay === -1 ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedDay(-1)}
              className="rounded-none border-0"
            >
              All
            </Button>
            {itinerary?.days?.map((_, index) => (
              <Button
                key={index}
                variant={selectedDay === index ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDay(index)}
                className="rounded-none border-0"
              >
                Day {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative bg-background rounded-lg border border-border overflow-hidden mb-6">
        <div ref={mapRef} className="w-full h-96">
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Itinerary Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=37.7749,-122.4194&z=12&output=embed"
            className="w-full h-full"
          />
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="icon" className="bg-background">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-background">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-background">
            <Icon name="Locate" size={16} />
          </Button>
        </div>

        {/* Legend */}
        {showCrowdData && (
          <div className="absolute bottom-4 left-4 bg-background rounded-lg border border-border p-3">
            <h4 className="text-sm font-medium text-card-foreground mb-2">Crowd Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Location List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Locations */}
        <div>
          <h3 className="font-medium text-card-foreground mb-4">Planned Locations</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredLocations?.map((location) => (
              <div
                key={location?.id}
                className="bg-background rounded-lg border border-border p-3 cursor-pointer hover:shadow-travel-card transition-travel"
                onClick={() => onLocationSelect(location)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                         style={{ backgroundColor: getCrowdColor(location?.crowdLevel) }}>
                      {location?.dayIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{location?.title}</h4>
                      <p className="text-sm text-muted-foreground">{location?.location}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-muted-foreground">${location?.cost}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          location?.crowdLevel === 'low' ? 'bg-success/10 text-success' :
                          location?.crowdLevel === 'medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                        }`}>
                          {location?.crowdLevel} crowd
                        </span>
                      </div>
                    </div>
                  </div>
                  <Icon name={getLocationIcon(location?.type)} size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Routes */}
        <div>
          <h3 className="font-medium text-card-foreground mb-4">Route Options</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {routeOptions?.map((route) => (
              <div key={route?.id} className="bg-background rounded-lg border border-border p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-card-foreground">{route?.name}</h4>
                    <p className="text-sm text-muted-foreground">{route?.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRouteSelect(route)}
                  >
                    Select
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{route?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Route" size={12} />
                    <span>{route?.distance}</span>
                  </div>
                  {route?.savings > 0 && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="DollarSign" size={12} />
                      <span>Save ${route?.savings}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {route?.highlights?.map((highlight, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;