import React from 'react'

function Logo({width="100px"}) {
    return (
        <div className="mr-auto md:w-48 flex-shrink-0">
            <img
                className="h-8 md:h-10"
                src="D:\FYP\bidzone_frontend_1.0\src\assets\logo.png"
                alt="Logo"
            />
        </div>
    )
}

export default Logo