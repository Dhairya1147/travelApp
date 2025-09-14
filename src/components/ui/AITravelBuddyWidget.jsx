import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AITravelBuddyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m your AI Travel Buddy. How can I help you plan your perfect trip today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Contextual suggestions based on current route
  const getContextualSuggestions = () => {
    const suggestions = {
      '/dashboard': [
        'Show me trending destinations',
        'What\'s my travel budget looking like?',
        'Any new recommendations for me?'
      ],
      '/destination-details': [
        'Tell me more about this destination',
        'What\'s the best time to visit?',
        'Show me similar destinations'
      ],
      '/itinerary-planner': [
        'Help me optimize this itinerary',
        'Suggest activities for my trip',
        'Check for scheduling conflicts'
      ],
      '/travel-groups': [
        'Help coordinate group preferences',
        'Suggest group-friendly activities',
        'Find accommodations for our group'
      ],
      '/user-profile': [
        'Update my travel preferences',
        'Review my past trips',
        'Adjust my budget settings'
      ]
    };

    return suggestions?.[location?.pathname] || [
      'Plan a weekend getaway',
      'Find budget-friendly destinations',
      'Help me with travel tips'
    ];
  };

  const handleSendMessage = async (message = inputValue) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateContextualResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateContextualResponse = (userMessage) => {
    const responses = {
      '/dashboard': 'Based on your preferences, I found some exciting destinations that match your travel style. Would you like me to show you personalized recommendations?',
      '/destination-details': 'This destination looks amazing! I can help you find the best flights, accommodations, and create a detailed itinerary. What specific information would you like?',
      '/itinerary-planner': 'I\'ve analyzed your itinerary and have some suggestions to optimize your time and budget. Would you like me to show you the improvements?',
      '/travel-groups': 'Group travel can be tricky! I can help coordinate everyone\'s preferences and find activities that work for the whole group. What\'s your group size?',
      '/user-profile': 'I can help you update your travel preferences to get better recommendations. What aspects of your travel style have changed recently?'
    };

    return responses?.[location?.pathname] || 'I\'d be happy to help you with that! Let me gather some information and provide you with personalized recommendations.';
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeWidget = () => {
    setIsMinimized(true);
  };

  const widget = (
    <div className="fixed bottom-4 right-4 z-ai-buddy">
      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div className="mb-4 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-travel-modal animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-card-foreground">AI Travel Buddy</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={minimizeWidget}
                className="h-8 w-8"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message?.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message?.timestamp?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {getContextualSuggestions()?.slice(0, 2)?.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask me anything about travel..."
                value={inputValue}
                onChange={(e) => setInputValue(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue?.trim()}
                size="icon"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div className="mb-4 bg-card border border-border rounded-lg shadow-travel-modal p-3 animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={12} color="white" />
              </div>
              <span className="text-sm font-medium">AI Travel Buddy</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(false)}
                className="h-6 w-6"
              >
                <Icon name="Maximize2" size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={toggleWidget}
        className={`w-14 h-14 rounded-full shadow-travel-modal transition-travel ${
          isOpen ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
        }`}
        aria-label="Open AI Travel Buddy"
      >
        <Icon name={isOpen ? "MessageCircle" : "Bot"} size={24} />
      </Button>
    </div>
  );

  return createPortal(widget, document.body);
};

export default AITravelBuddyWidget;