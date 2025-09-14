import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import DestinationHero from './components/DestinationHero';
import CrowdPredictionChart from './components/CrowdPredictionChart';
import DestinationTabs from './components/DestinationTabs';
import BudgetEstimator from './components/BudgetEstimator';
import ReviewsSection from './components/ReviewsSection';
import QuickActions from './components/QuickActions';

const DestinationDetails = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Mock destination data
  const destination = {
    id: 1,
    name: "Santorini Paradise",
    location: "Santorini, Greece",
    description: "Experience the magic of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This volcanic island offers a perfect blend of natural beauty, rich history, and Mediterranean charm.",
    rating: 4.8,
    reviewCount: 2847,
    aiScore: 92,
    crowdLevel: "Medium",
    weather: {
      temperature: 24,
      condition: "Sunny"
    },
    images: [
      "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
      "https://images.pixabay.com/photo/2016/04/18/22/05/santorini-1338404_1280.jpg",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg"
    ],
    features: [
      "UNESCO World Heritage",
      "Volcanic Beaches",
      "Wine Tasting",
      "Sunset Views",
      "Historic Sites"
    ],
    attractions: [
      {
        name: "Oia Village",
        description: "Famous for its stunning sunsets and traditional Cycladic architecture",
        distance: "2 km",
        type: "Cultural"
      },
      {
        name: "Red Beach",
        description: "Unique volcanic beach with dramatic red cliffs and clear waters",
        distance: "8 km",
        type: "Natural"
      },
      {
        name: "Akrotiri Archaeological Site",
        description: "Ancient Minoan Bronze Age settlement preserved in volcanic ash",
        distance: "12 km",
        type: "Historical"
      },
      {
        name: "Santo Wines Winery",
        description: "Award-winning winery with panoramic caldera views",
        distance: "5 km",
        type: "Cultural"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveToFavorites = () => {
    // Handle save to favorites logic
    console.log('Saved to favorites');
  };

  const handleShare = () => {
    // Handle share logic
    if (navigator.share) {
      navigator.share({
        title: destination?.name,
        text: destination?.description,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleCreateItinerary = () => {
    navigate('/itinerary-planner', { 
      state: { 
        destination: destination?.name,
        destinationId: destination?.id 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16 md:pt-16 pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="h-96 bg-muted rounded-lg mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="h-64 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 bg-muted rounded-lg"></div>
                  <div className="h-64 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      {/* Main Content */}
      <div className="pt-16 md:pt-16 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Header with Breadcrumbs and Status */}
          <div className="flex items-center justify-between mb-6">
            <BreadcrumbTrail />
            <OfflineStatusIndicator />
          </div>

          {/* Hero Section */}
          <div className="mb-8">
            <DestinationHero
              destination={destination}
              onSaveToFavorites={handleSaveToFavorites}
              onShare={handleShare}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Crowd Prediction Chart */}
              <CrowdPredictionChart destination={destination} />

              {/* Destination Tabs */}
              <DestinationTabs destination={destination} />

              {/* Budget Estimator */}
              <BudgetEstimator destination={destination} />

              {/* Reviews Section */}
              <ReviewsSection destination={destination} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions
                destination={destination}
                onCreateItinerary={handleCreateItinerary}
              />

              {/* Similar Destinations */}
              <div className="bg-card rounded-lg p-6 shadow-travel-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Similar Destinations</h3>
                <div className="space-y-3">
                  {[
                    { name: "Mykonos, Greece", rating: 4.7, image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg" },
                    { name: "Amalfi Coast, Italy", rating: 4.9, image: "https://images.pixabay.com/photo/2017/12/15/13/51/amalfi-3021072_1280.jpg" },
                    { name: "Dubrovnik, Croatia", rating: 4.6, image: "https://images.unsplash.com/photo-1555990538-c8d5d4d6b8e1" }
                  ]?.map((dest, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-travel cursor-pointer">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={dest?.image}
                          alt={dest?.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{dest?.name}</h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">★ {dest?.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-card rounded-lg p-6 shadow-travel-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Weather</h3>
                <div className="space-y-3">
                  {[
                    { day: "Today", temp: "24°C", condition: "Sunny", icon: "Sun" },
                    { day: "Tomorrow", temp: "26°C", condition: "Partly Cloudy", icon: "Cloud" },
                    { day: "Wed", temp: "23°C", condition: "Sunny", icon: "Sun" },
                    { day: "Thu", temp: "25°C", condition: "Sunny", icon: "Sun" },
                    { day: "Fri", temp: "22°C", condition: "Cloudy", icon: "Cloud" },
                    { day: "Sat", temp: "24°C", condition: "Sunny", icon: "Sun" },
                    { day: "Sun", temp: "27°C", condition: "Sunny", icon: "Sun" }
                  ]?.map((weather, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-foreground font-medium">{weather?.day}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{weather?.condition}</span>
                        <span className="text-sm font-semibold text-foreground">{weather?.temp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AI Travel Buddy Widget */}
      <AITravelBuddyWidget />
    </div>
  );
};

export default DestinationDetails;