import React, { useState } from "react"
import { Link } from "react-router-dom"

function LoginOrRegister() {
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <li className="ml-2 lg:ml-4 relative inline-block">
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center border border-slate-600 p-2 rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        className="cursor-pointer fill-[#333]"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                            data-original="#000000"
                        />
                    </svg>
                </button>

                {/* Dropdown List */}
                {dropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                        <ul className="py-1">
                            <li className=" hover:bg-gray-800">
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    onClick={toggleDropdown}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    onClick={toggleDropdown}
                                >
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </li>
    )
}

export default LoginOrRegister
