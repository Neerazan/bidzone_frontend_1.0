import React from "react"

function NumberInput({ value, onInputChange}) {

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
                class="bg-gray-50 border border-gray-300 mt-4 text-gray-900 text-sm rounded-lg  block p-2"
                onChange={handleInputChange}
                required
            />
        </div>
    )
}

export default NumberInput
