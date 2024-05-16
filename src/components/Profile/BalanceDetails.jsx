import React, { useState } from "react"
import { BiSolidMedal } from "react-icons/bi"
import { RiAddFill } from "react-icons/ri"
import { GiTrophyCup } from "react-icons/gi"
import { FaRegEye } from "react-icons/fa6"
import { FaRegEyeSlash } from "react-icons/fa6"
import { Link } from "react-router-dom"

function BalanceDetails() {
    const [showBalance, setShowBalance] = useState(false)

    return (
        <div className="rounded-md shadow border border-gray-200 px-10 py-6 w-full grid gap-4 wallet-info">
            <div className="flex items-center">
                <div>
                    <p className="text-gray-600 font-semibold">
                        Wallet Balance
                    </p>
                    <div className="flex">
                        <p className="font-bold text-xl text-gray-600 w-44">
                            {showBalance ? "NPR. 99,000.00" : "NPR. XXXX.XX"}
                        </p>
                        <button
                            className="cursor-pointer ml-4 text-2xl mt-1 text-gray-600 hover:text-gray-700"
                            onClick={() => setShowBalance(!showBalance)}
                        >
                            {showBalance ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>
                <Link
                    className="text-3xl font-bold bg-white rounded-sm text-green-600 ml-auto cursor-pointer border border-green-600 hover:text-white hover:bg-green-600 transition ease-in-out duration-300 justify-end items-end flex"
                    to="/"
                >
                    <RiAddFill />
                </Link>
            </div>

            <div className="flex gap-12">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer text-3xl text-white bg-yellow-500 py-1">
                            <GiTrophyCup />
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                Reward Points
                            </p>
                            <p className="font-bold text-gray-600">
                                {showBalance ? "1000.00" : "XXXX"}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer text-3xl text-white bg-yellow-500 py-1">
                            <BiSolidMedal />
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                Badge(Tier)
                            </p>
                            <p className="font-bold text-gray-600">
                                {showBalance ? "Gold" : "XXXX"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceDetails
