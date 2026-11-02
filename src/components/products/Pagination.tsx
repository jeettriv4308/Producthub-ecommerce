
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">

      {/* Previous button */}
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="pagination-pages">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            className={`pagination-page ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-current={
              currentPage === page ? "page" : undefined
            }
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
  );
}
