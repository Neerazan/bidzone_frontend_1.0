import React from "react"
import { FaLocationDot   } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5";
import { IconContext } from "react-icons"

function Address() {
    return (
        <div className="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow col-span-1 w-full">
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
                    <p className="mb-3 font-normal text-gray-500">
                        Gandaki, Kaski (33700) <br />
                        Pokhara metro - 12, Fulbari <br />
                        Near Nepal Telecom Office
                    </p>
                    <a
                        href="#"
                        className="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        Edit Your Address
                        <svg
                            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Address
