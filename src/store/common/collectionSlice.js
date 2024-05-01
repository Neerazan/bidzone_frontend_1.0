import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collections: [],
};

const categorySlice = createSlice({
    name: "collection",
    initialState,

    reducers: {
        addCollection: (state, action) => {
            state.collections.push(action.payload);
        },

        removeCollection: (state, action) => {
            state.collections = state.categories.filter(category => category.id !== action.payload.id);
        },
    },
});

export const { addCollection, removeCollection } = categorySlice.actions;
export default collectionSlice.reducer;
