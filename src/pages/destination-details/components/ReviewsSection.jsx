import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ destination }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true,
        travelStyle: "Adventure Seeker",
        totalTrips: 23
      },
      rating: 5,
      date: "2024-09-10",
      title: "Absolutely breathtaking experience!",
      content: `This destination exceeded all my expectations. The natural beauty is stunning, and the local culture is incredibly welcoming. I particularly loved the sunset beach walks and the cultural heritage tour.\n\nThe accommodation was top-notch, and the local food scene is amazing. Would definitely recommend visiting during the shoulder season for better prices and fewer crowds.`,
      helpful: 24,
      images: [
        "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
        "https://images.pixabay.com/photo/2016/11/29/05/45/architecture-1867187_1280.jpg"
      ],
      tags: ["Solo Travel", "Photography", "Culture"]
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: true,
        travelStyle: "Budget Traveler",
        totalTrips: 15
      },
      rating: 4,
      date: "2024-09-05",
      title: "Great value for money",
      content: `Visited with my family of 4 and had a wonderful time. The budget-friendly options are plentiful, and we managed to have an amazing trip without breaking the bank.\n\nThe local markets are fantastic for authentic experiences, and the public transportation is reliable. Only minor complaint is that some popular spots can get crowded during peak hours.`,
      helpful: 18,
      images: [],
      tags: ["Family", "Budget", "Local Experience"]
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        verified: false,
        travelStyle: "Luxury Traveler",
        totalTrips: 8
      },
      rating: 5,
      date: "2024-08-28",
      title: "Perfect romantic getaway",
      content: `My partner and I had the most romantic week here. The luxury resorts are world-class, and the spa treatments were divine. The private beach access and personalized service made our anniversary truly special.\n\nHighly recommend the sunset dinner cruise and couples massage at the resort spa.`,
      helpful: 12,
      images: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306"
      ],
      tags: ["Couples", "Luxury", "Romance"]
    },
    {
      id: 4,
      user: {
        name: "David Thompson",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        verified: true,
        travelStyle: "Adventure Seeker",
        totalTrips: 31
      },
      rating: 4,
      date: "2024-08-20",
      title: "Adventure lover\'s paradise",
      content: `The hiking trails here are absolutely incredible! Spent 6 days exploring different routes and each one offered unique views and challenges. The local guides are knowledgeable and safety-conscious.\n\nPerfect for anyone looking to disconnect from city life and reconnect with nature.`,
      helpful: 15,
      images: [],
      tags: ["Adventure", "Hiking", "Nature"]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews', count: reviews?.length },
    { value: '5', label: '5 Stars', count: reviews?.filter(r => r?.rating === 5)?.length },
    { value: '4', label: '4 Stars', count: reviews?.filter(r => r?.rating === 4)?.length },
    { value: 'verified', label: 'Verified Only', count: reviews?.filter(r => r?.user?.verified)?.length }
  ];

  const getFilteredReviews = () => {
    let filtered = reviews;
    
    if (selectedFilter === 'verified') {
      filtered = reviews?.filter(review => review?.user?.verified);
    } else if (selectedFilter !== 'all') {
      filtered = reviews?.filter(review => review?.rating === parseInt(selectedFilter));
    }
    
    return showAllReviews ? filtered : filtered?.slice(0, 2);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const getAverageRating = () => {
    const total = reviews?.reduce((sum, review) => sum + review?.rating, 0);
    return (total / reviews?.length)?.toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ratingDistribution = getRatingDistribution();
  const averageRating = getAverageRating();

  return (
    <div className="bg-card rounded-lg p-6 shadow-travel-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Reviews & Ratings</h3>
        <Button variant="outline" size="sm">
          <Icon name="PenTool" size={16} className="mr-2" />
          Write Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground mb-2">{averageRating}</div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={20}
                className={i < Math.floor(averageRating) ? 'text-accent fill-current' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {reviews?.length} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-foreground">{rating}</span>
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                </div>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-travel"
                    style={{
                      width: `${reviews?.length > 0 ? (ratingDistribution?.[rating] / reviews?.length) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <Button
            key={option?.value}
            variant={selectedFilter === option?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(option?.value)}
          >
            {option?.label} ({option?.count})
          </Button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {getFilteredReviews()?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={review?.user?.avatar}
                alt={review?.user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">{review?.user?.name}</h4>
                  {review?.user?.verified && (
                    <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-0.5 rounded-full text-xs">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{review?.user?.travelStyle}</span>
                  <span>•</span>
                  <span>{review?.user?.totalTrips} trips</span>
                  <span>•</span>
                  <span>{formatDate(review?.date)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < review?.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h5 className="font-medium text-foreground mb-2">{review?.title}</h5>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {review?.content}
              </p>
            </div>

            {/* Review Images */}
            {review?.images?.length > 0 && (
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                {review?.images?.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Review Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {review?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Review Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="ThumbsUp" size={14} className="mr-1" />
                Helpful ({review?.helpful})
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Flag" size={14} className="mr-1" />
                Report
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {!showAllReviews && getFilteredReviews()?.length < reviews?.length && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(true)}
          >
            Show All Reviews ({reviews?.length - getFilteredReviews()?.length} more)
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;