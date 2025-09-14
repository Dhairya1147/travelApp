import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WeatherAlerts = () => {
  const weatherAlerts = [
    {
      id: 1,
      destination: "Paris, France",
      alert: "Rain expected",
      description: "Heavy rainfall predicted for March 18-20. Pack an umbrella!",
      severity: "medium",
      icon: "CloudRain",
      date: "March 18-20",
      temperature: "12°C - 16°C"
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      alert: "Perfect weather",
      description: "Clear skies and mild temperatures. Great for sightseeing!",
      severity: "low",
      icon: "Sun",
      date: "March 25-30",
      temperature: "18°C - 24°C"
    },
    {
      id: 3,
      destination: "Bali, Indonesia",
      alert: "High humidity",
      description: "Tropical weather with high humidity. Stay hydrated!",
      severity: "low",
      icon: "Droplets",
      date: "April 5-12",
      temperature: "26°C - 32°C"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Weather & Travel Alerts
          </h2>
          <p className="text-muted-foreground text-sm">
            Stay informed about conditions at your destinations
          </p>
        </div>
        <Link
          to="/destination-details"
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
        >
          <span>View Details</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherAlerts?.map((alert) => (
          <div key={alert?.id} className={`border rounded-lg p-4 ${getSeverityColor(alert?.severity)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={alert?.icon} 
                  size={20} 
                  className={getIconColor(alert?.severity)} 
                />
                <h3 className="font-medium text-sm">{alert?.destination}</h3>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                {alert?.date}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">{alert?.alert}</h4>
              <p className="text-sm opacity-80">{alert?.description}</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-current/20">
                <div className="flex items-center space-x-1">
                  <Icon name="Thermometer" size={14} />
                  <span className="text-sm font-medium">{alert?.temperature}</span>
                </div>
                <Link
                  to={`/destination-details?destination=${encodeURIComponent(alert?.destination)}`}
                  className="text-sm font-medium hover:underline flex items-center space-x-1"
                >
                  <span>Details</span>
                  <Icon name="ExternalLink" size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Weather Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={16} className="text-primary" />
          <h3 className="font-medium text-foreground">Weather Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Umbrella" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium">Rainy Season</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Pack waterproof clothing and plan indoor activities as backup
            </p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Sun" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium">Sunny Days</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Don't forget sunscreen, sunglasses, and stay hydrated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;