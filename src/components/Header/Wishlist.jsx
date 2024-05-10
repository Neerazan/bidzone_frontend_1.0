import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../../store/common/wishlistSlice";
import { BsBagHeart  } from "react-icons/bs";
import { IconContext } from "react-icons";
import { fetchWishlistData } from "../../store/common/wishlistSlice";

// const wishlistData = async (wishlistId) => {
//     try {
//         const response = await axios.get(`http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching wishlist data:", error);
//         throw error;
//     }
// };

function Wishlist() {
    const wishlistId = localStorage.getItem("bidzone_wishlist_id");
    const dispatch = useDispatch();

    // const { data, isLoading, isError } = useQuery(["wishlist", wishlistId], () => wishlistId ? wishlistData(wishlistId) : undefined);

    useEffect(() => {
        if (data) {
            dispatch(fetchWishlistData(wishlistId));
        }
    }, [wishlistId, dispatch]);


    if (!wishlistId) return <div>No wishlist ID found. Please set a wishlist ID.</div>;
    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error fetching wishlist data. Please try again later.</div>;

    const data = useSelector((state) => state.wishlist.wishlists);

    return (
        <li className="relative inline-block">
            <Link className="" to="/user/wishlist">
                <div className="absolute -top-3 -right-3 z-10 text-white bg-red-600 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {data?.count ? (data.count < 10 ? `0${data.count}` : data.count) : "00"}
                </div>
                <IconContext.Provider value={{ size: "1.5em", className:"hover:text-pink-700 text-gray-200" }}>
                    <BsBagHeart />
                </IconContext.Provider>
            </Link>
        </li>
    );
}

export default Wishlist;
