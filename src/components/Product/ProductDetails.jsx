import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"

function ProductDetails({slug}) {
    // State to manage the currently selected image
    const [selectedImage, setSelectedImage] = useState(
        "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
    )

    // Function to handle click on small image and set it as the main image
    const handleImageClick = (image) => {
        setSelectedImage(image)
    }

    console.log(`slug: ${slug}`);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-700 body-font overflow-hidden bg-white mt-4 rounded-md shadow-md">
            {/* Image Section */}
            <div className="lg:col-span-1 relative">
                {/* Main Image */}
                <img
                    alt="ecommerce"
                    className="w-full object-cover object-center rounded border border-gray-200"
                    src={selectedImage}
                />
                {/* Small Images Section */}
                <div className="absolute bottom-0 left-0 w-full flex justify-center bg-white p-2">
                    {[1, 2, 3].map((index) => (
                        <img
                            key={index}
                            alt={`small image ${index}`}
                            className="w-16 h-16 object-cover object-center rounded border border-gray-200 cursor-pointer mx-1"
                            src={`https://www.whitmorerarebooks.com/pictures/medium/246${index}.jpg`}
                            onClick={() => handleImageClick(`https://www.whitmorerarebooks.com/pictures/medium/246${index}.jpg`)}
                        />
                    ))}
                </div>
            </div>
            {/* Product Details Section */}
            <div className="lg:col-span-1 p-6">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    The Catcher in the Rye
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
                {/* Description */}
                <p className="leading-relaxed">
                    Fam locavore kickstarter distillery...
                </p>
                {/* Color and Size Selection */}
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    {/* Color */}
                    <div className="flex mr-6">
                        <span className="mr-3">Color</span>
                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                        {/* Add other color buttons here */}
                    </div>
                    {/* Size */}
                    <div className="flex items-center">
                        <span className="mr-3">Size</span>
                        <div className="relative">
                            <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                <option>SM</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                {/* Price and Buttons */}
                <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                        $58.00
                    </span>
                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                        Button
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
                <p>Bidding Histoy TODO</p>
            </div>
        </section>
    )
}

export default ProductDetails
