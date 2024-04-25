import React from "react"
import { useSelector } from "react-redux"

function BidInfo({ data, bidsData }) {

    const authStatus = useSelector((state) => state.auth.status)
    
    let customer_id = null

    if(authStatus){
        customer_id = useSelector((state) => state.auth.userData.id)
    }

    const myBid = bidsData.find((bid) => bid.bidder.id === customer_id)

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
                    {
                        customer_id === bidsData[0]?.bidder.id && <span className="text-white text-sm bg-green-700 rounded-full px-3">Your bid is the heighest</span>
                    }
                    {
                        myBid && customer_id !== bidsData[0]?.bidder.id && <span className="text-white text-sm bg-sky-600 rounded-full px-3">Your bid is {myBid.amount}</span>
                    }
                </div>
            </div>

            {/* Submit Bid */}
            <div className="mt-6">
                <input
                    id="bid_input"
                    type="number"
                    placeholder="Enter your bid"
                    className="w-full bg-gray-200 rounded-md p-2 outline-1 focus:outline focus:outline-sky-500"
                />
                <button className="w-full border border-green-700 text-green-700 rounded-md p-2 mt-2 font-semibold hover:bg-green-700 hover:text-white">
                    {myBid ? "Update Bid" : "Submit Bid"}
                </button>
            </div>
        </>
    )
}

export default BidInfo
