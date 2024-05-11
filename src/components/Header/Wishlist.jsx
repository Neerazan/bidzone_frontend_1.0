import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBagHeart } from "react-icons/bs";
import { IconContext } from "react-icons";
import { fetchWishlistData } from "../../store/common/wishlistSlice";

function Wishlist() {
    const dispatch = useDispatch();
    const wishlistId = localStorage.getItem("bidzone_wishlist_id") || null;
    const wishlists = useSelector((state) => state.wishlist.wishlists);
    const wishlistCount = wishlists?.length || 0;

    useEffect(() => {
        if (wishlistId) {
            dispatch(fetchWishlistData(wishlistId));
        }
    }, [wishlistId, dispatch]);

    return (
        <li className="relative inline-block">
            <Link to="/user/wishlist">
                <div className="absolute -top-3 -right-3 z-10 text-white bg-red-600 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {
                        wishlistCount ? (wishlistCount > 9 ? wishlistCount : `0${wishlistCount}`) : '00'
                    }
                </div>
                <IconContext.Provider value={{ size: "1.5em", className: "hover:text-pink-700 text-gray-200" }}>
                    <BsBagHeart />
                </IconContext.Provider>
            </Link>
        </li>
    );
}

export default Wishlist;
