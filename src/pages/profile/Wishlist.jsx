import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

function Wishlist() {
    const wishlistId = localStorage.getItem("bidzone_wishlist_id")

    const wishlistData = async () => {
        reponse = await axios.get(
            `http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`
        )
        return response.data
    }

    return (
        <div className="mt-4 flex flex-col gap-4 h-[90vh] overflow-y-scroll">
            <div className="flex w-full bg-white px-4 py-4 shadow-lg rounded-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1 overflow-x-hidden">
                        <div className="p-x2 rounded-md overflow-hidden h-32">
                            <LazyLoadImage
                                src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg"
                                alt="image"
                                className="object-cover w-ful h-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="h-12">
                            <Link
                                to="/product/1"
                                className="font-bold hover:underline text-gray-600"
                            >
                                Sony WH-1000XM5 Wireless Industry Leading
                                Headphones{" "}
                            </Link>
                        </div>
                        <div className="h-12">
                            <p className="text-gray-500">
                                From airplane noise to people’s voices, our
                                WH-1000XM5 wireless headphones
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-rose-600">
                                Current Bid: 81,000
                            </h4>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center h-full justify-center gap-4">
                            <Link className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center">
                                Remove
                            </Link>
                            <Link className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center">
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full bg-white px-4 py-4 shadow-lg rounded-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1 overflow-x-hidden">
                        <div className="p-x2 rounded-md overflow-hidden h-32">
                            <LazyLoadImage
                                src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg"
                                alt="image"
                                className="object-cover w-ful h-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="h-12">
                            <Link
                                to="/product/1"
                                className="font-bold hover:underline text-gray-600"
                            >
                                Sony WH-1000XM5 Wireless Industry Leading
                                Headphones{" "}
                            </Link>
                        </div>
                        <div className="h-12">
                            <p className="text-gray-500">
                                From airplane noise to people’s voices, our
                                WH-1000XM5 wireless headphones
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-rose-600">
                                Current Bid: 81,000
                            </h4>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center h-full justify-center gap-4">
                            <Link className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center">
                                Remove
                            </Link>
                            <Link className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center">
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full bg-white px-4 py-4 shadow-lg rounded-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1 overflow-x-hidden">
                        <div className="p-x2 rounded-md overflow-hidden h-32">
                            <LazyLoadImage
                                src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg"
                                alt="image"
                                className="object-cover w-ful h-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="h-12">
                            <Link
                                to="/product/1"
                                className="font-bold hover:underline text-gray-600"
                            >
                                Sony WH-1000XM5 Wireless Industry Leading
                                Headphones{" "}
                            </Link>
                        </div>
                        <div className="h-12">
                            <p className="text-gray-500">
                                From airplane noise to people’s voices, our
                                WH-1000XM5 wireless headphones
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-rose-600">
                                Current Bid: 81,000
                            </h4>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center h-full justify-center gap-4">
                            <Link className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center">
                                Remove
                            </Link>
                            <Link className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center">
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full bg-white px-4 py-4 shadow-lg rounded-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1 overflow-x-hidden">
                        <div className="p-x2 rounded-md overflow-hidden h-32">
                            <LazyLoadImage
                                src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg"
                                alt="image"
                                className="object-cover w-ful h-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="h-12">
                            <Link
                                to="/product/1"
                                className="font-bold hover:underline text-gray-600"
                            >
                                Sony WH-1000XM5 Wireless Industry Leading
                                Headphones{" "}
                            </Link>
                        </div>
                        <div className="h-12">
                            <p className="text-gray-500">
                                From airplane noise to people’s voices, our
                                WH-1000XM5 wireless headphones
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-rose-600">
                                Current Bid: 81,000
                            </h4>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center h-full justify-center gap-4">
                            <Link className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center">
                                Remove
                            </Link>
                            <Link className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center">
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full bg-white px-4 py-4 shadow-lg rounded-md">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-1 overflow-x-hidden">
                        <div className="p-x2 rounded-md overflow-hidden h-32">
                            <LazyLoadImage
                                src="https://www.itaf.eu/wp-content/uploads/2021/01/xBest-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg.pagespeed.ic.9ZN_pp1y3L.jpg"
                                alt="image"
                                className="object-cover w-ful h-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="h-12">
                            <Link
                                to="/product/1"
                                className="font-bold hover:underline text-gray-600"
                            >
                                Sony WH-1000XM5 Wireless Industry Leading
                                Headphones{" "}
                            </Link>
                        </div>
                        <div className="h-12">
                            <p className="text-gray-500">
                                From airplane noise to people’s voices, our
                                WH-1000XM5 wireless headphones
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-rose-600">
                                Current Bid: 81,000
                            </h4>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col items-center h-full justify-center gap-4">
                            <Link className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center">
                                Remove
                            </Link>
                            <Link className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center">
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishlist
