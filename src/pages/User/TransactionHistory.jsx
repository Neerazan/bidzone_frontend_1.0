import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { FormattedDate } from "../../components/index"

function TransactionHistory() {
    const [transactionStatus, setTransactionStatus] = useState("")
    const [transactionType, setTransactionType] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")

    const user_id = useSelector((state) => state.auth.userData.id)
    const accessKey = useSelector((state) => state.auth.accessKey)

    const getTransactions = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/customers/${user_id}/transactions/`,
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const { data, error, isLoading, isError } = useQuery(
        "transactions",
        getTransactions
    )

    const truncateText = (text) => {
        return text.length > 25 ? text.substring(0, 30) + " ..." : text
    }

    return (
        <>
            <div className="w-full">
                <div className="mx-auto mt-4 py-4 max-w-screen-lg px-4 bg-white rounded-md">
                    <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                        <p className="flex-1 text-base font-bold text-gray-600">
                            Transactions History
                        </p>

                        <div className="mt-4 sm:mt-0">
                            <div className="flex items-center justify-start sm:justify-end">
                                <div className="flex items-center">
                                    <label
                                        for=""
                                        className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                                    >
                                        {" "}
                                        Sort by:{" "}
                                    </label>
                                    <select
                                        name=""
                                        className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                                    >
                                        <option className="whitespace-no-wrap text-sm">
                                            Recent
                                        </option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                                >
                                    <svg
                                        className="mr-1 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            className=""
                                        ></path>
                                    </svg>
                                    Export to CSV
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-xl border shadow">
                        <table className="min-w-full border-spacing-y-2">
                            <thead className="hidden border-b lg:table-header-group ">
                                <tr className="bg-gray-100">
                                    <td className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm">
                                        #
                                    </td>

                                    <td
                                        width="30%"
                                        className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm"
                                    >
                                        Description
                                    </td>

                                    <td
                                        width="23%"
                                        className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm"
                                    >
                                        Date
                                    </td>

                                    <td className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm">
                                        Type
                                    </td>

                                    <td className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm">
                                        Amount
                                    </td>

                                    <td className="whitespace-normal py-2 font-semibold text-gray-700 sm:px-6 text-sm">
                                        Status
                                    </td>
                                </tr>
                            </thead>

                            {data &&
                                data.map((transaction, index) => (
                                    <>
                                        <tbody
                                            key={transaction.id}
                                            className="border-b lg:table-row-group text-sm"
                                        >
                                            <tr className="">

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    {index + 1}
                                                </td>

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    {
                                                        truncateText(transaction.invoice)
                                                    }
                                                </td>

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    <FormattedDate
                                                        date={
                                                            transaction.created_at
                                                        }
                                                    />
                                                </td>

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    {transaction.transaction_type ===
                                                    "B"
                                                        ? "Bid"
                                                        : transaction.type ===
                                                        "D"
                                                        ? "Deposit"
                                                        : "Refunded"}
                                                </td>

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    {transaction.amount}
                                                </td>

                                                <td className="whitespace-normal py-4 sm:px-6">
                                                    {
                                                        <div className="">
                                                            {transaction.transaction_status ===
                                                            "P" ? (
                                                                <span className="px-4 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                                                                    Pending
                                                                </span>
                                                            ) : transaction.transaction_status ===
                                                            "C" ? (
                                                                <span className="px-4 py-1 text-xs font-semibold text-white bg-green-700 rounded-full">
                                                                    Completed
                                                                </span>
                                                            ) : (
                                                                <span className="px-4 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                                                                    Cancelled
                                                                </span>
                                                            )}
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </>
                                ))}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionHistory
