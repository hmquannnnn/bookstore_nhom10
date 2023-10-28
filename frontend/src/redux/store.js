import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/accountSlice';
import accountSlice from '../redux/counter/accountSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountSlice
  },
});
