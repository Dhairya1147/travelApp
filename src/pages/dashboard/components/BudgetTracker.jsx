import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const BudgetTracker = () => {
  const budgetData = [
    { name: 'Flights', value: 1200, color: '#2563EB' },
    { name: 'Hotels', value: 800, color: '#059669' },
    { name: 'Food', value: 400, color: '#F59E0B' },
    { name: 'Activities', value: 300, color: '#DC2626' },
    { name: 'Transport', value: 200, color: '#7C3AED' }
  ];

  const totalBudget = 3500;
  const totalSpent = budgetData?.reduce((sum, item) => sum + item?.value, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercentage = (totalSpent / totalBudget) * 100;

  const aiSavings = [
    {
      title: "Alternative Flight Route",
      savings: "$150",
      description: "Found cheaper connecting flight via Amsterdam"
    },
    {
      title: "Off-Peak Hotel Booking",
      savings: "$80",
      description: "Book 2 days earlier for better rates"
    },
    {
      title: "Local Transport Pass",
      savings: "$45",
      description: "Weekly pass cheaper than daily tickets"
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-travel-modal">
          <p className="font-medium">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Budget Tracker
          </h2>
          <p className="text-muted-foreground text-sm">
            AI-powered expense optimization
          </p>
        </div>
        <Link
          to="/user-profile"
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
        >
          <span>Manage Budget</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${totalSpent?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                of ${totalBudget?.toLocaleString()} budget
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-success">
                ${remaining?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Budget Used</span>
              <span className="font-medium">{spentPercentage?.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-travel ${
                  spentPercentage > 90 ? 'bg-error' : 
                  spentPercentage > 75 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="space-y-3">
            {budgetData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="text-sm font-medium">{item?.name}</span>
                </div>
                <span className="text-sm font-medium">
                  ${item?.value?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart and AI Savings */}
        <div>
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {budgetData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* AI Savings Suggestions */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <h3 className="font-medium text-foreground">AI Savings Found</h3>
            </div>
            <div className="space-y-3">
              {aiSavings?.map((saving, index) => (
                <div key={index} className="bg-muted rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm">{saving?.title}</h4>
                    <span className="text-success font-semibold text-sm">
                      {saving?.savings}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {saving?.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingDown" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  Total Potential Savings: $275
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;