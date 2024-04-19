import React from 'react'

function Logo({width="100px"}) {
    return (
        <div className="md:w-auto flex-shrink-0 mr-auto">
            <img
                className="h-10 md:h-20"
                src="https://static.designboom.com/wp-content/uploads/2016/05/new-instagram-logo-new-look-designboom-600.jpg"
                alt="Logo"
            />
        </div>
    )
}

export default Logo