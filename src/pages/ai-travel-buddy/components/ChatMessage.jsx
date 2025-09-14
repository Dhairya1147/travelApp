import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, onActionClick, onFeedback }) => {
  const isUser = message?.type === 'user';
  const isSystem = message?.type === 'system';

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessageContent = () => {
    if (message?.contentType === 'recommendation') {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message?.content}</p>
          {message?.recommendations && (
            <div className="grid gap-3">
              {message?.recommendations?.map((rec, index) => (
                <div key={index} className="bg-background/50 rounded-lg p-3 border border-border">
                  <div className="flex items-start space-x-3">
                    {rec?.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={rec?.image}
                          alt={rec?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground">{rec?.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{rec?.description}</p>
                      {rec?.rating && (
                        <div className="flex items-center space-x-1 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < Math.floor(rec?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{rec?.rating}</span>
                          {rec?.price && (
                            <span className="text-xs text-primary font-medium ml-2">{rec?.price}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {rec?.actions && (
                    <div className="flex space-x-2 mt-3">
                      {rec?.actions?.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => onActionClick?.(action)}
                          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-travel"
                        >
                          {action?.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (message?.contentType === 'translation') {
      return (
        <div className="space-y-3">
          <div className="bg-background/50 rounded-lg p-3 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Languages" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">Translation</span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Original ({message?.originalLanguage})</p>
                <p className="text-sm">{message?.originalText}</p>
              </div>
              <div className="border-t border-border pt-2">
                <p className="text-xs text-muted-foreground">Translation ({message?.targetLanguage})</p>
                <p className="text-sm font-medium">{message?.translatedText}</p>
              </div>
            </div>
          </div>
          {message?.culturalContext && (
            <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent">Cultural Context</span>
              </div>
              <p className="text-xs text-muted-foreground">{message?.culturalContext}</p>
            </div>
          )}
        </div>
      );
    }

    return <p className="text-sm">{message?.content}</p>;
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-xs">
          {message?.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-4 rounded-lg ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-card-foreground'
          }`}
        >
          {!isUser && message?.aiPersonality && (
            <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-border/20">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={12} color="white" />
              </div>
              <span className="text-xs font-medium opacity-80">{message?.aiPersonality} Mode</span>
            </div>
          )}
          
          {renderMessageContent()}
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs opacity-70">
              {formatTimestamp(message?.timestamp)}
            </span>
            
            {!isUser && onFeedback && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onFeedback(message?.id, 'helpful')}
                  className="p-1 hover:bg-background/20 rounded transition-travel"
                  title="Helpful"
                >
                  <Icon name="ThumbsUp" size={12} />
                </button>
                <button
                  onClick={() => onFeedback(message?.id, 'not-helpful')}
                  className="p-1 hover:bg-background/20 rounded transition-travel"
                  title="Not helpful"
                >
                  <Icon name="ThumbsDown" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;