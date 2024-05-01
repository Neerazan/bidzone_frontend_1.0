import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import store from './store/store.js'
import App from './App.jsx'
import User from './User.jsx'
import './index.css'

import { Login, Home, ProductDetails, Wishlist, CategoryPage, Profile, SignUp, AddUpdateProduct } from "./pages/index.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <SignUp />
      },
      {
        path: '/auction/:slug',
        element: <ProductDetails />
      },
      {
        path: '/user',
        element: <User />,
        children: [
          {
            path: '/user/wishlist',
            element: <Wishlist />
          },
          {
            path: '/user/profile',
            element: null
          },
          {
            path: '/user/add-product',
            element: <AddUpdateProduct />
          }
        ]
      },
      {
        path: '/auctions/:collection_id',
        element: <CategoryPage />
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
