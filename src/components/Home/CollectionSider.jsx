import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../../store/common/collectionSlice";
import { Link } from "react-router-dom";

const getCollection = async () => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/auction/collections"
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

function CollectionSider() {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useQuery("collections", getCollection);

    useEffect(() => {
        if (data) {
            dispatch(setCollections(data));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching collections: {isError.message}</div>;
    }

    return (
        <div className="col-span-1 bg-white mt-5 rounded-md shadow-md">
            <ul className="pt-2">
                {data?.map((collection) => (
                    <li
                        id="collection_list"
                        key={collection.id}
                        className="hover:bg-slate-200 flex cursor-pointer"
                    >
                        <Link
                            to={`/auctions/${collection.id}`}
                            className="text-zinc-500 px-4 py-1 text-sm font-semibold"
                        >
                            {collection.title}
                        </Link>
                        <svg
                            className="w-5 h-5 ml-auto mr-4 my-auto text-zinc-500 hidden font-bold"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M10 7L15 12L10 17"
                                    stroke="#53545b"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CollectionSider;
