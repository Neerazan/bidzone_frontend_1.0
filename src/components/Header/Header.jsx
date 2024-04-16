import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { LoginOrRegister, Logo, SearchBox, Wishlist, Balance } from "../index"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    // const navItems = [
    //     {
    //         name: "Home",
    //         slug: "/",
    //         active: true,
    //     },

    //     {
    //         name: "Login",
    //         slug: "/login",
    //         active: !authStatus,
    //     },

    //     {
    //         name: "Signup",
    //         slug: "/signup",
    //         active: !authStatus,
    //     }
    // ]

    return (
        <header className="bg-white">
            <div className="container mx-auto px-4 py-8 flex items-center">
                <Logo />
                <SearchBox />
                <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
                    <span className="font-bold md:text-xl">
                        +977 9840294335
                    </span>
                    <span className="font-semibold text-sm text-gray-400">
                        Support 24/7
                    </span>
                </div>
                <nav className="contents">
                    <ul className="ml-4 xl:w-48 flex items-center justify-end">
                        {!authStatus && <LoginOrRegister />}
                        <Wishlist />
                        {authStatus && <Balance />}
                    </ul>
                </nav>

            </div>
        </header>
        // <header className="py-3 shadow bg-gray-500">
        //     <Container>
        //         <nav className="flex">
        //             <div className="mr-4">
        //                 <Link to="/">
        //                     <Logo width="70px" />
        //                 </Link>
        //             </div>
        //             <ul className="flex ml-auto">
        //                 {navItems.map((item) =>
        //                     item.active ? (
        //                         <li key={item.name}>
        //                             <button
        //                                 onClick={() => navigate(item.slug)}
        //                                 className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        //                             >
        //                                 {item.name}
        //                             </button>
        //                         </li>
        //                     ) : null
        //                 )}
        //                 {authStatus && (
        //                     <li>
        //                         {/* <LogoutBtn /> */}
        //                         <button>Logout</button>
        //                     </li>
        //                 )}
        //             </ul>
        //         </nav>
        //     </Container>
        // </header>
    )
}

export default Header
