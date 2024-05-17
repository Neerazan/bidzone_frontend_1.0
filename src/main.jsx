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
                ],
            },
            {
                path: "/auctions/:collection_id",
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
