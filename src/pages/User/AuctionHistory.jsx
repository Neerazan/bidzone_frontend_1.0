import React from 'react'
import { AuctionHistory as History } from "../../components/index"
import { Link } from 'react-router-dom'

function AuctionHistory() {
    return (
        <div>
            <div className="bg-white h-auto w-auto flex items-center rounded-md mt-4 px-8">
                <div>
                    <h4 className="text-xl text-gray-600 font-bold">
                        Products
                    </h4>
                </div>
                <form className="max-w-[200px] w-full px-4 ml-auto">
                    <div className="relative my-2">
                        <input
                            type="text"
                            name="q"
                            className="w-full border h-8 shadow px-4 py-1 text-xs rounded-full focus:outline-none"
                            placeholder="search"
                        />
                        <button type="submit">
                            <svg
                                className="text-gray-500 h-3 w-3 absolute top-2.5 right-2.5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                contentStyleType="enable-background:new 0 0 56.966 56.966;"
                                xmlSpace="preserve"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="p-1 bg-white rounded-md cursor-pointer">
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>Filter</title>{" "}
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                {" "}
                                <g id="Filter">
                                    {" "}
                                    <rect
                                        id="Rectangle"
                                        fillRule="nonzero"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                    >
                                        {" "}
                                    </rect>{" "}
                                    <line
                                        x1="4"
                                        y1="5"
                                        x2="16"
                                        y2="5"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="4"
                                        y1="12"
                                        x2="10"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="14"
                                        y1="12"
                                        x2="20"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="8"
                                        y1="19"
                                        x2="20"
                                        y2="19"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="18"
                                        cy="5"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="6"
                                        cy="19"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </div>
                <Link
                    className="flex px-4 py-1 rounded-md cursor-pointer ml-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
                    to="/user/add-product"
                >
                    <span>Add New Products</span>
                </Link>
            </div>
            <History />
        </div>
    )
}

export default AuctionHistory