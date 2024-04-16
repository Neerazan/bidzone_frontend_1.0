import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { Container, Logo } from "../index"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const key = useSelector((state) => state.auth.accessKey)
    console.log(`Auth Status is ${authStatus}`)
    console.log(`Access Key is ${key}`)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },

        {
            name: "Login",
            slug: "/login",
            active: true,
        },

        {
            name: "Signup",
            slug: "/signup",
            active: true,
        },
    ]

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {/* {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )} */}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
