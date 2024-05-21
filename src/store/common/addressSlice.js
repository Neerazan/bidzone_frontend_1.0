import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    addresses: '',
    loading: false,
    error: null,
}

export const fetchAddress = createAsyncThunk(
    "user/fetchAddress",
    async ({ user_id, accessKey }) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/customers/${user_id}/addresses/${user_id}/`, {
                headers: {
                    Authorization: `JWT ${accessKey}`
                }
            })
            return response.data
        } catch (error) {
            console.error("Error fetching address data:", error)
        }
    }
)

const addressSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.addresses = action.payload.address
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.addresses = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export const { setAddress, editAddress } = addressSlice.actions
export default addressSlice.reducer