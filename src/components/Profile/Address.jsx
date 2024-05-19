import React from "react"
import { FaRegEdit } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { IconContext } from "react-icons"
import { useQuery } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Address() {
    const user_id = useSelector((state) => state.auth.userData.id)

    const { data, isLoading, isError, error } = useQuery(
        "address",
        async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/auction/customers/${user_id}/addresses/${user_id}/`
                )
                return response.data
            } catch (error) {
                console.log("Error fetching address:", error)
            }
        },
        {
            enabled: !!user_id,
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow col-span-1 w-full address-card">
            {!data && (
                <div className="text-center">
                    <h5 className="text-2xl font-semibold text-gray-700 mt-auto">
                        No Address Found
                    </h5>
                    <p className="text-gray-600 mb-auto">
                        Please add your address to continue shopping.
                    </p>
                    <button
                        href="#"
                        className="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        Add Your Address
                        <FaRegEdit className="ml-2 mt-0.5" />
                    </button>
                </div>
            )}

            {data && (
                <div className="grid grid-cols-3">
                    <div className="text-6xl cursor-pointer col-span-1 flex justify-center items-center">
                        <IconContext.Provider
                            value={{ className: "text-gray-500" }}
                        >
                            <IoLocationOutline />
                        </IconContext.Provider>
                    </div>
                    <div className="col-span-2">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-700">
                                Nepal 🇳🇵
                            </h5>
                        </a>
                        <p className="mb-3 text-gray-600 font-semibold">
                            {data.province}, {data.district} ({data.zip_code}){" "}
                            <br />
                            {data.municipality} - {data.ward}, {data.tole}{" "}
                            <br />
                            {data.street}
                        </p>
                        <button
                            href="#"
                            className="inline-flex font-medium items-center text-blue-600 hover:underline"
                        >
                            Edit Your Address
                            <FaRegEdit className="ml-2 mt-0.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Address
