import React, { forwardRef, useId } from "react"

const Select = forwardRef(
    ({ options, label, value, onChange, className = "" }, ref) => {
        const id = useId()

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="font-semibold text-sm mb-1">
                        {label}
                    </label>
                )}
                <select
                    id={id}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    className={`px-3 py-1 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className}`}
                >
                    <option value="">Select a Category</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.title}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
)

export default Select
