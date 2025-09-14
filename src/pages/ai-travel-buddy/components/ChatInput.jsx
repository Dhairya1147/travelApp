import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onVoiceInput, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef(null);

  const suggestions = [
    "Find restaurants near me",
    "What\'s the weather like?",
    "Help me plan my day",
    "Translate this phrase",
    "Show me local attractions",
    "Find transportation options",
    "Emergency contacts",
    "Local customs and etiquette"
  ];

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic would go here
    } else {
      setIsRecording(true);
      // Start recording logic would go here
      onVoiceInput?.();
      
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-lg shadow-travel-modal max-h-48 overflow-y-auto z-10">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2 px-2">Suggestions:</p>
            {suggestions?.filter(suggestion => 
                suggestion?.toLowerCase()?.includes(message?.toLowerCase())
              )?.slice(0, 6)?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-travel"
                >
                  {suggestion}
                </button>
              ))}
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-3">
        <div className="flex items-end space-x-3">
          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`flex-shrink-0 ${isRecording ? 'bg-error text-error-foreground' : ''}`}
          >
            <Icon 
              name={isRecording ? "MicOff" : "Mic"} 
              size={20} 
              className={isRecording ? 'animate-pulse' : ''} 
            />
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e?.target?.value);
                setShowSuggestions(e?.target?.value?.length > 0);
              }}
              onKeyPress={handleKeyPress}
              placeholder={isRecording ? "Listening..." : "Ask me anything about travel..."}
              disabled={disabled || isRecording}
              className="w-full resize-none border-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[20px] max-h-[120px]"
              rows={1}
            />
            
            {/* Character Counter */}
            {message?.length > 200 && (
              <div className="absolute -bottom-5 right-0 text-xs text-muted-foreground">
                {message?.length}/500
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            disabled={!message?.trim() || disabled || isTyping}
            className="flex-shrink-0"
          >
            {isTyping ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Send" size={20} />
            )}
          </Button>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center space-x-2 mt-2 text-error">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
            <span className="text-xs">Recording... Tap mic to stop</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
          <div className="flex space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick("Translate this phrase")}
              disabled={disabled}
              className="text-xs"
            >
              <Icon name="Languages" size={14} />
              <span className="ml-1 hidden sm:inline">Translate</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick("Find restaurants near me")}
              disabled={disabled}
              className="text-xs"
            >
              <Icon name="UtensilsCrossed" size={14} />
              <span className="ml-1 hidden sm:inline">Food</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick("Help me navigate")}
              disabled={disabled}
              className="text-xs"
            >
              <Icon name="Navigation" size={14} />
              <span className="ml-1 hidden sm:inline">Navigate</span>
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;