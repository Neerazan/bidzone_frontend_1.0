import React from 'react'
import { Link } from 'react-router-dom'
import bidzoneLogo from "../../assets/logo.png"

function Logo({width="100px"}) {
    return (
        <Link className="w-16 md:w-28 flex-shrink-0 py-2 md:py-3"
            href=''
        >
            <img
                className="h-8 md:h-10 mx-auto"
                // src="https://flowbite.com/docs/images/logo.svg"
                src={bidzoneLogo}
                alt="Logo"
            />
        </Link>
    )
}

export default Logo