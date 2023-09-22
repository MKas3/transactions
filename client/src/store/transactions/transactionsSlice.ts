import { ITransaction } from '../../types/types.ts';
import { createSlice } from '@reduxjs/toolkit';

interface TransactionsState {
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
  totalCount: number;
}

const initialState: TransactionsState = {
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
  totalCount: 0,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setTotalIncome: (state, action) => {
      state.totalIncome = action.payload;
    },
    setTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const {
  setTransactions,
  setTotalIncome,
  setTotalExpense,
  setTotalCount,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
