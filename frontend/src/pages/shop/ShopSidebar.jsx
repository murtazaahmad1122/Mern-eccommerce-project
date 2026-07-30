function ShopSidebar({
  isOpen,
  onClose,
  categories,
  categoriesLoading,
  categoriesError,
  onRetryCategories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  productTypeFilters,
  productTypeOptions,
  onProductTypeChange,
  onClearFilters,
}) {
  return (
    <>
      <div
        className="filter-sidebar-overlay"
        onClick={onClose}
        style={{ display: isOpen ? "block" : undefined }}
      ></div>

      <div
        className={`mn-shop-sidebar mn-filter-sidebar col-lg-3 col-md-12 ${
          isOpen ? "filter-sidebar-open" : ""
        }`}
      >
        <div id="shop_sidebar">
          <div className="mn-sidebar-wrap">
            <div className="mn-sidebar-block drop">
              <div className="mn-sb-title">
                <h3 className="mn-sidebar-title">Categories</h3>
                <button
                  aria-label="Close filters"
                  className="filter-close mn-filter-close-button"
                  onClick={onClose}
                  type="button"
                >
                  <i className="ri-close-large-line"></i>
                </button>
              </div>

              {categoriesLoading && (
                <p className="mn-filter-message">Loading categories...</p>
              )}
              {!categoriesLoading && categoriesError && (
                <div className="mn-filter-message">
                  <p>{categoriesError}</p>
                  <button onClick={onRetryCategories} type="button">
                    Retry
                  </button>
                </div>
              )}
              {!categoriesLoading && !categoriesError && (
                <div className="mn-filter-category-list">
                  <button
                    className={!selectedCategory ? "active" : ""}
                    onClick={() => onCategoryChange("")}
                    type="button"
                  >
                    <span>All categories</span>
                  </button>

                  {categories.map((category) => (
                    <div className="mn-filter-category" key={category._id}>
                      <button
                        className={
                          selectedCategory === category.name ? "active" : ""
                        }
                        onClick={() => onCategoryChange(category.name)}
                        type="button"
                      >
                        <span>{category.name}</span>
                        <small>{category.productCount || 0}</small>
                      </button>

                      {category.subcategories?.length > 0 && (
                        <div className="mn-filter-subcategories">
                          {category.subcategories.map((subcategory) => (
                            <button
                              className={
                                selectedCategory === subcategory ? "active" : ""
                              }
                              key={subcategory}
                              onClick={() => onCategoryChange(subcategory)}
                              type="button"
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mn-sidebar-block">
              <div className="mn-sb-title">
                <h3 className="mn-sidebar-title">Product Type</h3>
              </div>

              <div className="mn-sb-block-content">
                <ul>
                  {productTypeOptions.map((option) => (
                    <li key={option.key}>
                      <label className="mn-sidebar-block-item mn-api-filter-option">
                        <input
                          checked={productTypeFilters[option.key]}
                          onChange={(event) =>
                            onProductTypeChange(option.key, event.target.checked)
                          }
                          type="checkbox"
                        />
                        <span>{option.label}</span>
                        <span className="checked"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mn-sidebar-block">
              <div className="mn-sb-title">
                <h3 className="mn-sidebar-title">Price</h3>
              </div>

              <div className="mn-sb-block-content mn-price-range-slider">
                <div className="mn-price-filter">
                  <div className="mn-price-input">
                    <label className="filter__label">
                      From
                      <input
                        className="filter__input"
                        min="0"
                        onChange={(event) => onMinPriceChange(event.target.value)}
                        placeholder="0"
                        type="number"
                        value={minPrice}
                      />
                    </label>
                    <span className="mn-price-divider"></span>
                    <label className="filter__label">
                      To
                      <input
                        className="filter__input"
                        min="0"
                        onChange={(event) => onMaxPriceChange(event.target.value)}
                        placeholder="Any"
                        type="number"
                        value={maxPrice}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mn-btn-2 mn-clear-filter-button"
              onClick={onClearFilters}
              type="button"
            >
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopSidebar;
