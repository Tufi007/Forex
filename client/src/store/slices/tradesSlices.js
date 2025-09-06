import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trades: [
    // Sample data for development
    {
      id: '1',
      symbol: 'AAPL',
      type: 'long',
      entryPrice: 150.25,
      exitPrice: 155.80,
      quantity: 100,
      entryDate: '2024-01-15T09:30:00Z',
      exitDate: '2024-01-16T15:45:00Z',
      pnl: 555,
      status: 'closed',
      notes: 'Breakout trade on earnings anticipation',
      tags: ['breakout', 'earnings']
    },
    {
      id: '2',
      symbol: 'TSLA',
      type: 'short',
      entryPrice: 220.50,
      exitPrice: 215.30,
      quantity: 50,
      entryDate: '2024-01-17T10:15:00Z',
      exitDate: '2024-01-17T14:20:00Z',
      pnl: 260,
      status: 'closed',
      notes: 'Momentum reversal at resistance',
      tags: ['momentum', 'reversal']
    },
    {
      id: '3',
      symbol: 'MSFT',
      type: 'long',
      entryPrice: 380.00,
      exitPrice: null,
      quantity: 75,
      entryDate: '2024-01-18T11:00:00Z',
      exitDate: null,
      pnl: 0,
      status: 'open',
      notes: 'Support bounce play',
      tags: ['support', 'bounce']
    }
  ],
  loading: false,
  error: null,
  filters: {
    symbol: '',
    type: 'all',
    status: 'all',
    dateRange: 'all'
  },
  sortBy: 'entryDate',
  sortOrder: 'desc'
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state, action) => {
      state.trades.unshift({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
    },
    updateTrade: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.trades.findIndex(trade => trade.id === id);
      if (index !== -1) {
        state.trades[index] = { ...state.trades[index], ...updates };
      }
    },
    deleteTrade: (state, action) => {
      state.trades = state.trades.filter(trade => trade.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
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
  addTrade,
  updateTrade,
  deleteTrade,
  setFilters,
  setSorting,
  clearFilters,
  setLoading,
  setError
} = tradesSlice.actions;

// Selectors
export const selectAllTrades = (state) => state.trades.trades;
export const selectTradesLoading = (state) => state.trades.loading;
export const selectTradesError = (state) => state.trades.error;
export const selectTradeFilters = (state) => state.trades.filters;
export const selectTradeSorting = (state) => ({
  sortBy: state.trades.sortBy,
  sortOrder: state.trades.sortOrder
});

export const selectFilteredTrades = (state) => {
  const { trades, filters, sortBy, sortOrder } = state.trades;
  
  let filteredTrades = trades.filter(trade => {
    if (filters.symbol && !trade.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) {
      return false;
    }
    if (filters.type !== 'all' && trade.type !== filters.type) {
      return false;
    }
    if (filters.status !== 'all' && trade.status !== filters.status) {
      return false;
    }
    return true;
  });

  // Sort trades
  filteredTrades.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'entryDate' || sortBy === 'exitDate') {
      aVal = new Date(aVal || 0);
      bVal = new Date(bVal || 0);
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return filteredTrades;
};

export const selectTradeById = (state, tradeId) => 
  state.trades.trades.find(trade => trade.id === tradeId);

export default tradesSlice.reducer;