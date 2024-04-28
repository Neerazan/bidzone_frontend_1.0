import React, { useState } from "react"
import { Range, NumberInput } from "../components/index"

const CategoryPage = () => {
    const [inputValue, setInputValue] = useState(5000);
    const HandleInputChange = (value) => {
        setInputValue(value)
    }


    return(
        <div className="ml-12 mt-12">
            <Range min={1} max={1000000} onInputChange={HandleInputChange} value={inputValue}/>

            <NumberInput onInputChange={HandleInputChange} value={inputValue}/>
        </div>
    )
}

export default CategoryPage
