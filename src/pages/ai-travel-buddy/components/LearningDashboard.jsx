import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningDashboard = ({ learningData, onPreferenceUpdate }) => {
  const { 
    adaptationProgress, 
    preferenceAccuracy, 
    personalizedRecommendations, 
    userFeedbackStats,
    travelStyleAnalysis 
  } = learningData;

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-accent';
    return 'bg-warning';
  };

  const getProgressTextColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-accent';
    return 'text-warning';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">AI Learning Progress</h2>
        <p className="text-sm text-muted-foreground">
          See how your AI buddy is getting better at understanding your preferences
        </p>
      </div>
      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-card-foreground">Overall Adaptation</h3>
          <span className={`text-sm font-medium ${getProgressTextColor(adaptationProgress)}`}>
            {adaptationProgress}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(adaptationProgress)}`}
            style={{ width: `${adaptationProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Based on {userFeedbackStats?.totalInteractions} interactions and {userFeedbackStats?.feedbackCount} feedback responses
        </p>
      </div>
      {/* Preference Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(preferenceAccuracy)?.map(([category, accuracy]) => (
          <div key={category} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon 
                name={category === 'dining' ? 'UtensilsCrossed' : 
                      category === 'activities' ? 'MapPin' :
                      category === 'accommodation' ? 'Building' :
                      category === 'transportation' ? 'Car' : 'Star'} 
                size={16} 
                className="text-primary" 
              />
              <h4 className="font-medium text-card-foreground capitalize">{category}</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className={`text-sm font-medium ${getProgressTextColor(accuracy)}`}>
                {accuracy}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor(accuracy)}`}
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Travel Style Analysis */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-card-foreground mb-4">Your Travel Style</h3>
        <div className="space-y-3">
          {travelStyleAnalysis?.map((style, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  style?.type === 'Adventure' ? 'bg-orange-500' :
                  style?.type === 'Budget' ? 'bg-green-500' :
                  style?.type === 'Luxury' ? 'bg-purple-500' :
                  style?.type === 'Cultural' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <span className="text-sm font-medium text-card-foreground">{style?.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      style?.type === 'Adventure' ? 'bg-orange-500' :
                      style?.type === 'Budget' ? 'bg-green-500' :
                      style?.type === 'Luxury' ? 'bg-purple-500' :
                      style?.type === 'Cultural' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${style?.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{style?.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Improvements */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-card-foreground mb-4">Recent Improvements</h3>
        <div className="space-y-3">
          {personalizedRecommendations?.recentImprovements?.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-card-foreground">{improvement?.description}</p>
                <p className="text-xs text-muted-foreground">{improvement?.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Feedback Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
          <Icon name="ThumbsUp" size={24} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-success">{userFeedbackStats?.positiveCount}</p>
          <p className="text-xs text-muted-foreground">Helpful responses</p>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
          <Icon name="ThumbsDown" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-warning">{userFeedbackStats?.negativeCount}</p>
          <p className="text-xs text-muted-foreground">Needs improvement</p>
        </div>
      </div>
      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onPreferenceUpdate}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-travel text-sm font-medium"
        >
          Update My Preferences
        </button>
      </div>
    </div>
  );
};

export default LearningDashboard;