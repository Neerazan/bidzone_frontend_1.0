import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import store from './store/store.js'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Wishlist from './pages/profile/Wishlist.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import User from './User.jsx'
import Test1 from './pages/Test1.jsx'
import Test2 from './pages/Test2.jsx'


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
        path: "/signup",
        element: null
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
            element: <Test2 />
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
