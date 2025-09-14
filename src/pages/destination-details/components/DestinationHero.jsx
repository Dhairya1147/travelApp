import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationHero = ({ destination, onSaveToFavorites, onShare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === destination?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? destination?.images?.length - 1 : prev - 1
    );
  };

  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'snowy': return 'CloudSnow';
      default: return 'Sun';
    }
  };

  return (
    <div className="relative bg-card rounded-lg overflow-hidden shadow-travel-card">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={destination?.images?.[currentImageIndex]}
          alt={`${destination?.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        {destination?.images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {destination?.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-travel ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSaveToFavorites}
            className="bg-black/50 text-white hover:bg-black/70 w-10 h-10"
          >
            <Icon name="Heart" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="bg-black/50 text-white hover:bg-black/70 w-10 h-10"
          >
            <Icon name="Share2" size={18} />
          </Button>
        </div>
      </div>
      {/* Destination Info */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{destination?.name}</h1>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.floor(destination?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({destination?.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground mb-4">
              <Icon name="MapPin" size={16} />
              <span>{destination?.location}</span>
            </div>

            <p className="text-foreground leading-relaxed mb-4">
              {destination?.description}
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap gap-2">
              {destination?.features?.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64">
            {/* Weather */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={getWeatherIcon(destination?.weather?.condition)} size={20} className="text-primary" />
                <span className="font-medium text-foreground">Weather</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{destination?.weather?.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{destination?.weather?.condition}</div>
            </div>

            {/* Crowd Level */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Crowd Level</span>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getCrowdLevelColor(destination?.crowdLevel)}`}>
                {destination?.crowdLevel}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Current status</div>
            </div>

            {/* AI Score */}
            <div className="bg-muted rounded-lg p-4 lg:col-span-1 col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Bot" size={20} className="text-primary" />
                <span className="font-medium text-foreground">AI Match Score</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-success">{destination?.aiScore}%</div>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-travel"
                    style={{ width: `${destination?.aiScore}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Perfect for your travel style</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;