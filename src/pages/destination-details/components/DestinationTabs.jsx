import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DestinationTabs = ({ destination }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'activities', label: 'Activities', icon: 'MapPin' },
    { id: 'accommodation', label: 'Hotels', icon: 'Building' },
    { id: 'local-business', label: 'Local Spots', icon: 'Store' }
  ];

  const activities = [
    {
      id: 1,
      name: "Sunset Beach Walk",
      type: "Outdoor",
      duration: "2 hours",
      price: 2500,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
      description: "Experience breathtaking sunset views along pristine coastline with guided nature commentary.",
      highlights: ["Professional guide", "Photography spots", "Local wildlife viewing"]
    },
    {
      id: 2,
      name: "Cultural Heritage Tour",
      type: "Cultural",
      duration: "4 hours",
      price: 4500,
      rating: 4.9,
      image: "https://images.pixabay.com/photo/2016/11/29/05/45/architecture-1867187_1280.jpg",
      description: "Immerse yourself in local history and traditions with expert cultural guides.",
      highlights: ["Historical sites", "Traditional crafts", "Local storytelling"]
    },
    {
      id: 3,
      name: "Adventure Hiking Trail",
      type: "Adventure",
      duration: "6 hours",
      price: 6500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      description: "Challenge yourself on scenic mountain trails with spectacular panoramic views.",
      highlights: ["Mountain peaks", "Wildlife spotting", "Photography opportunities"]
    }
  ];

  const accommodations = [
    {
      id: 1,
      name: "Oceanview Resort & Spa",
      type: "Resort",
      rating: 4.8,
      price: 3600,
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      amenities: ["Pool", "Spa", "Restaurant", "WiFi"],
      availability: "Available",
      distance: "0.5 km from center"
    },
    {
      id: 2,
      name: "Boutique Heritage Hotel",
      type: "Boutique",
      rating: 4.6,
      price: 3000,
      image: "https://images.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
      amenities: ["Restaurant", "WiFi", "Parking", "Concierge"],
      availability: "2 rooms left",
      distance: "0.2 km from center"
    },
    {
      id: 3,
      name: "Budget Traveler Inn",
      type: "Hostel",
      rating: 4.2,
      price: 1500,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      amenities: ["WiFi", "Kitchen", "Laundry", "Common Area"],
      availability: "Available",
      distance: "1.2 km from center"
    }
  ];

  const localBusinesses = [
    {
      id: 1,
      name: "Maria\'s Traditional Kitchen",
      type: "Restaurant",
      rating: 4.9,
      price: "₹3000",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      specialty: "Authentic local cuisine",
      hours: "11:00 AM - 10:00 PM",
      verified: true
    },
    {
      id: 2,
      name: "Artisan Craft Market",
      type: "Shopping",
      rating: 4.7,
      price: "₹2500",
      image: "https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
      specialty: "Handmade local crafts",
      hours: "9:00 AM - 6:00 PM",
      verified: true
    },
    {
      id: 3,
      name: "Coastal Coffee Roasters",
      type: "Cafe",
      rating: 4.5,
      price: "₹5000",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      specialty: "Locally roasted coffee",
      hours: "6:00 AM - 8:00 PM",
      verified: false
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Bot" size={24} className="text-primary mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-3">AI-Generated Summary</h4>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {destination?.name} offers an exceptional blend of natural beauty and cultural richness. 
              Perfect for travelers seeking authentic experiences, this destination combines stunning 
              coastal landscapes with vibrant local traditions. The area is known for its sustainable 
              tourism practices and welcoming community.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                Eco-Friendly
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Cultural Heritage
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                Adventure Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Attractions */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Key Attractions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destination?.attractions?.map((attraction, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Icon name="MapPin" size={20} className="text-primary mt-1" />
              <div>
                <h5 className="font-medium text-foreground">{attraction?.name}</h5>
                <p className="text-sm text-muted-foreground mt-1">{attraction?.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-primary font-medium">{attraction?.distance}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{attraction?.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Curated Experiences</h4>
        <Button variant="outline" size="sm">
          <Icon name="Filter" size={16} className="mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activities?.map((activity) => (
          <div key={activity?.id} className="bg-muted rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={activity?.image}
                alt={activity?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                  {activity?.type}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  <Icon name="Star" size={12} className="fill-current" />
                  <span>{activity?.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h5 className="font-semibold text-foreground mb-2">{activity?.name}</h5>
              <p className="text-sm text-muted-foreground mb-3">{activity?.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{activity?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={14} />
                    <span>₹{activity?.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {activity?.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full">
                Book Experience
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccommodation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Verified Hotels</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Calendar" size={16} className="mr-2" />
            Dates
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {accommodations?.map((hotel) => (
          <div key={hotel?.id} className="bg-muted rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
              <Image
                src={hotel?.image}
                alt={hotel?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-semibold text-foreground">{hotel?.name}</h5>
                  <p className="text-sm text-muted-foreground">{hotel?.type} • {hotel?.distance}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-sm font-medium text-foreground">{hotel?.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">₹{hotel?.price}</div>
                  <div className="text-xs text-muted-foreground">per night</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel?.amenities?.map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-background text-muted-foreground rounded text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  hotel?.availability === 'Available' ? 'text-success' : 'text-warning'
                }`}>
                  {hotel?.availability}
                </span>
                <Button size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocalBusiness = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Authentic Local Experiences</h4>
        <Button variant="outline" size="sm">
          <Icon name="Map" size={16} className="mr-2" />
          View on Map
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localBusinesses?.map((business) => (
          <div key={business?.id} className="bg-muted rounded-lg overflow-hidden">
            <div className="relative h-40">
              <Image
                src={business?.image}
                alt={business?.name}
                className="w-full h-full object-cover"
              />
              {business?.verified && (
                <div className="absolute top-2 right-2">
                  <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} />
                    <span>Verified</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-semibold text-foreground">{business?.name}</h5>
                  <p className="text-sm text-muted-foreground">{business?.type}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-sm font-medium text-foreground">{business?.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{business?.specialty}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{business?.hours}</span>
                </div>
                <span className="font-medium text-foreground">{business?.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'activities':
        return renderActivities();
      case 'accommodation':
        return renderAccommodation();
      case 'local-business':
        return renderLocalBusiness();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-travel-card">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-travel ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DestinationTabs;