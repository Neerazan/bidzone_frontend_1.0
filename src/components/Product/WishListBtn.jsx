import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function WishListBtn({ auctionId }) {
    const [inWishlist, setInWishlist] = useState(false)
    const wishlist_id = localStorage.getItem("bidzone_wishlist_id")
    // console.log(`Wishlist ID: ${wishlist_id}`);
    // console.log(`Auction ID: ${auctionId}`);

    useEffect(() => {
        if (wishlist_id) {
            checkWishlistItem(wishlist_id, auctionId)
        }
    }, [wishlist_id, auctionId])

    const checkWishlistItem = async (wishlistId, itemId) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`
            )
            const responseData = response.data.results
            const itemExists = responseData.some((item) => item.auction.id === itemId)
            setInWishlist(itemExists)
            
        } catch (error) {
            console.error("Error fetching wishlist items:", error)
        }
    }

    const toggleWishlistItem = async () => {
        if (!wishlist_id) {
            await createWishlistAndAddItem()
        } else {
            const itemExists = inWishlist
            if (itemExists) {
                await removeFromWishlist(auctionId)
            } else {
                await addToWishlist(auctionId)
            }
        }
    }

    const createWishlistAndAddItem = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/auction/wishlists/`
            )
            const newWishlistId = response.data.id
            localStorage.setItem("bidzone_wishlist_id", newWishlistId)
            await addToWishlist(auctionId, newWishlistId)
        } catch (error) {
            console.error("Error creating wishlist:", error)
        }
    }

    const addToWishlist = async (itemId, wishlistId = wishlist_id) => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`,
                { auction_id: itemId }
            )
            setInWishlist(true)
        } catch (error) {
            console.error("Error adding to wishlist:", error)
        }
    }

    const removeFromWishlist = async (itemId) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/auction/wishlists/${wishlist_id}/items/${itemId}/`
            )
            setInWishlist(false)
        } catch (error) {
            console.error("Error removing from wishlist:", error)
        }
    }

    return (
        <div className="flex mt-4">
            <Link className="mr-auto text-sky-600 font-semibold text-sm italic hover:underline">
                11 Questions Answered{" "}
            </Link>
            <div className="flex justify-end">
                <button
                    className={`rounded-full w-7 h-7 p-0 border-0 inline-flex items-center justify-center ${
                        inWishlist ? "text-rose-500" : "text-gray-500"
                    } ml-4`}
                    onClick={toggleWishlistItem}
                >
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
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-6 h-6 text-gray-700 ml-4 cursor-pointer hover:filter hover:brightness-125"
                    viewBox="0 0 379.768 379.768"
                    xmlSpace="preserve"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
    )
}

export default WishListBtn

{
    /* <div className="flex justify-end">
                <button 
                    className={`rounded-full w-7 h-7 p-0 border-0 inline-flex items-center justify-center ${inWishlist ? "text-rose-500" : "text-gray-500" }  ml-4`}
                    onClick={() => setInWishlist(!inWishlist)}
                >
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
                {/* Svg Share icon */
}
// <svg
//     fill="currentColor"
//     version="1.1"
//     id="Capa_1"
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     className="w-6 h-6 text-gray-700 ml-4 cursor-pointer hover:filter hover:brightness-125"
//     viewBox="0 0 379.768 379.768"
//     xmlSpace="preserve"
// >
//     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//     <g
//         id="SVGRepo_tracerCarrier"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//     ></g>
//     <g id="SVGRepo_iconCarrier">
//         {" "}
//         <g>
//             {" "}
//             <path d="M297.331,247.235c-18.52,0-35.284,7.662-47.318,19.972l-104.012-60.72c1.705-5.867,2.669-12.04,2.669-18.453 c0-6.112-0.897-12.009-2.447-17.63l103.225-58.48c12.07,12.667,29.058,20.6,47.895,20.6c36.533,0,66.263-29.718,66.263-66.27 C363.605,29.718,333.876,0,297.343,0S231.08,29.718,231.08,66.254c0,6.113,0.895,12.01,2.456,17.643l-103.226,58.486 c-12.07-12.67-29.061-20.603-47.895-20.603c-36.536,0-66.254,29.718-66.254,66.266c0,36.534,29.718,66.256,66.254,66.256 c18.534,0,35.284-7.662,47.33-19.972l104,60.721c-1.699,5.873-2.672,12.058-2.672,18.459c0,36.545,29.729,66.257,66.257,66.257 c36.539,0,66.269-29.712,66.269-66.257C363.6,276.959,333.87,247.235,297.331,247.235z"></path>{" "}
//         </g>{" "}
//     </g>
// </svg>
// </div> */}
