import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer/accountSlice';
import accountSlice from './reducer/accountSlice';
import bookSlice from './reducer/bookSlice';

export const store = configureStore({
  reducer: {
    // reducer: counterReducer,
    account: accountSlice,
    books: bookSlice
  },
});
