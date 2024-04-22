import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Countdown from "react-countdown"
import { useQuery } from "react-query"

export function ProductDetails({ slug }) {
    const [selectedImage, setSelectedImage] = useState(
        `http://127.0.0.1:8000/default-image.jpg` // Default image or loading state
    )

    const getAuctionDetails = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/auctions/${slug}`
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    const { data, isError, isLoading, error } = useQuery(
        "auctionDetails",
        getAuctionDetails
    )

    useEffect(() => {
        if (data?.product?.images?.[0]?.image) {
            setSelectedImage(
                `http://127.0.0.1:8000${data.product.images[0].image}`
            )
        }
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading product details: {error.message}</div>
    }

    const custom_renderer = ({ hours, minutes, seconds, completed }) => {
        // On complete remove <Countdown /> component from the DOM
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md mr-0">
            {/* Image Section */}
            <div className="lg:col-span-1 relative">
                {/* Main Image */}
                <div className="mx-3 mt-3 flex overflow-hidden rounded-xl h-96">
                    <img
                        alt="image"
                        className="object-cover mx-auto"
                        src={selectedImage}
                    />
                </div>
                <hr className="mt-2" />
                {/* Small Images Section */}
                <div className="w-full flex justify-center bg-white p-2">
                    {data?.product?.images?.map((image) => (
                        <img
                            key={image.id}
                            alt={`image`}
                            className="w-16 h-16 object-cover object-center rounded border border-gray-400 cursor-pointer mx-1"
                            src={`http://127.0.0.1:8000${image.image}`}
                            onMouseEnter={() =>
                                setSelectedImage(
                                    `http://127.0.0.1:8000${image.image}`
                                )
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:col-span-1 p-4">
                <div className="w-full flex">
                    <span className="rounded-full bg-green-700 font-semibold text-white px-4 pb-[1px] ml-auto">
                        Active
                    </span>
                    {/* <span className="rounded-full bg-gray-700 font-semibold text-white px-4 pb-[1px] ml-auto">Upcoming</span> */}
                    {/* <span className="rounded-full bg-red-700 font-semibold text-white px-4 pb-[1px] ml-auto">Ended</span> */}
                </div>

                <h1 className="text-gray-800 text-2xl title-font font-semibold mb-3 mt-1">
                    {data?.product?.title}
                </h1>

                {/* <p>{data?.product?.description}</p> */}

                <hr className="mb-3" />
                {/* Seller Information */}
                <div className="mb-4">
                    <span className="text-rose-500 text-[14px] italic font-semibold">
                        Created by,{" "}
                        <span className=" hover:underline cursor-pointer font-bold">
                            Neerajan Dhakal,
                        </span>{" "}
                        (21 Oct, 2024, 09:45 a.m.)
                    </span>
                </div>

                {/* Reviews */}
                <div className="flex mb-4">
                    <span className="font-semibold italic text-[14px] text-zinc-600">
                        Seller Rating:
                    </span>
                    <span className="flex items-center mt-[1px] ml-2">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-yellow-400"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        ))}
                    </span>
                    <span className="text-zinc-600 text-sm font-semibold ml-1 ">
                        (4 Reviews)
                    </span>
                </div>

                <hr className="" />

                {/* Remaining Time */}

                <div className="flex mt-4">
                    <Countdown
                        date={Date.now() + 100000}
                        className="text-green-700 px-4 py-1 rounded-full font-semibold border border-gray-600"
                    />
                </div>

                {/* share and wishlist icon */}
                <div className="flex mt-3">
                    <Link className="mr-auto text-sky-600 font-semibold text-sm italic hover:underline">
                        11 Questions Answered{" "}
                    </Link>
                    <div className="flex justify-end">
                        <button className="rounded-full w-7 h-7 p-0 border-0 inline-flex items-center justify-center text-rose-500 ml-4">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-7 h-7 cursor-pointer hover:filter hover:brightness-125"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                        </button>
                        {/* Svg Share icon */}
                        <svg
                            fill="currentColor"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            className="w-6 h-6 text-gray-700 ml-4 cursor-pointer hover:filter hover:brightness-125"
                            viewBox="0 0 379.768 379.768"
                            xml:space="preserve"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                    {" "}
                                    <path d="M297.331,247.235c-18.52,0-35.284,7.662-47.318,19.972l-104.012-60.72c1.705-5.867,2.669-12.04,2.669-18.453 c0-6.112-0.897-12.009-2.447-17.63l103.225-58.48c12.07,12.667,29.058,20.6,47.895,20.6c36.533,0,66.263-29.718,66.263-66.27 C363.605,29.718,333.876,0,297.343,0S231.08,29.718,231.08,66.254c0,6.113,0.895,12.01,2.456,17.643l-103.226,58.486 c-12.07-12.67-29.061-20.603-47.895-20.603c-36.536,0-66.254,29.718-66.254,66.266c0,36.534,29.718,66.256,66.254,66.256 c18.534,0,35.284-7.662,47.33-19.972l104,60.721c-1.699,5.873-2.672,12.058-2.672,18.459c0,36.545,29.729,66.257,66.257,66.257 c36.539,0,66.269-29.712,66.269-66.257C363.6,276.959,333.87,247.235,297.331,247.235z"></path>{" "}
                                </g>{" "}
                            </g>
                        </svg>
                    </div>
                </div>

                <hr className="my-4" />
                <div>
                    <p className="text-3xl font-semibold text-center block mb-3">
                        Current Bid: Rs. {data?.current_price}
                    </p>
                    <div className="flex items-center justify-center">
                        <span className="text-[16px] font-bold mr-2">
                            {data.bids_count} bids(s) so far
                        </span>
                        {/* <span className="text-white text-sm bg-green-700 rounded-full px-3">Your bid is the heighest</span> */}
                        <span className="text-white text-sm bg-sky-600 rounded-full px-3">
                            Your bid is 5660
                        </span>
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
                        Submit Bid
                    </button>
                </div>
            </div>
            {/* Empty Section (for future use) */}
            <div className="lg:col-span-1">
                <p>Bidding History TODO</p>
            </div>
        </section>
    )
}
