import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderId: "",
    amount: 0,
    orderList: [],
    deliveryCost: 0
}

export const searchSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrderAction: (state, action) => {
            // console.log("check order: ", action.payload);
            state.orderId = action.payload.orderId;
            state.amount = action.payload.amount;
            state.orderList = action.payload.orderList;
            state.amount += state.deliveryCost;
        },
        calcDeliveryCost: (state, action) => {
            state.deliveryCost = action.payload * 25000;
        }
    }
});

export const { getOrderAction, calcDeliveryCost } = searchSlice.actions;

export default searchSlice.reducer;