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
            <h2 className="text-center font-semibold text-xl py-2 rounded-lg bg-gray-200">Bidding History</h2>
            <div className="flex flex-col h-96 overflow-y-scroll rounded-lg mt-2 shadow-md bg-gray-200">
                <div className="flex flex-col bg-gray-200 w-full">
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            N
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ne******n D*******l</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 1,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            A
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Aa****a A*****a</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 2,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            R
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ra****a D*******l</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 4,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            P
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Pu***a W***e</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 5,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            R
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ra***a P***t</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 10,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            N
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ne******n D*******l</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 10,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            N
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ne******n D*******l</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 10,000</h3>
                        </div>
                    </div>
                    <div className="flex mx-2 my-2 rounded-full bg-white">
                        <div className="flex rounded-full items-start px-4 text-white font-bold py-3 bg-green-500 mx-1 my-1">
                            N
                        </div>
                        <div className="block justify-center mt-auto mb-auto">
                            <h3 className="font-semibold">Ne******n D*******l</h3>
                            <span className="text-sm text-gray-400">30th March 2024 11:00PM</span>
                        </div>
                        <div className="flex mr-4 ml-auto my-auto">
                            <h3 className="font-semibold text-xl text-green-500">RS. 10,000</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BidHistory
