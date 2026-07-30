function ShopToolbar({
  onFilterToggle,
  viewMode,
  onViewModeChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  selectedFilters,
  onRemoveFilter,
  onClearFilters,
}) {
  return (
    <>
      <div className="mn-pro-list-top d-flex">
        <div className="col-md-4 mn-grid-list">
          <div className="mn-gl-btn">
            <button
              aria-label="Open filters"
              className="grid-btn filter-toggle-icon"
              onClick={onFilterToggle}
              type="button"
            >
              <i className="ri-filter-2-line"></i>
            </button>
            <button
              aria-label="Grid view"
              className={`grid-btn btn-grid-50 ${
                viewMode === "grid" ? "active" : ""
              }`}
              onClick={() => onViewModeChange?.("grid")}
              type="button"
            >
              <i className="ri-gallery-view-2"></i>
            </button>
            <button
              aria-label="List view"
              className={`grid-btn btn-list-50 ${
                viewMode === "list" ? "active" : ""
              }`}
              onClick={() => onViewModeChange?.("list")}
              type="button"
            >
              <i className="ri-list-check-2"></i>
            </button>
          </div>
        </div>

        <div className="col-md-8 mn-sort-select">
          <label className="mn-shop-search">
            <span className="visually-hidden">Search products</span>
            <i className="ri-search-line"></i>
            <input
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products"
              type="search"
              value={search}
            />
          </label>

          <div className="mn-select-inner">
            <select
              aria-label="Sort products"
              id="mn-select"
              name="mn-select"
              onChange={(event) => onSortChange(event.target.value)}
              value={sort}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name, A to Z</option>
              <option value="name-desc">Name, Z to A</option>
              <option value="price-low">Price, low to high</option>
              <option value="price-high">Price, high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>
      </div>

      {selectedFilters.length > 0 && (
        <div className="mn-select-bar d-flex">
          {selectedFilters.map((filter) => (
            <span className="mn-select-btn" key={filter.key}>
              {filter.label}
              <button
                aria-label={`Remove ${filter.label}`}
                className="mn-select-cancel"
                onClick={() => onRemoveFilter(filter.key)}
                type="button"
              >
                &times;
              </button>
            </span>
          ))}

          <span className="mn-select-btn mn-select-btn-clear">
            <button
              className="mn-select-clear"
              onClick={onClearFilters}
              type="button"
            >
              Clear All
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default ShopToolbar;
