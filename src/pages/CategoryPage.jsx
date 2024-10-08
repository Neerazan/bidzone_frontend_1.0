import React, { useState, useEffect } from "react"
import {
    Range,
    NumberInput,
    Container,
    ProductCard,
    Breadcrumb,
} from "../components/index"
import { Link } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"

const CategoryPage = () => {
    const [maxPriceInputValue, setMaxPriceInputValue] = useState("")
    const [minPriceInputValue, setMinPriceInputValue] = useState("")
    const [maxBidInputValue, setMaxBidInputValue] = useState("")
    const [minBidInputValue, setMinBidInputValue] = useState("")
    const [auctions, setAuctions] = useState([])
    const [submitPriceFilter, setSubmitPriceFilter] = useState(false)
    const [submitBidFilter, setSubmitBidFilter] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [orderBy, setOrderBy] = useState("")
    const [collectionId, setCollectionId] = useState("")
    const [searchText, setSearchText] = useState("")

    const { filter } = useParams()

    useEffect(() => {
        if (filter == parseInt(filter)) {
            setCollectionId(filter)
        } else {
            setSearchText(filter)
        }
    }, [filter])

    const onClickReset = () => {
        setMaxPriceInputValue("")
        setMinPriceInputValue("")
        setMaxBidInputValue("")
        setMinBidInputValue("")
        setSelectedOption("")
        setSubmitPriceFilter(!submitPriceFilter)
        setSubmitBidFilter(!submitBidFilter)
        setOrderBy("")
    }

    useEffect(() => {
        const fetchAuctions = async () => {
            if (collectionId || searchText) {
                try {
                    const response = await axios.get(
                        `http://127.0.0.1:8000/auction/auctions/?search=${searchText}&product__collection=${collectionId}&auction_status=${selectedOption}&current_price__gt=${minPriceInputValue}&current_price__lt=${maxPriceInputValue}&min_bids_count=${minBidInputValue}&max_bids_count=${maxBidInputValue}&ordering=${orderBy}`
                    )
                    if (response.data) {
                        setAuctions(response.data)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchAuctions()
    }, [
        collectionId,
        searchText,
        submitPriceFilter,
        submitBidFilter,
        selectedOption,
        orderBy,
    ])

    const HandleMaxPriceInputChange = (value) => {
        setMaxPriceInputValue(value)
    }

    const HandleMinPriceInputChange = (value) => {
        setMinPriceInputValue(value)
    }

    const HandleMinBidINputChange = (value) => {
        setMinBidInputValue(value)
    }

    const HandleMaxBidInputChange = (value) => {
        setMaxBidInputValue(value)
    }

    return (
        <Container>
            <div className="bg-white">
                <Breadcrumb />
                <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className="col-span-1 px-3 py-5 shadow-md">
                        <h2 className="text-gray-600 mb-4 font-semibold">
                            Filter
                        </h2>
                        <div className="w-full border border-b-gray-400 mt-4"></div>
                        <div className="flex flex-col gap-3 mt-4">
                            <div>
                                <p className="text-gray-700 font-semibold text-sm mb-2">
                                    Price Range
                                </p>
                                <div className="flex w-9/12">
                                    <Range
                                        min={1}
                                        max={300000}
                                        onInputChange={
                                            HandleMinPriceInputChange
                                        }
                                        value={minPriceInputValue}
                                        className="w-full"
                                    />
                                    <div className="w-9"></div>
                                    <Range
                                        min={1}
                                        max={300000}
                                        onInputChange={
                                            HandleMaxPriceInputChange
                                        }
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
                                        onInputChange={
                                            HandleMinPriceInputChange
                                        }
                                        value={minPriceInputValue}
                                        className="w-full my-auto"
                                        placeholder="Min"
                                    />

                                    <span className="font-bold text-gray-700 mx-[2px]">
                                        -
                                    </span>

                                    <NumberInput
                                        onInputChange={
                                            HandleMaxPriceInputChange
                                        }
                                        value={maxPriceInputValue}
                                        className="w-full my-auto"
                                        placeholder="Max"
                                    />

                                    <button
                                        className="text-white bg-teal-500 font-semibold hover:bg-teal-600 text-xs px-4 py-2 ml-1 rounded-sm"
                                        onClick={() =>
                                            setSubmitPriceFilter(
                                                !submitPriceFilter
                                            )
                                        }
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full border border-b-gray-400 mt-4"></div>
                        <div className="flex flex-col gap-3 mt-4">
                            <div>
                                <p className="text-gray-700 font-semibold text-sm mb-2">
                                    Bids Range
                                </p>

                                <div className="flex w-9/12">
                                    <Range
                                        min={1}
                                        max={3000}
                                        onInputChange={HandleMinBidINputChange}
                                        value={minBidInputValue}
                                        className="w-full"
                                    />
                                    <div className="w-9"></div>
                                    <Range
                                        min={1}
                                        max={3000}
                                        onInputChange={HandleMaxBidInputChange}
                                        value={maxBidInputValue}
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
                                        onInputChange={HandleMinBidINputChange}
                                        value={minBidInputValue}
                                        className="w-full my-auto"
                                        placeholder="Min"
                                    />

                                    <span className="font-bold text-gray-700 mx-[2px]">
                                        -
                                    </span>

                                    <NumberInput
                                        onInputChange={HandleMaxBidInputChange}
                                        value={maxBidInputValue}
                                        className="w-full my-auto"
                                        placeholder="Max"
                                    />

                                    <button
                                        className="text-white bg-teal-500 font-semibold hover:bg-teal-600 text-xs px-4 py-2 ml-1 rounded-sm"
                                        onClick={() =>
                                            setSubmitBidFilter(!submitBidFilter)
                                        }
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full border border-b-gray-400 mt-4"></div>
                        <div className="mt-4">
                            <div className="mb-2 text-gray-600 font-semibold">
                                Status
                            </div>
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-sm">
                                <li className="w-full border-b border-gray-200">
                                    <div className="flex items-center ps-3">
                                        <input
                                            id="list-radio-license"
                                            type="radio"
                                            value=""
                                            name="list-radio"

                                            {...(selectedOption === "" && {
                                                checked: true,
                                                })
                                            }

                                            onChange={(e) =>
                                                setSelectedOption(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="list-radio-license"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-700"
                                        >
                                            All
                                        </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200">
                                    <div className="flex items-center ps-3">
                                        <input
                                            id="list-radio-license"
                                            type="radio"
                                            value="A"
                                            name="list-radio"

                                            {...(selectedOption === "A" && {
                                                checked: true,
                                                })
                                            }

                                            onChange={(e) =>
                                                setSelectedOption(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="list-radio-license"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-700"
                                        >
                                            Active
                                        </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 rounded-t-lg">
                                    <div className="flex items-center ps-3">
                                        <input
                                            id="list-radio-id"
                                            type="radio"
                                            value="S"
                                            name="list-radio"

                                            {...(selectedOption === "S" && {
                                                checked: true,
                                                })
                                            }

                                            onChange={(e) =>
                                                setSelectedOption(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="list-radio-id"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-700"
                                        >
                                            Scheduled
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button
                                className="text-white bg-red-500 font-semibold hover:bg-red-600 text-xs px-4 py-2 mt-4 rounded-sm ml-auto"
                                onClick={onClickReset}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex items-center border-b border-b-gray-300 pb-4">
                            <div className="text-gray-500">
                                {auctions.length} Items Found for{" "}
                                <span className="text-rose-500 font-semibold">
                                    {filter}
                                </span>
                            </div>
                            <div className="ml-auto mr-4 text-gray-600 flex">
                                <select
                                    id=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
                                    onChange={(e) => setOrderBy(e.target.value)}
                                >
                                    <option 
                                        value=""
                                        {...(orderBy === "" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Best Match
                                    </option>


                                    <option 
                                        value="-starting_time"
                                        {...(orderBy === "-starting_time" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Newest
                                    </option>


                                    <option 
                                        value="starting_time"
                                        {...(orderBy === "starting_time" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Oldest
                                    </option>


                                    <option 
                                        value="-current_price"
                                        {...(orderBy === "-current_price" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Price High to Low
                                    </option>


                                    <option 
                                        value="current_price"
                                        {...(orderBy === "current_price" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Price Low to High
                                    </option>


                                    <option 
                                        value="-bids_count"
                                        {...(orderBy === "-bids_count" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Bids High to Low
                                    </option>


                                    <option 
                                        value="bids_count"
                                        {...(orderBy === "bids_count" && {
                                            selected: true,
                                            })
                                        }
                                    >
                                        Bids Low to High
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4 pr-4">
                            {auctions ? (
                                auctions.map((auction) => (
                                    <Link
                                        to={`/auction/${auction.id}`}
                                        key={auction.id}
                                    >
                                        <ProductCard
                                            id={auction.id}
                                            title={auction.product.title}
                                            slug={auction.product.slug}
                                            description={
                                                auction.product.description
                                            }
                                            price={auction.product.price}
                                            image={
                                                auction.product.images[0].image
                                            }
                                            currentPrice={auction.current_price}
                                            bidsCount={auction.bids_count}
                                            startingTime={auction.starting_time}
                                            auctionStatus={
                                                auction.auction_status
                                            }
                                        />
                                    </Link>
                                ))
                            ) : (
                                <div>No auctions found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CategoryPage
