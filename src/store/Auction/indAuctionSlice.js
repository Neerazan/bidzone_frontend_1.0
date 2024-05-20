import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    auction: [],
    loading: false,
    error: null,
};

export const fetchIndAuctions = createAsyncThunk(
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

const indAuctionSlice = createSlice({
    name: "indAuction",
    initialState,
    reducers: {
        updateBidsCount: (state, action) => {
            state.auction.bids_count += 1
        },

        updateCurrentPrice: (state, action) => {
            state.auction.current_price = action.payload.current_price
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchIndAuctions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchIndAuctions.fulfilled, (state, action) => {
                state.auction = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchIndAuctions.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { updateAuction, updateBidsCount, updateCurrentPrice } = indAuctionSlice.actions
export default indAuctionSlice.reducer