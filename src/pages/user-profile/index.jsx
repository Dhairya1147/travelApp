import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import ProfileHeader from './components/ProfileHeader';
import TravelPreferences from './components/TravelPreferences';
import TravelHistory from './components/TravelHistory';
import PrivacyControls from './components/PrivacyControls';
import AccountSecurity from './components/AccountSecurity';
import NotificationPreferences from './components/NotificationPreferences';
import DocumentManager from './components/DocumentManager';
import Icon from '../../components/AppIcon';


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: `Passionate traveler and adventure seeker with a love for discovering hidden gems around the world. I enjoy immersive cultural experiences, local cuisine, and connecting with fellow travelers. Always planning my next adventure!`,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    memberSince: "March 2022",
    totalTrips: 24,
    verifications: {
      email: true,
      phone: true,
      identity: true
    }
  });

  const [preferences, setPreferences] = useState({
    adventureLevel: 'moderate',
    budgetRange: 'mid',
    accommodationTypes: ['hotel', 'airbnb', 'boutique'],
    activityInterests: ['culture', 'food', 'nature', 'photography'],
    dietaryRestrictions: ['vegetarian'],
    aiLearningScore: 78
  });

  const [travelHistory] = useState([
    {
      id: 1,
      destination: "Kyoto, Japan",
      country: "Japan",
      startDate: "2024-03-15",
      endDate: "2024-03-25",
      travelers: 2,
      totalCost: 3200,
      rating: 5,
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
      highlights: ["Cherry Blossoms", "Temple Visits", "Traditional Cuisine"],
      accommodation: "Traditional Ryokan in Gion District",
      photos: [
        { url: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=300&fit=crop", caption: "Fushimi Inari Shrine" },
        { url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop", caption: "Cherry blossoms" },
        { url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=300&h=300&fit=crop", caption: "Traditional tea ceremony" },
        { url: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=300&h=300&fit=crop", caption: "Bamboo forest" }
      ],
      notes: `An absolutely magical experience in Kyoto! The cherry blossom season was perfect timing. The traditional ryokan provided an authentic cultural immersion. Highly recommend the early morning temple visits to avoid crowds.`
    },
    {
      id: 2,
      destination: "Santorini, Greece",
      country: "Greece",
      startDate: "2023-09-10",
      endDate: "2023-09-18",
      travelers: 1,
      totalCost: 2100,
      rating: 4,
      coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      highlights: ["Sunset Views", "Wine Tasting", "Island Hopping"],
      accommodation: "Cliffside Hotel in Oia",
      photos: [
        { url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&h=300&fit=crop", caption: "Oia sunset" },
        { url: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=300&h=300&fit=crop", caption: "Blue domed churches" }
      ],
      notes: "Perfect solo retreat with stunning sunsets and incredible Greek hospitality. The wine tours were a highlight!"
    },
    {
      id: 3,
      destination: "Machu Picchu, Peru",
      country: "Peru",
      startDate: "2023-06-20",
      endDate: "2023-06-28",
      travelers: 4,
      totalCost: 1800,
      rating: 5,
      coverImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
      highlights: ["Inca Trail", "Ancient Ruins", "Llama Encounters"],
      accommodation: "Mountain Lodge near Aguas Calientes",
      photos: [
        { url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=300&h=300&fit=crop", caption: "Machu Picchu sunrise" },
        { url: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=300&h=300&fit=crop", caption: "Inca Trail hiking" }
      ],
      notes: "Challenging but incredibly rewarding trek with amazing group dynamics. The sunrise over Machu Picchu was unforgettable."
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    main: {
      profileVisibility: 'friends',
      locationSharing: 'trips',
      dataUsage: 'full'
    },
    communication: {
      showEmail: true,
      showPhone: false,
      allowMessages: true,
      showTravelHistory: true,
      showReviews: true
    },
    dataRetention: {
      searchHistory: true,
      locationHistory: true,
      interactionData: true,
      preferenceData: true
    }
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    twoFactorMethod: 'sms',
    passwordLastChanged: '2024-06-15',
    recentLogins: [
      {
        device: 'iPhone 14 Pro',
        location: 'San Francisco, CA',
        timestamp: '2024-09-14T08:30:00Z',
        suspicious: false
      },
      {
        device: 'MacBook Pro',
        location: 'San Francisco, CA',
        timestamp: '2024-09-13T14:22:00Z',
        suspicious: false
      },
      {
        device: 'iPad Air',
        location: 'Oakland, CA',
        timestamp: '2024-09-12T19:45:00Z',
        suspicious: false
      }
    ],
    connectedDevices: [
      {
        name: 'iPhone 14 Pro',
        type: 'mobile',
        location: 'San Francisco, CA',
        lastActive: '2 hours ago',
        current: true
      },
      {
        name: 'MacBook Pro',
        type: 'desktop',
        location: 'San Francisco, CA',
        lastActive: '1 day ago',
        current: false
      },
      {
        name: 'iPad Air',
        type: 'tablet',
        location: 'Oakland, CA',
        lastActive: '3 days ago',
        current: false
      }
    ]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    deliveryMethods: {
      push: true,
      email: true,
      sms: false
    },
    categories: {
      travel: {
        flightUpdates: true,
        bookingConfirmations: true,
        checkInReminders: true,
        weatherAlerts: true
      },
      groups: {
        groupInvitations: true,
        groupMessages: true,
        itineraryUpdates: true,
        memberActivity: false
      },
      ai: {
        newRecommendations: true,
        priceAlerts: true,
        crowdPredictions: false,
        budgetInsights: true
      },
      social: {
        reviewRequests: true,
        reviewResponses: true,
        followActivity: false,
        travelUpdates: false
      }
    },
    frequency: {
      travel: 'immediate',
      groups: 'immediate',
      ai: 'daily',
      social: 'weekly'
    }
  });

  const [documents, setDocuments] = useState([
    {
      id: '1',
      type: 'passport',
      name: 'US Passport',
      number: 'P123456789',
      issueDate: '2019-05-15',
      expiryDate: '2029-05-15',
      issuingCountry: 'United States',
      verified: true,
      uploadDate: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      type: 'drivingLicense',
      name: 'California Driver License',
      number: 'D1234567',
      issueDate: '2020-03-20',
      expiryDate: '2025-03-20',
      issuingCountry: 'United States',
      verified: true,
      uploadDate: '2024-01-10T10:05:00Z'
    },
    {
      id: '3',
      type: 'insurance',
      name: 'World Nomads Travel Insurance',
      number: 'WN789012345',
      issueDate: '2024-08-01',
      expiryDate: '2025-08-01',
      issuingCountry: 'United States',
      verified: false,
      uploadDate: '2024-08-01T09:30:00Z'
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Travel Preferences', icon: 'Settings' },
    { id: 'history', label: 'Travel History', icon: 'MapPin' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'security', label: 'Security', icon: 'Lock' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const handleUpdateProfile = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setPreferences(updatedPreferences);
  };

  const handleUpdatePrivacy = (updatedSettings) => {
    setPrivacySettings(updatedSettings);
  };

  const handleUpdateSecurity = (updatedSettings) => {
    setSecuritySettings(updatedSettings);
  };

  const handleUpdateNotifications = (updatedSettings) => {
    setNotificationSettings(updatedSettings);
  };

  const handleUpdateDocuments = (updatedDocuments) => {
    setDocuments(updatedDocuments);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileHeader
            user={userData}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'preferences':
        return (
          <TravelPreferences
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'history':
        return (
          <TravelHistory
            travelHistory={travelHistory}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            privacySettings={privacySettings}
            onUpdatePrivacy={handleUpdatePrivacy}
          />
        );
      case 'security':
        return (
          <AccountSecurity
            securitySettings={securitySettings}
            onUpdateSecurity={handleUpdateSecurity}
          />
        );
      case 'notifications':
        return (
          <NotificationPreferences
            notificationSettings={notificationSettings}
            onUpdateNotifications={handleUpdateNotifications}
          />
        );
      case 'documents':
        return (
          <DocumentManager
            documents={documents}
            onUpdateDocuments={handleUpdateDocuments}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <BreadcrumbTrail />
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
                <OfflineStatusIndicator />
              </div>
              <p className="text-muted-foreground mt-1">
                Manage your account settings and travel preferences
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border border-border p-4">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-travel ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden lg:inline">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="hidden lg:block bg-card rounded-lg border border-border p-4 mt-4">
                <h3 className="font-medium text-foreground mb-3">Profile Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile Completion</span>
                    <span className="text-foreground font-medium">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Learning</span>
                    <span className="text-primary font-medium">{preferences?.aiLearningScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Security Score</span>
                    <span className="text-success font-medium">Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      <AITravelBuddyWidget />
    </div>
  );
};

export default UserProfile;