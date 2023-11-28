import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/accountSlice';
import accountSlice from './counter/accountSlice';
import bookSlice from './counter/bookSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    account: accountSlice,
    books: bookSlice
  },
});
