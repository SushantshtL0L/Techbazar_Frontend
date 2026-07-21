import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-3 mt-24 pb-10">
            {/* Previous Arrow */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-neutral-400 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg"
            >
                <FiChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-12 h-12 flex items-center justify-center text-[16px] font-bold transition-all rounded-lg border ${currentPage === page
                        ? "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)] shadow-lg"
                        : "bg-[var(--card-bg)] border-[var(--border-color)] text-neutral-400 hover:border-neutral-400"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Arrow */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-neutral-400 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg"
            >
                <FiChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
