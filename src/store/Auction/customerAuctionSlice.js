import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    auctions: [],
    loading: false,
    error: null,
}

export const fetchAuctions = createAsyncThunk(
    "customer/fetchAuctions",
    async ({ customer_id }) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/auctions/?product__customer__id=${customer_id}`
            )
            return response.data
        } catch (error) {
            console.log("Error fetching auctions:", error)
            return []
        }
    }
)

const customerAuctionSlice = createSlice({
    name: "customerAuction",
    initialState,
    reducers: {
        setAuctions: (state, action) => {
            state.auctions = action.payload
        },
        editAuction: (state, action) => {
            const updatedAuction = action.payload
            const index = state.auctions.findIndex(
                (auction) => auction.id === updatedAuction.id
            )
            if (index !== -1) {
                state.auctions[index] = updatedAuction
            }
        },
        deleteAuction: (state, action) => {
            const auctionIdsToDelete = action.payload.auctionIds
            state.auctions = state.auctions.filter(
                (auction) => !auctionIdsToDelete.includes(auction.id)
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctions.fulfilled, (state, action) => {
                state.auctions = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchAuctions.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setAuctions, editAuction, deleteAuction } = customerAuctionSlice.actions
export default customerAuctionSlice.reducer
