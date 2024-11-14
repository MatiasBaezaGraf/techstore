import { Pagination as PaginationType } from "@/app/types/types";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

export const PaginationControls = ({
	pagination,
	handlePageChange,
}: {
	pagination: PaginationType;
	handlePageChange: (page: number) => void;
}) => {
	const renderPageNumbers = () => {
		const { page, totalPages } = pagination;
		let startPage = Math.max(1, page - 1);
		let endPage = Math.min(totalPages, page + 1);

		if (page === 1) {
			endPage = Math.min(totalPages, 3);
		} else if (page === totalPages) {
			startPage = Math.max(1, totalPages - 2);
		}

		const pageNumbers = [];
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<PaginationItem key={i}>
					<Button
						className={`
							${
								i === page ? "bg-secondary-dark" : "bg-transparent"
							} text-alternative hover:bg-secondary-dark font-semibold
						`}
						onClick={() => handlePageChange(i)}
					>
						{i}
					</Button>
				</PaginationItem>
			);
		}
		return pageNumbers;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Button
						disabled={pagination.page === 1}
						className="bg-transparent hover:bg-secondary-dark"
						onClick={() => handlePageChange(1)}
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
				</PaginationItem>
				<PaginationItem>
					<Button
						disabled={pagination.page === 1}
						className="bg-transparent hover:bg-secondary-dark"
						onClick={() => handlePageChange(pagination.page - 1)}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
				</PaginationItem>
				{renderPageNumbers()}
				<PaginationItem>
					<Button
						disabled={pagination.page === pagination.totalPages}
						className="bg-transparent hover:bg-secondary-dark"
						onClick={() => handlePageChange(pagination.page + 1)}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</PaginationItem>
				<PaginationItem>
					<Button
						disabled={pagination.page === pagination.totalPages}
						className="bg-transparent hover:bg-secondary-dark"
						onClick={() => handlePageChange(pagination.totalPages)}
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
