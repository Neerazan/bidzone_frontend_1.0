import React from "react"

function NumberInput({ value="", onInputChange, className = "", ...rest }) {

    const handleInputChange = (e) => {
        onInputChange(e.target.value)
    }

    return (
        <div>
            <input
                type="number"
                id="number-input"
                value={value}
                aria-describedby="helper-text-explanation"
                className={`bg-gray-50 border outline-1 focus:outline focus:outline-blue-500 border-gray-300 text-gray-900 text-sm rounded-sm block p-2 ${className}`}
                onChange={handleInputChange}
                required
                {...rest}
            />
        </div>
    )
}

export default NumberInput
