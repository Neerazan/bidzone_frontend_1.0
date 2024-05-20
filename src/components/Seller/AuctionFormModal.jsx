import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../store/productSlice"

const AuctionFormModal = ({ isOpen, onClose, initialData, productId="" }) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const accessKey = useSelector((state) => state.auth.accessKey)
    const userId = useSelector((state) => state.auth.userData.id)
    const products = useSelector((state) => state.product.products)


    useEffect(() => {
        dispatch(fetchProducts({ accessKey, userId }))
    }, [dispatch, accessKey, userId])


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: initialData || {
            product: "",
            starting_price: "",
            current_price: "",
            starting_time: "",
            ending_time: "",
            auction_status: "A",
        },
    })


    useEffect(() => {
        reset(initialData)
    }, [initialData, reset])

    const mutation = useMutation(
        async (data) => {
            const url = initialData
                ? `http://127.0.0.1:8000/auction/auctions/${initialData.id}/`
                : `http://127.0.0.1:8000/auction/auctions/`
            const method = initialData ? "put" : "post"
            const response = await axios[method](url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("auctions")
                onClose()
            },
            onError: (error) => {
                console.error(error)
            },
        }
    )

    const onSubmit = (data) => {
        data.current_price = data.starting_price
        mutation.mutate(data)
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Auction" : "Add Auction"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="product"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Product
                        </label>
                        <select
                            id="product"
                            {...register("product", { required: true })}
                            defaultValue={ initialData ? initialData.product : productId}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.title}
                                </option>
                            ))}
                        </select>
                        {errors.product && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="starting_price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Starting Price
                        </label>
                        <input
                            id="starting_price"
                            type="number"
                            step="0.01"
                            {...register("starting_price", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.starting_price && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="starting_time"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Starting Time
                        </label>
                        <input
                            id="starting_time"
                            type="datetime-local"
                            {...register("starting_time", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.starting_time && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="ending_time"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ending Time
                        </label>
                        <input
                            id="ending_time"
                            type="datetime-local"
                            {...register("ending_time", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.ending_time && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="auction_status"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Auction Status
                        </label>
                        <select
                            id="auction_status"
                            {...register("auction_status", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="A">Active</option>
                            <option value="C">Completed</option>
                            <option value="X">Cancelled</option>
                            <option value="S">Schedule</option>
                            <option value="D">Deleted</option>
                        </select>
                        {errors.auction_status && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white rounded-md py-2 mt-4 hover:bg-green-700"
                    >
                        {initialData ? "Update" : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuctionFormModal
