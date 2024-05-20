import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    auction: [],
    loading: false,
    error: null,
};

export const fetchAuctions = createAsyncThunk(
    "auction/fetchIndAuctions",
    async ({ slug }) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${slug}`)
            return response.data
        } catch (error) {
            console.log("Error fetching auctions:", error)
            return []
        }
    }
)

const auctionsSlice = createSlice({
    name: "indAuction",
    initialState,
    reducers: {
        addBidsCount: (state, action) => {
            console.log("");
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAuctions.fulfilled, (state, action) => {
                state.auction = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchAuctions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { updateAuction } = auctionsSlice.actions
export default auctionsSlice.reducer