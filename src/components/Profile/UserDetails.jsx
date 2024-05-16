import React from "react"
import { Input } from "../index"
import { useForm } from "react-hook-form"

function UserDetails() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "Nirajan",
            lastName: "Dhakal",
            email: "neerajan334@gmail.com",
            username: "Neerazan",
            phone: "9840294335",
            dob: "2001-09-26",
        },
    })

    return (
        <>
            <form className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                        <Input
                            label="First Name"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("firstName")}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Last Name"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("lastName")}
                        />
                    </div>
                </div>

                {/* Username and Email */}
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                        <Input
                            label="Username"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("username")}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Email"
                            type="email"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("email")}
                        />
                    </div>
                </div>

                {/* Phone and BirthDate */}
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                        <Input
                            label="Phone Number"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("phone", { required: true })}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Date of Birth"
                            type="date"
                            className="border border-gray-400 rounded-md p-2.5 w-full text-sm text-gray-900 outline-none focus:border-blue-400"
                            {...register("dob")}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                        Save
                    </button>
                </div>
            </form>


            {/* Change Password */}
            <h4 className="text-lg font-bold text-blue-600 mb-2 mt-6">
                Change Password
            </h4>
            <div className="border-t-2 border-gray-400"></div>
            <div>
                <p className="text-gray-600 font-semibold">The Password Change Link will be Send to your Gmail Account</p>
                <button className="text-blue-500 px-4 py-2 rounded-sm border mt-2 border-blue-500 hover:bg-blue-500 hover:text-white font-semibold transition ease-in-out duration-300">
                    Change Password
                </button>
            </div>

            <h4 className="text-lg font-bold text-red-500 mb-2 mt-10">
                Danger Zone
            </h4>
            <div className="border-t-2 border-gray-400"></div>

            {/* Danger Zone */}
            <div className="mt-1">
                <div className="">
                    <p className="font-semibold text-gray-600">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="text-red-500 px-4 py-2 rounded-sm border mt-2 border-red-500 hover:bg-red-500 hover:text-white font-semibold transition ease-in-out duration-300">
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserDetails
