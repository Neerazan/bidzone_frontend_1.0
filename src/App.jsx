import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Footer, Header } from "./components";
import { setCollections } from "./store/common/collectionSlice";
import { useQuery } from "react-query";
import axios from "axios";

import { authenticateUser } from "./components/AuthService";

function App() {
    const dispatch = useDispatch();
    const accessToken = useMemo(() => JSON.parse(localStorage.getItem("accessToken")), []);
    
    useEffect(() => {
        if (accessToken) {
            authenticateUser(accessToken, dispatch);
        }
    }, [accessToken, dispatch]);


    const getCollection = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/auction/collections"
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery("collections", getCollection);

    useEffect(() => {
        if (data) {
            dispatch(setCollections(data));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching collections: {isError.message}</div>;
    }


    return (
        <div className="min-h-screen flex flex-wrap content-between bg-slate-200">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
