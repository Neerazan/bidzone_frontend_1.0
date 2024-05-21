import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width="100px"}) {
    return (
        <Link className="w-16 md:w-28 flex-shrink-0 py-4"
            href='/'
        >
            <img
                className="h-6 md:h-8 mx-auto"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Logo"
            />
        </Link>
    )
}

export default Logo