import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { ErrorMessage } from "@hookform/error-message"
import { authenticateUser } from "../AuthService"
import { signup } from "../../store/authSlice"

import { Input } from "../index"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const sliceError = useSelector((state) => state.auth.error)
    const accessToken = useSelector((state) => state.auth.accessKey)

    const login = async (data) => {

        const username = data.username
        const password = data.password

        try {
            await dispatch(signup({username, password}));

            if (accessToken) {
                localStorage.setItem("accessToken", JSON.stringify(accessToken))
                await authenticateUser(accessToken, dispatch)
                navigate("/")
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
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
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(login)}
                        >
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
                            <div className="h-2">
                                {sliceError && (
                                    <p className="text-sm text-red-600">{sliceError}</p>
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
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-sm text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-800">
                                Don’t have an account yet?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-gray-800 hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
