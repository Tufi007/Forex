import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: '30d',
  metrics: {
    totalTrades: 0,
    winRate: 0,
    totalPnL: 0,
    averageWin: 0,
    averageLoss: 0,
    profitFactor: 0,
    largestWin: 0,
    largestLoss: 0,
    consecutiveWins: 0,
    consecutiveLosses: 0
  },
  chartData: {
    pnlOverTime: [],
    winLossRatio: [],
    monthlyPerformance: [],
    symbolBreakdown: []
  },
  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    updateMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    updateChartData: (state, action) => {
      state.chartData = { ...state.chartData, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setDateRange,
  updateMetrics,
  updateChartData,
  setLoading,
  setError
} = analyticsSlice.actions;

// Selectors
export const selectAnalyticsDateRange = (state) => state.analytics.dateRange;
export const selectAnalyticsMetrics = (state) => state.analytics.metrics;
export const selectAnalyticsChartData = (state) => state.analytics.chartData;
export const selectAnalyticsLoading = (state) => state.analytics.loading;
export const selectAnalyticsError = (state) => state.analytics.error;

// Computed selectors
export const selectComputedMetrics = (state) => {
  const trades = state.trades.trades.filter(trade => trade.status === 'closed');
  
  if (trades.length === 0) {
    return initialState.metrics;
  }

  const winningTrades = trades.filter(trade => trade.pnl > 0);
  const losingTrades = trades.filter(trade => trade.pnl < 0);
  
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalWins = winningTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalLosses = Math.abs(losingTrades.reduce((sum, trade) => sum + trade.pnl, 0));
  
  const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
  const averageWin = winningTrades.length > 0 ? totalWins / winningTrades.length : 0;
  const averageLoss = losingTrades.length > 0 ? totalLosses / losingTrades.length : 0;
  const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? Infinity : 0;
  
  const largestWin = winningTrades.length > 0 ? Math.max(...winningTrades.map(t => t.pnl)) : 0;
  const largestLoss = losingTrades.length > 0 ? Math.min(...losingTrades.map(t => t.pnl)) : 0;

  // Calculate consecutive wins/losses
  let consecutiveWins = 0;
  let consecutiveLosses = 0;
  let currentWinStreak = 0;
  let currentLossStreak = 0;
  
  const sortedTrades = [...trades].sort((a, b) => new Date(a.exitDate) - new Date(b.exitDate));
  
  sortedTrades.forEach(trade => {
    if (trade.pnl > 0) {
      currentWinStreak++;
      currentLossStreak = 0;
      consecutiveWins = Math.max(consecutiveWins, currentWinStreak);
    } else if (trade.pnl < 0) {
      currentLossStreak++;
      currentWinStreak = 0;
      consecutiveLosses = Math.max(consecutiveLosses, currentLossStreak);
    }
  });

  return {
    totalTrades: trades.length,
    winRate: Math.round(winRate * 100) / 100,
    totalPnL: Math.round(totalPnL * 100) / 100,
    averageWin: Math.round(averageWin * 100) / 100,
    averageLoss: Math.round(averageLoss * 100) / 100,
    profitFactor: Math.round(profitFactor * 100) / 100,
    largestWin: Math.round(largestWin * 100) / 100,
    largestLoss: Math.round(largestLoss * 100) / 100,
    consecutiveWins,
    consecutiveLosses
  };
};

export const selectPnLChartData = (state) => {
  const trades = state.trades.trades
    .filter(trade => trade.status === 'closed')
    .sort((a, b) => new Date(a.exitDate) - new Date(b.exitDate));
    
  let cumulativePnL = 0;
  
  return trades.map(trade => {
    cumulativePnL += trade.pnl;
    return {
      date: trade.exitDate,
      pnl: trade.pnl,
      cumulativePnL: Math.round(cumulativePnL * 100) / 100,
      symbol: trade.symbol
    };
  });
};

export default analyticsSlice.reducer;