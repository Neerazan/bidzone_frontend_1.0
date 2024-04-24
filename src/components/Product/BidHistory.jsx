import React from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { Loader } from "../index"

function BidHistory({ auctionId }) {
    const getBidHistory = async () => {
        const response = await axios.get(
            `http://127.0.0.1:8000/auction/auctions/${auctionId}/bids/`
        )
        console.log(response.data)
        return response.data
    }

    const { data, isLoading, isError } = useQuery("bidHistory", getBidHistory)

    return (
        <>
            {/* Scrollable container for bid history using tailwind css */}
            <h2 className="text-center font-semibold text-xl py-2 rounded-lg bg-gray-100">
                Bidding History
            </h2>

            <div className="flex flex-col h-96 overflow-y-scroll rounded-lg mt-2 shadow-md bg-gray-100">
                <div className="flex flex-col bg-gray-100 w-full px-2 py-2">
                    {isLoading && (
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    )}
                    {data &&
                        data.map((bid) => (
                            <div className="flex rounded-full bg-white px-2 py-1 items-center mb-2" key={bid.id}>
                                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center text-2xl justify-center">
                                    {bid.bidder.first_name[0]}
                                </div>
                                <div className="block justify-center mt-auto mb-auto ml-2">
                                    <h3 className="font-semibold">
                                        {`${bid.bidder.first_name.slice(
                                            0,
                                            2
                                        )}***${bid.bidder.first_name.slice(
                                            -1
                                        )}`}
                                    </h3>
                                    <span className="text-sm text-gray-400">
                                        {bid.created_at}
                                    </span>
                                </div>

                                <div className="ml-auto mr-4">
                                    <span className="text-[17px] font-bold">
                                        Rs. {bid.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default BidHistory
