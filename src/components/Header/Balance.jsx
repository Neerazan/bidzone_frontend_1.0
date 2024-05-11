import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBalance } from "../../store/common/BalanceSlice"

function Balance() {
    const user = useSelector((state) => state.auth.userData)
    const balance = useSelector((state) => state.balance.balance)
    const accessKey = useSelector((state) => state.auth.accessKey)
    
    const dispatch = useDispatch()

    if(!balance) {
        dispatch(fetchBalance({ accessKey:accessKey, customer_id:user.id }))
    }

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
