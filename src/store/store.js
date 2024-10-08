import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import collectionReducer from "./common/collectionSlice";
import wishlistReducer from "./common/wishlistSlice";
import BalanceReducer from "./common/BalanceSlice";
import QnASlice from "./Auction/QnASlice";
import productSlice from "./productSlice";
import addressSlice from "./common/addressSlice";
import auctionSlice from "./Auction/auctionSlice";
import customerAuctionSlice from "./Auction/customerAuctionSlice";
import bidsSlice from "./Auction/bidsSlice";
import indAuctionSlice from "./Auction/indAuctionSlice";

const store = configureStore({
    reducer :{
        auth: authReducer,
        collection: collectionReducer,
        wishlist: wishlistReducer,
        balance: BalanceReducer,
        qna: QnASlice,
        product: productSlice,
        address: addressSlice,
        auction: auctionSlice,
        customerAuction: customerAuctionSlice,
        bid: bidsSlice,
        indAuction: indAuctionSlice,
    },
})

export default store