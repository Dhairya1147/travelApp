import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CrowdPredictionChart = ({ destination }) => {
  const [viewType, setViewType] = useState('monthly'); // 'monthly' or 'daily'
  const [selectedMonth, setSelectedMonth] = useState('March');

  const monthlyData = [
    { month: 'Jan', crowdLevel: 45, avgCost: 120, peakDays: 8 },
    { month: 'Feb', crowdLevel: 55, avgCost: 135, peakDays: 12 },
    { month: 'Mar', crowdLevel: 85, avgCost: 180, peakDays: 20 },
    { month: 'Apr', crowdLevel: 75, avgCost: 165, peakDays: 18 },
    { month: 'May', crowdLevel: 65, avgCost: 145, peakDays: 15 },
    { month: 'Jun', crowdLevel: 90, avgCost: 200, peakDays: 25 },
    { month: 'Jul', crowdLevel: 95, avgCost: 220, peakDays: 28 },
    { month: 'Aug', crowdLevel: 92, avgCost: 210, peakDays: 26 },
    { month: 'Sep', crowdLevel: 70, avgCost: 155, peakDays: 16 },
    { month: 'Oct', crowdLevel: 60, avgCost: 140, peakDays: 14 },
    { month: 'Nov', crowdLevel: 50, avgCost: 125, peakDays: 10 },
    { month: 'Dec', crowdLevel: 80, avgCost: 175, peakDays: 22 }
  ];

  const dailyData = [
    { day: 'Mon', crowdLevel: 40, avgCost: 150 },
    { day: 'Tue', crowdLevel: 35, avgCost: 140 },
    { day: 'Wed', crowdLevel: 45, avgCost: 160 },
    { day: 'Thu', crowdLevel: 50, avgCost: 165 },
    { day: 'Fri', crowdLevel: 75, avgCost: 190 },
    { day: 'Sat', crowdLevel: 95, avgCost: 220 },
    { day: 'Sun', crowdLevel: 85, avgCost: 200 }
  ];

  const getCrowdColor = (level) => {
    if (level <= 40) return '#059669'; // success
    if (level <= 70) return '#D97706'; // warning
    return '#DC2626'; // error
  };

  const getBestTimes = () => {
    const sortedMonths = [...monthlyData]?.sort((a, b) => a?.crowdLevel - b?.crowdLevel);
    return sortedMonths?.slice(0, 3);
  };

  const getWorstTimes = () => {
    const sortedMonths = [...monthlyData]?.sort((a, b) => b?.crowdLevel - a?.crowdLevel);
    return sortedMonths?.slice(0, 3);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-travel-modal">
          <p className="font-medium text-popover-foreground">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-sm text-muted-foreground">
                Crowd Level: {payload?.[0]?.value}%
              </span>
            </div>
            {payload?.[1] && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm text-muted-foreground">
                  Avg Cost: ${payload?.[1]?.value}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-travel-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Crowd Prediction & Cost Analysis</h3>
          <p className="text-muted-foreground">AI-powered insights to help you plan the perfect time to visit</p>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant={viewType === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={viewType === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('daily')}
          >
            Weekly
          </Button>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'monthly' ? (
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="crowdLevel" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="crowdLevel" 
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Best Times to Visit */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="TrendingDown" size={20} className="text-success" />
            <h4 className="font-medium text-foreground">Best Times to Visit</h4>
          </div>
          <div className="space-y-2">
            {getBestTimes()?.map((month, index) => (
              <div key={month?.month} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{month?.month}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-success font-medium">{month?.crowdLevel}% crowd</span>
                  <span className="text-xs text-muted-foreground">${month?.avgCost}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Times Warning */}
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="TrendingUp" size={20} className="text-warning" />
            <h4 className="font-medium text-foreground">Peak Times (Avoid if Possible)</h4>
          </div>
          <div className="space-y-2">
            {getWorstTimes()?.map((month, index) => (
              <div key={month?.month} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{month?.month}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-warning font-medium">{month?.crowdLevel}% crowd</span>
                  <span className="text-xs text-muted-foreground">${month?.avgCost}/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Bot" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">AI Recommendation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on your travel preferences for moderate crowds and budget-conscious trips, 
              I recommend visiting in <strong className="text-foreground">January or February</strong>. 
              You'll save approximately 35% on accommodation costs and enjoy a more authentic 
              local experience with fewer tourists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdPredictionChart;