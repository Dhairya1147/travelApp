import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import TimelineView from './components/TimelineView';
import BudgetTracker from './components/BudgetTracker';
import AIRecommendations from './components/AIRecommendations';
import InteractiveMap from './components/InteractiveMap';
import ActivityEditor from './components/ActivityEditor';
import CollaborationPanel from './components/CollaborationPanel';
import WeatherIntegration from './components/WeatherIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ItineraryPlanner = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('timeline');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isActivityEditorOpen, setIsActivityEditorOpen] = useState(false);
  const [itinerary, setItinerary] = useState({
    id: 'itin-001',
    title: 'European Adventure 2024',
    destination: 'Paris, France',
    startDate: '2024-09-20',
    endDate: '2024-09-27',
    totalDays: 7,
    travelers: 4,
    status: 'planning',
    days: []
  });

  const [budget, setBudget] = useState({
    accommodation: 1200,
    activities: 800,
    transportation: 600,
    meals: 900,
    shopping: 400,
    miscellaneous: 300
  });

  const [preferences, setPreferences] = useState({
    travelStyle: 'balanced',
    interests: ['culture', 'food', 'history'],
    budgetLevel: 'medium',
    crowdPreference: 'avoid'
  });

  useEffect(() => {
    // Initialize mock itinerary data
    const mockItinerary = {
      ...itinerary,
      days: [
        {
          date: '2024-09-20',
          activities: [
            {
              id: 'activity-1',
              title: 'Arrival & Hotel Check-in',
              location: 'Hotel Le Marais, Paris',
              startTime: '14:00',
              endTime: '15:30',
              duration: 90,
              cost: 0,
              crowdLevel: 'low',
              status: 'booked',
              type: 'accommodation',
              category: 'accommodation'
            },
            {
              id: 'activity-2',
              title: 'Seine River Cruise',
              location: 'Port de la Bourdonnais',
              startTime: '17:00',
              endTime: '18:30',
              duration: 90,
              cost: 45,
              crowdLevel: 'medium',
              status: 'planned',
              type: 'activity',
              category: 'activities'
            },
            {
              id: 'activity-3',
              title: 'Dinner at Local Bistro',
              location: 'Le Comptoir du Relais',
              startTime: '19:30',
              endTime: '21:30',
              duration: 120,
              cost: 85,
              crowdLevel: 'high',
              status: 'planned',
              type: 'restaurant',
              category: 'meals'
            }
          ]
        },
        {
          date: '2024-09-21',
          activities: [
            {
              id: 'activity-4',
              title: 'Louvre Museum Visit',
              location: 'Musée du Louvre',
              startTime: '09:00',
              endTime: '12:00',
              duration: 180,
              cost: 25,
              crowdLevel: 'high',
              status: 'planned',
              type: 'attraction',
              category: 'activities'
            },
            {
              id: 'activity-5',
              title: 'Lunch at Café de Flore',
              location: 'Café de Flore, Saint-Germain',
              startTime: '13:00',
              endTime: '14:30',
              duration: 90,
              cost: 35,
              crowdLevel: 'medium',
              status: 'planned',
              type: 'restaurant',
              category: 'meals'
            },
            {
              id: 'activity-6',
              title: 'Eiffel Tower & Trocadéro',
              location: 'Champ de Mars',
              startTime: '16:00',
              endTime: '18:00',
              duration: 120,
              cost: 30,
              crowdLevel: 'high',
              status: 'planned',
              type: 'attraction',
              category: 'activities'
            }
          ]
        },
        {
          date: '2024-09-22',
          activities: [
            {
              id: 'activity-7',
              title: 'Montmartre Walking Tour',
              location: 'Montmartre District',
              startTime: '10:00',
              endTime: '13:00',
              duration: 180,
              cost: 20,
              crowdLevel: 'medium',
              status: 'planned',
              type: 'activity',
              category: 'activities'
            },
            {
              id: 'activity-8',
              title: 'Shopping at Champs-Élysées',
              location: 'Avenue des Champs-Élysées',
              startTime: '15:00',
              endTime: '17:30',
              duration: 150,
              cost: 200,
              crowdLevel: 'high',
              status: 'planned',
              type: 'shopping',
              category: 'shopping'
            }
          ]
        }
      ]
    };

    setItinerary(mockItinerary);
  }, []);

  const views = [
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'recommendations', label: 'AI Suggestions', icon: 'Bot' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'collaboration', label: 'Collaborate', icon: 'Users' },
    { id: 'weather', label: 'Weather', icon: 'CloudSun' }
  ];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setIsActivityEditorOpen(true);
  };

  const handleActivitySave = (updatedActivity) => {
    const newItinerary = { ...itinerary };
    
    // Find and update the activity
    newItinerary?.days?.forEach(day => {
      const activityIndex = day?.activities?.findIndex(a => a?.id === updatedActivity?.id);
      if (activityIndex !== -1) {
        day.activities[activityIndex] = updatedActivity;
      }
    });

    setItinerary(newItinerary);
    setIsActivityEditorOpen(false);
    setSelectedActivity(null);
  };

  const handleActivityDelete = (activityToDelete) => {
    const newItinerary = { ...itinerary };
    
    newItinerary?.days?.forEach(day => {
      day.activities = day?.activities?.filter(a => a?.id !== activityToDelete?.id);
    });

    setItinerary(newItinerary);
    setIsActivityEditorOpen(false);
    setSelectedActivity(null);
  };

  const handleRecommendationApply = (recommendation) => {
    console.log('Applying recommendation:', recommendation);
    // Implementation would depend on recommendation type
  };

  const handleLocationSelect = (location) => {
    console.log('Location selected:', location);
    // Could open activity editor or show location details
  };

  const handleRouteOptimize = (route) => {
    console.log('Route optimized:', route);
    // Update itinerary with optimized route
  };

  const handleShare = (itinerary) => {
    console.log('Sharing itinerary:', itinerary);
    // Implementation for sharing functionality
  };

  const handleCollaboratorAdd = (collaborator) => {
    console.log('Adding collaborator:', collaborator);
    // Implementation for adding collaborators
  };

  const handleCommentAdd = (comment) => {
    console.log('Adding comment:', comment);
    // Implementation for adding comments
  };

  const handleVote = (voteId, optionId) => {
    console.log('Voting:', voteId, optionId);
    // Implementation for voting
  };

  const handleWeatherAlert = (alert) => {
    console.log('Weather alert:', alert);
    // Implementation for weather alerts
  };

  const handleAlternativeSuggestion = (suggestion, dayIndex) => {
    console.log('Alternative suggestion:', suggestion, dayIndex);
    // Implementation for alternative suggestions
  };

  const handleExportItinerary = () => {
    console.log('Exporting itinerary');
    // Implementation for export functionality
  };

  const handleBookingConfirmation = () => {
    navigate('/booking-confirmation');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'timeline':
        return (
          <TimelineView
            itinerary={itinerary}
            onUpdateItinerary={setItinerary}
            onActivitySelect={handleActivitySelect}
          />
        );
      case 'budget':
        return (
          <BudgetTracker
            itinerary={itinerary}
            budget={budget}
            onBudgetUpdate={setBudget}
          />
        );
      case 'recommendations':
        return (
          <AIRecommendations
            destination={itinerary?.destination}
            budget={budget}
            preferences={preferences}
            onApplyRecommendation={handleRecommendationApply}
          />
        );
      case 'map':
        return (
          <InteractiveMap
            itinerary={itinerary}
            onLocationSelect={handleLocationSelect}
            onRouteOptimize={handleRouteOptimize}
          />
        );
      case 'collaboration':
        return (
          <CollaborationPanel
            itinerary={itinerary}
            onShare={handleShare}
            onCollaboratorAdd={handleCollaboratorAdd}
            onCommentAdd={handleCommentAdd}
            onVote={handleVote}
          />
        );
      case 'weather':
        return (
          <WeatherIntegration
            itinerary={itinerary}
            onWeatherAlert={handleWeatherAlert}
            onAlternativeSuggestion={handleAlternativeSuggestion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbTrail />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">{itinerary?.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{itinerary?.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{itinerary?.startDate} - {itinerary?.endDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{itinerary?.travelers} travelers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{itinerary?.totalDays} days</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <OfflineStatusIndicator />
              <Button variant="outline" onClick={handleExportItinerary}>
                <Icon name="Download" size={16} />
                Export
              </Button>
              <Button onClick={handleBookingConfirmation}>
                <Icon name="Check" size={16} />
                Finalize Plan
              </Button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
            {views?.map((view) => (
              <Button
                key={view?.id}
                variant={activeView === view?.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView(view?.id)}
                className="flex items-center space-x-2"
              >
                <Icon name={view?.icon} size={16} />
                <span className="hidden sm:inline">{view?.label}</span>
              </Button>
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {renderActiveView()}
          </div>
        </div>
      </div>
      {/* Activity Editor Modal */}
      <ActivityEditor
        activity={selectedActivity}
        isOpen={isActivityEditorOpen}
        onClose={() => {
          setIsActivityEditorOpen(false);
          setSelectedActivity(null);
        }}
        onSave={handleActivitySave}
        onDelete={handleActivityDelete}
      />
      <AITravelBuddyWidget />
    </div>
  );
};

export default ItineraryPlanner;