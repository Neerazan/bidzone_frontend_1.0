import React, { useState, useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "react-query"
import axios from "axios"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { fetchAuctions } from "../../store/Auction/customerAuctionSlice"
import { deleteAuction } from "../../store/Auction/customerAuctionSlice"

import { FormattedDate, ConfirmationModal, AuctionFormModal } from "../index"

import { FaEye } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md"

function Auctions() {
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteByButton, setDeleteByButton] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [initialData, setInitialData] = useState(null)

    const dispatch = useDispatch()
    const actionDropdownRef = useRef(null)

    const accessKey = useSelector((state) => state.auth.accessKey)
    const customer_id = useSelector((state) => state.auth.userData.id)
    const auctions = useSelector((state) => state.customerAuction.auctions)

    const MAX_TITLE_LENGTH = 60

    useEffect(() => {
        dispatch(fetchAuctions({ customer_id: customer_id }))
    }, [dispatch, customer_id])

    const truncateText = useCallback((text = "", maxLength) => {
        return text.length <= maxLength
            ? text
            : `${text.slice(0, maxLength)}...`
    }, [])

    // Function to handle selecting items
    const handleSelectItem = (id) => {
        const selectedIndex = selectedItems.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = [...selectedItems, id]
        } else {
            newSelected = selectedItems.filter((item) => item !== id)
        }

        setSelectedItems(newSelected)
        setSelectAll(newSelected.length === auctions.length)
    }

    // Function to check if item is selected
    const isSelected = (id) => selectedItems.includes(id)

    // Function to handle select all action
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([])
        } else {
            setSelectedItems(auctions?.map((auction) => auction.id))
        }
        setSelectAll(!selectAll)
    }

    const deleteAuctionMutation = useMutation(
        async ({ auctionId, accessKey }) => {
            try {
                const response = await axios.delete(
                    `http://127.0.0.1:8000/auction/auctions/${auctionId}/`,
                    {
                        headers: {
                            Authorization: `JWT ${accessKey}`,
                        },
                    }
                )
                return response.data
            } catch (error) {
                console.log("Error deleting a product:", error)
            }
        }
    )

    const handleDeleteAuction = () => {
        if (actionDropdownRef.current.value === "delete" || deleteByButton) {
            const auctionId = selectedItems[0]
            deleteAuctionMutation.mutate(
                {
                    auctionId: auctionId,
                    accessKey: accessKey,
                },
                {
                    onSuccess: (data) => {
                        dispatch(deleteAuction({ auctionId: auctionId }))
                        setSelectedItems([])
                        setSelectAll(false)
                        setDeleteByButton(false)
                    },
                }
            )
            setShowModal(false)
            setDeleteByButton(false)
        }
    }

    const handleAuctionDelete = async (id = "") => {
        if (id) {
            handleSelectItem(id)
            setDeleteByButton(true)
        }

        setShowModal(true)
    }

    const cancleAuctionDelete = () => {
        setShowModal(false)
        setSelectedItems([])
        setSelectAll(false)
    }

    const handleAddClick = () => {
        setInitialData(null)
        setIsModalOpen(true)
    }

    const handelEditClick = (auction) => {
        setInitialData(auction)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="bg-white h-auto w-auto flex items-center rounded-md mt-4 px-8">
                <div>
                    <h4 className="text-xl text-gray-600 font-bold">
                        Auctions
                    </h4>
                </div>
                <form className="max-w-[200px] w-full px-4 ml-auto">
                    <div className="relative my-2">
                        <input
                            type="text"
                            name="q"
                            className="w-full border h-8 shadow px-4 py-1 text-xs rounded-full focus:outline-none"
                            placeholder="search"
                        />
                        <button type="submit">
                            <svg
                                className="text-gray-500 h-3 w-3 absolute top-2.5 right-2.5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                contentStyleType="enable-background:new 0 0 56.966 56.966;"
                                xmlSpace="preserve"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="p-1 bg-white rounded-md cursor-pointer">
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>Filter</title>{" "}
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                {" "}
                                <g id="Filter">
                                    {" "}
                                    <rect
                                        id="Rectangle"
                                        fillRule="nonzero"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                    >
                                        {" "}
                                    </rect>{" "}
                                    <line
                                        x1="4"
                                        y1="5"
                                        x2="16"
                                        y2="5"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="4"
                                        y1="12"
                                        x2="10"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="14"
                                        y1="12"
                                        x2="20"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="8"
                                        y1="19"
                                        x2="20"
                                        y2="19"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="18"
                                        cy="5"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="6"
                                        cy="19"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </div>
                <button
                    className="flex px-4 py-1 rounded-md cursor-pointer ml-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
                    onClick={handleAddClick}
                >
                    <span>Add New Auctions</span>
                </button>
            </div>
            <div className="overflow-y-scroll h-[90vh] mt-2 bg-white py-4 px-4 rounded-md shadow-md">
                <div className="flex h-auto bg-sky-100 text-gray-600 px-4 py-2 rounded-sm mb-4">
                    <span className="font-semibold text-gray-600">
                        Actions:
                    </span>
                    <div className="max-w-sm ml-3 flex">
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm py-0.5 px-1 rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
                            ref={actionDropdownRef}
                        >
                            <option value="">------------------------</option>
                            <option value="delete">
                                Delete selected auctions
                            </option>
                        </select>
                        <button
                            className="px-1 py-0.5 mx-2 rounded-sm text-sm border bg-white border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                            onClick={() => {
                                handleAuctionDelete()
                            }}
                        >
                            Go
                        </button>
                    </div>

                    <span className="text-gray-700 mt-0.5">
                        {selectedItems.length} of {auctions?.length} selected
                    </span>

                    <div className="ml-auto flex items-center gap-2 mr-4">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 mx-auto"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        <span className="text-gray-600">Select All</span>
                    </div>
                </div>

                {auctions?.map((auction, index) => (
                    <div
                        key={auction.id} // Added key for better React performance
                        className={`flex w-full px-2 py-4 rounded-sm mb-1 ${
                            isSelected(auction.id)
                                ? "bg-sky-200"
                                : index % 2 === 0
                                ? "bg-sky-50"
                                : "bg-sky-50"
                        }`}
                    >
                        <div className="grid grid-cols-6 gap-4 w-full">
                            <div className="col-span-1 flex px-2 gap-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-blue-600"
                                    checked={isSelected(auction.id)}
                                    onChange={() =>
                                        handleSelectItem(auction.id)
                                    }
                                />
                                <div className="rounded-md h-full w-full flex bg-white justify-center items-center">
                                    {/* Added relative positioning */}
                                    <LazyLoadImage
                                        src={`${auction?.product?.images[0]?.image}`}
                                        alt="image"
                                        className="w-full h-full object-cover bg-white" // Adjusted to absolute positioning and added object-cover
                                        effect="blur"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <div className="h-12 mb-2">
                                    <button 
                                        className="font-semibold hover:underline text-gray-600 cursor-buttonointer text-start"
                                        onClick={() => handelEditClick(auction)}
                                    >
                                        {truncateText(
                                            auction?.product?.title,
                                            MAX_TITLE_LENGTH
                                        )}
                                    </button>
                                </div>
                                <div className="font-semibold text-green-600">
                                    Current Bid: {auction?.current_price}
                                </div>

                                <div className="font-semibold text-sky-600">
                                    Starting Price: RS.{" "}
                                    {auction?.starting_price}
                                </div>
                            </div>
                            <div className="col-span-2 border-l border-l-gray-400">
                                <div className="w-full flex">
                                    {auction?.auction_status === "A" && (
                                        <span className="rounded-full bg-green-700 font-semibold text-white px-3 text-xs pb-[1px] ml-auto">
                                            Active
                                        </span>
                                    )}

                                    {auction?.auction_status === "S" && (
                                        <span className="rounded-full bg-gray-700 font-semibold text-white px-3 text-xs pb-[1px] ml-auto">
                                            Upcoming
                                        </span>
                                    )}

                                    {auction?.auction_status === "C" && (
                                        <span className="rounded-full bg-red-700 font-semibold text-white px-3 text-xs pb-[1px] ml-auto">
                                            Ended
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col justify-end ps-4 mt-3">
                                    <div className="h-6 text-gray-600 font-semibold">
                                        Starting Date:{" "}
                                        {
                                            <FormattedDate
                                                date={auction.starting_time}
                                            />
                                        }
                                    </div>
                                    <div className="h-6 text-gray-600 font-semibold">
                                        Ending Date:{" "}
                                        <FormattedDate
                                            date={auction.ending_time}
                                        />
                                    </div>

                                    <div className="text-green-500 font-semibold">
                                        Total Bids: {auction.bids_count}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col items-center justify-center gap-2 border-l border-l-gray-400">
                                <Link
                                    className="px-2 font-semibold py-1 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center transition ease-in-out duration-300"
                                    to={`/auction/${auction?.product?.slug}`}
                                >
                                    view
                                    <span className="ml-2">
                                        <FaEye className="inline-block" />
                                    </span>
                                </Link>

                                <button
                                    className="px-2 font-semibold py-1 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center transition ease-in-out duration-300"
                                    onClick={() =>
                                        handleAuctionDelete(auction.id)
                                    }
                                >
                                    Delete
                                    <span className="ml-2">
                                        <MdDeleteForever className="inline-block" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmationModal
                show={showModal}
                onCancel={cancleAuctionDelete}
                onConfirm={handleDeleteAuction}
                message={"Are you sure you want to delete selected auction(s)?"}
            />
            {
                
            }
            <AuctionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={initialData}
            />
        </>
    )
}

export default Auctions
