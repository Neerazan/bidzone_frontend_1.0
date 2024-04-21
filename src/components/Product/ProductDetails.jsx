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
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md">
            {/* Image Section */}
            <div className="lg:col-span-1 relative">
                {/* Main Image */}
                <div className="mx-3 mt-3 flex overflow-hidden rounded-xl h-96">
                    <img
                        alt="ecommerce"
                        className="object-cover mx-auto"
                        src={selectedImage}
                    />
                </div>

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
            <div className="lg:col-span-1 p-6">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {data?.product?.title}
                </h1>

                {/* Reviews */}
                <div className="flex mb-4">
                    <span className="flex items-center">
                        {[...Array(4)].map((_, index) => (
                            <svg
                                key={index}
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 text-red-500"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        ))}
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                    </span>
                </div>

                <p className="leading-relaxed">
                    {data?.product?.description}
                </p>

                {/* Price and Buttons */}
                <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                        {data?.current_price}
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
            </div>
            {/* Empty Section (for future use) */}
            <div className="lg:col-span-1">
                <p>Bidding History TODO</p>
            </div>
        </section>
    );
}

export default ProductDetails;
