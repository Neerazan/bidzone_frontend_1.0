import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setWishlist } from "../../store/common/wishlistSlice";

const wishlistData = async (wishlistId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/auction/wishlists/${wishlistId}/items/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist data:", error);
        throw error;
    }
};

function Wishlist() {
    const wishlistId = localStorage.getItem("bidzone_wishlist_id");
    const dispatch = useDispatch();

    const { data, isLoading, isError } = useQuery(["wishlist", wishlistId], () => wishlistId ? wishlistData(wishlistId) : undefined);

    useEffect(() => {
        if (data) {
            console.log("Wishlist data:", data);
            dispatch(setWishlist(data.results));
        }
    }, [data, dispatch]);

    if (!wishlistId) return <div>No wishlist ID found. Please set a wishlist ID.</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching wishlist data. Please try again later.</div>;

    return (
        <li className="ml-4 lg:ml-5 relative inline-block">
            <Link className="" to="/user/wishlist">
                <div className="absolute -top-3 -right-3 z-10 text-white bg-red-600 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {data?.count ? (data.count < 10 ? `0${data.count}` : data.count) : "00"}
                </div>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-6 text-gray-300 svg-inline--fa fa-heart hover:text-red-500"
                >
                    <path
                        fill="currentColor"
                        d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                    ></path>
                </svg>
            </Link>
        </li>
    );
}

export default Wishlist;
