import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './slice/accountSlice';
import bookSlice from './slice/bookSlice';
import cartSlice from "./slice/cartSlice.jsx";
import searchSlice from './slice/searchSlice.jsx';

export const store = configureStore({
  reducer: {
    // reducer: counterReducer,
    account: accountSlice,
    books: bookSlice,
    cart: cartSlice,
    search: searchSlice
  },
});
