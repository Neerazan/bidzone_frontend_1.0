import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BsBoxSeam, BsBagHeart, BsPerson } from "react-icons/bs"
import { AiOutlineTransaction } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { IconContext } from "react-icons"

const Sidebar = () => {
    const user = useSelector((state) => state.auth.userData)
    const balance = useSelector((state) => state.auth.userData?.user_balance)

    return (
        <div className="flex-row min-h-[90vh] h-full hidden md:flex">
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
                                    {user?.first_name[0]}
                                </div>
                            </div>
                        ) : (
                            <img
                                src="https://i.pinimg.com/originals/60/07/0e/60070ed889df308cbe80253e8c36b3a3.jpg"
                                alt="Avatar user"
                                className="w-10 md:w-16 rounded-full mx-auto border-2 border-cyan-500 cursor-pointer hover:ring-2 hover:ring-cyan-500 hover:ring-opacity-60"
                            />
                        )}

                        <div>
                            {user ? (
                                <h2 className="font-semibold text-xs md:text-sm text-center text-teal-500">
                                    {user?.first_name} {user?.last_name}
                                </h2>
                            ) : (
                                <div className="flex my-4 justify-center gap-3 text-sm text-red-500">
                                    Please login to view your profile
                                </div>
                            )}

                            {user ? (
                                <div className="flex justify-center mt-4 font-semibold">
                                    <Link className="flex" to="/">
                                        <svg
                                            className="h-6 w-6 mr-2 font-bold"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M20.9235 11.7502C20.9032 11.75 20.8766 11.75 20.8333 11.75H18.2308C16.8074 11.75 15.75 12.8087 15.75 14C15.75 15.1913 16.8074 16.25 18.2308 16.25H20.8333C20.8766 16.25 20.9032 16.25 20.9235 16.2498C20.9427 16.2496 20.948 16.2492 20.948 16.2492C21.154 16.2367 21.2427 16.0976 21.2495 16.0139C21.2495 16.0139 21.2497 16.0077 21.2498 15.9986C21.25 15.9808 21.25 15.9572 21.25 15.9167V12.0833C21.25 12.0609 21.25 12.0437 21.25 12.0297C21.2499 12.0185 21.2499 12.0093 21.2498 12.0014C21.2497 11.9924 21.2495 11.9861 21.2495 11.9861C21.2427 11.9024 21.154 11.7633 20.9479 11.7508C20.9479 11.7508 20.943 11.7504 20.9235 11.7502ZM20.8499 10.25C20.9163 10.25 20.9803 10.2499 21.0391 10.2535C21.9104 10.3066 22.681 10.9638 22.7458 11.8818C22.7501 11.942 22.75 12.0069 22.75 12.067C22.75 12.0725 22.75 12.0779 22.75 12.0833V15.9167C22.75 15.9221 22.75 15.9275 22.75 15.933C22.75 15.9931 22.7501 16.058 22.7458 16.1182C22.681 17.0362 21.9104 17.6934 21.0391 17.7465C20.9803 17.7501 20.9163 17.75 20.8499 17.75C20.8444 17.75 20.8389 17.75 20.8333 17.75H18.2308C16.0856 17.75 14.25 16.1224 14.25 14C14.25 11.8776 16.0856 10.25 18.2308 10.25H20.8333C20.8389 10.25 20.8444 10.25 20.8499 10.25Z"
                                                    fill="#3b3b3b"
                                                ></path>{" "}
                                                <path
                                                    d="M19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14Z"
                                                    fill="#3b3b3b"
                                                ></path>{" "}
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M20.8499 10.25C20.9163 10.25 20.9803 10.2499 21.0391 10.2535C21.2645 10.2672 21.4832 10.3214 21.6847 10.4101C21.5777 8.80363 21.2831 7.56563 20.3588 6.64124C19.6104 5.89288 18.6614 5.56076 17.489 5.40313L17.4467 5.39754C17.4362 5.38977 17.4255 5.38223 17.4145 5.37492L13.679 2.89806C12.3758 2.03398 10.6242 2.03398 9.32102 2.89806L5.58554 5.37492C5.57453 5.38223 5.56377 5.38977 5.55327 5.39754L5.51098 5.40313C4.33856 5.56076 3.38961 5.89288 2.64124 6.64124C1.89288 7.38961 1.56076 8.33856 1.40314 9.51098C1.24997 10.6502 1.24998 12.1058 1.25 13.9436V14.0564C1.24998 15.8942 1.24997 17.3498 1.40314 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588C3.38961 22.1071 4.33856 22.4392 5.51098 22.5969C6.65019 22.75 8.10583 22.75 9.94359 22.75H13.0564C14.8942 22.75 16.3498 22.75 17.489 22.5969C18.6614 22.4392 19.6104 22.1071 20.3588 21.3588C21.2831 20.4344 21.5777 19.1964 21.6847 17.5899C21.4832 17.6786 21.2645 17.7328 21.0391 17.7465C20.9803 17.7501 20.9163 17.75 20.8499 17.75L20.8333 17.75H20.1679C20.0541 19.0915 19.7966 19.7996 19.2981 20.2981C18.8749 20.7213 18.2952 20.975 17.2892 21.1102C16.2615 21.2484 14.9068 21.25 13 21.25H10C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14C2.75 12.0932 2.75159 10.7385 2.88976 9.71085C3.02502 8.70476 3.27869 8.12511 3.7019 7.7019C4.12511 7.27869 4.70476 7.02502 5.71085 6.88976C6.73851 6.75159 8.09318 6.75 10 6.75H13C14.9068 6.75 16.2615 6.75159 17.2892 6.88976C18.2952 7.02502 18.8749 7.27869 19.2981 7.7019C19.7966 8.20043 20.0541 8.90854 20.1679 10.25H20.8333L20.8499 10.25ZM9.94358 5.25H13.0564C13.5729 5.24999 14.0592 5.24999 14.5168 5.25339L12.8501 4.14821C12.0493 3.61726 10.9507 3.61726 10.15 4.14821L8.48318 5.25339C8.94077 5.24999 9.42708 5.24999 9.94358 5.25Z"
                                                    fill="#3b3b3b"
                                                ></path>{" "}
                                                <path
                                                    d="M6 9.25C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H10C10.4142 10.75 10.75 10.4142 10.75 10C10.75 9.58579 10.4142 9.25 10 9.25H6Z"
                                                    fill="#3b3b3b"
                                                ></path>{" "}
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14Z"
                                                    fill="#3b3b3b"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                        <div className="text-gray-600">
                                            {balance
                                                ? `Rs. ${balance}`
                                                : "Rs. 0"}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                ""
                            )}
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
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <IconContext.Provider value={{ size: "1.3em" }}>
                                <BsPerson />
                            </IconContext.Provider>
                            <span className="ml-2">Profile</span>
                        </NavLink>
                        <NavLink
                            to="/user/auctions"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <svg
                                fill="#000000"
                                className="h-5 fill-current inline-block"
                                viewBox="0 0 24 24"
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
                                    <title></title>{" "}
                                    <g id="auction">
                                        {" "}
                                        <path d="M14.75,18.24A3.45,3.45,0,0,0,11.5,16h-4A3.44,3.44,0,0,0,5,17a3.39,3.39,0,0,0-.77,1.21A3.49,3.49,0,0,0,2,21.5a.5.5,0,0,0,.5.5h14a.5.5,0,0,0,.5-.5A3.51,3.51,0,0,0,14.75,18.24ZM7.5,17h4a2.48,2.48,0,0,1,2,1h-8a1.71,1.71,0,0,1,.2-.27A2.51,2.51,0,0,1,7.5,17ZM3.05,21A2.5,2.5,0,0,1,5.5,19h8A2.5,2.5,0,0,1,16,21Z"></path>{" "}
                                        <path d="M21.26,13.56l-2.7-2.71a1.49,1.49,0,0,0-2,0L15.21,9.5,16,8.71l.15.14a.48.48,0,0,0,.7,0l1.3-1.29a1.51,1.51,0,0,0,0-2.12L15.56,2.85a1.51,1.51,0,0,0-2.12,0l-1.29,1.3a.48.48,0,0,0,0,.7l.14.15L10,7.29l-.15-.14a.48.48,0,0,0-.7,0L7.85,8.44a1.51,1.51,0,0,0,0,2.12l2.59,2.59a1.52,1.52,0,0,0,2.12,0l1.29-1.3a.48.48,0,0,0,0-.7L13.71,11l.79-.79,1.31,1.3a1.49,1.49,0,0,0,0,2.05l2.71,2.7a2.46,2.46,0,0,0,1.77.74h.17A1.5,1.5,0,0,0,22,15.5v-.17A2.46,2.46,0,0,0,21.26,13.56Zm-7.11-10a.5.5,0,0,1,.7,0l2.59,2.59a.5.5,0,0,1,0,.7l-.94.94L13.21,4.5Zm-2.3,8.88a.5.5,0,0,1-.7,0L8.56,9.85a.5.5,0,0,1,0-.7l.94-.94,3.29,3.29ZM10.71,8,13,5.71,15.29,8,13,10.29ZM21,15.5a.5.5,0,0,1-.5.5h-.17a1.54,1.54,0,0,1-1.07-.44l-2.7-2.71a.5.5,0,0,1,0-.7l.59-.59a.48.48,0,0,1,.7,0l2.71,2.7A1.54,1.54,0,0,1,21,15.33Z"></path>{" "}
                                    </g>{" "}
                                </g>
                            </svg>
                            <span className="ml-2">Auction</span>
                        </NavLink>
                        <NavLink
                            to="/user/products"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <IconContext.Provider value={{ size: "1.3em" }}>
                                <BsBoxSeam />
                            </IconContext.Provider>
                            <span className="ml-2">Products</span>
                        </NavLink>
                        <NavLink
                            to="/user/wishlist"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <IconContext.Provider value={{ size: "1.3em" }}>
                                <BsBagHeart />
                            </IconContext.Provider>
                            <span className="ml-2">Wishlist</span>
                        </NavLink>

                        <NavLink
                            to="/user/auction_history"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <IconContext.Provider value={{ size: "1.3em" }}>
                                <RiHistoryFill />
                            </IconContext.Provider>
                            <span className="ml-2">Auction History</span>
                        </NavLink>

                        <NavLink
                            to="/user/transaction-history"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-sky-700 bg-sky-100 text-sm py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-blue-100 flex items-center"
                                    : "text-gray-700 text-sm font-medium py-2 px-3 rounded-md transition duration-150 ease-in-out hover:bg-sky-100 hover:text-sky-700 flex items-center"
                            }
                        >
                            <IconContext.Provider value={{ size: "1.3em" }}>
                                <AiOutlineTransaction />
                            </IconContext.Provider>
                            <span className="ml-2">Transaction History</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
