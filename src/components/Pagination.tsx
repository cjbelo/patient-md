import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useUIStore } from "@/store/uiStore";

type Props = {
  total: number;
  className?: string;
};

function buildPages(current: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];

  const left = Math.max(2, current - 1);
  const right = Math.min(totalPages - 1, current + 1);

  if (left > 2) pages.push("...");
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < totalPages - 1) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export default function Pagination({ total = 0, className = "" }: Props) {
  const { page, pageSize, setPage } = useUIStore();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const safePage = Math.min(page, totalPages);
  if (safePage !== page) setPage(safePage);

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = total === 0 ? 0 : Math.min(total, safePage * pageSize);

  const items = buildPages(safePage, totalPages);

  const goPrev = () => safePage > 1 && setPage(safePage - 1);
  const goNext = () => safePage < totalPages && setPage(safePage + 1);

  if (totalPages <= 1) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between sm:hidden">
        <button
          type="button"
          onClick={goPrev}
          disabled={safePage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white cursor-pointer pointer-fine:hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={safePage >= totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white cursor-pointer pointer-fine:hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
            <button
              type="button"
              onClick={goPrev}
              disabled={safePage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer pointer-fine:hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <CaretLeftIcon className="w-5 h-5" />
            </button>

            {items.map((it, idx) =>
              it === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={it}
                  aria-current={it === safePage ? "page" : undefined}
                  onClick={() => setPage(it as number)}
                  className={
                    it === safePage
                      ? "z-10 bg-blue-500 border-blue-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      : "bg-white border-gray-300 text-gray-500 cursor-pointer pointer-fine:hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                >
                  {it}
                </button>
              )
            )}

            <button
              type="button"
              onClick={goNext}
              disabled={safePage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-pointer pointer-fine:hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <CaretRightIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
