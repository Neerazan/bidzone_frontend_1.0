import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useMutation } from "react-query"
import axios from "axios"

function BidInfo({ data, bidsData }) {
    const [bidAmount, setBidAmount] = useState(null)
    const accessToken = useSelector((state) => state.auth.accessKey)

    const authStatus = useSelector((state) => state.auth.status)
    let customer_id = null
    if (authStatus) {
        customer_id = useSelector((state) => state.auth.userData.id)
    }

    const myBid = bidsData.find((bid) => bid.bidder.id === customer_id)

    const submitBidMutation = useMutation(async () => {
        await axios.post(
            `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/`,
            {
                amount: bidAmount,
            },
            {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                },
            }
        );
    })


    const updateBIdMutation = useMutation(async () => {
        await axios.put(
            `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/${myBid.id}/`,
            {
                amount: bidAmount,
            },
            {
                headers: {
                    Authorization: `JWT ${accessToken}`,
                }
            }
        )
    })


    const submitBid = () => {
        if (myBid) {
            updateBIdMutation.mutate()
        } else {
            submitBidMutation.mutate()
        }
    }


    return (
        <>
            <div>
                <p className="text-3xl font-semibold text-center block mb-3">
                    Current Bid: Rs. {data?.current_price}
                </p>
                <div className="flex items-center justify-center">
                    <span className="text-[16px] font-bold mr-2">
                        {data.bids_count} bids(s) so far
                    </span>
                    {customer_id === bidsData[0]?.bidder.id && (
                        <span className="text-white text-sm bg-green-700 rounded-full px-3">
                            Your bid is the heighest
                        </span>
                    )}
                    {myBid && customer_id !== bidsData[0]?.bidder.id && (
                        <span className="text-white text-sm bg-sky-600 rounded-full px-3">
                            Your bid is {myBid.amount}
                        </span>
                    )}
                </div>
            </div>

            {/* Submit Bid */}
            <div className="mt-6">
                <input
                    id="bid_input"
                    type="number"
                    placeholder="Enter your bid"
                    className="w-full bg-gray-200 rounded-md p-2 outline-1 focus:outline focus:outline-sky-500"
                    onChange={(e) => setBidAmount(e.target.value)}
                />
                <button
                    className="w-full border border-green-700 text-green-700 rounded-md p-2 mt-2 font-semibold hover:bg-green-700 hover:text-white transition-all duration-1000 ease-in-out transform hover:scale-105"
                    onClick={submitBid}
                >
                    {myBid ? "Update Bid" : "Submit Bid"}
                </button>
            </div>
        </>
    )
}

export default BidInfo
