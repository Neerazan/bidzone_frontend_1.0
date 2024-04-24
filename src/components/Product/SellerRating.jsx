import React from "react"

function SellerRating() {
    return (
        <div className="flex mb-4">
            <span className="font-semibold italic text-[14px] text-zinc-600">
                Seller Rating:
            </span>
            <span className="flex items-center mt-[1px] ml-2">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                ))}
            </span>
            <span className="text-zinc-600 text-sm font-semibold ml-1 ">
                (4 Reviews)
            </span>
        </div>
    )
}

export default SellerRating
