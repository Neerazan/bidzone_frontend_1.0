import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Footer, Header } from "./components";
import { authenticateUser } from "./components/AuthService";

function App() {
    const dispatch = useDispatch();
    const accessToken = useMemo(() => JSON.parse(localStorage.getItem("accessToken")), []);
    
    useEffect(() => {
        const authenticate = async () => {
            try {
                await authenticateUser(accessToken, dispatch);
            } catch (error) {
                console.log(error);
            }
        }
        authenticate();
    }, [accessToken, dispatch]);


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
