import React from "react"
import {
    FormattedDate,
    CountdownComponent,
    SellerRating,
    BidInfo,
} from "../index"
import { Link } from "react-router-dom"

function ProductInfo({ data, bidsData }) {
    const MAX_DESCRIPTION_LENGTH = 200

    function truncateText(text) {
        if (text.length <= MAX_DESCRIPTION_LENGTH) {
            return <p className="mb-4">{text}</p>
        } else {
            return (
                <p className="mb-4">
                    {text.slice(0, MAX_DESCRIPTION_LENGTH) + " ..."}{" "}
                    <Link className="underline font-semibold">see more</Link>
                </p>
            )
        }
    }

    return (
        <div className="lg:col-span-1 p-4">
            <div className="w-full flex">
                {data?.auction_status === "A" && (
                    <span className="rounded-full bg-green-700 font-semibold text-white px-4 pb-[1px] ml-auto">
                        Active
                    </span>
                )}

                {data?.auction_status === "S" && (
                    <span className="rounded-full bg-gray-700 font-semibold text-white px-4 pb-[1px] ml-auto">
                        Upcoming
                    </span>
                )}

                {data?.auction_status === "C" && (
                    <span className="rounded-full bg-red-700 font-semibold text-white px-4 pb-[1px] ml-auto">
                        Ended
                    </span>
                )}
            </div>

            <h1 className="text-gray-800 text-2xl title-font font-semibold mb-3 mt-1">
                {data?.product?.title}
            </h1>

            {truncateText(data?.product?.description)}

            <hr className="mb-3" />
            {/* Seller Information */}
            <div className="mb-4">
                <span className="text-rose-500 text-[14px] italic font-semibold">
                    Posted by,{" "}
                    <span className=" hover:underline cursor-pointer font-bold">
                        {data?.product?.customer?.first_name}{" "}
                        {data?.product?.customer?.last_name}
                    </span>{" "}
                    (<FormattedDate date={data?.starting_time} />)
                </span>
            </div>
            <SellerRating />

            <hr />

            {/* Remaining Time */}
            {data?.auction_status === "A" && (
                <div>
                    <div className="flex mt-4 h-20">
                        <CountdownComponent apiDate={data?.ending_time} />
                    </div>
                    <hr className="my-4" />
                </div>
            )}

            <BidInfo data={data} bidsData={bidsData}/>
        </div>
    )
}

export default ProductInfo
