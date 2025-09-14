import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    description: '',
    tripDate: '',
    duration: '',
    budget: '',
    maxMembers: '',
    isPrivate: false,
    requireVerification: true,
    travelStyle: '',
    accommodationType: '',
    transportMode: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'Info' },
    { id: 2, title: 'Trip Details', icon: 'Calendar' },
    { id: 3, title: 'Group Settings', icon: 'Settings' },
    { id: 4, title: 'Preferences', icon: 'Heart' }
  ];

  const travelStyleOptions = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget' },
    { value: 'backpacking', label: 'Backpacking' }
  ];

  const accommodationOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'camping', label: 'Camping' },
    { value: 'resort', label: 'Resort' }
  ];

  const transportOptions = [
    { value: 'flight', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'car', label: 'Car' },
    { value: 'mixed', label: 'Mixed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.title?.trim()) newErrors.title = 'Group title is required';
        if (!formData?.destination?.trim()) newErrors.destination = 'Destination is required';
        if (!formData?.description?.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (!formData?.tripDate) newErrors.tripDate = 'Trip date is required';
        if (!formData?.duration) newErrors.duration = 'Duration is required';
        if (!formData?.budget) newErrors.budget = 'Budget is required';
        break;
      case 3:
        if (!formData?.maxMembers) newErrors.maxMembers = 'Maximum members is required';
        if (formData?.maxMembers < 2) newErrors.maxMembers = 'Minimum 2 members required';
        if (formData?.maxMembers > 20) newErrors.maxMembers = 'Maximum 20 members allowed';
        break;
      case 4:
        if (!formData?.travelStyle) newErrors.travelStyle = 'Travel style is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const newGroup = {
        id: Date.now(),
        ...formData,
        createdAt: new Date(),
        leader: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          isVerified: true
        },
        members: [{
          id: 'current-user',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          isVerified: true,
          role: 'leader'
        }],
        verificationStatus: 'verified',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
      };
      
      onCreateGroup(newGroup);
      onClose();
      setCurrentStep(1);
      setFormData({
        title: '',
        destination: '',
        description: '',
        tripDate: '',
        duration: '',
        budget: '',
        maxMembers: '',
        isPrivate: false,
        requireVerification: true,
        travelStyle: '',
        accommodationType: '',
        transportMode: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-travel-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Create Travel Group</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of {steps?.length}: {steps?.[currentStep - 1]?.title}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step?.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-muted-foreground'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Group Title"
                type="text"
                placeholder="e.g., Adventure Seekers - Bali 2024"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                error={errors?.title}
                required
              />
              <Input
                label="Destination"
                type="text"
                placeholder="e.g., Bali, Indonesia"
                value={formData?.destination}
                onChange={(e) => handleInputChange('destination', e?.target?.value)}
                error={errors?.destination}
                required
              />
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe your travel group, what you're looking for in fellow travelers, and what makes this trip special..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />
                {errors?.description && (
                  <p className="text-sm text-error mt-1">{errors?.description}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Input
                label="Trip Date"
                type="date"
                value={formData?.tripDate}
                onChange={(e) => handleInputChange('tripDate', e?.target?.value)}
                error={errors?.tripDate}
                required
              />
              <Input
                label="Duration (days)"
                type="number"
                placeholder="e.g., 7"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', e?.target?.value)}
                error={errors?.duration}
                required
                min="1"
                max="30"
              />
              <Input
                label="Budget per person (USD)"
                type="number"
                placeholder="e.g., 1500"
                value={formData?.budget}
                onChange={(e) => handleInputChange('budget', e?.target?.value)}
                error={errors?.budget}
                required
                min="0"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Input
                label="Maximum Members"
                type="number"
                placeholder="e.g., 6"
                value={formData?.maxMembers}
                onChange={(e) => handleInputChange('maxMembers', e?.target?.value)}
                error={errors?.maxMembers}
                required
                min="2"
                max="20"
              />
              <Checkbox
                label="Private Group"
                description="Only people with invitation link can join"
                checked={formData?.isPrivate}
                onChange={(e) => handleInputChange('isPrivate', e?.target?.checked)}
              />
              <Checkbox
                label="Require Verification"
                description="Members must verify their identity before joining"
                checked={formData?.requireVerification}
                onChange={(e) => handleInputChange('requireVerification', e?.target?.checked)}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Select
                label="Travel Style"
                options={travelStyleOptions}
                value={formData?.travelStyle}
                onChange={(value) => handleInputChange('travelStyle', value)}
                error={errors?.travelStyle}
                placeholder="Select travel style"
                required
              />
              <Select
                label="Preferred Accommodation"
                options={accommodationOptions}
                value={formData?.accommodationType}
                onChange={(value) => handleInputChange('accommodationType', value)}
                placeholder="Select accommodation type"
              />
              <Select
                label="Primary Transport"
                options={transportOptions}
                value={formData?.transportMode}
                onChange={(value) => handleInputChange('transportMode', value)}
                placeholder="Select transport mode"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {currentStep < 4 ? (
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmit}
                iconName="Plus"
                iconPosition="left"
              >
                Create Group
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;