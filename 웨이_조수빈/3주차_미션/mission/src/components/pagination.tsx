type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
      <div className="flex justify-center items-center gap-4 my-10 select-none">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded transition ${
            currentPage === 1
              ? "bg-gray-400 text-white"
              : "bg-gray-700 cursor-pointer text-white hover:bg-gray-600"
          }`}
        >
          이전
        </button>
  
        <span className="text-black/70 font-semibold">
          {currentPage} / {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded transition ${
            currentPage === totalPages
              ? "bg-gray-400 text-white"
              : "bg-gray-700 cursor-pointer text-white hover:bg-gray-600"
          }`}
        >
          다음
        </button>
      </div>
    );
  }
  
  