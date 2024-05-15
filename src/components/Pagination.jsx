import { forwardRef, useMemo } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IconContext } from "react-icons";

const Pagination = forwardRef(
    (
        { totalCount, siblingCount = 1, currentPage, pageSize, onPageChange },
        ref
    ) => {
        const handlePageChange = (pageNumber) => {
            if (onPageChange) {
                onPageChange(pageNumber)
            }
        }

        const paginationRange = useMemo(() => {
            const totalPageCount = Math.ceil(totalCount / pageSize)

            if (totalPageCount === 1) return null

            const totalPageNumbers = siblingCount + 5

            if (totalPageNumbers >= totalPageCount) {
                return Array.from({ length: totalPageCount }, (_, i) => i + 1)
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPageCount
            )
            const shouldShowLeftDots = leftSiblingIndex > 2
            const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * siblingCount
                return [...Array(leftItemCount).keys()].map((i) => i + 1)
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblingCount
                return [...Array(rightItemCount).keys()].map(
                    (i) => totalPageCount - rightItemCount + i + 1
                )
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = Array.from(
                    { length: rightSiblingIndex - leftSiblingIndex + 1 },
                    (_, i) => leftSiblingIndex + i
                )
                return [1, "...", ...middleRange, "...", totalPageCount]
            }
        }, [totalCount, pageSize, siblingCount, currentPage])

        return (
            <div className="pagination flex justify-center mt-4">
                {paginationRange && (
                    <button
                        className={`pagination-item mx-1 px-1 py-1 border ${currentPage === 1 ? "text-gray-300 border-gray-300" : "text-gray-500 border-gray-500"} hover:bg-gray-500 hover:text-white`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <FaAngleLeft />
                        </IconContext.Provider>
                    </button>
                )}

                {paginationRange?.map((pageNumber, index) => (
                    <button
                        key={index}
                        className={`pagination-item mx-1 px-3 py-1 border font-semibold hover:bg-gray-500 hover:text-white ${
                            pageNumber === currentPage
                                ? "bg-gray-500 text-white"
                                : "bg-white text-gray-500"
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                {paginationRange && (
                    <button
                        className={`pagination-item mx-1 px-1 py-1 border ${currentPage === Math.ceil(totalCount / pageSize)? "border-gray-300 text-gray-300" : "border-gray-500 text-gray-500"}  hover:bg-gray-500 hover:text-white`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                            currentPage === Math.ceil(totalCount / pageSize)
                        }
                    >
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <FaAngleRight />
                        </IconContext.Provider>
                    </button>
                )}
            </div>
        )
    }
)

export default Pagination
