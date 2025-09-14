import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherIntegration = ({ itinerary, onWeatherAlert, onAlternativeSuggestion }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data fetch
    const fetchWeatherData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockWeatherData = itinerary?.days?.map((day, index) => ({
          date: day?.date,
          dayIndex: index,
          temperature: {
            high: Math.floor(Math.random() * 15) + 20, // 20-35°C
            low: Math.floor(Math.random() * 10) + 15   // 15-25°C
          },
          condition: ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy']?.[Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          precipitation: Math.floor(Math.random() * 100), // 0-100%
          uvIndex: Math.floor(Math.random() * 11), // 0-10
          visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
          hourlyForecast: Array.from({ length: 24 }, (_, hour) => ({
            hour,
            temperature: Math.floor(Math.random() * 10) + 18,
            condition: ['sunny', 'partly-cloudy', 'cloudy', 'rainy']?.[Math.floor(Math.random() * 4)],
            precipitation: Math.floor(Math.random() * 100)
          }))
        }));

        setWeatherData(mockWeatherData);

        // Generate weather alerts
        const weatherAlerts = [];
        mockWeatherData?.forEach((weather, index) => {
          const currentDay = itinerary?.days?.[index]; // Get the corresponding day from itinerary
          
          if (weather?.condition === 'rainy' || weather?.condition === 'stormy') {
            weatherAlerts?.push({
              id: `alert-${index}`,
              type: 'weather',
              severity: weather?.condition === 'stormy' ? 'high' : 'medium',
              title: `${weather?.condition === 'stormy' ? 'Storm' : 'Rain'} Expected`,
              message: `${weather?.condition === 'stormy' ? 'Heavy rain and storms' : 'Rain'} expected on ${weather?.date}. Consider indoor alternatives.`,
              dayIndex: index,
              affectedActivities: currentDay?.activities?.filter(activity => 
                activity?.type === 'outdoor' || activity?.location?.includes('park') || activity?.location?.includes('beach')
              )?.length || 0
            });
          }
          
          if (weather?.temperature?.high > 32) {
            weatherAlerts?.push({
              id: `heat-${index}`,
              type: 'temperature',
              severity: 'medium',
              title: 'High Temperature Alert',
              message: `Very hot weather expected (${weather?.temperature?.high}°C). Stay hydrated and seek shade.`,
              dayIndex: index,
              affectedActivities: currentDay?.activities?.filter(activity => 
                activity?.type === 'outdoor'
              )?.length || 0
            });
          }
        });

        setAlerts(weatherAlerts);
        setIsLoading(false);
      }, 1000);
    };

    fetchWeatherData();
  }, [itinerary]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return 'Sun';
      case 'partly-cloudy': return 'CloudSun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'stormy': return 'CloudLightning';
      default: return 'Sun';
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'sunny': return 'text-yellow-500';
      case 'partly-cloudy': return 'text-blue-400';
      case 'cloudy': return 'text-gray-500';
      case 'rainy': return 'text-blue-600';
      case 'stormy': return 'text-purple-600';
      default: return 'text-gray-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAlternativeSuggestions = (dayIndex, condition) => {
    const suggestions = {
      rainy: [
        'Visit indoor museums and galleries',
        'Explore shopping centers and markets',
        'Try indoor entertainment venues',
        'Book spa or wellness activities',
        'Attend cultural performances or shows'
      ],
      stormy: [
        'Stay at accommodation and relax',
        'Visit hotel facilities (gym, spa, restaurant)',
        'Explore nearby indoor attractions',
        'Plan indoor group activities',
        'Catch up on rest and planning'
      ],
      hot: [
        'Visit air-conditioned venues',
        'Plan early morning or evening activities',
        'Seek shaded outdoor spaces',
        'Include water-based activities',
        'Take frequent breaks indoors'
      ]
    };

    return suggestions?.[condition === 'stormy' ? 'stormy' : condition === 'rainy' ? 'rainy' : 'hot'] || [];
  };

  const handleAlertAction = (alert) => {
    onWeatherAlert(alert);
    setShowAlternatives(true);
  };

  const handleAlternativeSelect = (suggestion, dayIndex) => {
    onAlternativeSuggestion(suggestion, dayIndex);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="CloudSun" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-card-foreground">Weather Forecast</h2>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} />
          Update
        </Button>
      </div>
      {/* Weather Alerts */}
      {alerts?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-card-foreground mb-3">Weather Alerts</h3>
          <div className="space-y-3">
            {alerts?.map((alert) => (
              <div key={alert?.id} className={`rounded-lg border p-4 ${getSeverityColor(alert?.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="AlertTriangle" size={16} />
                      <h4 className="font-medium">{alert?.title}</h4>
                    </div>
                    <p className="text-sm mb-2">{alert?.message}</p>
                    <p className="text-xs opacity-80">
                      Affects {alert?.affectedActivities} outdoor activit{alert?.affectedActivities !== 1 ? 'ies' : 'y'} on Day {alert?.dayIndex + 1}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAlertAction(alert)}
                  >
                    View Options
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Daily Weather Forecast */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Daily Forecast</h3>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="bg-background rounded-lg border border-border p-4 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="w-8 h-8 bg-muted rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherData?.map((weather, index) => (
              <div key={index} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-card-foreground">Day {index + 1}</h4>
                    <p className="text-sm text-muted-foreground">{weather?.date}</p>
                  </div>
                  <Icon 
                    name={getWeatherIcon(weather?.condition)} 
                    size={32} 
                    className={getWeatherColor(weather?.condition)} 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium text-card-foreground">
                      {weather?.temperature?.high}° / {weather?.temperature?.low}°
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium text-card-foreground capitalize">
                      {weather?.condition?.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rain Chance</span>
                    <span className="font-medium text-card-foreground">{weather?.precipitation}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Wind</span>
                    <span className="font-medium text-card-foreground">{weather?.windSpeed} km/h</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">UV Index</span>
                    <span className={`font-medium ${weather?.uvIndex > 7 ? 'text-error' : weather?.uvIndex > 4 ? 'text-warning' : 'text-success'}`}>
                      {weather?.uvIndex}
                    </span>
                  </div>
                </div>

                {(weather?.condition === 'rainy' || weather?.condition === 'stormy' || weather?.temperature?.high > 32) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleAlertAction({ dayIndex: index, condition: weather?.condition })}
                  >
                    <Icon name="Lightbulb" size={14} />
                    View Alternatives
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Alternative Suggestions Modal */}
      {showAlternatives && (
        <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium text-card-foreground">Weather Alternatives</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowAlternatives(false)}>
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Here are some indoor alternatives for adverse weather conditions:
              </p>
              
              <div className="space-y-2">
                {getAlternativeSuggestions(0, 'rainy')?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAlternativeSelect(suggestion, 0)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-travel"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="ArrowRight" size={14} className="text-primary" />
                      <span className="text-sm text-card-foreground">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherIntegration;