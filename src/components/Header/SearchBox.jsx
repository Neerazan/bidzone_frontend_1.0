import React from "react"
import { useQuery } from "react-query"


function SearchBox() {
    return (
        <>
            <div className="flex bg-gray-200 items-center ml-3 md:ml-5 lg:ml-10 w-full rounded-s-md px-1 py-2">
                <input
                    className="flex-grow border-gray-300 bg-transparent text-sm pl-2 outline-none sm:pl-4 sm:pr-2 overflow-hidden"
                    type="text"
                    placeholder="Search Anything Here..."
                />
            </div>

            <div className="px-2 py-2 bg-green-600 rounded-r-md sm:mr-4 md:mr-8">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 rounded-r-md text-white svg-inline--fa fa-search fa-w-16"
                >
                    <path
                        fill="currentColor"
                        d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                    ></path>
                </svg>
            </div>
        </>
    )
}

export default SearchBox
