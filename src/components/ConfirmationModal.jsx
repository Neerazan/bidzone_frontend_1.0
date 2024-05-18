import React from "react"

const ConfirmationModal = ({ show, onConfirm, onCancel, message }) => {
    if (!show) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
