import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetTracker = ({ itinerary, budget, onBudgetUpdate }) => {
  const [showSavings, setShowSavings] = useState(false);

  const budgetData = useMemo(() => {
    const categories = {
      accommodation: { spent: 0, budget: budget?.accommodation, color: '#2563EB' },
      activities: { spent: 0, budget: budget?.activities, color: '#059669' },
      transportation: { spent: 0, budget: budget?.transportation, color: '#D97706' },
      meals: { spent: 0, budget: budget?.meals, color: '#DC2626' },
      shopping: { spent: 0, budget: budget?.shopping, color: '#7C3AED' },
      miscellaneous: { spent: 0, budget: budget?.miscellaneous, color: '#0F766E' }
    };

    // Calculate spent amounts from itinerary
    itinerary?.days?.forEach(day => {
      day?.activities?.forEach(activity => {
        const category = activity?.category || 'activities';
        if (categories?.[category]) {
          categories[category].spent += activity?.cost || 0;
        }
      });
    });

    return categories;
  }, [itinerary, budget]);

  const totalBudget = Object.values(budget)?.reduce((sum, amount) => sum + amount, 0);
  const totalSpent = Object.values(budgetData)?.reduce((sum, cat) => sum + cat?.spent, 0);
  const remaining = totalBudget - totalSpent;

  const pieData = Object.entries(budgetData)?.map(([key, data]) => ({
    name: key?.charAt(0)?.toUpperCase() + key?.slice(1),
    value: data?.spent,
    budget: data?.budget,
    color: data?.color
  }));

  const barData = Object.entries(budgetData)?.map(([key, data]) => ({
    category: key?.charAt(0)?.toUpperCase() + key?.slice(1),
    spent: data?.spent,
    budget: data?.budget,
    remaining: Math.max(0, data?.budget - data?.spent)
  }));

  const savingsOpportunities = [
    {
      id: 1,
      title: "Off-peak dining",
      description: "Eat lunch instead of dinner at restaurants",
      savings: 120,
      difficulty: "easy",
      category: "meals"
    },
    {
      id: 2,
      title: "Public transportation",
      description: "Use metro instead of taxis for city travel",
      savings: 85,
      difficulty: "easy",
      category: "transportation"
    },
    {
      id: 3,
      title: "Free walking tours",
      description: "Replace paid tours with free alternatives",
      savings: 200,
      difficulty: "medium",
      category: "activities"
    },
    {
      id: 4,
      title: "Hostel accommodation",
      description: "Switch to shared accommodation for 2 nights",
      savings: 150,
      difficulty: "hard",
      category: "accommodation"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getProgressColor = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 90) return 'bg-error';
    if (percentage > 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground">Budget Tracker</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={showSavings ? "default" : "outline"}
            size="sm"
            onClick={() => setShowSavings(!showSavings)}
          >
            <Icon name="PiggyBank" size={16} />
            Savings Tips
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} />
            Adjust Budget
          </Button>
        </div>
      </div>
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Wallet" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Total Budget</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">${totalBudget?.toLocaleString()}</p>
        </div>

        <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CreditCard" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Spent</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">${totalSpent?.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {((totalSpent / totalBudget) * 100)?.toFixed(1)}% of budget
          </p>
        </div>

        <div className={`rounded-lg p-4 border ${remaining >= 0 ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={remaining >= 0 ? "TrendingUp" : "TrendingDown"} size={16} className={remaining >= 0 ? "text-success" : "text-error"} />
            <span className={`text-sm font-medium ${remaining >= 0 ? "text-success" : "text-error"}`}>
              {remaining >= 0 ? "Remaining" : "Over Budget"}
            </span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">
            ${Math.abs(remaining)?.toLocaleString()}
          </p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-background rounded-lg border border-border p-4">
          <h3 className="font-medium text-card-foreground mb-4">Spending Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData?.filter(item => item?.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-background rounded-lg border border-border p-4">
          <h3 className="font-medium text-card-foreground mb-4">Budget vs Spending</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
                <Bar dataKey="spent" fill="#2563EB" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-card-foreground">Category Breakdown</h3>
        {Object.entries(budgetData)?.map(([category, data]) => (
          <div key={category} className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-card-foreground capitalize">{category}</span>
              <span className="text-sm text-muted-foreground">
                ${data?.spent} / ${data?.budget}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-travel ${getProgressColor(data?.spent, data?.budget)}`}
                style={{ width: `${Math.min((data?.spent / data?.budget) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{((data?.spent / data?.budget) * 100)?.toFixed(1)}% used</span>
              <span>${data?.budget - data?.spent} remaining</span>
            </div>
          </div>
        ))}
      </div>
      {/* Savings Opportunities */}
      {showSavings && (
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-card-foreground mb-4">AI-Identified Savings Opportunities</h3>
          <div className="space-y-3">
            {savingsOpportunities?.map((opportunity) => (
              <div key={opportunity?.id} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-card-foreground">{opportunity?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opportunity?.difficulty)}`}>
                        {opportunity?.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{opportunity?.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="DollarSign" size={12} />
                        <span>Save ${opportunity?.savings}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Tag" size={12} />
                        <span className="capitalize">{opportunity?.category}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;