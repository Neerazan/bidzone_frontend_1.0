import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    collections: [],
    loading: false,
    error: null,
};

export const fetchCollections = createAsyncThunk(
    "collection/fetchCollections",
    async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/auction/collections"
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.collections = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCollections.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
