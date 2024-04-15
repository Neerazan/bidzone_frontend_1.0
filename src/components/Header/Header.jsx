import React from 'react'
import Container from "../index"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const navItem = [
        {
            name: "Home",
            slug: "/",
            active: true
        },

        {
            name: "Login",
            slug: "/login",
            active: true
        },

        {
            name: "Signup",
            slug: "/signup",
            active: true
        },

        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Home",
            slug: "/",
            active: true
        },
    ]


    return (
        <div>Header</div>
    )
}

export default Header