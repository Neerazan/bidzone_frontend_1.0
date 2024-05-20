import React, { useState, useRef, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { fetchBids } from "../../store/Auction/bidsSlice"
import { useForm } from "react-hook-form"

import { InputConfirmationModal } from "../index"
import { ErrorMessage } from "@hookform/error-message"

import { updateBid, addBid } from "../../store/Auction/bidsSlice"

function BidInfo({ data }) {
    const bidInput = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [bidAmount, setBidAmount] = useState(null)

    const accessToken = useSelector((state) => state.auth.accessKey)
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const user_balance = useSelector(
        (state) => state.auth.userData.user_balance
    )

    const bidsData = useSelector((state) => state.bid.bids)

    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

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

    const bidMutation = useMutation(async (newBid) => {
        const url = myBid
            ? `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/${myBid.id}/`
            : `http://127.0.0.1:8000/auction/auctions/${data.id}/bids/`

        const method = myBid ? "put" : "post"

        const response = await axios[method](url, newBid, {
            headers: { Authorization: `JWT ${accessToken}` },
        })

        return response.data
    })

    const submitBid = () => {
        setShowModal(false)
        bidMutation.mutate(
            {
                amount: bidAmount,
            },
            {
                onSuccess: (data) => {
                    console.log(`Inside addBid onSuccess Data : ${data}`);
                    queryClient.invalidateQueries("bids")
                    if(myBid) {
                        console.log(`Inside addBid If condition`);
                        dispatch(updateBid({ updatedBid:data }))
                        reset()
                    }else {
                        console.log(`Inside addBid Else condition`);
                        dispatch(addBid({ bidData:data }))
                        reset()
                    }
                },
            }
        )
    }

    const handleSubmitBid = (data) => {
        setBidAmount(data.amount)
        setShowModal(true)
    }

    const cancelSubmitModal = () => {
        setShowModal(false)
        setBidAmount(null)
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

            <form className="mt-6" onSubmit={handleSubmit(handleSubmitBid)}>
                <input
                    id="bid_input"
                    ref={bidInput}
                    type="number"
                    placeholder="Enter your bid"
                    className={`w-full bg-gray-200 rounded-md p-2 outline-1 focus:outline  ${errors.amount ? "focus:outline-red-500" : "focus:outline-sky-500"}`}
                    {...register("amount", {
                        required: "This field is required",
                        min: {
                            value: data.current_price + 1,
                            message:
                                "Bid amount should be greater than current price",
                        },
                    })}
                />

                <div className="h-3 my-1 px-4">
                    <ErrorMessage
                        errors={errors}
                        name="amount"
                        render={({ message }) => (
                            <p className="text-sm text-red-600">{message}</p>
                        )}
                    />
                </div>

                <button
                    className="w-full border border-green-700 text-green-700 rounded-md p-2 mt-2 font-semibold hover:bg-green-700 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105"
                    type="submit"
                >
                    {myBid ? "Update Bid" : "Submit Bid"}
                </button>
            </form>
            <InputConfirmationModal
                show={showModal}
                onConfirm={submitBid}
                onCancel={cancelSubmitModal}
                message={`Are you sure you want to bid ?`}
            />
        </>
    )
}

export default BidInfo
