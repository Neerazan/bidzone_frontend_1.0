import React from "react"
import { useSelector } from "react-redux"

import { LoginBtn, RegisterBtn, Logo, SearchBox, Wishlist, Balance, Dropdown, Container, Notification } from "../index"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    return (
        <header className="bg-[#212529]">
            <Container>
                <div className="container flex items-center">
                    <Logo />
                    <SearchBox />
                    {authStatus && <Dropdown />}
                    <nav className="">
                        <ul className="xl:w-auto flex items-center justify-center">
                            {!authStatus && <LoginBtn />}
                            {!authStatus && <RegisterBtn />}
                            {authStatus && <Notification />}
                            <Wishlist />
                            {authStatus && <Balance />}
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header
