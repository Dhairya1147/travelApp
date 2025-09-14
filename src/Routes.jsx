import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TravelGroups from './pages/travel-groups';
import DestinationDetails from './pages/destination-details';
import Dashboard from './pages/dashboard';
import AITravelBuddyPage from './pages/ai-travel-buddy';
import UserProfile from './pages/user-profile';
import ItineraryPlanner from './pages/itinerary-planner';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/travel-groups" element={<TravelGroups />} />
        <Route path="/destination-details" element={<DestinationDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-travel-buddy" element={<AITravelBuddyPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/itinerary-planner" element={<ItineraryPlanner />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
