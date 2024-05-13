import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useMutation } from "react-query"
import { useSelector, useDispatch } from "react-redux"
import { GoHeartFill } from "react-icons/go";
import { RiShareFill } from "react-icons/ri";
import { IconContext } from "react-icons"


import {
    addToWishlist,
    removeFromWishlist,
} from "../../store/common/wishlistSlice"

function WishListBtn({ data, auctionId }) {
    const [inWishlist, setInWishlist] = useState(false)
    const [itemId, setItemId] = useState(null)
    const wishlist_id = localStorage.getItem("bidzone_wishlist_id")
    const dispatch = useDispatch()
    const wishlists = useSelector((state) => state.wishlist.wishlists)

    useEffect(() => {
        if (wishlists) {
            checkWishlistItem(auctionId)
        }
    }, [auctionId, wishlists])

    const checkWishlistItem = async (auctionId) => {
        try {
            // Safely access the auctionId by ensuring item.auction exists before accessing item.auction.id
            const itemExists = wishlists?.find(
                (item) => item.auction && item.auction.id === auctionId
            )

            if (itemExists) {
                setInWishlist(true)
                setItemId(itemExists.id)
            }
        } catch (error) {
            console.error("Error fetching wishlist items:", error)
        }
    }

    const createWishlistAndAddItemMutation = useMutation(async () => {
        const response = await axios.post(
            `http://127.0.0.1:8000/auction/wishlists/`
        )
        const newWishlistId = response.data.id
        localStorage.setItem("bidzone_wishlist_id", newWishlistId)
        await addToWishlistMutation.mutate({
            auctionId,
            wishlistId: newWishlistId,
        })
        return { newWishlistId }
    })

    const addToWishlistMutation = useMutation(
        async ({ auctionId, wishlistId }) => {
            const response = await axios.post(
                `http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`,
                { auction_id: auctionId }
            )
            setInWishlist(true)
            return response.data
        }
    )

    const removeFromWishlistMutation = useMutation(async (itemId) => {
        await axios.delete(
            `http://127.0.0.1:8000/auction/wishlists/${wishlist_id}/items/${itemId}/`
        )
        setInWishlist(false)
        return { itemId }
    })

    const toggleWishlistItem = () => {
        if (!wishlist_id) {
            createWishlistAndAddItemMutation.mutate()
        } else {
            const itemExists = inWishlist
            if (itemExists) {
                removeFromWishlistMutation.mutate(itemId)
                dispatch(removeFromWishlist(itemId))
            } else {
                addToWishlistMutation.mutate({
                    auctionId,
                    wishlistId: wishlist_id,
                }, {
                    onSuccess: (data) => {
                        console.log(`Successfully added item to wishlist: ${data}`);
                        dispatch(addToWishlist(data))
                    }
                })
            }
        }
    }

    return (
        <div className="flex mt-4">
            <Link className="mr-auto text-sky-600 font-semibold text-sm italic hover:underline">
                11 Questions Answered{" "}
            </Link>
            <div className="flex justify-end gap-3">
                <button
                    className={`rounded-full w-7 h-7 p-0 border-0 inline-flex items-center justify-center ${
                        inWishlist ? "text-rose-500" : "text-gray-500"
                    } ml-4 transition-all duration-300 ease-in-out transform hover:scale-125`}
                    onClick={toggleWishlistItem}
                >
                    <IconContext.Provider value={{ size: '2em' }}>
                        <GoHeartFill />
                    </IconContext.Provider>
                </button>
                {/* Svg Share icon */}
                <IconContext.Provider value={{ size: '1.7em', className: 'cursor-pointer text-gray-500 transition ease-in-out duration-300 transform hover:scale-125' }}>
                    <RiShareFill />
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default WishListBtn
