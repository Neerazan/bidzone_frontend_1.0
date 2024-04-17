import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown() {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <div className="relative">
            <button
                type="button"
                data-dropdown-toggle="profile-dropdown-menu"
                className="inline-flex items-center font-medium justify-center px-2 py-2 text-sm text-gray-900 rounded-full cursor-pointer border hover:border-slate-900 border-slate-600 ml-auto"
                onClick={toggleDropdown}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    className="cursor-pointer fill-[#333] md:mr-3"
                    viewBox="0 0 512 512"
                >
                    <path
                        d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                        data-original="#000000"
                    />
                </svg>
                <span className="hidden md:block">NEERAJAN</span>
            </button>

            {/* Dropdown List */}
            {dropdown && (
                <div
                    className="absolute z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                    id="profile-dropdown-menu"
                    style={{ left: 0 }}
                >
                    <ul className="py-2 font-medium" role="none">
                        <li>
                            <Link
                                to="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                role="menuitem"
                                onClick={toggleDropdown}
                            >
                                <div className="inline-flex items-center">
                                    Profile
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                role="menuitem"
                                onClick={toggleDropdown}
                            >
                                <div className="inline-flex items-center">
                                    My Auction
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                role="menuitem"
                                onClick={toggleDropdown}
                            >
                                <div className="inline-flex items-center">
                                    My Products
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                role="menuitem"
                                onClick={toggleDropdown}
                            >
                                <div className="inline-flex items-center">
                                    LogOut
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
