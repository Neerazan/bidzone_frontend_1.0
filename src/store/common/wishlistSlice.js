import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    wishlists: [],
    loading: false,
    error: null,
}

export const fetchWishlistData = createAsyncThunk(
    "wishlist/fetchWishlistData",
    async (wishlistId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`)

            return response.data
        } catch (error) {
            console.error("Error fetching wishlist data:", error)
        }

    }
)


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.wishlists = action.payload
        },

        addToWishlist: (state, action) => {
            state.wishlists.push(action.payload)
        },

        removeFromWishlist: (state, action) => {
            state.wishlists = state.wishlists.filter(
                (item) => item.id !== action.payload
            )
        },

        clearWishlist: (state) => {
            state.wishlists = []
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistData.fulfilled, (state, action) => {
                state.wishlists = action.payload.results
                state.loading = false
                state.error = null
            }) 
            .addCase(fetchWishlistData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchWishlistData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
