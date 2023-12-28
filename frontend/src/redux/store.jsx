import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './slice/accountSlice';
import bookSlice from './slice/bookSlice';
import cartSlice from "./slice/cartSlice.jsx";
import searchSlice from './slice/searchSlice.jsx';
import orderSlice from './slice/orderSlice.jsx';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    books: bookSlice,
    cart: cartSlice,
    search: searchSlice,
    order: orderSlice
  },
});
