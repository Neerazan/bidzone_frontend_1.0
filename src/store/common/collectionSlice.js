import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collections: [],
};

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
