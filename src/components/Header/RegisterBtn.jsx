import React, { useState } from "react"
import { Link } from "react-router-dom"

function RegisterBtn() {
    return (
        <li className="ml-4 relative inline-block">
            <div className="flex">
                <Link className="flex">
                    <svg
                        className="h-7 w-7 cursor-pointer pt-1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        // fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>i</title>{" "}
                            <g id="Complete">
                                {" "}
                                <g id="user-add">
                                    {" "}
                                    <g>
                                        {" "}
                                        <path
                                            d="M17,21V19a4,4,0,0,0-4-4H5a4,4,0,0,0-4,4v2"
                                            fill="none"
                                            stroke="#c0c0c0"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        ></path>{" "}
                                        <circle
                                            cx="9"
                                            cy="7"
                                            r="4"
                                            fill="none"
                                            stroke="#c0c0c0"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        ></circle>{" "}
                                        <line
                                            x1="17"
                                            y1="11"
                                            x2="23"
                                            y2="11"
                                            fill="none"
                                            stroke="#c0c0c0"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        ></line>{" "}
                                        <line
                                            x1="20"
                                            y1="8"
                                            x2="20"
                                            y2="14"
                                            fill="none"
                                            stroke="#c0c0c0"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        ></line>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                    <span className="text-gray-300 ml-1 mt-[2px] hover:text-red-500">Register</span>
                </Link>
            </div>
        </li>
    )
}

export default RegisterBtn
