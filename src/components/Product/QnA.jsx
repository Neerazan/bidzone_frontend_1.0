import React from "react"

import { FaRegQuestionCircle } from "react-icons/fa"
import { MdOutlineQuestionAnswer } from "react-icons/md"
import { BsReply } from "react-icons/bs"
import { BiSolidEdit, BiTrash } from "react-icons/bi"
import { IconContext } from "react-icons"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import axios from "axios"

import { addQuestion, addAnswer, deleteQuestion, deleteAnswer } from "../../store/Auction/QnASlice"
import { FormattedDate } from "../index"
import { fetchQnAData } from "../../store/Auction/QnASlice"

function QnA({ auctionId, seller }) {
    const [askQuestion, setAskQuestion] = useState(false)
    const [replyQuestionId, setReplyQuestionId] = useState(null)
    // const [deleteQuestionId, setDeletedQuestionId] = useState(null)

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    const qnas = useSelector((state) => state.qna.qnas)
    const accessKey = useSelector((state) => state.auth.accessKey)
    const user = useSelector((state) => state.auth.userData)

    const AddQuestionMutation = useMutation(
        async ({ auctionId, data, accessKey }) => {
            console.log("Inside addquestionmutattion function")
            try {
                const response = await axios.post(
                    `http://localhost:8000/auction/auctions/${auctionId}/questions/`,
                    data,
                    {
                        headers: {
                            Authorization: `JWT ${accessKey}`,
                        },
                    }
                )
                return response.data
            } catch (error) {
                console.error("Error adding question:", error)
            }
        }
    )


    const AddQuestionAnswerMutation = useMutation(
        async ({ auctionId, questionId, data, accessKey }) => {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/auction/auctions/${auctionId}/questions/${questionId}/answers/`,
                    data,
                    {
                        headers: {
                            Authorization: `JWT ${accessKey}`,
                        },
                    }
                )
                return response.data
            } catch (error) {
                console.error("Error adding question:", error)
            }
        }
    )


    const DeleteQuestionMutation = useMutation(
        async ({auctionId, questionId, accessKey}) => {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/auction/auctions/${auctionId}/questions/${questionId}/`, {
                    headers: {
                        Authorization: `JWT ${accessKey}`
                    }
                })
                return response.data
            } catch (error) {
                console.log("Error Adding Questoin:", error)
            }
        }
    )



    const DeleteAnswerMutation = useMutation(
        async({accessKey, questionId, answerId, auctionId}) => {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/auction/auctions/${auctionId}/questions/${questionId}/answers/${answerId}/`, {
                    headers: {
                        Authorization: `JWT ${accessKey}`
                    }
                })
                return response.data
            } catch (error) {
                console.log(error)
            }
        }
    )


    const handleAnswerDelete = ({ questionId, answerId }) => {
        console.log(`Question and Answer id inside handleAnswerDelete function: ${questionId} and ${answerId}`);
        DeleteAnswerMutation.mutate(
            {
                auctionId,
                questionId,
                answerId,
                accessKey
            },
            {
                onSuccess: () => {
                    dispatch(deleteAnswer({questionId: questionId, answerId: answerId}))
                }
            }
        )
    }

    const handleQuestionDelete = (questionId) => {
        DeleteQuestionMutation.mutate(
            {
                auctionId,
                questionId,
                accessKey
            },
            {
                onSuccess: () => {
                    dispatch(deleteQuestion({questionId: questionId}))
                },
            }
        )
    }

    const handleQuestionSubmit = (data) => {
        const formData = new FormData()
        formData.append("question", data.question)

        AddQuestionMutation.mutate(
            {
                auctionId,
                data: formData,
                accessKey,
            },
            {
                onSuccess: (data) => {
                    dispatch(addQuestion(data))
                    setAskQuestion(!askQuestion)
                },
                onError: (error) => {
                    console.log("Error adding question:", error)
                },
            }
        )
    }

    const handleAnswerSubmit = (data) => {
        const formData = new FormData()
        formData.append("answer", data.answer)

        AddQuestionAnswerMutation.mutate(
            {
                auctionId,
                questionId: replyQuestionId,
                data: formData,
                accessKey,
            },
            {
                onSuccess: (data) => {
                    console.log("Data:", data)
                    console.log("Answer added successfully")
                    dispatch(
                        addAnswer({ questionId: replyQuestionId, answer: data })
                    )
                    setReplyQuestionId(null)
                },
            },
            {
                onError: (error) => {
                    console.log("Error adding answer:", error)
                },
            }
        )
    }

    useEffect(() => {
        // console.log("Inside useeffect");
        dispatch(fetchQnAData(auctionId))
    }, [])

    return (
        <div className="col-span-4 pb-4">
            <div className="bg-white h-auto w-auto flex flex-col md:flex-row items-center rounded-md mt-4 px-8 mb-4">
                <div className="mr-auto">
                    <h4 className="text-xl text-gray-600 font-bold">
                        Questions ({qnas?.count})
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
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    askQuestion ? "max-h-64" : "max-h-0 overflow-hidden"
                }`}
            >
                {askQuestion && (
                    <form
                        onSubmit={handleSubmit(handleQuestionSubmit)}
                        className="my-4"
                    >
                        <div className="bg-white h-auto w-auto flex flex-col  rounded-md mt-4 px-8">
                            <label htmlFor="auction_question"></label>
                            <textarea
                                id="auction_question"
                                className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="What would you like to know about this product?"
                                {...register("question")}
                            ></textarea>
                        </div>
                        <div className="w-full flex px-8">
                            <button className="px-4 rounded-sm text-green-700 border border-green-600 my-2 hover:bg-green-600 hover:text-white pb-0.5 transition ease-in-out duration-500">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* QNA Container */}
            {qnas &&
                qnas?.results?.map((qna) => (
                    <div className="px-4 mx-4 mb-8" key={qna.id}>
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
                                <div className="font-bold">
                                    {qna.customer.first_name}{" "}
                                    {qna.customer.last_name}
                                </div>
                                <div className="font-semibold text-sm text-gray-500">
                                    <FormattedDate date={qna.updated_at} />
                                </div>
                            </div>
                            <div className="font-semibold text-gray-500 mt-2">
                                {qna.question}
                            </div>
                            <div className="mt-2 font-semibold text-gray-500 flex">
                                <div>I have the same question</div>
                                <div className="flex ml-4">
                                    <div className="flex items-center me-4">
                                        <input
                                            id="inline-radio"
                                            type="radio"
                                            value=""
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                        />
                                        <label
                                            htmlFor="inline-radio"
                                            className="ms-2 text-sm text-gray-800 font-semibold"
                                        >
                                            Yes(8)
                                        </label>
                                    </div>
                                    <div className="flex items-center me-4">
                                        <input
                                            id="inline-2-radio"
                                            type="radio"
                                            value=""
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="inline-2-radio"
                                            className="ms-2 text-sm text-gray-800 font-semibold"
                                        >
                                            No(0)
                                        </label>
                                    </div>
                                    {user.id === seller.id && (
                                        <button
                                            className="flex px-2 border border-gray-400 rounded-sm hover:bg-gray-400 hover:text-white transition ease-in-out duration-500"
                                            onClick={() =>
                                                replyQuestionId === qna.id
                                                    ? setReplyQuestionId(null)
                                                    : setReplyQuestionId(qna.id)
                                            }
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    className: "mt-0.5",
                                                }}
                                            >
                                                <BsReply />
                                            </IconContext.Provider>
                                            <span className="ml-1 text-sm">
                                                Reply
                                            </span>
                                        </button>
                                    )}

                                    {user.id === qna.customer.id && (
                                        <div className="flex justify-end ml-2">
                                            <div className="flex gap-2">
                                                <button className="flex text-blue-700 px-2 border border-blue-700 rounded-sm hover:bg-blue-600 hover:text-white transition ease-in-out duration-500">
                                                    <IconContext.Provider
                                                        value={{
                                                            className: "mt-0.5",
                                                        }}
                                                    >
                                                        <BiSolidEdit />
                                                    </IconContext.Provider>
                                                    <span className="ml-1 text-sm">
                                                        Edit
                                                    </span>
                                                </button>
                                                <button 
                                                    className="flex text-red-500 px-2 border border-red-500 rounded-sm hover:bg-red-500 hover:text-white transition ease-in-out duration-500"
                                                    onClick={() => {
                                                        // setDeletedQuestionId(qna.id)
                                                        // console.log(`Deleted Question Id inside onClick: ${deleteQuestionId}`);
                                                        handleQuestionDelete(qna.id)
                                                    }}
                                                >
                                                    <IconContext.Provider
                                                        value={{
                                                            className: "mt-0.5",
                                                        }}
                                                    >
                                                        <BiTrash />
                                                    </IconContext.Provider>
                                                    <span className="ml-1 text-sm">
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                    replyQuestionId ? "max-h-64" : "max-h-0"
                                }`}
                            >
                                {qna.id === replyQuestionId && (
                                    <div>
                                        <form
                                            onSubmit={handleSubmit(
                                                handleAnswerSubmit
                                            )}
                                            className="my-4"
                                        >
                                            <div className="bg-white h-auto w-auto flex flex-col  rounded-md mt-4">
                                                <label htmlFor="auction_question_answer"></label>
                                                <textarea
                                                    id="auction_question_answer"
                                                    className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                                                    placeholder="Answer the question here..."
                                                    {...register("answer")}
                                                ></textarea>
                                            </div>
                                            <div className="w-full flex">
                                                <button className="px-4 rounded-sm text-green-700 border border-green-600 my-2 hover:bg-green-600 hover:text-white pb-0.5 transition ease-in-out duration-500">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Answer Container */}
                        {qna.answers &&
                            qna.answers.map((answer) => (
                                <div
                                    className="p-4 border border-gray-300 rounded-md mt-2 w-11/12 ml-auto"
                                    key={answer.id}
                                >
                                    <div className="bg-green-200 px-2 text-green-700 rounded-sm font-semibold text-sm gap-1 inline-flex pb-0.5">
                                        <IconContext.Provider
                                            value={{
                                                className:
                                                    "text-green-700 mt-1",
                                            }}
                                        >
                                            <MdOutlineQuestionAnswer />
                                        </IconContext.Provider>
                                        <span>Answer</span>
                                    </div>
                                    <div className="flex gap-3 ">
                                        <div className="font-bold">
                                            {seller.first_name +
                                                " " +
                                                seller.last_name}
                                        </div>
                                        <div className="font-semibold text-sm text-gray-500">
                                            <FormattedDate
                                                date={answer.updated_at}
                                            />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-500 mt-2">
                                        {answer.answer}
                                    </div>
                                    <div className="mt-2 font-semibold text-gray-500 flex">
                                        <div>Was it helpful to you?</div>
                                        <div className="flex ml-4">
                                            <div className="flex items-center me-4">
                                                <input
                                                    id="inline-radio"
                                                    type="radio"
                                                    value=""
                                                    name="inline-radio-group"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                                />
                                                <label
                                                    htmlFor="inline-radio"
                                                    className="ms-2 text-sm text-gray-800 font-semibold"
                                                >
                                                    Yes(5)
                                                </label>
                                            </div>
                                            <div className="flex items-center me-4">
                                                <input
                                                    id="inline-2-radio"
                                                    type="radio"
                                                    value=""
                                                    name="inline-radio-group"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="inline-2-radio"
                                                    className="ms-2 text-sm text-gray-800 font-semibold"
                                                >
                                                    No(0)
                                                </label>
                                            </div>

                                            {user.id === seller.id && (
                                                <div className="flex justify-end ml-2">
                                                    <div className="flex gap-2">
                                                        <button className="flex text-blue-700 px-2 border border-blue-700 rounded-sm hover:bg-blue-600 hover:text-white transition ease-in-out duration-500">
                                                            <IconContext.Provider
                                                                value={{
                                                                    className:
                                                                        "mt-0.5",
                                                                }}
                                                            >
                                                                <BiSolidEdit />
                                                            </IconContext.Provider>
                                                            <span className="ml-1 text-sm">
                                                                Edit
                                                            </span>
                                                        </button>
                                                        <button 
                                                            className="flex text-red-500 px-2 border border-red-500 rounded-sm hover:bg-red-500 hover:text-white transition ease-in-out duration-500"
                                                            onClick={() => {
                                                                handleAnswerDelete({ questionId:qna.id, answerId:answer.id })
                                                            }}
                                                        >
                                                            <IconContext.Provider
                                                                value={{
                                                                    className:
                                                                        "mt-0.5",
                                                                }}
                                                            >
                                                                <BiTrash />
                                                            </IconContext.Provider>
                                                            <span className="ml-1 text-sm">
                                                                Delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}

            {/* Pagination bar */}
            {qnas?.next !== null && (
                <div className="flex justify-center">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm mx-auto">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-sm hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                >
                                    4
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    5
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-sm hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default QnA