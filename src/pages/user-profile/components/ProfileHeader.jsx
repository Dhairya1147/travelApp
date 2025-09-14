import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    location: user?.location,
    bio: user?.bio
  });

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      location: user?.location,
      bio: user?.bio
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-background"
            >
              <Icon name="Camera" size={14} />
            </Button>
          </div>
          
          {/* Verification Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {user?.verifications?.email && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                <Icon name="Mail" size={12} />
                <span>Email</span>
              </div>
            )}
            {user?.verifications?.phone && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                <Icon name="Phone" size={12} />
                <span>Phone</span>
              </div>
            )}
            {user?.verifications?.identity && (
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Icon name="Shield" size={12} />
                <span>ID Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={editData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={editData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={editData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
              <Input
                label="Location"
                type="text"
                value={editData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="City, Country"
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={editData?.bio}
                  onChange={(e) => handleInputChange('bio', e?.target?.value)}
                  placeholder="Tell us about yourself and your travel interests..."
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave} iconName="Check" iconPosition="left">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Phone" size={16} />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={16} />
                  <span>{user?.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>Member since {user?.memberSince}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Plane" size={16} />
                  <span>{user?.totalTrips} trips completed</span>
                </div>
              </div>

              {user?.bio && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{user?.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;