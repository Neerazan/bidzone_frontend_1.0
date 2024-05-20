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
            let updatedAuction = action.payload.auction
            updatedAuction.product.images[0].image = `http://127.0.0.1:8000/${updatedAuction.product.images[0].image}`
            state.auctions = state.auctions.map((auction) =>
                auction.id === updatedAuction.id ? updatedAuction : auction
            )
        },

        // addAuction: (state, action) => {
        //     console.log(`Adding auction: ${action.payload.auction}`);
        //     state.auctions.push(action.payload.auction)
        // },


        deleteAuction: (state, action) => {
            const auctionIdToDelete = action.payload.auctionId
            state.auctions = state.auctions.filter(
                (auction) => auction.id !== auctionIdToDelete
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
