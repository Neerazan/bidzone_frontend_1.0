import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    qnas: [],
    loading: false,
    error: null,
    questions_count: null
};


export const fetchQnAData = createAsyncThunk(
    "auction/fetchQnAData",
    async (auctionId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${auctionId}/questions/`)
            return response.data
        } catch (error) {
            console.log("Error fetching QnA data:", error)
        }
    }
)


const qnaSlice = createSlice({
    name: "qna",
    initialState,
    reducers: {
        addQuestion: (state, action) => {

        },

        addAnswer: (state, action) => {

        },

        deleteQuestion: (state, action) => {

        },

        deleteAnswer: (state, action) => {

        },

        updateQuestion: (state, action) => {

        },

        updateAnswer: (state, action) => {

        },

        clearQnA: (state) => {
            state.qnas = []
            state.questions_count = null
            state.loading = false
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchQnAData.fulfilled, (state, action) => {
                state.qnas = action.payload.results
                state.questions_count = action.payload.count
                state.loading = false
                state.error = null
            })
            .addCase(fetchQnAData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchQnAData.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { addQuestion, addAnswer, deleteQuestion, deleteAnswer, updateQuestion, updateAnswer, clearQnA } = qnaSlice.actions
export default qnaSlice.reducer