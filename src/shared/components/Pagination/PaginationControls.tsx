import React from "react";

interface PaginationControlsProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (size: number) => void;
}

const PaginationControls = ({
  pageIndex,
  pageSize,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  setPageSize,
}: PaginationControlsProps) => {
  return (
    <div className="pagination">
      <button onClick={previousPage} disabled={!canPreviousPage}>
        {"<"}
      </button>
      <span>
        {pageIndex + 1} of {pageCount}
      </span>
      <button onClick={nextPage} disabled={!canNextPage}>
        {">"}
      </button>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationControls;
