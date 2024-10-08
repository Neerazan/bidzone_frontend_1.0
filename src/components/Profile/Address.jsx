import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { IconContext } from "react-icons"
import { useSelector,useDispatch } from "react-redux"
import { AddressFormModal } from "../index"
import { fetchAddress } from "../../store/common/addressSlice"



function Address() {
    const user_id = useSelector((state) => state.auth.userData.id)
    const accessKey = useSelector((state) => state.auth.accessKey)
    const data = useSelector((state) => state.address.addresses)
    const dispatch = useDispatch()


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [initialData, setInitialData] = useState(null)


    useEffect(() => {
        dispatch(fetchAddress({ user_id, accessKey }))
    }, [dispatch, user_id, accessKey])


    const handleEditClick = () => {
        setInitialData(data)
        setIsModalOpen(true)
    }

    const handleAddClick = () => {
        setInitialData(null)
        setIsModalOpen(true)
    }


    return (
        <div className="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow col-span-2 md:col-span-1 w-full address-card">
            {!data && (
                <div className="text-center">
                    <h5 className="text-2xl font-semibold text-gray-700 mt-auto">
                        No Address Found
                    </h5>
                    <p className="text-gray-600 mb-auto">
                        Please add your address to continue shopping.
                    </p>
                    <button
                        onClick={handleAddClick}
                        className="inline-flex font-medium items-center text-blue-600 hover:underline"
                    >
                        Add Your Address
                        <FaRegEdit className="ml-2 mt-0.5" />
                    </button>
                </div>
            )}

            {data && (
                <div className="grid grid-cols-3">
                    <div className="text-6xl cursor-pointer col-span-1 flex justify-center items-center">
                        <IconContext.Provider
                            value={{ className: "text-gray-500" }}
                        >
                            <IoLocationOutline />
                        </IconContext.Provider>
                    </div>
                    <div className="col-span-2">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-700">
                                Nepal 🇳🇵
                            </h5>
                        </a>
                        <p className="mb-3 text-gray-600 font-semibold">
                            {data.province}, {data.district} ({data.zip_code}){" "}
                            <br />
                            {data.municipality} - {data.ward}, {data.tole}{" "}
                            <br />
                            {data.street}
                        </p>
                        <button
                            onClick={handleEditClick}
                            className="inline-flex font-medium items-center text-blue-600 hover:underline"
                        >
                            Edit Your Address
                            <FaRegEdit className="ml-2 mt-0.5" />
                        </button>
                    </div>
                </div>
            )}

            <AddressFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={initialData}
                customerId={user_id}
                accessKey={accessKey}
            />
        </div>
    )
}

export default Address
