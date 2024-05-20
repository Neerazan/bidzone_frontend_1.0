import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    bids: [],
    loading: false,
    error: null,
};



export const fetchBids = createAsyncThunk(
    "auction/fetchBids",
    async ({ auctionId }) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${auctionId}/bids/`)
            
            return response.data
        } catch (error) {
            console.log("Error fetching bids:", error)
            return []
        }
    }
)


const bidsSlice = createSlice({
    name: "bids",
    initialState,
    reducers: {
        addBid: (state, action) => {
            state.bids.push(action.payload)
        },

        updateBid: (state, action) => {
            const updatedBid = action.payload
            state.bids = state.bids.map((bid) => bid.id === updatedBid.id ? updatedBid : bid)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBids.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.bids = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})


export const { addBid, updateBid } = bidsSlice.actions
export default bidsSlice.reducer