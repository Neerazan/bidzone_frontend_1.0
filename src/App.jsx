import "./App.css"
import axios from "axios"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { login } from "./store/authSlice"
import { Header } from "./components"

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))

    const { data, isLoading, isError } = useQuery(
        "authData",
        async () => {
            if (!accessToken) {
                throw new Error("No access token found")
            }
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/auth/users/me/",
                    {
                        headers: {
                            Authorization: `JWT ${accessToken}`,
                        },
                    }
                )

                if (response.data) {
                    console.log("Inside response data")
                    dispatch(
                        login({
                            userData: response.data,
                            accessKey: accessToken,
                        })
                    )
                }
                return response.data
            } catch (error) {
                console.log("Error", error)
                throw error // Re-throw the error to let React Query handle it
            }
        },
        {
            enabled: !!accessToken, // Only run the query if accessToken is present
        }
    )

    useEffect(() => {
        if (isError) {
            navigate("/login")
        }
    }, [isError, navigate])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default App
