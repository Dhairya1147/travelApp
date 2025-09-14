import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import GroupCard from './GroupCard';

const MyGroupsSection = ({ groups, onJoinGroup, onLeaveGroup, currentUserId }) => {
  if (groups?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Users" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">No Groups Yet</h3>
        <p className="text-muted-foreground mb-4">
          You haven't joined any travel groups yet. Start by creating your own or joining existing ones.
        </p>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Create Your First Group
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
          <Icon name="Users" size={20} />
          <span>My Groups ({groups?.length})</span>
        </h3>
        <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map(group => (
          <GroupCard
            key={group?.id}
            group={group}
            onJoinGroup={onJoinGroup}
            onLeaveGroup={onLeaveGroup}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGroupsSection;