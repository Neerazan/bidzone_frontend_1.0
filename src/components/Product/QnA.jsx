import React from "react"

import { FaRegQuestionCircle } from "react-icons/fa"
import { MdOutlineQuestionAnswer } from "react-icons/md"
import { BsReply } from "react-icons/bs"
import { IconContext } from "react-icons"
import { useState } from "react"
import { set, useForm } from "react-hook-form"

import { Input } from "../../components/index"

function QnA() {
    const [askQuestion, setAskQuestion] = useState(false)
    const { register, handleSubmit } = useForm()

    const handleQuestionSubmit = (data) => {
        alert(data.question)
        setTimeout(() => {
            setAskQuestion(!askQuestion)
        }, 2000);
    }

    return (
        <div className="col-span-4 pb-4">
            <div className="bg-white h-auto w-auto flex flex-col md:flex-row items-center rounded-md mt-4 px-8 mb-4">
                <div className="mr-auto">
                    <h4 className="text-xl text-gray-600 font-bold">
                        Questions (147)
                    </h4>
                </div>

                <form className="max-w-sm hidden md:block">
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-400 text-gray-600 font-semibold text-xs rounded-md w-full px-3 py-1"
                    >
                        <option value="MH">Most Helpful</option>
                        <option value="MR">Most Recent</option>
                    </select>
                </form>

                <form className="max-w-[300px] w-full px-4 hidden md:block">
                    <div className="relative my-2">
                        <input
                            type="text"
                            name="q"
                            className="w-full border border-gray-400 h-8 shadow px-4 py-1 text-xs rounded-md focus:outline-none"
                            placeholder="Search Question & Answers"
                        />
                        <button type="submit">
                            <svg
                                className="text-gray-500 h-3 w-3 absolute top-2.5 right-2.5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 56.966 56.966"
                                contentStyleType="enable-background:new 0 0 56.966 56.966;"
                                xmlSpace="preserve"
                            >
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
                <button
                    className="flex w-auto px-4 py-1 bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer text-white font-semibold mt-4 md:mt-0"
                    onClick={() => setAskQuestion(!askQuestion)}
                >
                    <span>Ask a question</span>
                </button>
            </div>

            {askQuestion && (
                <form onSubmit={handleSubmit(handleQuestionSubmit)} className="my-4">
                    <div className="bg-white h-auto w-auto flex flex-col  rounded-md mt-4 px-8">
                        <label htmlFor="auction_question"></label>
                        <textarea
                            id="auction_question"
                            className="border border-gray-400 w-full px-4 py-2 focus:ring-[1px] focus:ring-blue-400 focus:border-transparent focus:outline-none"
                            placeholder="What would you like to know about this product?"
                            {...register("question")}
                        ></textarea>
                    </div>
                    <div className="w-full flex px-8">
                        <button className="px-4 rounded-sm text-green-700 border border-green-600 my-2 hover:bg-green-600 hover:text-white pb-0.5">
                            Submit
                        </button>
                    </div>
                </form>
            )}

            {/* QNA Container */}
            <div className="px-4 mx-4 mb-8">
                {/* Question Container */}
                <div className="p-4 border border-gray-300 rounded-md">
                    <div className="bg-blue-200 px-2 text-blue-700 rounded-sm font-semibold text-sm gap-1 inline-flex pb-0.5">
                        <IconContext.Provider
                            value={{ className: "text-blue-700 mt-1" }}
                        >
                            <FaRegQuestionCircle />
                        </IconContext.Provider>
                        <span>Question</span>
                    </div>
                    <div className="flex gap-3 ">
                        <div className="font-bold">Michael Gough</div>
                        <div className="font-semibold text-sm text-gray-500">
                            November 20, 2023 at 12:00 PM
                        </div>
                    </div>
                    <div className="font-semibold text-gray-500 mt-2">
                        The specs say this model has 2 USB ports. The one I
                        received has none. Are they hidden somewhere?
                    </div>
                    <div className="mt-2 font-semibold text-gray-500 flex">
                        <div>I have the same question</div>
                        <div class="flex ml-4">
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                />
                                <label
                                    for="inline-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    Yes(8)
                                </label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    for="inline-2-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    No(0)
                                </label>
                            </div>
                            <button className="px-3 py-1 bg-blue-200 rounded-sm text-blue-800 hidden">
                                <IconContext.Provider
                                    value={{
                                        className: "text-blue-800",
                                        size: "1.5em",
                                    }}
                                >
                                    <BsReply />
                                </IconContext.Provider>
                                <span className="ml-1">Reply</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Answer Container */}
                <div className="p-4 border border-gray-300 rounded-md mt-2 w-11/12 ml-auto">
                    <div className="bg-green-200 px-2 text-green-700 rounded-sm font-semibold text-sm gap-1 inline-flex pb-0.5">
                        <IconContext.Provider
                            value={{ className: "text-green-700 mt-1" }}
                        >
                            <MdOutlineQuestionAnswer />
                        </IconContext.Provider>
                        <span>Answer</span>
                    </div>
                    <div className="flex gap-3 ">
                        <div className="font-bold">Bonnie Green</div>
                        <div className="font-semibold text-sm text-gray-500">
                            November 20, 2023 at 12:45 PM
                        </div>
                    </div>
                    <div className="font-semibold text-gray-500 mt-2">
                        Hello Joseph, it's basically the same system as your
                        older machine, but bigger, lighter and faster. There is
                        no disc drive and it has fewer ports.
                    </div>
                    <div className="mt-2 font-semibold text-gray-500 flex">
                        <div>Was it helpful to you?</div>
                        <div class="flex ml-4">
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                />
                                <label
                                    for="inline-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    Yes(5)
                                </label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    for="inline-2-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    No(0)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 mx-4 mb-8">
                {/* Question Container */}
                <div className="p-4 border border-gray-300 rounded-md">
                    <div className="bg-blue-200 px-2 text-blue-700 rounded-sm font-semibold text-sm gap-1 inline-flex pb-0.5">
                        <IconContext.Provider
                            value={{ className: "text-blue-700 mt-1" }}
                        >
                            <FaRegQuestionCircle />
                        </IconContext.Provider>
                        <span>Question</span>
                    </div>
                    <div className="flex gap-3 ">
                        <div className="font-bold">Michael Gough</div>
                        <div className="font-semibold text-sm text-gray-500">
                            November 20, 2023 at 12:00 PM
                        </div>
                    </div>
                    <div className="font-semibold text-gray-500 mt-2">
                        The specs say this model has 2 USB ports. The one I
                        received has none. Are they hidden somewhere?
                    </div>
                    <div className="mt-2 font-semibold text-gray-500 flex">
                        <div>I have the same question</div>
                        <div class="flex ml-4">
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                />
                                <label
                                    for="inline-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    Yes(8)
                                </label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    for="inline-2-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    No(0)
                                </label>
                            </div>
                            <button className="px-3 py-1 bg-blue-200 rounded-sm text-blue-800 hidden">
                                <IconContext.Provider
                                    value={{
                                        className: "text-blue-800",
                                        size: "1.5em",
                                    }}
                                >
                                    <BsReply />
                                </IconContext.Provider>
                                <span className="ml-1">Reply</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Answer Container */}
                <div className="p-4 border border-gray-300 rounded-md mt-2 w-11/12 ml-auto">
                    <div className="bg-green-200 px-2 text-green-700 rounded-sm font-semibold text-sm gap-1 inline-flex pb-0.5">
                        <IconContext.Provider
                            value={{ className: "text-green-700 mt-1" }}
                        >
                            <MdOutlineQuestionAnswer />
                        </IconContext.Provider>
                        <span>Answer</span>
                    </div>
                    <div className="flex gap-3 ">
                        <div className="font-bold">Bonnie Green</div>
                        <div className="font-semibold text-sm text-gray-500">
                            November 20, 2023 at 12:45 PM
                        </div>
                    </div>
                    <div className="font-semibold text-gray-500 mt-2">
                        Hello Joseph, it's basically the same system as your
                        older machine, but bigger, lighter and faster. There is
                        no disc drive and it has fewer ports.
                    </div>
                    <div className="mt-2 font-semibold text-gray-500 flex">
                        <div>Was it helpful to you?</div>
                        <div class="flex ml-4">
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                />
                                <label
                                    for="inline-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    Yes(5)
                                </label>
                            </div>
                            <div class="flex items-center me-4">
                                <input
                                    id="inline-2-radio"
                                    type="radio"
                                    value=""
                                    name="inline-radio-group"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    for="inline-2-radio"
                                    class="ms-2 text-sm text-gray-800 font-semibold"
                                >
                                    No(0)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination bar */}
            <div className="flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul class="inline-flex -space-x-px text-sm mx-auto">
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-sm hover:bg-gray-100 hover:text-gray-700 "
                            >
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                4
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                5
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-sm hover:bg-gray-100 hover:text-gray-700"
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default QnA
