import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CrowdPredictionWidget = () => {
  const [selectedDestination, setSelectedDestination] = useState('paris');

  const crowdData = {
    paris: {
      name: "Paris, France",
      currentLevel: "High",
      prediction: [
        { month: 'Jan', crowd: 60, cost: 80 },
        { month: 'Feb', crowd: 65, cost: 75 },
        { month: 'Mar', crowd: 85, cost: 90 },
        { month: 'Apr', crowd: 95, cost: 100 },
        { month: 'May', crowd: 90, cost: 95 },
        { month: 'Jun', crowd: 100, cost: 110 }
      ],
      alternatives: ["Lyon, France", "Strasbourg, France"]
    },
    tokyo: {
      name: "Tokyo, Japan",
      currentLevel: "Medium",
      prediction: [
        { month: 'Jan', crowd: 70, cost: 85 },
        { month: 'Feb', crowd: 75, cost: 80 },
        { month: 'Mar', crowd: 100, cost: 120 },
        { month: 'Apr', crowd: 95, cost: 115 },
        { month: 'May', crowd: 80, cost: 90 },
        { month: 'Jun', crowd: 85, cost: 95 }
      ],
      alternatives: ["Kyoto, Japan", "Osaka, Japan"]
    },
    bali: {
      name: "Bali, Indonesia",
      currentLevel: "Low",
      prediction: [
        { month: 'Jan', crowd: 45, cost: 60 },
        { month: 'Feb', crowd: 50, cost: 65 },
        { month: 'Mar', crowd: 55, cost: 70 },
        { month: 'Apr', crowd: 60, cost: 75 },
        { month: 'May', crowd: 70, cost: 80 },
        { month: 'Jun', crowd: 85, cost: 95 }
      ],
      alternatives: ["Lombok, Indonesia", "Yogyakarta, Indonesia"]
    }
  };

  const destinations = [
    { key: 'paris', name: 'Paris' },
    { key: 'tokyo', name: 'Tokyo' },
    { key: 'bali', name: 'Bali' }
  ];

  const currentData = crowdData?.[selectedDestination];

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-travel-modal">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Crowd Level: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Crowd Prediction
          </h2>
          <p className="text-muted-foreground text-sm">
            AI-powered tourist density forecasts
          </p>
        </div>
        <Link
          to="/destination-details"
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
        >
          <span>View More</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Destination Selector */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Select Destination</h3>
          <div className="space-y-2">
            {destinations?.map((dest) => (
              <button
                key={dest?.key}
                onClick={() => setSelectedDestination(dest?.key)}
                className={`w-full text-left p-3 rounded-lg border transition-travel ${
                  selectedDestination === dest?.key
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{crowdData?.[dest?.key]?.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCrowdColor(crowdData?.[dest?.key]?.currentLevel)}`}>
                    {crowdData?.[dest?.key]?.currentLevel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-medium text-foreground mb-2">
              6-Month Crowd Forecast: {currentData?.name}
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData?.prediction}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="crowd" 
                    fill="#2563EB" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Less Crowded Alternatives</h4>
            <div className="space-y-2">
              {currentData?.alternatives?.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{alt}</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50 border border-green-200">
                    Low Crowd
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdPredictionWidget;