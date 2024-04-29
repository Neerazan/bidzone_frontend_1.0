import "./App.css"
import axios from "axios"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"

import { login } from "./store/authSlice"
import { Header, Footer, Sidebar, Container } from "./components"

function App() {
    const dispatch = useDispatch()
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const isAuthenticated = useSelector((state) => state.auth.status)
    const isUserProfilePage = window.location.pathname.includes("/user/")

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
                throw error
            }
        },
        {
            enabled: !!accessToken, // Only run the query if accessToken is present
        }
    )

    // useEffect(() => {
    //     if (isError) {
    //         navigate("/login")
    //     }
    // }, [isError, navigate])

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-slate-50">
            <div className="w-full block">
                {/* { !isUserProfilePage && <Header />} */}
                <Header />
                <main>
                    {isAuthenticated && isUserProfilePage ? (
                        <Container>
                            <div className="grid grid-cols-5 gap-4">
                                <div className="">
                                    <Sidebar />
                                </div>
                                <div className="col-span-4">
                                    <Outlet />
                                </div>
                            </div>
                        </Container>
                    ) : (
                        <Outlet />
                    )}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App