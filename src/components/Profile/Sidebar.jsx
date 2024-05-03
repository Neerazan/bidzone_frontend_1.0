import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="flex flex-row mt-4">
            <div
                id="sidebar"
                className={`bg-white h-[90vh] md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden rounded-md transition-transform duration-300 ease-in-out`}
            >
                <div className="mt-4">
                    <h1 className="font-bold text-4xl text-center md:hidden">
                        D<span className="text-teal-600">.</span>
                    </h1>
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                        BidZone<span className="text-teal-600">.</span>
                    </h1>
                    <div id="profile" className="mt-5">
                        <img
                            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            alt="Avatar user"
                            className="w-10 md:w-16 rounded-full mx-auto"
                        />
                        <div>
                            <h2 className="font-semibold text-xs md:text-sm text-center text-teal-500">
                                Neerajan Dhakal
                            </h2>
                            <p className="text-xs text-gray-500 text-center">
                                Administrator
                            </p>
                        </div>
                    </div>
                    <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500 mt-4">
                        <input
                            type="text"
                            className="w-full rounded-tl-md rounded-bl-md px-2 py-1 text-sm text-gray-600 focus:outline-none"
                            placeholder="Search"
                        />
                        <button className="rounded-tr-md rounded-br-md px-2 py-1 hidden md:block">
                            <svg
                                className="w-4 h-4 fill-current"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div id="menu" className="flex flex-col mt-4 gap-1">
                        {/* Navigation links */}
                        <NavLink
                            to="/user/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-teal-500 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                                    : "text-gray-700 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                            }
                        >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span>Profile</span>
                        </NavLink>
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-teal-500 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                                    : "text-gray-700 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                            }
                        >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span>Auction</span>
                        </NavLink>
                        <NavLink
                            to="/user/add-product"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-teal-500 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                                    : "text-gray-700 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                            }
                        >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span>Products</span>
                        </NavLink>
                        <NavLink
                            to="/user/wishlist"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white bg-teal-500 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                                    : "text-gray-700 text-sm font-medium py-1 px-2 rounded-md transition duration-150 ease-in-out hover:bg-teal-500 hover:text-white"
                            }
                        >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span>Wishlist</span>
                        </NavLink>
                        {/* Add more navigation links as needed */}
                    </div>
                </div>
            </div>
        </div>
        // <div>Hello Test</div>
    )
}

export default Sidebar
