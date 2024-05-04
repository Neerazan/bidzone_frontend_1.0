import React from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { useSelector } from "react-redux"

function Wishlist() {
    const data = useSelector((state) => state.wishlist.wishlists)

    const MAX_DESCRIPTION_LENGTH = 70;
    const MAX_TITLE_LENGTH = 60;

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + "...";
        }
    }

    return (
        <div className="mt-4 flex flex-col gap-4 overflow-y-scroll h-[90vh] p-4 bg-white rounded-md">
            {data?.map((item) => (
                <div className="flex w-full bg-slate-50 px-4 py-4 shadow-lg rounded-md" key={item.id}>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-1 overflow-x-hidden">
                            <div className="p-x2 rounded-md overflow-hidden h-32">
                                <LazyLoadImage
                                    src={`http://127.0.0.1:8000${item.auction.product.images[0].image}`}
                                    alt="image"
                                    className="object-cover w-ful h-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="h-12">
                                <Link
                                    to=""
                                    className="font-bold hover:underline text-gray-600"
                                >
                                    {truncateText(item.auction.product.title, MAX_TITLE_LENGTH)}
                                </Link>
                            </div>
                            <div className="h-12">
                                <p className="text-gray-500 overflow-hidden">
                                    {truncateText(item.auction.product.description, MAX_DESCRIPTION_LENGTH)}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-rose-600">
                                    Current Bid: {item.auction.current_price}
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
            ))}
        </div>
    )
}

export default Wishlist
