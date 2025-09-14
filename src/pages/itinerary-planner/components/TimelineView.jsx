import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ itinerary, onUpdateItinerary, onActivitySelect }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const timelineRef = useRef(null);

  const handleDragEnd = (result) => {
    if (!result?.destination) return;

    const { source, destination } = result;
    const sourceDay = parseInt(source?.droppableId?.split('-')?.[1]);
    const destDay = parseInt(destination?.droppableId?.split('-')?.[1]);

    const newItinerary = { ...itinerary };
    const sourceActivities = [...newItinerary?.days?.[sourceDay]?.activities];
    const [movedActivity] = sourceActivities?.splice(source?.index, 1);

    if (sourceDay === destDay) {
      sourceActivities?.splice(destination?.index, 0, movedActivity);
      newItinerary.days[sourceDay].activities = sourceActivities;
    } else {
      const destActivities = [...newItinerary?.days?.[destDay]?.activities];
      destActivities?.splice(destination?.index, 0, movedActivity);
      newItinerary.days[sourceDay].activities = sourceActivities;
      newItinerary.days[destDay].activities = destActivities;
    }

    onUpdateItinerary(newItinerary);
  };

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: `activity-${Date.now()}`,
      title: "New Activity",
      startTime: "09:00",
      endTime: "10:00",
      duration: 60,
      cost: 0,
      location: "",
      crowdLevel: "low",
      status: "planned",
      type: "activity"
    };

    const newItinerary = { ...itinerary };
    newItinerary?.days?.[dayIndex]?.activities?.push(newActivity);
    onUpdateItinerary(newItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const newItinerary = { ...itinerary };
    newItinerary?.days?.[dayIndex]?.activities?.splice(activityIndex, 1);
    onUpdateItinerary(newItinerary);
  };

  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked': return 'text-success bg-success/10';
      case 'planned': return 'text-primary bg-primary/10';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Timeline View</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Share" size={16} />
            Share
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div ref={timelineRef} className="space-y-6 max-h-96 overflow-y-auto">
          {itinerary?.days?.map((day, dayIndex) => (
            <div key={dayIndex} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {dayIndex + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">
                      Day {dayIndex + 1} - {day?.date}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {day?.activities?.length} activities planned
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addActivity(dayIndex)}
                >
                  <Icon name="Plus" size={14} />
                  Add Activity
                </Button>
              </div>

              <Droppable droppableId={`day-${dayIndex}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided?.innerRef}
                    {...provided?.droppableProps}
                    className={`space-y-3 min-h-[100px] p-2 rounded-md transition-travel ${
                      snapshot?.isDraggingOver ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    {day?.activities?.map((activity, activityIndex) => (
                      <Draggable
                        key={activity?.id}
                        draggableId={activity?.id}
                        index={activityIndex}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided?.innerRef}
                            {...provided?.draggableProps}
                            {...provided?.dragHandleProps}
                            className={`bg-background border border-border rounded-lg p-4 cursor-move transition-travel ${
                              snapshot?.isDragging ? 'shadow-travel-modal rotate-1' : 'hover:shadow-travel-card'
                            }`}
                            onClick={() => onActivitySelect(activity)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Icon name="GripVertical" size={14} className="text-muted-foreground" />
                                  <h4 className="font-medium text-card-foreground">{activity?.title}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                                    {activity?.status}
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Clock" size={12} />
                                    <span>{activity?.startTime} - {activity?.endTime}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span>₹{activity?.cost}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Users" size={12} />
                                    <span className={`px-1 py-0.5 rounded text-xs ${getCrowdLevelColor(activity?.crowdLevel)}`}>
                                      {activity?.crowdLevel}
                                    </span>
                                  </div>
                                </div>

                                {activity?.location && (
                                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                    <Icon name="MapPin" size={12} />
                                    <span>{activity?.location}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    onActivitySelect(activity);
                                  }}
                                >
                                  <Icon name="Edit" size={12} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-error hover:text-error"
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    removeActivity(dayIndex, activityIndex);
                                  }}
                                >
                                  <Icon name="Trash2" size={12} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided?.placeholder}
                    
                    {day?.activities?.length === 0 && (
                      <div className="flex items-center justify-center h-20 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                        <div className="text-center">
                          <Icon name="Calendar" size={24} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Drop activities here or click "Add Activity"</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TimelineView;