import React, { useState, useRef, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { fetchBids } from "../../store/Auction/bidsSlice"

function BidInfo({ data }) {
    const [bidAmount, setBidAmount] = useState(null)
    const bidInput = useRef(null)


    const accessToken = useSelector((state) => state.auth.accessKey)
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    const bidsData = useSelector((state) => state.bid.bids)

    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (data) {
            dispatch(fetchBids({ auctionId: data.id, accessKey: accessToken }))
        }
    }, [dispatch, data, accessToken])

    const customer_id = authStatus ? userData.id : null


    const myBid = useMemo(() => {
        const bid = bidsData.find((bid) => bid.bidder.id === customer_id)
        return bid
    }, [bidsData, customer_id])

    const bidMutation = useMutation(
        async (newBid) => {
            const url = myBid
                ? `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/${myBid.id}/`
                : `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/`

            const method = myBid ? "put" : "post"
            await axios[method](url, newBid, {
                headers: { Authorization: `JWT ${accessToken}` },
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("bids")
            },
        }
    )

    const submitBid = () => {
        bidMutation.mutate({ amount: bidAmount })
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
                            Your bid is the highest
                        </span>
                    )}
                    {myBid && customer_id !== bidsData[0]?.bidder.id && (
                        <span className="text-white text-sm bg-sky-600 rounded-full px-3">
                            Your bid is {myBid.amount}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <input
                    id="bid_input"
                    ref={bidInput}
                    type="number"
                    placeholder="Enter your bid"
                    className="w-full bg-gray-200 rounded-md p-2 outline-1 focus:outline focus:outline-sky-500"
                    onChange={(e) => setBidAmount(e.target.value)}
                />
                <button
                    className="w-full border border-green-700 text-green-700 rounded-md p-2 mt-2 font-semibold hover:bg-green-700 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105"
                    onClick={submitBid}
                >
                    {myBid ? "Update Bid" : "Submit Bid"}
                </button>
            </div>
        </>
    )
}

export default BidInfo
