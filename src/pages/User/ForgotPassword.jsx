import React, {useState} from 'react'
import { Container } from "../../components/index"
import { useMutation } from "react-query"
import axios from "axios"

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const mutation = useMutation(
        ({ email }) => {
            return axios.post("http://localhost:8000/auth/users/reset_password/", {
                email: email
            })
        },
        {
            onSuccess: () => {
                alert("Password reset link sent to your email")
            },
            onError: () => {
                alert("Failed to reset password")
            }
        }
    )

    const handleResetPassword = () => {
        mutation.mutate({
            email: email
        })
        setEmail("")
    }

    return (
        <Container>
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/3 bg-white p-5 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-5">
                        Reset your password
                    </h2>
                    <p className="mb-5">
                        Enter your email to reset your password
                    </p>
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 p-2 rounded-sm mb-5"
                    />

                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </Container>
    )
}
export default ForgotPassword