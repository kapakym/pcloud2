import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange
}) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	const renderPageNumbers = () => {
		const pageNumbers = []

		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				pageNumbers.push(
					<button
						key={i}
						onClick={() => handlePageChange(i)}
						className={`px-3 py-1 mx-1 rounded ${
							i === currentPage
								? ' text-green-600'
								: ' text-gray-300  hover:text-white'
						}`}
					>
						{i}
					</button>
				)
			} else if (
				(i === currentPage - 2 || i === currentPage + 2) &&
				i !== 1 &&
				i !== totalPages
			) {
				pageNumbers.push(
					<span
						key={i}
						className='px-3 py-1 mx-1'
					>
						...
					</span>
				)
			}
		}

		return pageNumbers
	}

	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-t-xl'>
			{totalPages > 1 && (
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className='px-3 py-1 mx-1 rounded  text-gray-300  hover:text-white  disabled:text-gray-500 cursor-pointer'
				>
					<ArrowLeft size={28} />
				</button>
			)}

			<div>{renderPageNumbers()}</div>

			{totalPages > 1 && (
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className='px-3 py-1 mx-1 rounded  text-gray-300  hover:text-white  disabled:text-gray-500 cursor-pointer'
				>
					<ArrowRight size={28} />
				</button>
			)}
		</div>
	)
}

export default Pagination
