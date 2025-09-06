import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { selectComputedMetrics, selectPnLChartData } from '../store/slices/analyticsSlice';
import { selectFilteredTrades } from '../store/slices/tradesSlices';

const Dashboard = () => {
  const metrics = useSelector(selectComputedMetrics);
  const pnlData = useSelector(selectPnLChartData);
  const recentTrades = useSelector(selectFilteredTrades).slice(0, 5);

  const metricCards = [
    {
      title: 'Total P&L',
      value: `$${metrics.totalPnL.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      color: metrics.totalPnL >= 0 ? 'success' : 'danger'
    },
    {
      title: 'Win Rate',
      value: `${metrics.winRate}%`,
      change: '+2.1%',
      trend: 'up',
      color: metrics.winRate >= 50 ? 'success' : 'warning'
    },
    {
      title: 'Total Trades',
      value: metrics.totalTrades,
      change: '+8',
      trend: 'up',
      color: 'primary'
    },
    {
      title: 'Profit Factor',
      value: metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2),
      change: '+0.3',
      trend: 'up',
      color: metrics.profitFactor >= 1 ? 'success' : 'danger'
    }
  ];

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-textMuted mt-1">Welcome back! Here's your trading overview.</p>
        </div>
        <Button variant="primary" size="lg">
          Add New Trade
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-textMuted text-sm font-medium">{metric.title}</p>
                <p className={`text-2xl font-bold mt-1 ${
                  metric.color === 'success' ? 'text-success' :
                  metric.color === 'danger' ? 'text-danger' :
                  metric.color === 'warning' ? 'text-warning' : 'text-primary'
                }`}>
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                metric.color === 'success' ? 'bg-success/10' :
                metric.color === 'danger' ? 'bg-danger/10' :
                metric.color === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
              }`}>
                <svg className={`w-6 h-6 ${
                  metric.color === 'success' ? 'text-success' :
                  metric.color === 'danger' ? 'text-danger' :
                  metric.color === 'warning' ? 'text-warning' : 'text-primary'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  {metric.title === 'Total P&L' && (
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  )}
                  {metric.title === 'Win Rate' && (
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  )}
                  {metric.title === 'Total Trades' && (
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  )}
                  {metric.title === 'Profit Factor' && (
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  )}
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className={`flex items-center ${
                metric.trend === 'up' ? 'text-success' : 'text-danger'
              }`}>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={
                    metric.trend === 'up' 
                      ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  } clipRule="evenodd" />
                </svg>
                {metric.change}
              </span>
              <span className="text-textMuted ml-2">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* P&L Chart */}
        <Card
          title="P&L Over Time"
          subtitle="Cumulative profit and loss"
          headerAction={
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </Button>
          }
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pnlData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="var(--color-textMuted)"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  stroke="var(--color-textMuted)"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value), name === 'cumulativePnL' ? 'Cumulative P&L' : 'Trade P&L']}
                  labelFormatter={(label) => formatDate(label)}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-text)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativePnL" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Trades */}
        <Card 
          title="Recent Trades" 
          subtitle="Your latest trading activity"
          headerAction={
            <Button variant="outline" size="sm">
              View All
            </Button>
          }
        >
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-4 bg-surfaceHover rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trade.status === 'open' ? 'bg-warning' : 
                    trade.pnl > 0 ? 'bg-success' : 'bg-danger'
                  }`} />
                  <div>
                    <p className="font-medium text-text">{trade.symbol}</p>
                    <p className="text-sm text-textMuted">{trade.type.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    trade.status === 'open' ? 'text-warning' :
                    trade.pnl > 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {trade.status === 'open' ? 'OPEN' : formatCurrency(trade.pnl)}
                  </p>
                  <p className="text-sm text-textMuted">
                    {formatDate(trade.entryDate)}
                  </p>
                </div>
              </div>
            ))}
            {recentTrades.length === 0 && (
              <div className="text-center py-8 text-textMuted">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p>No trades yet</p>
                <p className="text-sm">Start by adding your first trade</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Performance Summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Average Win</span>
              <span className="font-medium text-success">
                {formatCurrency(metrics.averageWin)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Average Loss</span>
              <span className="font-medium text-danger">
                {formatCurrency(-metrics.averageLoss)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Largest Win</span>
              <span className="font-medium text-success">
                {formatCurrency(metrics.largestWin)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Largest Loss</span>
              <span className="font-medium text-danger">
                {formatCurrency(metrics.largestLoss)}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Trading Streaks">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Best Win Streak</span>
              <span className="font-medium text-success">
                {metrics.consecutiveWins} trades
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Worst Loss Streak</span>
              <span className="font-medium text-danger">
                {metrics.consecutiveLosses} trades
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-textMuted">Current Streak</span>
              <span className="font-medium text-textSecondary">
                2 wins
              </span>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-3">
            <Button fullWidth variant="primary">
              Add Trade
            </Button>
            <Button fullWidth variant="secondary">
              Import CSV
            </Button>
            <Button fullWidth variant="ghost">
              View Analytics
            </Button>
            <Button fullWidth variant="ghost">
              Export Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;