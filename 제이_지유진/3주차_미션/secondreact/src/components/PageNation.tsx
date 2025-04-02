interface PaginationProps {
  page: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-10 p-5">
      <button
        className="bg-rose-600 text-white rounded px-5 py-3 disabled:bg-gray-400 opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        {"<"}
      </button>
      <span className="text-white">{page}</span>
      <button
        className="bg-rose-600 text-white rounded px-5 py-3"
        onClick={() => onPageChange(page + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
