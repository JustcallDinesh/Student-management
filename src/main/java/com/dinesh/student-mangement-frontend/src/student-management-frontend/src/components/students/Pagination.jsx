const Pagination = ({
  currentPage,
  totalPages,
  previousPage,
  nextPage,
  goToPage,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

      {/* Previous */}

      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-white
          backdrop-blur-md
          transition
          hover:bg-indigo-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      {/* Page Numbers */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`
            h-10
            w-10
            rounded-xl
            transition
            ${
              currentPage === page
                ? "bg-indigo-600 text-white shadow-lg"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-white
          backdrop-blur-md
          transition
          hover:bg-indigo-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;