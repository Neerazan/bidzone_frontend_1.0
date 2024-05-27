import React, { useCallback, useId, useMemo } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "react-query"
import { removeFromWishlist as removeItemFromStore } from "../../store/common/wishlistSlice"
import axios from "axios"
import parse from 'html-react-parser';

const Wishlist = () => {
    const data = useSelector((state) => state.wishlist.wishlists)
    const wishlist_id = localStorage.getItem("bidzone_wishlist_id")
    const id = useId()
    const dispatch = useDispatch()

    const MAX_DESCRIPTION_LENGTH = 70
    const MAX_TITLE_LENGTH = 60

    const truncateText = useCallback((text = "", maxLength) => {
        return text.length <= maxLength
            ? parse(text)
            : parse(`${text.slice(0, maxLength)}...`)
    }, [])

    const removeFromWishlistMutation = useMutation(async ({ wishlistId }) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/auction/wishlists/${wishlist_id}/items/${wishlistId}/`
            )
            return response.data
        } catch (error) {
            console.log("Error removing item from wishlist:", error)
            throw error
        }
    })

    const removeFromWishlist = useCallback(
        async (wishlistId) => {
            console.log("Removing item from wishlist,", wishlistId)
            try {
                await removeFromWishlistMutation.mutateAsync(
                    { wishlistId },
                    {
                        onSuccess: () => {
                            dispatch(removeItemFromStore(wishlistId))
                            console.log("Item removed from wishlist")
                        },
                    }
                )
            } catch (error) {
                console.log("Error removing item from wishlist:", error)
            }
        },
        [dispatch, removeFromWishlistMutation]
    )

    const wishlistItems = useMemo(
        () =>
            data?.map((item) => (
                <div
                    className="flex w-full bg-slate-50 px-4 py-4 shadow-lg rounded-md"
                    key={item.id}
                >
                    <div className="grid grid-cols-6 gap-4" key={item.id}>
                        <div className="col-span-1 overflow-x-hidden">
                            <div className="p-x2 rounded-md overflow-hidden h-32">
                                <LazyLoadImage
                                    src={`http://127.0.0.1:8000${item.auction?.product.images[0].image}`}
                                    alt="image"
                                    className="object-cover w-full h-full"
                                    effect="blur"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="h-12">
                                <Link
                                    to={`/auction/${item?.auction?.product?.slug}`}
                                    className="font-bold hover:underline text-gray-600"
                                >
                                    {truncateText(
                                        item.auction?.product.title,
                                        MAX_TITLE_LENGTH
                                    )}
                                </Link>
                            </div>
                            <div className="h-12">
                                <p className="text-gray-500 overflow-hidden">
                                    {truncateText(
                                        item.auction?.product.description,
                                        MAX_DESCRIPTION_LENGTH
                                    )}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-rose-600">
                                    Rs. {item.auction?.current_price}
                                </h4>
                            </div>
                        </div>
                        <div className="col-span-2 flex h-full justify-normal items-center">
                            <h1 className="mx-auto">Empty</h1>
                        </div>
                        <div className="col-span-1 flex flex-col items-center h-full justify-center gap-4">
                            <button
                                className="px-3 py-2 rounded-md border border-red-500 hover:bg-red-500 text-red-600 hover:text-white w-28 text-center transition ease-in-out duration-300"
                                onClick={() => removeFromWishlist(item.id)}
                            >
                                Remove
                            </button>
                            <Link
                                className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-600 text-green-600 hover:text-white w-28 text-center transition ease-in-out duration-300"
                                to={`/auction/${item?.auction?.product?.slug}`}
                            >
                                Place Bid
                            </Link>
                        </div>
                    </div>
                </div>
            )),
        [data, removeFromWishlist, truncateText]
    )

    return (
        <>
            <div className="bg-white h-auto w-auto flex items-center rounded-md mt-4 px-8">
                <div>
                    <h4 className="text-xl text-gray-600 font-bold">
                        Wishlists
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
                                viewBox="0 0 56.966 56.966"
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
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <title>Filter</title>
                        <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g
                                stroke="#5f5f5f"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <line x1="4" y1="5" x2="16" y2="5"></line>
                                <line x1="4" y1="12" x2="10" y2="12"></line>
                                <line x1="14" y1="12" x2="20" y2="12"></line>
                                <line x1="8" y1="19" x2="20" y2="19"></line>
                                <circle cx="18" cy="5" r="2"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                                <circle cx="6" cy="19" r="2"></circle>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="flex px-4 py-1 bg-gray-500 rounded-md hover:bg-gray-600 cursor-pointer text-white ml-3">
                    <span>Add New Products</span>
                </div>
            </div>

            <div className="mt-2 flex flex-col gap-4 overflow-y-scroll h-[90vh] p-4 bg-white rounded-md">
                {wishlistItems}
            </div>
        </>
    )
}

export default Wishlist
