import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import collectionReducer from "./common/collectionSlice";
import wishlistReducer from "./common/wishlistSlice";

const store = configureStore({
    reducer :{
        auth: authReducer,
        collection: collectionReducer,
        wishlist: wishlistReducer,
    },
})

export default store