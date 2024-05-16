import React from "react"
import { FaRegEdit } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IconContext } from "react-icons"

function Address() {
    return (
        <div className="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow col-span-1 w-full address-card">
            <div className="grid grid-cols-3">
                <div className="text-6xl cursor-pointer col-span-1 flex justify-center items-center">
                    <IconContext.Provider
                        value={{ className: "text-gray-500" }}
                    >
                        <IoLocationOutline   />
                    </IconContext.Provider>
                </div>
                <div className="col-span-2">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-700">
                            Nepal 🇳🇵
                        </h5>
                    </a>
                    <p className="mb-3 text-gray-600 font-semibold">
                        Gandaki, Kaski (33700) <br />
                        Pokhara metro - 12, Fulbari <br />
                        Near Nepal Telecom Office
                    </p>
                    <a
                        href="#"
                        className="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        Edit Your Address
                        <FaRegEdit className="ml-2 mt-0.5" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Address
