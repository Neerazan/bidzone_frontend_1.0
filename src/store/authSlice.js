import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk('auth/signup', async ({ username, password }) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
            username,
            password,
        })

        const { access, refresh } = response.data

        return { access, refresh }
    } catch (error) {
        console.log(error);
    }
})


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
            state.userData = ''
            state.status = false
            state.loading = false
            state.accessKey = null
            state.error = null
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
                state.loading = true
            }) 
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.status = false
                state.error = action.error.message
            })
    }
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer