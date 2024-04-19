import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";

function Balance() {
    const customer_id = useSelector((state) => state.auth.userData.id);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/customers/${customer_id}/customer_coins/`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching balance");
        }
    };

    const { data, isError, isLoading, error } = useQuery("balance", fetchBalance);

    // Function to format the balance as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD' // Change this according to your currency
        }).format(amount);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <li className="ml-2 lg:ml-4 relative inline-block">
            <div className="ml-4 hidden lg:flex flex-col font-bold border border-slate-700 px-2 rounded-md">
                <span className="text-xs text-gray-700">Balance</span>
                {data && <span>{formatCurrency(data[0].balance)}</span>}
            </div>
        </li>
    );
}

export default Balance;
