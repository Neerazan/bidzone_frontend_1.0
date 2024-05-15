import { forwardRef, useMemo } from "react"

const Pagination = forwardRef(
    ({ totalCount, siblingCount = 1, currentPage, pageSize, onPageChange }, ref) => {
        const handlePageChange = (pageNumber) => {
            console.log("Inside handlepagechange function");
            if (onPageChange) {
                onPageChange(pageNumber)
            }
        }

        const paginationRange = useMemo(() => {
            const totalPageCount = Math.ceil(totalCount / pageSize)
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
                {paginationRange?.map((pageNumber, index) => (
                    <button
                        key={index}
                        className={`pagination-item mx-1 px-3 py-1 border ${
                            pageNumber === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        )
    }
)

export default Pagination
