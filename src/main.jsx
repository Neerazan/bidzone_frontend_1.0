import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"

import store from "./store/store.js"
import App from "./App.jsx"
import User from "./User.jsx"
import "./index.css"
import { Protected } from "./components/index.js"
import {
    Login,
    Home,
    ProductDetails,
    Wishlist,
    CategoryPage,
    Profile,
    SignUp,
    AddUpdateProduct,
    Product,
    Auctions,
    AuctionHistory,
    TransactionHistory,
    ActivateUser,
    ForgotPassword,
    PasswordReset,
    SetPassword,
} from "./pages/index.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Protected authentication={false}>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/login",
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/register",
                element: (
                    <Protected authentication={false}>
                        <SignUp />
                    </Protected>
                ),
            },
            {
                path: "/auction/:slug",
                element: (
                    <Protected authentication={false}>
                        <ProductDetails />
                    </Protected>
                ),
            },
            {
                path: "/activate-user/:uid/:token",
                element: (
                    <Protected authentication={false}>
                        <ActivateUser />
                    </Protected>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <Protected authentication={false}>
                        <ForgotPassword />
                    </Protected>
                ),
            },
            {
                path: "/reset-password/:uid/:token",
                element: (
                    <Protected authentication={false}>
                        <PasswordReset />
                    </Protected>
                ),
            },
            {
                path: "/set-password",
                element: (
                    <Protected authentication={true}>
                        <SetPassword />
                    </Protected>
                ),
            },
            {
                path: "/user",
                element: <User />,
                children: [
                    {
                        path: "/user/wishlist",
                        element: (
                            <Protected authentication={false}>
                                <Wishlist />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/profile",
                        element: (
                            <Protected authentication={true}>
                                <Profile />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/auctions",
                        element: (
                            <Protected authentication={true}>
                                <Auctions />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/products",
                        element: (
                            <Protected authentication={true}>
                                <Product />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/add-product",
                        element: (
                            <Protected authentication={true}>
                                <AddUpdateProduct />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/update-product/:slug",
                        element: (
                            <Protected authentication={true}>
                                <AddUpdateProduct />
                            </Protected>
                        ),
                    },
                    {
                        path: "/user/auction_history",
                        element: (
                            <AuctionHistory />
                        ),
                    },
                    {
                        path: "/user/transaction-history",
                        element: (
                            <TransactionHistory />
                        ),
                    }
                ],
            },
            {
                path: "/auctions/:filter",
                element: <CategoryPage />,
            },
        ],
    },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
)
