import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      destination: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
      reason: "Based on your love for cultural experiences",
      budget: "$1,200 - $1,800",
      bestTime: "March - May",
      crowdLevel: "Medium",
      highlights: ["Cherry Blossoms", "Ancient Temples", "Traditional Culture"],
      aiScore: 95
    },
    {
      id: 2,
      destination: "Santorini, Greece",
      image: "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?w=400&h=300&fit=crop",
      reason: "Perfect for your romantic getaway preference",
      budget: "$800 - $1,400",
      bestTime: "April - October",
      crowdLevel: "High",
      highlights: ["Sunset Views", "White Architecture", "Wine Tasting"],
      aiScore: 92
    },
    {
      id: 3,
      destination: "Banff, Canada",
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/lake-louise-1846416_960_720.jpg",
      reason: "Matches your adventure travel style",
      budget: "$600 - $1,000",
      bestTime: "June - September",
      crowdLevel: "Low",
      highlights: ["Mountain Lakes", "Hiking Trails", "Wildlife"],
      aiScore: 89
    }
  ];

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
            AI Recommendations for You
          </h2>
          <p className="text-muted-foreground">
            Personalized suggestions based on your travel preferences
          </p>
        </div>
        <Link
          to="/destination-details"
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations?.map((rec) => (
          <div key={rec?.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-travel-card transition-travel group">
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <Image
                  src={rec?.image}
                  alt={rec?.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-travel"
                />
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <Icon name="Sparkles" size={12} className="text-primary" />
                <span className="text-xs font-medium">{rec?.aiScore}% Match</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{rec?.destination}</h3>
              <p className="text-sm text-muted-foreground mb-4">{rec?.reason}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{rec?.budget}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Best Time</span>
                  <span className="font-medium">{rec?.bestTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Crowd Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdColor(rec?.crowdLevel)}`}>
                    {rec?.crowdLevel}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {rec?.highlights?.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/destination-details?destination=${encodeURIComponent(rec?.destination)}`}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-travel flex items-center justify-center space-x-2"
              >
                <span>Explore Details</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;