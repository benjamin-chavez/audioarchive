// apps/client/src/app/(browse)/(with-layout)/products/components/selected-filters-bar.tsx

export function SelectedFiltersBar({
  activeFilters,
  setActiveFilters,
}: {
  activeFilters: any;
  setActiveFilters: any;
}) {
  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter !== filterToRemove,
    );

    setActiveFilters(updatedFilters);
  };

  return (
    <>
      {/* Active filters */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 className="text-sm font-medium text-gray-500">
            Filters
            <span className="sr-only">, active</span>
          </h3>

          <div
            aria-hidden="true"
            className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
          />

          <div className="mt-2 sm:ml-4 sm:mt-0">
            <div className="-m-1 flex flex-wrap items-center">
              {activeFilters?.map((activeFilter) => (
                <span
                  key={activeFilter.value}
                  className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                >
                  {/* <span>{activeFilter.label}</span> */}
                  <span>{activeFilter}</span>
                  <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    onClick={() => handleRemoveFilter(activeFilter)}
                  >
                    <span className="sr-only">
                      Remove filter for {activeFilter.label}
                    </span>
                    <svg
                      className="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
