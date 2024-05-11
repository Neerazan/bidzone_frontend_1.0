import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    balance: '',
    loading: false,
    error: null,
}


export const fetchBalance = createAsyncThunk(
    "balance/fetchBalance",
    async ({ accessKey, customer_id }) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/customers/${customer_id}/customer_coins/`,
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            )
            return response.data[0]
        } catch (error) {
            console.error("Error fetching balance data:", error)
        }
    }
)

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.balance = action.payload
        },
        editBalance: (state, action) => {
            state.balance = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.balance = action.payload.balance
                state.loading = false
                state.error = null
            })
            .addCase(fetchBalance.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { setBalance, editBalance } = balanceSlice.actions
export default balanceSlice.reducer
