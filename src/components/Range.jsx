import { React, useState } from "react"


function Range({ min, max, onInputChange, value="", className = "", ...rest }) {
    
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
                className={`range h-1.5 bg-zinc-400 rounded-lg appearance-none cursor-pointer ${className}`}
                {...rest}
            />
        </div>
    )
}

export default Range
