import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import axios from "axios"
import { ErrorMessage } from "@hookform/error-message"
import { authenticateUser } from "../AuthService"

import { Input, Button } from "../index"

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm()
    const [error, setError] = useState("")


    const handleRegister = async (data) => {
        setError("")
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/auth/users/",{
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name
                }
            )

            if (response.status === 201) {
                console.log("User registered successfully.");
                console.log(response.data);
                navigate("/login")
            }

        } catch (error) {
            setError("Failed to register.")
        }
    }

    return (
        <section className="bg-gray-50 mt-10 mb-8">
            <div className="flex flex-col items-center justify-center px-6 mx-auto h-full lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    BidZone
                </a>
                <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an Account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(handleRegister)}
                        >
                            {/* Username */}
                            <div>
                                <Input
                                    label="Username"
                                    type="text"
                                    placeholder="neerazan"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.username
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}


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
                                                "Password should be atleast 3 characters long",
                                        },
                                    })}
                                />
                                <div className="h-2">
                                    <ErrorMessage
                                        errors={errors}
                                        name="username"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>



                            {/* First Name */}
                            <div>
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="Nirajan"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.first_name
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    {...register("first_name", {
                                        required: "This is required field",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]*$/,
                                            message:
                                                "First Name should contain only alphabets, numbers and underscore",
                                        },

                                        minLength: {
                                            value: 3,
                                            message:
                                                "First Name should be atleast 3 characters long",
                                        },
                                    })}
                                />
                                <div className="h-2">
                                    <ErrorMessage
                                        errors={errors}
                                        name="first_name"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>


                            {/* Second Name */}
                            <div>
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Dhakal"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.last_name
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    {...register("last_name", {
                                        required: "This is required field",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]*$/,
                                            message:
                                                "Last Name should contain only alphabets, numbers and underscore",
                                        },

                                        minLength: {
                                            value: 3,
                                            message:
                                                "Last Name should be atleast 3 characters long",
                                        },
                                    })}
                                />
                                <div className="h-2">
                                    <ErrorMessage
                                        errors={errors}
                                        name="last_name"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>


                            {/* Email */}
                            <div>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="nirajandhakal634@gmail.com"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.email
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    {...register("email", {
                                        required: "This is required field",
                                        matchPatern: (value) =>
                                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(
                                                value
                                            ) ||
                                            "Email address must be a valid address",

                                        minLength: {
                                            value: 3,
                                            message:
                                                "Password should be atleast 3 characters long",
                                        },
                                    })}
                                />
                                <div className="h-2">
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.password
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "This is required field",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password should be atleast 8 characters long",
                                        },
                                    })}
                                />
                                <div className="h-2">
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Error From Backend */}
                            <div className="h-2">
                                {error && (
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300`}
                                            {...register("remember")}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-700"
                                        >
                                            I accept the <span className="text-blue-500 hover:underline cursor-pointer">Terms and Conditions</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-sm text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-800">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-gray-800 hover:underline"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
