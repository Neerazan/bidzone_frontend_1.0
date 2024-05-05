import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Sidebar = () => {
    const user = useSelector((state) => state.auth.userData)

    return (
        <div className="flex flex-row min-h-[90vh] h-full">
            <div
                id="sidebar"
                className={`bg-white md:block shadow-md px-3 w-30 md:w-60 lg:w-60  rounded-md transition-transform duration-300 ease-in-out py-2 mt-4`}
            >
                <div className="mt-4">
                    <h1 className="font-bold text-4xl text-center md:hidden">
                        D<span className="text-teal-600">.</span>
                    </h1>
                    <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                        BidZone<span className="text-teal-600">.</span>
                    </h1>
                    <div id="profile" className="mt-4">
                        {user ? (
                            <div className="flex justify-center mb-3">
                                <div className="w-14 h-14 rounded-full bg-cyan-500 text-white flex items-center text-2xl justify-center">
                                    {user.first_name[0]}
                                </div>
                            </div>
                        ) : (
                            <img
                                src="https://i.pinimg.com/originals/60/07/0e/60070ed889df308cbe80253e8c36b3a3.jpg"
                                alt="Avatar user"
                                className="w-10 md:w-16 rounded-full mx-auto border-2 border-cyan-500 cursor-pointer hover:ring-2 hover:ring-cyan-500 hover:opacity-55"
                            />
                        )}

                        <div>
                            {user ? (
                                <h2 className="font-semibold text-xs md:text-sm text-center text-teal-500">
                                    {user?.first_name} {user?.last_name}
                                </h2>
                            ) : (
                                <div className="flex my-4 justify-center gap-3"></div>
                            )}

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
                            to="/user/auctions"
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
