import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationPreferences = ({ notificationSettings, onUpdateNotifications }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSettings, setEditSettings] = useState(notificationSettings);

  const notificationCategories = [
    {
      id: 'travel',
      title: 'Travel Updates',
      icon: 'Plane',
      description: 'Flight changes, booking confirmations, and travel alerts',
      notifications: [
        { id: 'flightUpdates', label: 'Flight status changes', description: 'Delays, gate changes, cancellations' },
        { id: 'bookingConfirmations', label: 'Booking confirmations', description: 'Hotel, flight, and activity bookings' },
        { id: 'checkInReminders', label: 'Check-in reminders', description: '24 hours before departure' },
        { id: 'weatherAlerts', label: 'Weather alerts', description: 'Severe weather at your destination' }
      ]
    },
    {
      id: 'groups',
      title: 'Group Travel',
      icon: 'Users',
      description: 'Group invitations, messages, and activity updates',
      notifications: [
        { id: 'groupInvitations', label: 'Group invitations', description: 'New travel group invitations' },
        { id: 'groupMessages', label: 'Group messages', description: 'Messages in your travel groups' },
        { id: 'itineraryUpdates', label: 'Itinerary changes', description: 'Updates to shared itineraries' },
        { id: 'memberActivity', label: 'Member activity', description: 'When members join or leave groups' }
      ]
    },
    {
      id: 'ai',
      title: 'AI Recommendations',
      icon: 'Bot',
      description: 'Personalized suggestions and travel insights',
      notifications: [
        { id: 'newRecommendations', label: 'New recommendations', description: 'Personalized destination and activity suggestions' },
        { id: 'priceAlerts', label: 'Price alerts', description: 'Price drops for saved destinations' },
        { id: 'crowdPredictions', label: 'Crowd predictions', description: 'Updates on destination popularity' },
        { id: 'budgetInsights', label: 'Budget insights', description: 'Tips to save money on your trips' }
      ]
    },
    {
      id: 'social',
      title: 'Social & Reviews',
      icon: 'MessageCircle',
      description: 'Reviews, ratings, and social interactions',
      notifications: [
        { id: 'reviewRequests', label: 'Review requests', description: 'Requests to review places you\'ve visited' },
        { id: 'reviewResponses', label: 'Review responses', description: 'Responses to your reviews' },
        { id: 'followActivity', label: 'Follower activity', description: 'When someone follows your travel updates' },
        { id: 'travelUpdates', label: 'Travel updates', description: 'Updates from travelers you follow' }
      ]
    }
  ];

  const deliveryMethods = [
    { id: 'push', label: 'Push Notifications', icon: 'Bell', description: 'Instant notifications on your device' },
    { id: 'email', label: 'Email', icon: 'Mail', description: 'Detailed notifications via email' },
    { id: 'sms', label: 'SMS', icon: 'MessageSquare', description: 'Important alerts via text message' }
  ];

  const frequencyOptions = [
    { id: 'immediate', label: 'Immediate', description: 'Get notified right away' },
    { id: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
    { id: 'weekly', label: 'Weekly Summary', description: 'Weekly roundup of activity' }
  ];

  const handleSave = () => {
    onUpdateNotifications(editSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSettings(notificationSettings);
    setIsEditing(false);
  };

  const toggleNotification = (categoryId, notificationId) => {
    setEditSettings(prev => ({
      ...prev,
      categories: {
        ...prev?.categories,
        [categoryId]: {
          ...prev?.categories?.[categoryId],
          [notificationId]: !prev?.categories?.[categoryId]?.[notificationId]
        }
      }
    }));
  };

  const toggleDeliveryMethod = (method) => {
    setEditSettings(prev => ({
      ...prev,
      deliveryMethods: {
        ...prev?.deliveryMethods,
        [method]: !prev?.deliveryMethods?.[method]
      }
    }));
  };

  const updateFrequency = (categoryId, frequency) => {
    setEditSettings(prev => ({
      ...prev,
      frequency: {
        ...prev?.frequency,
        [categoryId]: frequency
      }
    }));
  };

  const getEnabledCount = (categoryId) => {
    const category = editSettings?.categories?.[categoryId];
    return Object.values(category)?.filter(Boolean)?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-sm text-muted-foreground">
            Customize how and when you receive notifications
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Settings"
            iconPosition="left"
          >
            Edit Notifications
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-8">
          {/* Delivery Methods */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Delivery Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliveryMethods?.map((method) => (
                <label key={method?.id} className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                  <Checkbox
                    checked={editSettings?.deliveryMethods?.[method?.id]}
                    onChange={() => toggleDeliveryMethod(method?.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={method?.icon} size={16} />
                      <span className="font-medium text-foreground">{method?.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Categories */}
          {notificationCategories?.map((category) => (
            <div key={category?.id}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{category?.title}</h3>
                    <p className="text-sm text-muted-foreground">{category?.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    {getEnabledCount(category?.id)} of {category?.notifications?.length} enabled
                  </div>
                  <select
                    value={editSettings?.frequency?.[category?.id]}
                    onChange={(e) => updateFrequency(category?.id, e?.target?.value)}
                    className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {frequencyOptions?.map((option) => (
                      <option key={option?.id} value={option?.id}>{option?.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-3 ml-6">
                {category?.notifications?.map((notification) => (
                  <label key={notification?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-travel">
                    <Checkbox
                      checked={editSettings?.categories?.[category?.id]?.[notification?.id]}
                      onChange={() => toggleNotification(category?.id, notification?.id)}
                    />
                    <div>
                      <div className="font-medium text-foreground">{notification?.label}</div>
                      <div className="text-sm text-muted-foreground">{notification?.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button onClick={handleSave} iconName="Check" iconPosition="left">
              Save Preferences
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Delivery Methods Summary */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Active Delivery Methods</h3>
            <div className="flex flex-wrap gap-2">
              {deliveryMethods?.map((method) => (
                notificationSettings?.deliveryMethods?.[method?.id] && (
                  <div key={method?.id} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    <Icon name={method?.icon} size={14} />
                    <span>{method?.label}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Categories Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationCategories?.map((category) => {
              const enabledCount = Object.values(notificationSettings?.categories?.[category?.id])?.filter(Boolean)?.length;
              const totalCount = category?.notifications?.length;
              const frequency = notificationSettings?.frequency?.[category?.id];
              
              return (
                <div key={category?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={category?.icon} size={16} className="text-primary" />
                    <h4 className="font-medium text-foreground">{category?.title}</h4>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {enabledCount} of {totalCount} notifications enabled
                    </div>
                    <div className="text-sm text-primary">
                      {frequencyOptions?.find(f => f?.id === frequency)?.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Enable All
            </Button>
            <Button variant="outline" size="sm">
              Disable All
            </Button>
            <Button variant="outline" size="sm">
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPreferences;