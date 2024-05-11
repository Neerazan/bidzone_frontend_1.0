import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { TbLogin2, TbUserPlus } from "react-icons/tb";
import { IconContext } from "react-icons";

function LoginRegisterBtn() {
    return (
        <li className="relative inline-block">
            <div className="flex text-gray-300">
                <NavLink className="flex hover:text-red-600" to="/login">
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <TbLogin2 />
                    </IconContext.Provider>
                    <span className="ml-1 font-semibold">
                        Login
                    </span>
                </NavLink>

                <span className="mx-3 hidden md:block font-semibold">|</span>

                <NavLink className="flex hover:text-red-600" to="/register">
                    <IconContext.Provider value={{ size: "1.5em" }}>
                        <TbUserPlus />
                    </IconContext.Provider>
                    <span className="ml-1 font-semibold">
                        Register
                    </span>
                </NavLink>
            </div>
        </li>
    )
}

export default LoginRegisterBtn
