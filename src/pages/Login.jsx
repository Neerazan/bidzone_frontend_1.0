import React from "react";
import {Login as LoginComponent, TestHeader} from "../components/index"

function Login() {
    return (
        <div className="py-8">
            <LoginComponent />
            <TestHeader />
        </div>
    )
}

export default Login