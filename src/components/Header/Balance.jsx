import React from "react"
import { useSelector } from "react-redux"

function Balance() {
    const balance = useSelector((state) => state.auth.userData.user_balance)


    // Function to format the balance as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    return (
        <div className="flex">
            <span className="font-semibold text-md text-gray-700">{formatCurrency(balance)}</span>
        </div>
    )
}

export default Balance
