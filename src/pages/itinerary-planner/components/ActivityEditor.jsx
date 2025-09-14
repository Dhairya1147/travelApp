import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActivityEditor = ({ activity, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    startTime: '',
    endTime: '',
    cost: 0,
    crowdLevel: 'low',
    status: 'planned',
    type: 'activity',
    category: 'activities',
    description: '',
    bookingUrl: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity?.title || '',
        location: activity?.location || '',
        startTime: activity?.startTime || '',
        endTime: activity?.endTime || '',
        cost: activity?.cost || 0,
        crowdLevel: activity?.crowdLevel || 'low',
        status: activity?.status || 'planned',
        type: activity?.type || 'activity',
        category: activity?.category || 'activities',
        description: activity?.description || '',
        bookingUrl: activity?.bookingUrl || '',
        notes: activity?.notes || ''
      });
    }
  }, [activity]);

  const activityTypes = [
    { value: 'activity', label: 'General Activity' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Accommodation' },
    { value: 'transport', label: 'Transportation' },
    { value: 'attraction', label: 'Tourist Attraction' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const crowdLevels = [
    { value: 'low', label: 'Low Crowd' },
    { value: 'medium', label: 'Medium Crowd' },
    { value: 'high', label: 'High Crowd' }
  ];

  const statusOptions = [
    { value: 'planned', label: 'Planned' },
    { value: 'booked', label: 'Booked' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const categories = [
    { value: 'activities', label: 'Activities' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'meals', label: 'Meals' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData?.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData?.startTime && formData?.endTime && formData?.startTime >= formData?.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (formData?.cost < 0) {
      newErrors.cost = 'Cost cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Calculate duration
    const duration = formData?.startTime && formData?.endTime 
      ? calculateDuration(formData?.startTime, formData?.endTime)
      : 0;

    const updatedActivity = {
      ...activity,
      ...formData,
      duration,
      cost: parseFloat(formData?.cost)
    };

    try {
      await onSave(updatedActivity);
      onClose();
    } catch (error) {
      console.error('Error saving activity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    return Math.max(0, (endTime - startTime) / (1000 * 60)); // Duration in minutes
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      onDelete(activity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            {activity?.id ? 'Edit Activity' : 'Add Activity'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-card-foreground">Basic Information</h3>
            
            <Input
              label="Activity Title"
              type="text"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              placeholder="Enter activity name"
              required
            />

            <Input
              label="Location"
              type="text"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              placeholder="Enter location or address"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Activity Type"
                options={activityTypes}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
              />

              <Select
                label="Budget Category"
                options={categories}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
              />
            </div>
          </div>

          {/* Timing */}
          <div className="space-y-4">
            <h3 className="font-medium text-card-foreground">Timing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={formData?.startTime}
                onChange={(e) => handleInputChange('startTime', e?.target?.value)}
                error={errors?.startTime}
                required
              />

              <Input
                label="End Time"
                type="time"
                value={formData?.endTime}
                onChange={(e) => handleInputChange('endTime', e?.target?.value)}
                error={errors?.endTime}
                required
              />
            </div>

            {formData?.startTime && formData?.endTime && (
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>
                    Duration: {calculateDuration(formData?.startTime, formData?.endTime)} minutes
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-card-foreground">Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Cost (₹)"
                type="number"
                value={formData?.cost}
                onChange={(e) => handleInputChange('cost', e?.target?.value)}
                error={errors?.cost}
                min="0"
                step="0.01"
              />

              <Select
                label="Crowd Level"
                options={crowdLevels}
                value={formData?.crowdLevel}
                onChange={(value) => handleInputChange('crowdLevel', value)}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Brief description of the activity"
            />

            <Input
              label="Booking URL"
              type="url"
              value={formData?.bookingUrl}
              onChange={(e) => handleInputChange('bookingUrl', e?.target?.value)}
              placeholder="https://example.com/booking"
            />

            <Input
              label="Notes"
              type="text"
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Additional notes or reminders"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {activity?.id && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Icon name="Trash2" size={16} />
                Delete Activity
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={isLoading}>
              <Icon name="Save" size={16} />
              Save Activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityEditor;