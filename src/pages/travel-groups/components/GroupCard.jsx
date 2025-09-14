import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupCard = ({ group, onJoinGroup, onLeaveGroup, currentUserId }) => {
  const isGroupMember = group?.members?.some(member => member?.id === currentUserId);
  const isGroupFull = group?.members?.length >= group?.maxMembers;
  const daysUntilTrip = Math.ceil((new Date(group.tripDate) - new Date()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getUrgencyColor = (days) => {
    if (days <= 7) return 'text-error';
    if (days <= 14) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-travel-card hover:shadow-travel-modal transition-travel overflow-hidden">
      {/* Group Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={group?.image}
          alt={group?.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group?.verificationStatus)}`}>
            <Icon name={group?.verificationStatus === 'verified' ? 'Shield' : 'Clock'} size={12} className="inline mr-1" />
            {group?.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
          </span>
          {group?.isPrivate && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
              <Icon name="Lock" size={12} className="inline mr-1" />
              Private
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-card/90 text-card-foreground rounded-full text-xs font-medium">
            {group?.members?.length}/{group?.maxMembers} members
          </span>
        </div>
      </div>
      {/* Group Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground text-lg mb-1">{group?.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{group?.destination}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{new Date(group.tripDate)?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{group?.description}</p>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="DollarSign" size={14} className="text-primary" />
            <span className="text-muted-foreground">Budget:</span>
            <span className="font-medium text-card-foreground">₹{group?.budget}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Clock" size={14} className="text-primary" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium text-card-foreground">{group?.duration} days</span>
          </div>
        </div>

        {/* Urgency Indicator */}
        {daysUntilTrip <= 14 && (
          <div className={`flex items-center space-x-1 text-sm mb-3 ${getUrgencyColor(daysUntilTrip)}`}>
            <Icon name="AlertCircle" size={14} />
            <span className="font-medium">
              {daysUntilTrip <= 0 ? 'Trip started' : `${daysUntilTrip} days until trip`}
            </span>
          </div>
        )}

        {/* Group Leader */}
        <div className="flex items-center space-x-2 mb-4">
          <Image
            src={group?.leader?.avatar}
            alt={group?.leader?.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">Led by</span>
          <span className="text-sm font-medium text-card-foreground">{group?.leader?.name}</span>
          {group?.leader?.isVerified && (
            <Icon name="BadgeCheck" size={14} className="text-success" />
          )}
        </div>

        {/* Member Avatars */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {group?.members?.slice(0, 4)?.map((member, index) => (
              <Image
                key={member?.id}
                src={member?.avatar}
                alt={member?.name}
                className="w-8 h-8 rounded-full border-2 border-card"
              />
            ))}
            {group?.members?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{group?.members?.length - 4}
                </span>
              </div>
            )}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {group?.members?.length} member{group?.members?.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {isGroupMember ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Chat
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onLeaveGroup(group?.id)}
                iconName="UserMinus"
                iconPosition="left"
              >
                Leave
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onJoinGroup(group?.id)}
                disabled={isGroupFull}
                iconName="UserPlus"
                iconPosition="left"
              >
                {isGroupFull ? 'Full' : 'Join'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;