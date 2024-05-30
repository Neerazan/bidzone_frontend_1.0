import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import bidZoneLogo from "../../assets/logo.png"
import { useMutation } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Input } from "../../components/index"

function SetPassword() {
    const accessKey = useSelector((state) => state.auth.accessKey)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const mutation = useMutation(
        ({ current_password, new_password, re_new_password }) => {
            return axios.post(
                "http://localhost:8000/auth/users/set_password/",
                {
                    current_password: current_password,
                    new_password: new_password,
                    re_new_password: re_new_password,
                },
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            )
        },
        {
            onSuccess: () => {
                alert("Password Changed successfully")
                navigate("/user/profile")
            },
            onError: () => {
                alert("Failed to Changed password")
            },
        }
    )

    const resetPassword = (data) => {
        if (accessKey) {
            console.log(`Inside mutation`);
            mutation.mutate({
                current_password: data.current_password,
                new_password: data.new_password,
                re_new_password: data.re_new_password,
            })
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                >
                    <img className="h-20 w-auto" src={bidZoneLogo} alt="logo" />
                    BidZone
                </a>
                <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Change Your Password
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(resetPassword)}
                        >
                            <div>
                                <Input
                                    label="Current Password"
                                    type="password"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.password
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                    {...register("current_password", {
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
                                        name="current_password"
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
                                    label="New Password"
                                    type="password"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.password
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                    {...register("new_password", {
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
                                        name="new_password"
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
                                    label="Re enter Password"
                                    type="password"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm block p-2.5 font-semibold  outline-none focus:ring-1 focus:ring-blue-400 ${
                                        errors.password
                                            ? "border border-red-600 focus:ring-0"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                    {...register("re_new_password", {
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
                                        name="re_new_password"
                                        render={({ message }) => (
                                            <p className="text-sm text-red-600">
                                                {message}
                                            </p>
                                        )}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-sm text-sm px-5 py-2.5 text-center"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SetPassword
