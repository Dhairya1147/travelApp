import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborationPanel = ({ itinerary, onShare, onCollaboratorAdd, onCommentAdd, onVote }) => {
  const [activeTab, setActiveTab] = useState('share');
  const [shareEmail, setShareEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    // Mock data for collaborators
    setCollaborators([
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        role: 'editor',
        status: 'active',
        joinedAt: new Date('2024-09-10')
      },
      {
        id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        role: 'viewer',
        status: 'pending',
        joinedAt: new Date('2024-09-12')
      },
      {
        id: 3,
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        role: 'editor',
        status: 'active',
        joinedAt: new Date('2024-09-11')
      }
    ]);

    // Mock comments
    setComments([
      {
        id: 1,
        author: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        content: 'I think we should add more time at the museum. The Egyptian exhibit is supposed to be amazing!',
        timestamp: new Date('2024-09-13T10:30:00'),
        activityId: 'activity-1',
        replies: [
          {
            id: 11,
            author: 'You',
            content: 'Good point! I\'ll extend the museum visit by an hour.',
            timestamp: new Date('2024-09-13T11:15:00')
          }
        ]
      },
      {
        id: 2,
        author: 'Mike Chen',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        content: 'The restaurant for Day 2 dinner looks expensive. Any alternatives?',
        timestamp: new Date('2024-09-13T14:20:00'),
        activityId: 'activity-5',
        replies: []
      },
      {
        id: 3,
        author: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        content: 'Love the hiking trail choice! Perfect for our fitness levels.',
        timestamp: new Date('2024-09-13T16:45:00'),
        activityId: 'activity-8',
        replies: []
      }
    ]);

    // Mock voting data
    setVotes([
      {
        id: 1,
        title: 'Restaurant Choice for Day 2',
        description: 'Which restaurant should we choose for our Day 2 dinner?',
        options: [
          { id: 'opt1', text: 'Italian Bistro ($$$)', votes: 2, voters: ['Sarah Johnson', 'You'] },
          { id: 'opt2', text: 'Local Seafood Place ($$)', votes: 1, voters: ['Emma Wilson'] },
          { id: 'opt3', text: 'Street Food Market ($)', votes: 0, voters: [] }
        ],
        status: 'active',
        createdBy: 'You',
        createdAt: new Date('2024-09-13T09:00:00'),
        deadline: new Date('2024-09-15T23:59:59')
      },
      {
        id: 2,
        title: 'Transportation Method',
        description: 'How should we get around the city?',
        options: [
          { id: 'opt4', text: 'Rent a car', votes: 1, voters: ['Mike Chen'] },
          { id: 'opt5', text: 'Public transportation', votes: 2, voters: ['Sarah Johnson', 'Emma Wilson'] },
          { id: 'opt6', text: 'Walking + Uber', votes: 0, voters: [] }
        ],
        status: 'completed',
        createdBy: 'Sarah Johnson',
        createdAt: new Date('2024-09-12T15:30:00'),
        deadline: new Date('2024-09-13T23:59:59')
      }
    ]);
  }, []);

  const handleShare = () => {
    if (shareEmail?.trim()) {
      onCollaboratorAdd({
        email: shareEmail,
        role: 'viewer'
      });
      setShareEmail('');
    }
  };

  const handleCommentSubmit = () => {
    if (newComment?.trim()) {
      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment,
        timestamp: new Date(),
        replies: []
      };
      setComments(prev => [...prev, comment]);
      onCommentAdd(comment);
      setNewComment('');
    }
  };

  const handleVoteSubmit = (voteId, optionId) => {
    setVotes(prev => prev?.map(vote => {
      if (vote?.id === voteId) {
        return {
          ...vote,
          options: vote?.options?.map(option => {
            if (option?.id === optionId) {
              return {
                ...option,
                votes: option?.votes + 1,
                voters: [...option?.voters, 'You']
              };
            }
            return option;
          })
        };
      }
      return vote;
    }));
    onVote(voteId, optionId);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner': return 'text-primary bg-primary/10';
      case 'editor': return 'text-success bg-success/10';
      case 'viewer': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'share', label: 'Share & Invite', icon: 'Share' },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle' },
    { id: 'votes', label: 'Group Decisions', icon: 'Vote' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Collaboration</h2>
        <Button variant="outline" size="sm" onClick={() => onShare(itinerary)}>
          <Icon name="ExternalLink" size={16} />
          Share Link
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-travel ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Share & Invite Tab */}
      {activeTab === 'share' && (
        <div className="space-y-6">
          {/* Invite New Collaborator */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-medium text-card-foreground mb-3">Invite Collaborators</h3>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e?.target?.value)}
                className="flex-1"
              />
              <Button onClick={handleShare} disabled={!shareEmail?.trim()}>
                <Icon name="Send" size={16} />
                Invite
              </Button>
            </div>
          </div>

          {/* Current Collaborators */}
          <div>
            <h3 className="font-medium text-card-foreground mb-4">
              Current Collaborators ({collaborators?.length})
            </h3>
            <div className="space-y-3">
              {collaborators?.map((collaborator) => (
                <div key={collaborator?.id} className="flex items-center justify-between bg-background rounded-lg border border-border p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={collaborator?.avatar}
                      alt={collaborator?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-card-foreground">{collaborator?.name}</h4>
                      <p className="text-sm text-muted-foreground">{collaborator?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(collaborator?.role)}`}>
                      {collaborator?.role}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(collaborator?.status)}`}></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="space-y-6">
          {/* Add Comment */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-medium text-card-foreground mb-3">Add Comment</h3>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Share your thoughts about the itinerary..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleCommentSubmit()}
              />
              <Button onClick={handleCommentSubmit} disabled={!newComment?.trim()}>
                <Icon name="Send" size={16} />
                Post Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment?.id} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={comment?.avatar || '/assets/images/no_image.png'}
                    alt={comment?.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-card-foreground">{comment?.author}</h4>
                      <span className="text-xs text-muted-foreground">
                        {comment?.timestamp?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{comment?.content}</p>
                    
                    {/* Replies */}
                    {comment?.replies && comment?.replies?.length > 0 && (
                      <div className="ml-4 space-y-2 border-l-2 border-border pl-4">
                        {comment?.replies?.map((reply) => (
                          <div key={reply?.id} className="text-sm">
                            <span className="font-medium text-card-foreground">{reply?.author}:</span>
                            <span className="text-muted-foreground ml-1">{reply?.content}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Icon name="Reply" size={14} />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Votes Tab */}
      {activeTab === 'votes' && (
        <div className="space-y-6">
          {/* Create New Vote */}
          <div className="bg-background rounded-lg border border-border p-4">
            <Button variant="outline" className="w-full">
              <Icon name="Plus" size={16} />
              Create New Vote
            </Button>
          </div>

          {/* Active Votes */}
          <div className="space-y-4">
            {votes?.map((vote) => (
              <div key={vote?.id} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-card-foreground">{vote?.title}</h3>
                    <p className="text-sm text-muted-foreground">{vote?.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vote?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {vote?.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {vote?.options?.map((option) => (
                    <div key={option?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{option?.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {option?.votes} vote{option?.votes !== 1 ? 's' : ''}
                          {option?.voters?.length > 0 && ` • ${option?.voters?.join(', ')}`}
                        </p>
                      </div>
                      {vote?.status === 'active' && !option?.voters?.includes('You') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVoteSubmit(vote?.id, option?.id)}
                        >
                          Vote
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  <span>Created by {vote?.createdBy}</span>
                  {vote?.status === 'active' && (
                    <span>Deadline: {vote?.deadline?.toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPanel;