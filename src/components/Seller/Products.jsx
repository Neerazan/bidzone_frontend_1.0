import React, { useState } from "react"
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { IconContext } from "react-icons";

function Products() {
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    // Function to handle selecting items
    const handleSelectItem = (index) => {
        const selectedIndex = selectedItems.indexOf(index)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = [...selectedItems, index]
        } else {
            newSelected = selectedItems.filter((item) => item !== index)
        }

        setSelectedItems(newSelected)
        setSelectAll(selectedItems.length === newSelected.length)
    }

    // Function to check if item is selected
    const isSelected = (index) => selectedItems.includes(index)

    // Function to handle select all action
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([])
        } else {
            setSelectedItems(Array.from({ length: 5 }, (_, i) => i)) // Assuming 5 items
        }
        setSelectAll(!selectAll)
    }

    return (
        <>
            <div className="bg-white h-auto w-auto flex items-center rounded-md mt-4 px-8">
                <div>
                    <h4 className="text-xl text-gray-600 font-bold">
                        Products
                    </h4>
                </div>
                <form className="max-w-[200px] w-full px-4 ml-auto">
                    <div className="relative my-2">
                        <input
                            type="text"
                            name="q"
                            className="w-full border h-8 shadow px-4 py-1 text-xs rounded-full focus:outline-none"
                            placeholder="search"
                        />
                        <button type="submit">
                            <svg
                                className="text-gray-500 h-3 w-3 absolute top-2.5 right-2.5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                contentStyleType="enable-background:new 0 0 56.966 56.966;"
                                xmlSpace="preserve"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="p-1 bg-white rounded-md cursor-pointer">
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>Filter</title>{" "}
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                {" "}
                                <g id="Filter">
                                    {" "}
                                    <rect
                                        id="Rectangle"
                                        fillRule="nonzero"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                    >
                                        {" "}
                                    </rect>{" "}
                                    <line
                                        x1="4"
                                        y1="5"
                                        x2="16"
                                        y2="5"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="4"
                                        y1="12"
                                        x2="10"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="14"
                                        y1="12"
                                        x2="20"
                                        y2="12"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <line
                                        x1="8"
                                        y1="19"
                                        x2="20"
                                        y2="19"
                                        id="Path"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        {" "}
                                    </line>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="18"
                                        cy="5"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                    <circle
                                        id="Oval"
                                        stroke="#5f5f5f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        cx="6"
                                        cy="19"
                                        r="2"
                                    >
                                        {" "}
                                    </circle>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </div>
                <Link
                    className="flex px-4 py-1 bg-gray-500 rounded-md hover:bg-gray-600 cursor-pointer text-white ml-3"
                    to="/user/add-product"
                >
                    <span>Add New Products</span>
                </Link>
            </div>
            <div className="overflow-x-scroll h-[90vh] mt-2 bg-white px-6 py-4 rounded-md shadow-md">
                <div className="flex h-auto">
                    <span className="font-semibold text-gray-600">
                        Actions:
                    </span>
                    <form className="max-w-sm ml-3 flex">
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm py-0.5 px-1 rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
                        >
                            <option value="">------------------------</option>
                            <option value="">Delete selected products</option>
                        </select>
                        <button className="border border-gray-400 px-2 py-0.5 mx-2 rounded-sm hover:border-gray-600">
                            Go
                        </button>
                    </form>

                    <span className="text-gray-700 font-semibold mt-0.5">
                        {selectedItems.length} of 8 selected
                    </span>
                </div>

                {/* Product List Begin Here */}
                <div className="mt-4">
                    <table className="w-full">
                        <thead>
                            <tr
                                className="bg-blue-50 text-gray-600"
                                style={{ textAlign: "left" }}
                            >
                                <th className="px-2 py-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-600 mx-auto"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Image
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Title
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Price
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Collection
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    In Auction
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        isSelected(index)
                                            ? "bg-sky-200"
                                            : index % 2 === 0
                                            ? "bg-white"
                                            : "bg-sky-50"
                                    } text-sm text-gray-700`} // Added mb-2 for bottom margin
                                    onClick={() => handleSelectItem(index)}
                                    style={{ marginBottom: '8px' }}
                                >
                                    <td className="px-2 py-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={isSelected(index)}
                                            onChange={() =>
                                                handleSelectItem(index)
                                            }
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-center items-center w-16 h-26 mx-auto">
                                            <img
                                                src="https://images.macrumors.com/t/xq3jBq3yK0pzNnG6uyM25WwNbUY=/800x0/smart/article-new/2023/03/iPhone-16-Mock-Header-1.jpg?lossy"
                                                alt="product"
                                                // className="object-cover rounded-sm"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        Product Name Product Name Product Name
                                        Product Name
                                    </td>
                                    <td className="px-4 py-2">12,000</td>
                                    <td className="px-4 py-2">Electronics</td>
                                    <td className="px-4 py-2">
                                        <IconContext.Provider
                                            value={{ color: "red", size: "1.2em", className: "mx-auto my-auto"}}
                                        >
                                            <MdCancel />
                                        </IconContext.Provider>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="flex px-2 py-1 bg-green-600 text-white rounded-sm border border-green-600 hover:bg-white hover:text-green-600 transition duration-300 ease-in-out"
                                        >
                                            auction
                                            <span className="ml-1 mt-1">
                                                <IoMdAdd />
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="border border-x-0 border-y-1 border-gray-400 py-1 px-3 mt-4 text-gray-500">
                        8 Products
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
