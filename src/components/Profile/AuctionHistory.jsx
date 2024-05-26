import React from "react"
import { Link } from "react-router-dom"

function AuctionHistory() {
    return (
        <div className="bg-gray-50 rounded-md mt-2 p-6 h-[90vh]">
            <div className="bg-white rounded-md shadow-md">
                <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                    <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                            <dt className="font-medium text-gray-900">
                                Tracking Number
                            </dt>
                            <dd className="mt-1 text-gray-500">WU88191111</dd>
                        </div>
                        <div className="hidden sm:block">
                            <dt className="font-medium text-gray-900">
                                Auction Won on
                            </dt>
                            <dd className="mt-1 text-gray-500">
                                <time datetime="2021-07-06">Jul 6, 2024</time>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-900">
                                Auction Amount
                            </dt>
                            <dd className="mt-1 font-medium text-gray-900">
                                $160.00
                            </dd>
                        </div>
                    </dl>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        <Link
                            href="#"
                            className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>View Order</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>View Invoice</span>
                        </Link>
                    </div>
                </div>

                {/* <!-- Products --> */}
                <h4 className="sr-only">Items</h4>
                <ul role="list" className="divide-y divide-gray-200">
                    <li className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg"
                                    alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="flex-1 ml-6 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                    <h5>Micro Backpack</h5>
                                    <p className="mt-2 sm:mt-0 bg-gray-500 px-4 py-0.5 rounded-full text-white">Completed</p>
                                </div>
                                <p className="hidden text-gray-500 sm:block sm:mt-2">
                                    Are you a minimalist looking for a compact
                                    carry option? The Micro Backpack is the
                                    perfect size for your essential everyday
                                    carry items. Wear it like a backpack or
                                    carry it like a satchel for all-day use.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                                {/* <!-- Heroicon name: solid/check-circle --> */}
                                <svg
                                    className="w-5 h-5 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                    Delivered on{" "}
                                    <time datetime="2021-07-12">
                                        July 12, 2021
                                    </time>
                                </p>
                            </div>

                            <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                <div className="flex-1 flex justify-center">
                                    <Link
                                        href="#"
                                        className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                    >
                                        View Details
                                    </Link>
                                </div>
                                <div className="flex-1 pl-4 flex justify-center">
                                    <Link
                                        href="#"
                                        className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                    >
                                        
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* <!-- More orders... --> */}
        </div>
    )
}

export default AuctionHistory
