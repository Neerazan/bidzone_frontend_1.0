import React, { useState } from "react"
import { Range, NumberInput, Container, ProductCard } from "../components/index"

const CategoryPage = () => {
    const [maxPriceInputValue, setMaxPriceInputValue] = useState()  
    const [minPriceInputValue, setMinPriceInputValue] = useState() 

    const HandleMaxPriceInputChange = (value) => {
        setMaxPriceInputValue(value)
    }

    const HandleMinPriceInputChange = (value) => {
        setMinPriceInputValue(value)
    }

    return (
        <Container>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-gray-700 font-semibold text-sm mb-2">
                                Price Range
                            </p>
                            <div className="flex w-9/12">
                                <Range
                                    min={1}
                                    max={300000}
                                    onInputChange={HandleMinPriceInputChange}
                                    value={minPriceInputValue}
                                    className="w-full"
                                />
                                <div className="w-9"></div>
                                <Range
                                    min={1}
                                    max={300000}
                                    onInputChange={HandleMaxPriceInputChange}
                                    value={maxPriceInputValue}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-700 text-sm flex mb-1">
                                <div className="w-2/5">From</div>
                                <div className="w-1/2">To</div>
                            </div>
                            <div className="flex items-center">
                                <NumberInput
                                    onInputChange={HandleMinPriceInputChange}
                                    value={minPriceInputValue}
                                    className="w-full my-auto"
                                    placeholder="Min"
                                />

                                <span className="font-bold text-gray-700 mx-[2px]">
                                    -
                                </span>

                                <NumberInput
                                    onInputChange={HandleMaxPriceInputChange}
                                    value={maxPriceInputValue}
                                    className="w-full my-auto"
                                    placeholder="Max"
                                />

                                <button className="text-white bg-green-500 font-semibold hover:bg-green-600 text-xs px-4 py-2 ml-1 rounded-sm">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3"></div>
            </div>
        </Container>
        // <div className="ml-12 mt-12">
        //     <Range min={1} max={1000000} onInputChange={HandleInputChange} value={inputValue}/>
        //     <NumberInput onInputChange={HandleInputChange} value={inputValue}/>
        // </div>
    )
}

export default CategoryPage
