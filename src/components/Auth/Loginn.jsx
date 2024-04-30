import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../store/authSlice"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import axios from "axios"
import { ErrorMessage } from "@hookform/error-message"
import { authenticateUser } from "../AuthService"

import { Input, Button } from "../index"

function Loginn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
                username: data.username,
                password: data.password,
            })

            const { access, refresh } = response.data

            localStorage.setItem("accessToken", JSON.stringify(access))
            localStorage.setItem("refreshToken", JSON.stringify(refresh))


            if (access) {
                authenticateUser(access, dispatch)
            }

            navigate("/")
        } catch (error) {
            setError("Failed to login. Please check your credentials.")
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}Logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        {/* <Input
                            label="Email"
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: (value) =>
                                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(
                                        value
                                    ) ||
                                    "Email address must be a valid address",
                            })}
                        /> */}

                        {/* <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <p>{message}</p>}
                        /> */}

                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "This is required field",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]*$/,
                                    message:
                                        "Username should contain only alphabets, numbers and underscore",
                                },

                                minLength: {
                                    value: 3,
                                    message:
                                        "Username should not exceed 10 characters",
                                },
                            })}
                        />

                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(
                                    ([type, message]) => (
                                        <p key={type}>{message}</p>
                                    )
                                )
                            }
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { required: true })}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            children={"Login"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginn
