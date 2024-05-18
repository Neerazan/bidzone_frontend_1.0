import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: { results: [], count: 0 },
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    "user/fetchProducts",
    async ({ accessKey, customer_id }) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/customers/${customer_id}/products/`,
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        editProducts: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.results.findIndex(
                (product) => product.id === updatedProduct.id
            );
            if (index !== -1) {
                state.products.results[index] = updatedProduct;
            }
        },
        deleteProducts: (state, action) => {
            const productIdsToDelete = action.payload.productsIds;
            state.products.results = state.products.results.filter(
                (product) => !productIdsToDelete.includes(product.id)
            );
            state.products.count -= productIdsToDelete.length;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setProducts, editProducts, deleteProducts } = productSlice.actions;
export default productSlice.reducer;
