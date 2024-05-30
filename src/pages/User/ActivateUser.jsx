import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container } from "../../components/index"
import { useMutation } from "react-query"
import axios from "axios"

function ActivateUser() {
    const { token } = useParams()
    const { uid } = useParams()
    const navigate = useNavigate()

    const mutation = useMutation(
        ({ uid, token }) => {
            return axios.post("http://localhost:8000/auth/users/activation/", {
                uid: uid,
                token: token,
            })
        },
        {
            onSuccess: () => {
                alert("Account activated successfully")
                navigate("/login")
            },
            onError: () => {
                alert("Failed to activate account")
            },
        }
    )

    const handleActivatoin = () => {
        mutation.mutate({
            uid: uid,
            token: token,
        })
    }

    return (
        <Container>
            {/* Make a card using tailwind css that contain activate button when we click this button it should make post request to the certaion ulr */}
            <div className="flex justify-center items-center h-screen">
                <div className="w-1/3 bg-white p-5 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-5">
                        Activate your account
                    </h2>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleActivatoin}
                    >
                        Activate
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default ActivateUser
