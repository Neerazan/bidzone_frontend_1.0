import React from "react"
import axios from "axios"
import { useQuery } from "react-query"

function BidHistory({auctionId}) {

    const getBidHistory = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${auctionId}/bids/`)
        console.log(response.data);
        return response.data
    }

    const { data, isLoading, isError } = useQuery("bidHistory", getBidHistory)

    return (
        <>
            {/* Scrollable container for bid history using tailwind css */}
            <h2 className="text-center font-semibold text-xl py-2 rounded-md bg-gray-100">Bidding History</h2>
            <div className="flex flex-col items-center h-96 overflow-y-scroll rounded-md mt-2">
                <div className="flex flex-col items-center bg-gray-100 rounded-md w-full">
                    
                </div>
            </div>
        </>
    )
}

export default BidHistory
