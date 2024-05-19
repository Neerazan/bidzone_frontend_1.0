import React from "react";
import { Link } from "react-router-dom";
import { FormattedDate } from "../index"
import parse from 'html-react-parser';


function ProductCard({
    id,
    title,
    slug,
    description,
    image,
    currentPrice,
    bidsCount,
    startingTime,
    auctionStatus,
}) {
    const MAX_DESCRIPTION_LENGTH = 60;
    const MAX_TITLE_LENGTH = 40;

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return parse(text);
        } else {
            return parse(text.slice(0, maxLength) + "...");
        }
    }

    return (
        <div className={`relative md:my-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ${auctionStatus === 'A' ? '' : 'bg-white'}`}>
            <Link
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                to={`/auction/${slug}`}
            >
                <img
                    className="w-full h-full object-cover object-center shadow"
                    src={`http://127.0.0.1:8000/${image}/`}
                    alt="product image"
                />

                <span className={`absolute top-0 left-0 m-2 rounded-full pb-[1.5px] px-2 text-center text-sm font-medium text-white ${auctionStatus === 'A' ? 'bg-green-700' : 'bg-gray-600'}`}>
                    {auctionStatus === 'A' ? 'Active' : 'Upcoming'}
                </span>
            </Link>
            <div className="mt-4 px-5 pb-5">    
                <Link to={`/auction/${slug}`}>
                    <h5 className="text-xl tracking-tight text-slate-900 font-bold h-16 overflow-hidden">
                    {truncateText(title, MAX_TITLE_LENGTH)}
                    </h5>
                </Link>

                <Link to={`/auction/${slug}`}>
                    <h5 className="text-[1em] tracking-tight text-slate-900 mt-2 h-12 overflow-hidden">
                        {truncateText(description, MAX_DESCRIPTION_LENGTH)}
                    </h5>
                </Link>
                
                {auctionStatus === 'A' && (
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
                )}

                {auctionStatus === 'S' && (
                    <div>
                        <h5 className="text-[1em] ms-2 tracking-tight text-red-600 mt-2 font-semibold">
                            Live on: <FormattedDate date={startingTime} />
                        </h5>
                        <div className="mt-2 flex items-center justify-between">
                            <Link
                                to={`/auction/${slug}`}
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
        </div>
    );
}

export default ProductCard;
