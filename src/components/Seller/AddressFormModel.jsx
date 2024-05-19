import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { Input } from "../index"

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
                ? `http://127.0.0.1:8000/auction/customers/${customerId}/address/${customerId}/`
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

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-500 ease-in-out"
            onClick={handleOverlayClick}
        >
            <div className="bg-gray-50 rounded-md shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold text-red-600"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                    {initialData ? "Edit Address" : "Add Address"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Input
                            label = "Province"
                            id="province"
                            {...register("province", { required: true })}
                            className="w-full border border-gray-500 rounded-sm px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="Gandaki"
                        />
                        {errors.province && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "District"
                            id="district"
                            {...register("district", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="Kaski"
                        />
                        {errors.district && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "Municipality"
                            id="municipality"
                            {...register("municipality", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="Pokhara"
                        />
                        {errors.municipality && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "Ward"
                            type="number"
                            id="ward"
                            {...register("ward", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="12"
                        />
                        {errors.ward && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "Tole"
                            id="tole"
                            {...register("tole", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="Fulbari"
                        />
                        {errors.tole && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "Zip Code"
                            type="number"
                            id="zip_code"
                            {...register("zip_code", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="33700"
                        />
                        {errors.zip_code && (
                            <span className="text-red-500 text-sm">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            label = "Street"
                            id="street"
                            {...register("street", { required: true })}
                            className="w-full border border-gray-500 rounded-sm mt-1 px-2 py-1 text-sm outline-none focus:border-indigo-500 text-gray-500"
                            placeholder="Near Nepal Telecom office"
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
