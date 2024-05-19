import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io"
import { MdCancel, MdCheckCircle } from "react-icons/md"
import { IconContext } from "react-icons"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "../../store/productSlice"
import { deleteProducts } from "../../store/productSlice"
import { useMutation } from "react-query"
import axios from "axios"


function Auctions() {
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const dispatch = useDispatch()
    const auctionDropdownRef = useRef(null)

    const accessKey = useSelector((state) => state.auth.accessKey)
    const customer_id = useSelector((state) => state.auth.userData.id)
    const products = useSelector((state) => state.product.products)

    // Function to handle selecting items
    const handleSelectItem = (id) => {
        const selectedIndex = selectedItems.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = [...selectedItems, id]
        } else {
            newSelected = selectedItems.filter((item) => item !== id)
        }

        setSelectedItems(newSelected)
        setSelectAll(newSelected.length === products.results.length)
    }

    // Function to check if item is selected
    const isSelected = (id) => selectedItems.includes(id)

    // Function to handle select all action
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([])
        } else {
            setSelectedItems(products.results.map((product) => product.id))
        }
        setSelectAll(!selectAll)
    }

    useEffect(() => {
        dispatch(fetchProducts({ accessKey, customer_id }))
    }, [dispatch, accessKey, customer_id])


    const deleteProductMutation = useMutation(
        async ({ customerId, productId, accessKey }) => {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/auction/customers/${customerId}/products/${productId}/`, {
                    headers: {
                        Authorization: `JWT ${accessKey}`
                    }
                })
                return response.data
            } catch (error) {
                console.log("Error deleting a product:", error)
            }
        }
    )

    const bulkDeleteProductsMutation = useMutation(
        async ({ customerId, productIds, accessKey }) => {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/auction/customers/${customerId}/products/bulk-delete/`,
                { "ids": productIds },
                {
                    headers: {
                        Authorization: `JWT ${accessKey}`
                    }
                })
                return response.data
            } catch (error) {
                console.log("Error deleting products:", error)
            }
        }
    )

    const handleDeleteProducts = () => {
        if (auctionDropdownRef.current.value === "delete") {
            if (selectedItems.length === 1) {
                const productId = selectedItems[0]
                deleteProductMutation.mutate(
                    { 
                        customerId: customer_id, 
                        productId, selectedItems,
                        accessKey
                    },
                    {
                        onSuccess: (data) => {
                            dispatch(deleteProducts({ productsIds: selectedItems }))
                            setSelectedItems([])
                            setSelectAll(false)
                        }
                    }
                )

            } else if(selectedItems.length > 1){
                bulkDeleteProductsMutation.mutate(
                    { 
                        customerId: customer_id, 
                        productIds: selectedItems, 
                        accessKey 
                    },
                    {
                        onSuccess: (data) => {
                            dispatch(deleteProducts({ productsIds: selectedItems }))
                            setSelectedItems([])
                            setSelectAll(false)
                        }
                    }
                )
            }
        }
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
                    className="flex px-4 py-1 rounded-md cursor-pointer ml-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
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
                    <div className="max-w-sm ml-3 flex">
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm py-0.5 px-1 rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full"
                            ref={auctionDropdownRef}
                        >
                            <option value="">------------------------</option>
                            <option value="delete">Delete selected products</option>
                        </select>
                        <button 
                            className="px-1 py-0.5 mx-2 rounded-sm text-sm border border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                            onClick={() => {handleDeleteProducts()}}
                        >
                            Go
                        </button>
                    </div>

                    <span className="text-gray-700 mt-0.5">
                        {selectedItems.length} of {products?.count} selected
                    </span>
                </div>

                {/* Product List Begin Here */}
                <div className="mt-4">
                    <table className="w-full">
                        <thead>
                            <tr
                                className="bg-sky-100 text-gray-600"
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
                                    InAuction
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {products?.results?.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={`${
                                        isSelected(product.id)
                                            ? "bg-sky-200"
                                            : index % 2 === 0
                                            ? "bg-white"
                                            : "bg-sky-100"
                                    } text-sm text-gray-700`}
                                    // onClick={() => handleSelectItem(product.id)}
                                >
                                    <td className="px-2 py-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={isSelected(product.id)}
                                            onChange={() =>
                                                handleSelectItem(product.id)
                                            }
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <div className="flex justify-center items-center mx-auto">
                                            <img
                                                src={`http://127.0.0.1:8000/${product.images[0]?.image}`}
                                                alt="product image"
                                                className="w-14 h-14 object-cover rounded-md border border-gray-300"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link 
                                            className="cursor-pointer hover:underline text-[#264b5d] hover:text-[#377792]"
                                            to={`/user/update-product/${product.slug}`}
                                        >
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.price}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.collection.title}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`${product.in_auction ? "text-green-600" : "text-red-600"}`}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: "1.2em",
                                                    className:
                                                        "mx-auto my-auto",
                                                }}
                                            >
                                                {product.in_auction ? (
                                                    <MdCheckCircle />
                                                ) : (
                                                    <MdCancel />
                                                )}
                                            </IconContext.Provider>
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="flex px-2 py-1 font-semibold bg-blue-600 text-white rounded-sm border border-blue-600 hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out">
                                            auction
                                            <span className="ml-1 mt-1 font-semibold">
                                                <IoMdAdd />
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="border border-x-0 border-y-1 border-gray-400 py-1 px-3 mt-4 text-gray-500">
                        {products?.count} Products
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auctions
