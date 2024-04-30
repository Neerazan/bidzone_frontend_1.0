import "./App.css";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

import { login } from "./store/authSlice";
import { Header, Footer } from "./components";

function App() {
    const dispatch = useDispatch();
    const accessToken = useMemo(() => JSON.parse(localStorage.getItem("accessToken")), []);
    
    useEffect(() => {
        if (accessToken) {
            fetchData();
        }
    }, [accessToken]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/auth/users/me/",
                {
                    headers: {
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );

            if (response.data) {
                dispatch(
                    login({
                        userData: response.data,
                        accessKey: accessToken,
                    })
                );
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const { data, isLoading, isError } = useQuery(
        "authData",
        fetchData,
        { enabled: false }
    );

    if (isError) {
        // Handle error, maybe redirect to login page
    }

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-slate-50">
            <div className="w-full block">
                <Header />
                <main>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <Outlet />
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
