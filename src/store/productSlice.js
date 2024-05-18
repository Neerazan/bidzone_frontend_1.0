import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    loading: false,
    error: null,
};


export const fetchProducts = asyncThunkCreator(
    "user/fetchProducts",
    async ({ accessKey, customer_id }) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/customers/${customer_id}/products/`, {
                headers: {
                    Authorization: `JWT ${accessKey}`
                }
            })

            return response.data
        } catch (error) {
            console.lgo("Error fetching products:", error)
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        editProducts: (state, action) => {
            state.products = action.payload
        },
        deleteProducts: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        }
    })


export const { setProducts, editProducts, deleteProducts } = productSlice.actions
export default productSlice.reducer