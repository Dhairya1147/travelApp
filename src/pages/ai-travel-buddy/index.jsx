import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ChatMessage from './components/ChatMessage';
import QuickActions from './components/QuickActions';
import LearningDashboard from './components/LearningDashboard';
import ChatInput from './components/ChatInput';
import PersonalitySelector from './components/PersonalitySelector';
import OfflineIndicator from './components/OfflineIndicator';

const AITravelBuddyPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState('adventure');
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Mock data for AI learning
  const [learningData] = useState({
    adaptationProgress: 78,
    preferenceAccuracy: {
      dining: 85,
      activities: 72,
      accommodation: 90,
      transportation: 68
    },
    personalizedRecommendations: {
      recentImprovements: [
        {
          description: "Better understanding of your budget preferences for dining",
          date: "2 days ago"
        },
        {
          description: "Improved activity suggestions based on your adventure style",
          date: "5 days ago"
        },
        {
          description: "Enhanced cultural context for international destinations",
          date: "1 week ago"
        }
      ]
    },
    userFeedbackStats: {
      totalInteractions: 247,
      feedbackCount: 89,
      positiveCount: 73,
      negativeCount: 16
    },
    travelStyleAnalysis: [
      { type: 'Adventure', percentage: 45 },
      { type: 'Cultural', percentage: 30 },
      { type: 'Budget', percentage: 15 },
      { type: 'Luxury', percentage: 10 }
    ]
  });

  // Mock offline capabilities
  const offlineCapabilities = [
    { name: 'Basic travel tips', available: true },
    { name: 'Cached translations', available: true },
    { name: 'Emergency contacts', available: true },
    { name: 'Saved itineraries', available: true },
    { name: 'Real-time recommendations', available: false },
    { name: 'Live translation', available: false },
    { name: 'Current weather', available: false }
  ];

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      content: `Hi there! I'm your AI Travel Buddy, ready to help you explore the world. I'm currently in ${getPersonalityName(currentPersonality)} mode, which means I'll tailor my suggestions to match your travel style.`,
      timestamp: new Date(),
      aiPersonality: getPersonalityName(currentPersonality)
    };

    setMessages([welcomeMessage]);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getPersonalityName = (personality) => {
    const personalities = {
      adventure: 'Adventure Seeker',
      budget: 'Budget Conscious',
      luxury: 'Luxury Traveler',
      cultural: 'Cultural Explorer',
      family: 'Family Friendly',
      business: 'Business Traveler'
    };
    return personalities?.[personality] || 'Adventure Seeker';
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      adventure: `Great question! As an adventure seeker, I'd recommend exploring some off-the-beaten-path destinations. Let me suggest some thrilling options that match your adventurous spirit.`,
      budget: `I love helping budget-conscious travelers! Let me find you some amazing cost-effective options that won't break the bank but will still give you incredible experiences.`,
      luxury: `Excellent choice! For a luxury traveler like yourself, I'll curate some premium experiences that offer the finest comfort and exclusive access.`,
      cultural: `Wonderful! Cultural exploration is so enriching. I'll share some authentic local experiences and historical insights that will deepen your connection with the destination.`,
      family: `Perfect! Family travel requires special consideration. I'll suggest safe, fun activities that everyone from kids to grandparents will enjoy.`,
      business: `Understood! For efficient business travel, I'll focus on time-saving solutions and professional amenities that keep you productive on the go.`
    };

    // Check for specific keywords and provide contextual responses
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('restaurant') || lowerMessage?.includes('food') || lowerMessage?.includes('dining')) {
      return {
        content: `I found some excellent dining options for you! Here are my top recommendations based on your preferences.`,
        contentType: 'recommendation',
        recommendations: [
          {
            title: "The Local Bistro",
            description: "Authentic local cuisine with great atmosphere",
            image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
            rating: 4.5,
            price: "$25-35",
            actions: [
              { label: "View Menu", action: "view_menu" },
              { label: "Get Directions", action: "navigate" }
            ]
          },
          {
            title: "Street Food Market",
            description: "Vibrant market with diverse food stalls",
            image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
            rating: 4.2,
            price: "$5-15",
            actions: [
              { label: "Learn More", action: "learn_more" },
              { label: "Add to Itinerary", action: "add_itinerary" }
            ]
          }
        ]
      };
    }

    if (lowerMessage?.includes('translate') || lowerMessage?.includes('language')) {
      return {
        content: `I can help you with translation! Here's an example of how I can assist with language barriers.`,
        contentType: 'translation',
        originalLanguage: 'English',
        targetLanguage: 'Spanish',
        originalText: 'Where is the nearest restaurant?',
        translatedText: '¿Dónde está el restaurante más cercano?',
        culturalContext: 'In Spanish-speaking countries, it\'s polite to say "por favor" (please) when asking for directions.'
      };
    }

    return {
      content: responses?.[currentPersonality] || responses?.adventure,
      contentType: 'text'
    };
  };

  const handleSendMessage = (messageText) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponseData = generateAIResponse(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        ...aiResponseData,
        timestamp: new Date(),
        aiPersonality: getPersonalityName(currentPersonality)
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionClick = (action) => {
    if (typeof action === 'string') {
      handleSendMessage(action);
    } else {
      // Handle specific actions
      switch (action?.action) {
        case 'navigate': navigate('/destination-details');
          break;
        case 'add_itinerary': navigate('/itinerary-planner');
          break;
        default:
          handleSendMessage(`Tell me more about ${action?.label}`);
      }
    }
  };

  const handleFeedback = (messageId, feedbackType) => {
    console.log(`Feedback for message ${messageId}: ${feedbackType}`);
    // Here you would typically send feedback to your AI service
  };

  const handleVoiceInput = () => {
    // Voice input simulation
    setTimeout(() => {
      handleSendMessage("What are some good restaurants near me?");
    }, 2000);
  };

  const handlePersonalityChange = (personality) => {
    setCurrentPersonality(personality);
    setShowPersonalitySelector(false);
    
    // Add system message about personality change
    const systemMessage = {
      id: Date.now(),
      type: 'system',
      content: `AI personality changed to ${getPersonalityName(personality)} mode`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const handlePreferenceUpdate = () => {
    navigate('/user-profile');
  };

  const getCurrentTime = () => {
    return new Date()?.getHours();
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16 pb-20 md:pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbTrail />
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Bot" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Travel Buddy</h1>
                <p className="text-muted-foreground">Your intelligent travel companion</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-travel ${
                  activeTab === 'chat' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="MessageCircle" size={16} className="inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-travel ${
                  activeTab === 'learning' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Brain" size={16} className="inline mr-2" />
                Learning
              </button>
            </div>
          </div>

          {activeTab === 'chat' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg shadow-travel-card">
                  {/* Offline Indicator */}
                  <div className="p-4 pb-0">
                    <OfflineIndicator offlineCapabilities={offlineCapabilities} />
                    
                    {/* Personality Selector */}
                    <PersonalitySelector
                      currentPersonality={currentPersonality}
                      onPersonalityChange={handlePersonalityChange}
                      isVisible={showPersonalitySelector}
                      onToggle={() => setShowPersonalitySelector(!showPersonalitySelector)}
                    />
                  </div>

                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4">
                    {messages?.map((message) => (
                      <ChatMessage
                        key={message?.id}
                        message={message}
                        onActionClick={handleActionClick}
                        onFeedback={handleFeedback}
                      />
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-card border border-border p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Icon name="Bot" size={12} color="white" />
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-border">
                    <ChatInput
                      onSendMessage={handleSendMessage}
                      onVoiceInput={handleVoiceInput}
                      isTyping={isTyping}
                      disabled={isTyping}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-4 shadow-travel-card">
                  <QuickActions
                    onActionClick={handleActionClick}
                    userLocation={userLocation}
                    currentTime={getCurrentTime()}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Learning Dashboard */
            (<div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6 shadow-travel-card">
                <LearningDashboard
                  learningData={learningData}
                  onPreferenceUpdate={handlePreferenceUpdate}
                />
              </div>
            </div>)
          )}

          {/* Integration Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/itinerary-planner')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Icon name="Calendar" size={24} className="text-primary" />
              <div className="text-center">
                <p className="font-medium">Update Itinerary</p>
                <p className="text-xs text-muted-foreground">Add AI suggestions to your plans</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/travel-groups')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Icon name="Users" size={24} className="text-primary" />
              <div className="text-center">
                <p className="font-medium">Share with Group</p>
                <p className="text-xs text-muted-foreground">Send recommendations to your travel group</p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/destination-details')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Icon name="MapPin" size={24} className="text-primary" />
              <div className="text-center">
                <p className="font-medium">Explore Destinations</p>
                <p className="text-xs text-muted-foreground">Discover new places with AI guidance</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <AITravelBuddyWidget />
    </div>
  );
};

export default AITravelBuddyPage;