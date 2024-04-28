import { React, useState } from "react"


function Range({ min, max, onInputChange, value }) {
    
    const handleInputChange = (e) => {
        onInputChange(e.target.value)
    }

    return (
        <div className="price-range-slider">
            <input
                type="range"
                id="price-range-input"
                value={value}
                min={min}
                max={max}
                onChange={handleInputChange}
                className="range h-2 bg-zinc-400 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    )
}

export default Range
