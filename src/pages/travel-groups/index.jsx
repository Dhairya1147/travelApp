import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AITravelBuddyWidget from '../../components/ui/AITravelBuddyWidget';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import CreateGroupModal from './components/CreateGroupModal';

import GroupStats from './components/GroupStats';
import MyGroupsSection from './components/MyGroupsSection';
import RecommendedGroupsSection from './components/RecommendedGroupsSection';
import GroupDiscovery from './components/GroupDiscovery';

const TravelGroups = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = 'current-user';

  // Mock data for travel groups
  const mockGroups = [
    {
      id: 1,
      title: "Adventure Seekers - Bali Explorer",
      destination: "Bali, Indonesia",
      description: "Join us for an epic adventure through Bali's hidden gems! We'll explore ancient temples, hike active volcanoes, and discover pristine beaches away from the crowds. Looking for fellow adventurers who love early morning hikes and authentic local experiences.",
      tripDate: "2024-12-15",
      duration: 10,
      budget: 18000,
      maxMembers: 6,
      isPrivate: false,
      verificationStatus: "verified",
      travelStyle: "adventure",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      leader: {
        id: "leader1",
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        isVerified: true
      },
      members: [
        {
          id: "leader1",
          name: "Sarah Chen",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          isVerified: true,
          role: "leader"
        },
        {
          id: "member1",
          name: "Mike Johnson",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member2",
          name: "Emma Davis",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          isVerified: false,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-10')
    },
    {
      id: 2,
      title: "Tokyo Culture & Food Tour",
      destination: "Tokyo, Japan",
      description: "Experience authentic Tokyo through its incredible food scene and rich culture. We'll visit traditional markets, learn to make sushi, explore hidden neighborhoods, and enjoy the best ramen spots locals love. Perfect for food enthusiasts and culture lovers!",
      tripDate: "2024-11-20",
      duration: 7,
      budget: 22000,
      maxMembers: 4,
      isPrivate: false,
      verificationStatus: "verified",
      travelStyle: "cultural",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      leader: {
        id: "leader2",
        name: "Kenji Tanaka",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        isVerified: true
      },
      members: [
        {
          id: "leader2",
          name: "Kenji Tanaka",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          isVerified: true,
          role: "leader"
        },
        {
          id: "current-user",
          name: "You",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          isVerified: true,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-08')
    },
    {
      id: 3,
      title: "European Backpacking Adventure",
      destination: "Multiple Cities, Europe",
      description: "Budget-friendly backpacking trip across 5 European countries! We'll stay in hostels, use public transport, and discover free attractions. Perfect for young travelers who want to see Europe without breaking the bank. Flexible itinerary based on group preferences.",
      tripDate: "2024-10-25",
      duration: 21,
      budget: 12000,
      maxMembers: 8,
      isPrivate: false,
      verificationStatus: "pending",
      travelStyle: "backpacking",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
      leader: {
        id: "leader3",
        name: "Alex Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        isVerified: false
      },
      members: [
        {
          id: "leader3",
          name: "Alex Rodriguez",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          isVerified: false,
          role: "leader"
        },
        {
          id: "member3",
          name: "Lisa Wang",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member4",
          name: "Tom Brown",
          avatar: "https://randomuser.me/api/portraits/men/7.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member5",
          name: "Anna Smith",
          avatar: "https://randomuser.me/api/portraits/women/8.jpg",
          isVerified: false,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-12')
    },
    {
      id: 4,
      title: "Luxury Safari Experience",
      destination: "Kenya & Tanzania",
      description: "Premium safari experience with luxury lodges and private game drives. We'll witness the Great Migration, visit Maasai villages, and enjoy world-class accommodations. Looking for travelers who appreciate comfort and exclusive wildlife experiences.",
      tripDate: "2025-01-15",
      duration: 12,
      budget: 55000,
      maxMembers: 4,
      isPrivate: true,
      verificationStatus: "verified",
      travelStyle: "luxury",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      leader: {
        id: "leader4",
        name: "Victoria Sterling",
        avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        isVerified: true
      },
      members: [
        {
          id: "leader4",
          name: "Victoria Sterling",
          avatar: "https://randomuser.me/api/portraits/women/9.jpg",
          isVerified: true,
          role: "leader"
        },
        {
          id: "member6",
          name: "James Wilson",
          avatar: "https://randomuser.me/api/portraits/men/10.jpg",
          isVerified: true,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-05')
    },
    {
      id: 5,
      title: "Iceland Northern Lights Hunt",
      destination: "Iceland",
      description: "Chase the Northern Lights across Iceland's stunning landscapes! We'll explore ice caves, relax in hot springs, and photograph the Aurora Borealis. Perfect for photography enthusiasts and nature lovers seeking magical winter experiences.",
      tripDate: "2024-12-01",
      duration: 8,
      budget: 28000,
      maxMembers: 5,
      isPrivate: false,
      verificationStatus: "verified",
      travelStyle: "adventure",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
      leader: {
        id: "leader5",
        name: "Erik Johansson",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        isVerified: true
      },
      members: [
        {
          id: "leader5",
          name: "Erik Johansson",
          avatar: "https://randomuser.me/api/portraits/men/11.jpg",
          isVerified: true,
          role: "leader"
        },
        {
          id: "member7",
          name: "Sophie Martin",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member8",
          name: "David Kim",
          avatar: "https://randomuser.me/api/portraits/men/13.jpg",
          isVerified: false,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-07')
    },
    {
      id: 6,
      title: "Machu Picchu Trekking Group",
      destination: "Peru",
      description: "Classic Inca Trail trek to Machu Picchu with experienced guides. We'll camp under the stars, explore ancient ruins, and reach the Sun Gate at sunrise. Moderate fitness level required. All permits and equipment included in the budget.",
      tripDate: "2024-11-10",
      duration: 6,
      budget: 9500,
      maxMembers: 10,
      isPrivate: false,
      verificationStatus: "verified",
      travelStyle: "adventure",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
      leader: {
        id: "leader6",
        name: "Carlos Mendoza",
        avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        isVerified: true
      },
      members: [
        {
          id: "leader6",
          name: "Carlos Mendoza",
          avatar: "https://randomuser.me/api/portraits/men/14.jpg",
          isVerified: true,
          role: "leader"
        },
        {
          id: "member9",
          name: "Rachel Green",
          avatar: "https://randomuser.me/api/portraits/women/15.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member10",
          name: "Mark Thompson",
          avatar: "https://randomuser.me/api/portraits/men/16.jpg",
          isVerified: true,
          role: "member"
        },
        {
          id: "member11",
          name: "Julia Roberts",
          avatar: "https://randomuser.me/api/portraits/women/17.jpg",
          isVerified: false,
          role: "member"
        }
      ],
      createdAt: new Date('2024-09-09')
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);
  }, []);

  const handleJoinGroup = (groupId) => {
    setGroups(prevGroups => 
      prevGroups?.map(group => {
        if (group?.id === groupId) {
          return {
            ...group,
            members: [...group?.members, {
              id: currentUserId,
              name: "You",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              isVerified: true,
              role: "member"
            }]
          };
        }
        return group;
      })
    );
  };

  const handleLeaveGroup = (groupId) => {
    setGroups(prevGroups => 
      prevGroups?.map(group => {
        if (group?.id === groupId) {
          return {
            ...group,
            members: group?.members?.filter(member => member?.id !== currentUserId)
          };
        }
        return group;
      })
    );
  };

  const handleCreateGroup = (newGroup) => {
    setGroups(prevGroups => [newGroup, ...prevGroups]);
  };

  // Get user's groups
  const myGroups = groups?.filter(group => 
    group?.members?.some(member => member?.id === currentUserId)
  );

  // Get recommended groups (not joined, verified, matching preferences)
  const recommendedGroups = groups?.filter(group => 
    !group?.members?.some(member => member?.id === currentUserId) &&
    group?.verificationStatus === 'verified'
  );

  // Calculate stats
  const stats = {
    totalGroups: groups?.length,
    yourGroups: myGroups?.length,
    upcomingTrips: myGroups?.filter(group => new Date(group.tripDate) > new Date())?.length,
    verifiedGroups: groups?.filter(group => group?.verificationStatus === 'verified')?.length
  };

  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'Compass' },
    { id: 'my-groups', label: 'My Groups', icon: 'Users', count: myGroups?.length },
    { id: 'recommended', label: 'Recommended', icon: 'Sparkles' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16 pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-96 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Travel Groups - TravelMate AI</title>
        <meta name="description" content="Join verified travel groups for safe and coordinated group experiences. Create, manage, and discover travel companions for your next adventure." />
      </Helmet>
      <NavigationBar />
      <div className="pt-16 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Travel Groups</h1>
              <p className="text-muted-foreground">
                Connect with verified travelers and create unforgettable group experiences
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <OfflineStatusIndicator />
              <Button
                variant="default"
                onClick={() => setIsCreateModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Create Group
              </Button>
            </div>
          </div>

          {/* Stats */}
          <GroupStats stats={stats} />

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-travel ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  {tab?.count !== undefined && (
                    <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                      {tab?.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'discover' && (
              <GroupDiscovery
                groups={groups}
                onJoinGroup={handleJoinGroup}
                onLeaveGroup={handleLeaveGroup}
                currentUserId={currentUserId}
              />
            )}

            {activeTab === 'my-groups' && (
              <MyGroupsSection
                groups={myGroups}
                onJoinGroup={handleJoinGroup}
                onLeaveGroup={handleLeaveGroup}
                currentUserId={currentUserId}
              />
            )}

            {activeTab === 'recommended' && (
              <RecommendedGroupsSection
                groups={recommendedGroups}
                onJoinGroup={handleJoinGroup}
                onLeaveGroup={handleLeaveGroup}
                currentUserId={currentUserId}
              />
            )}
          </div>
        </div>
      </div>
      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
      <AITravelBuddyWidget />
    </div>
  );
};

export default TravelGroups;