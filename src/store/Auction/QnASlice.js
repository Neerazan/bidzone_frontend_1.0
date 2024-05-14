import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
    qnas: [],
    loading: false,
    error: null,
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
            state.qnas.results.push(action.payload)
            state.qnas.count += 1
        },

        addAnswer: (state, action) => {
            state.qnas.results.map((qna) => {
                if (qna.id === action.payload.questionId) {
                    qna.answers.push(action.payload.answer)
                }
            })
        },

        deleteQuestion: (state, action) => {
            state.qnas.results = state.qnas.results.filter((qna) => qna.id !== action.payload.questionId)
            state.qnas.count -= 1
        },


        deleteAnswer: (state, action) => {
            state.qnas.results.map((qna) => {
                qna.answers = qna.answers.filter((answer) => answer.id !== action.payload)
            })
        },

        updateQuestion: (state, action) => {

        },

        updateAnswer: (state, action) => {

        },

        clearQnA: (state) => {
            state.qnas = []
            state.loading = false
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchQnAData.fulfilled, (state, action) => {
                state.qnas = action.payload
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