import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    wishlists: [],
}

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
})


export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions


export const fetchWishlistData = (wishlistId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`
        )
        dispatch(setWishlist(response.data.results))
    } catch (error) {
        console.error("Error fetching wishlist data:", error)
    }
}


export default wishlistSlice.reducer
