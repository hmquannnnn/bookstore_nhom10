import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderId: "",
    amount: 0,
    orderList: []
}

export const searchSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrderAction: (state, action) => {
            console.log("check order: ", action.payload);
            state.orderId = action.payload.orderId;
            state.amount = action.payload.amount;
            state.orderList = action.payload.orderList;
        }
    }
});

export const { getOrderAction } = searchSlice.actions;

export default searchSlice.reducer;