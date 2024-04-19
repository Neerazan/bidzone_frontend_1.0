import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
    id,
    title,
    description,
    image,
    currentPrice,
    bidsCount,
    endingTime,
    auctionStatus,
}) {
    const MAX_DESCRIPTION_LENGTH = 60;
    const MAX_TITLE_LENGTH = 40;

    function truncateDescription(description) {
        if (description.length <= MAX_DESCRIPTION_LENGTH) {
            return description;
        } else {
            return description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
        }
    }

    function truncateTitle(title) {
        if (title.length <= MAX_TITLE_LENGTH) {
            return title;
        } else {
            return title.slice(0, MAX_TITLE_LENGTH) + "...";
        }
    }

    return (
        <>
            {auctionStatus === "A" && <div className="relative md:my-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <Link
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    to="#"
                >
                    <img
                        className="w-full h-full object-cover object-center shadow"
                        src={image}
                        alt="product image"
                    />
    
                    <span className="absolute top-0 left-0 m-2 rounded-full pb-[1.5px] bg-green-700 px-2 text-center text-sm font-medium text-white">
                        Active
                    </span>
                </Link>
                <div className="mt-4 px-5 pb-5">
                    <Link to="#">
                        <h5 className="text-xl tracking-tight text-slate-900 font-bold h-16 overflow-hidden">
                            {truncateTitle(title)}
                        </h5>
                    </Link>
    
                    <Link to="#">
                        <h5 className="text-[1em] tracking-tight text-slate-900 mt-2 h-12 overflow-hidden">
                            {truncateDescription(description)}
                        </h5>
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                        <p>
                            <span className="text-2xl font-bold text-red-500">
                                Rs. {currentPrice}
                            </span>
                        </p>
                        <div className="flex items-center">
                            <span className="mr-2 ml-3 rounded bg-teal-600 text-white px-2.5 pb-0.5 text-xs font-semibold">
                                {bidsCount} Bid(s)
                            </span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

{/* <div className="relative md:my-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <Link
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    to="#"
                >
                    <img
                        className="w-full h-full object-cover object-center shadow"
                        src={image}
                        alt="product image"
                    />
    
                    {auctionStatus === "A" && (
                        <span className="absolute top-0 left-0 m-2 rounded-full pb-[1.5px] bg-green-700 px-2 text-center text-sm font-medium text-white">
                            Active
                        </span>
                    )}
    
                    {auctionStatus === "S" && (
                        <span className="absolute top-0 left-0 m-2 rounded-full pb-[1.5px] bg-gray-600 px-2 text-center text-sm font-medium text-white">
                            Upcoming
                        </span>
                    )}
                </Link>
                <div className="mt-4 px-5 pb-5">
                    <Link to="#">
                        <h5 className="text-xl tracking-tight text-slate-900 font-bold">
                            {truncateTitle(title)}
                        </h5>
                    </Link>
    
                    <Link to="#">
                        <h5 className="text-[1em] tracking-tight text-slate-900 mt-2">
                            {truncateDescription(description)}
                        </h5>
                    </Link>
                    {auctionStatus === "A" && (
                        <div className="mt-2 flex items-center justify-between">
                            <p>
                                <span className="text-2xl font-bold text-red-500">
                                    Rs. {currentPrice}
                                </span>
                            </p>
                            <div className="flex items-center">
                                <span className="mr-2 ml-3 rounded bg-teal-600 text-white px-2.5 py-0.5 text-xs font-semibold pb-[3px]">
                                    {bidsCount} Bid(s)
                                </span>
                            </div>
                        </div>
                    )}
    
                    {auctionStatus === "S" && (
                        <div>
                            <Link to="#">
                                <h5 className="text-[1em] ms-2 tracking-tight text-red-600 mt-2 font-semibold">
                                    Live on: {endingTime}
                                </h5>
                            </Link>
    
                            <div className="mt-2 flex items-center justify-between">
                                <Link
                                    to="#"
                                    className="text-[12px] py-2 px-3 rounded-full bg-zinc-700 text-white font-bold hover:bg-zinc-600"
                                >
                                    Notify me
                                </Link>
    
                                <div className="flex items-center">
                                    <span className="mr-2 ml-3 rounded bg-teal-600 text-white px-2.5 py-0.5 text-xs font-semibold pb-[3px]">
                                        2 Waiting
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div> */}

export default ProductCard;
