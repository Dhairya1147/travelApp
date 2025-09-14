import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import GroupCard from './GroupCard';

const RecommendedGroupsSection = ({ groups, onJoinGroup, onLeaveGroup, currentUserId }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="Sparkles" size={20} />
          <span>Recommended for You</span>
        </h3>
        <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your travel preferences and past trips, here are groups that match your style.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.slice(0, 6)?.map(group => (
          <div key={group?.id} className="relative">
            <div className="absolute -top-2 -right-2 z-10">
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>Match</span>
              </div>
            </div>
            <GroupCard
              group={group}
              onJoinGroup={onJoinGroup}
              onLeaveGroup={onLeaveGroup}
              currentUserId={currentUserId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedGroupsSection;