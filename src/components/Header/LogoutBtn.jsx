import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        dispatch(logout())
        navigate("/")
    }

    return (
        <button
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
