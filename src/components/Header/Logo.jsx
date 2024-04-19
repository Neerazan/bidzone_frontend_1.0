import React from 'react'

function Logo({width="100px"}) {
    return (
        <div className="md:w-auto flex-shrink-0 mr-auto py-4">
            <img
                className="h-10 md:h-15"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Logo"
            />
        </div>
    )
}

export default Logo