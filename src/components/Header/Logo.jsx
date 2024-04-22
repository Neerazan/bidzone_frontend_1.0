import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width="100px"}) {
    return (
        <Link className="md:w-24 flex-shrink-0 mr-auto py-4"
            to="/"
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