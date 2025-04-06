type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, goToPage }: PaginationProps) => (
  <div className="pagination">
    <button
      className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      이전
    </button>
    <span className="pagination-info">
      {currentPage} / {totalPages}
    </span>
    <button
      className={`pagination-button ${
        currentPage === totalPages ? "disabled" : ""
      }`}
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      다음
    </button>
  </div>
);

export default Pagination;
