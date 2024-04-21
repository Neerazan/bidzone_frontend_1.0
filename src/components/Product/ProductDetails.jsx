import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

function ProductDetails({ slug }) {
    const [selectedImage, setSelectedImage] = useState(
        `http://127.0.0.1:8000/default-image.jpg` // Default image or loading state
    );

    const getAuctionDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${slug}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const { data, isError, isLoading, error } = useQuery("auctionDetails", getAuctionDetails);

    useEffect(() => {
        if (data?.product?.images?.[0]?.image) {
            setSelectedImage(`http://127.0.0.1:8000${data.product.images[0].image}`);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading product details: {error.message}</div>;
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
                <hr />
                {/* Small Images Section */}
                <div className="w-full flex justify-center bg-white p-2">
                    {data?.product?.images?.map((image) => (
                        <img
                            key={image.id}
                            alt={`image`}
                            className="w-16 h-16 object-cover object-center rounded border border-gray-400 cursor-pointer mx-1"
                            src={`http://127.0.0.1:8000${image.image}`}
                            onMouseEnter={() => setSelectedImage(`http://127.0.0.1:8000${image.image}`)}
                        />
                    ))}
                </div>
            </div>


            {/* Product Details Section */}
            <div className="lg:col-span-1 p-4">
                <h1 className="text-gray-800 text-2xl title-font font-semibold mb-3">
                    {data?.product?.title}
                </h1>
                <hr className="mb-3"/>
                {/* Seller Information */}
                <div className="mb-4">
                    <span className="text-blue-900 text-[14px] italic font-semibold">Created by, <span className=" hover:underline cursor-pointer font-bold">Neerajan Dhakal,</span> (21 Oct, 2024, 09:45 a.m.)</span>
                </div>

                {/* Reviews */}
                <div className="flex mb-4">
                    <span className="font-semibold italic text-[14px] text-rose-600">Seller Rating:</span>
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
                    <span className="text-zinc-600 text-sm font-semibold ml-1 ">(4 Reviews)</span>
                </div>

                <hr className="mb-4"/>

                {/* Remaining Time */}

                <div className="mb-4 flex">
                    <span className="font-semibold italic px-4 py-2 rounded-s-md border border-red-600">Ends In </span>
                    <span className="block px-4 rounded-e-md font-semibold py-2 bg-purple-600 text-white">23 : 45 : 00</span>
                </div>

                {/* Price and Buttons */}
                <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                        
                    </span>
                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                        Bid
                    </button>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <hr className="my-4"/>
                <div>
                    <p className="text-3xl font-semibold text-center block mb-3">Current Bid: Rs. {data?.current_price}</p>
                    <div className="flex items-center justify-center">
                        <span className="text-[16px] font-bold mr-2">{data.bids_count} bids(s) so far</span>
                        {/* <span className="text-white text-sm bg-green-700 rounded-full px-3">Your bid is the heighest</span> */}
                        <span className="text-white text-sm bg-sky-600 rounded-full px-3">Your bid is 5660</span>
                    </div>
                </div>

            </div>
            {/* Empty Section (for future use) */}
            <div className="lg:col-span-1">
                <p>Bidding History TODO</p>
            </div>
        </section>
    );
}

export default ProductDetails;
