import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null,
    accessKey: null,
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
            state.status = false
            state.userData = null
        },
    }
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer