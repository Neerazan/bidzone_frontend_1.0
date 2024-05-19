import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"

const AddressFormModal = ({
    isOpen,
    onClose,
    initialData,
    customerId,
    accessKey,
}) => {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialData || {
            province: "",
            district: "",
            municipality: "",
            ward: "",
            tole: "",
            zip_code: "",
            street: "",
        },
    })

    useEffect(() => {
        reset(initialData)
    }, [initialData, reset])

    const mutation = useMutation(
        async (data) => {
            const url = initialData
                ? `http://127.0.0.1:8000/auction/customers/${customerId}/address/`
                : `http://127.0.0.1:8000/auction/customers/${customerId}/address/`
            const method = initialData ? "put" : "post"
            const response = await axios[method](url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessKey}`,
                },
            })
            return response.data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "customer",
                    customerId,
                    "address",
                ])
                onClose()
            },
            onError: (error) => {
                console.error(error)
            },
        }
    )

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Address" : "Add Address"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="province"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Province
                        </label>
                        <input
                            id="province"
                            {...register("province", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.province && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="district"
                            className="block text-sm font-medium text-gray-700"
                        >
                            District
                        </label>
                        <input
                            id="district"
                            {...register("district", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.district && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="municipality"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Municipality
                        </label>
                        <input
                            id="municipality"
                            {...register("municipality", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.municipality && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="ward"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ward
                        </label>
                        <input
                            id="ward"
                            {...register("ward", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.ward && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="tole"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Tole
                        </label>
                        <input
                            id="tole"
                            {...register("tole", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.tole && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="zip_code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Zip Code
                        </label>
                        <input
                            id="zip_code"
                            {...register("zip_code", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.zip_code && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="street"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Street
                        </label>
                        <input
                            id="street"
                            {...register("street", { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.street && (
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

export default AddressFormModal
