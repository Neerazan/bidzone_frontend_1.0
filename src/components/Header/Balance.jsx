import React from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useQuery } from "react-query"

function Balance() {
    const customer_id = useSelector((state) => state.auth.userData.id)

    const fetchBalance = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/customers/${customer_id}/customer_coins/`
            )
            return response.data
        } catch (error) {
            throw new Error("Error fetching balance")
        }
    }

    const { data, isError, isLoading, error } = useQuery(
        "balance",
        fetchBalance
    )

    // Function to format the balance as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", // Change this according to your currency
        }).format(amount)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="flex">
            {data && <span className="font-semibold text-xl text-gray-100">{formatCurrency(data[0].balance)}</span>}
        </div>
    )
}

export default Balance
