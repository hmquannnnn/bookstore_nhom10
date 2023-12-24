import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    result: []
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        getSearchResultAction: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { getSearchResultAction } = searchSlice.actions;

export default searchSlice.reducer;