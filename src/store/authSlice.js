import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ username, password }) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/auth/jwt/create/",
                {
                    username,
                    password,
                }
            )

            const { access, refresh } = response.data

            return { access, refresh }
        } catch (error) {
            console.log(`Error: ${error}`)
            return rejectWithValue(
                "Unauthorized: Incorrect username or password."
            )
        }
    }
)

const initialState = {
    status: false,
    userData: null,
    accessKey: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload.userData
            state.accessKey = action.payload.accessKey
        },

        logout: (state) => {
            state.userData = ""
            state.status = false
            state.loading = false
            state.accessKey = null
            state.error = null
        },

        updateUserBalance: (state, action) => {
            state.userData.user_balance = action.payload
        },

        updateUserInfo: (state, action) => {
            if (state.userData.id === action.payload.userInfo.id) {
                state.userData.first_name = action.payload.userInfo.first_name
                state.userData.last_name = action.payload.userInfo.last_name
                state.userData.email = action.payload.userInfo.email
            }
        },

        updateCustomerInfo: (state, action) => {
            if (state.userData.id === action.payload.customerInfo.id) {
                state.userData.phone = action.payload.customerInfo.phone
                state.userData.birth_date = action.payload.customerInfo.birth_date
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.accessKey = action.payload.access
                state.error = null
            })
            .addCase(signup.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.status = false
                state.accessKey = null
                state.error = action.payload
                    ? action.payload
                    : "Incorrect username or password."
            })
    },
})

export const { login, logout, updateUserBalance, updateCustomerInfo, updateUserInfo } = authSlice.actions
export default authSlice.reducer
