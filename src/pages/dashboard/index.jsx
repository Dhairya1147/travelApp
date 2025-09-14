import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import WelcomeHeader from './components/WelcomeHeader';
import QuickAccessCards from './components/QuickAccessCards';
import SearchBar from './components/SearchBar';
import AIRecommendations from './components/AIRecommendations';
import CrowdPredictionWidget from './components/CrowdPredictionWidget';
import RecentActivity from './components/RecentActivity';
import BudgetTracker from './components/BudgetTracker';
import WeatherAlerts from './components/WeatherAlerts';

const Dashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    currentTrip: {
      destination: "Tokyo, Japan",
      daysLeft: 12
    },
    preferences: {
      travelStyle: "adventure",
      budget: "medium",
      interests: ["culture", "food", "nature"]
    }
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('travelmate-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading time for dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16 md:pt-16 pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="bg-muted rounded-xl h-32"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="bg-muted rounded-xl h-24"></div>
                ))}
              </div>
              <div className="bg-muted rounded-xl h-16"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)]?.map((_, i) => (
                  <div key={i} className="bg-muted rounded-xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - TravelMate AI</title>
        <meta name="description" content="Your personalized travel dashboard with AI-powered recommendations, crowd predictions, and budget tracking." />
        <meta name="keywords" content="travel dashboard, AI recommendations, trip planning, budget tracking" />
      </Helmet>
      <NavigationBar />
      <div className="pt-16 md:pt-16 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <BreadcrumbTrail />
            <OfflineStatusIndicator />
          </div>

          {/* Welcome Header */}
          <WelcomeHeader 
            userName={userData?.name}
            currentTrip={userData?.currentTrip}
          />

          {/* Quick Access Cards */}
          <QuickAccessCards />

          {/* Search Bar */}
          <SearchBar />

          {/* Main Content Grid */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <AIRecommendations />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Crowd Prediction (spans 2 columns) */}
              <div className="xl:col-span-2">
                <CrowdPredictionWidget />
              </div>

              {/* Right Column - Recent Activity */}
              <div className="xl:col-span-1">
                <RecentActivity />
              </div>
            </div>

            {/* Weather Alerts */}
            <WeatherAlerts />

            {/* Budget Tracker */}
            <BudgetTracker />
          </div>

          {/* Bottom Spacing for Mobile Navigation */}
          <div className="h-8 md:h-0"></div>
        </div>
      </div>
      {/* AI Travel Buddy Widget */}
      <AITravelBuddyWidget />
    </div>
  );
};

export default Dashboard;