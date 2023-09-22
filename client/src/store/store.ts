import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.ts';
import transactionsReducer from './transactions/transactionsSlice.ts';
import categoriesReducer from './categories/categoriesSlice.ts';

export const store = configureStore({
  reducer: {
    users: userReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
