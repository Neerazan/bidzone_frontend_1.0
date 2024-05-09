import React from "react"
import { Link } from "react-router-dom"
import { BsBell } from "react-icons/bs"
import { IconContext } from "react-icons"

function Notification() {
    return (
        <li className="relative inline-block">
            <Link className="" href="">
                <div className="absolute -top-3 -right-3 z-10 text-white bg-red-600 text-xs font-bold px-1 py-0.5 rounded-sm">
                    09
                </div>
                <IconContext.Provider
                    value={{
                        size: "1.5em",
                        className: "hover:text-red-600 text-gray-200",
                    }}
                >
                    <BsBell />
                </IconContext.Provider>
            </Link>
        </li>
    )
}

export default Notification
