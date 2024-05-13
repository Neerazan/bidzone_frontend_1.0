import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import collectionReducer from "./common/collectionSlice";
import wishlistReducer from "./common/wishlistSlice";
import BalanceReducer from "./common/BalanceSlice";
import QnASlice from "./Auction/QnASlice";

const store = configureStore({
    reducer :{
        auth: authReducer,
        collection: collectionReducer,
        wishlist: wishlistReducer,
        balance: BalanceReducer,
        qna: QnASlice,
    },
})

export default store