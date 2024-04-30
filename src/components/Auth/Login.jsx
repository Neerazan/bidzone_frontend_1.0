import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Container } from "../index";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const userCredentials = { username, password };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/auth/jwt/create/",
                userCredentials
            );
            const { access, refresh } = response.data;
            localStorage.setItem("accessToken", JSON.stringify(access));
            localStorage.setItem("refreshToken", JSON.stringify(refresh));
            navigate("/");
        } catch (error) {
            setError("Failed to login. Please check your credentials.");
        }
    };

    return (
        <Container>
            <form onSubmit={handleLogin}>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <br />
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </Container>
    );
}

export default Login;
