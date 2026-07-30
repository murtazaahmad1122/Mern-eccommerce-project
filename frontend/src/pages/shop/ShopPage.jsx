import { useDeferredValue, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useApiCollection from "../../hooks/useApiCollection";
import SectionStatus from "../../components/main/sections/SectionStatus";
import ShopSidebar from "./ShopSidebar";
import ShopToolbar from "./ShopToolbar";
import ShopProductCard from "./ShopProductCard";

const PAGE_SIZE = 12;
const PRODUCT_TYPE_FILTERS = [
  { key: "isNewArrival", label: "New arrivals" },
  { key: "isDeal", label: "Deals" },
  { key: "isFeatured", label: "Featured" },
  { key: "isTrending", label: "Trending" },
  { key: "activeDeal", label: "Active deals" },
];

function ShopPage({ onOpenQuickView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(createEmptyPagination);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const {
    items: categories,
    loading: categoriesLoading,
    errorMessage: categoriesError,
    retry: retryCategories,
  } = useApiCollection("/categories", "Unable to load category filters.");

  const search = searchParams.get("search") || "";
  const deferredSearch = useDeferredValue(search);
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "latest";
  const page = getPositiveInteger(searchParams.get("page"), 1);
  const isNewArrival = searchParams.get("isNewArrival") === "true";
  const isDeal = searchParams.get("isDeal") === "true";
  const isFeatured = searchParams.get("isFeatured") === "true";
  const isTrending = searchParams.get("isTrending") === "true";
  const activeDeal = searchParams.get("activeDeal") === "true";
  const productTypeFilters = {
    isNewArrival,
    isDeal,
    isFeatured,
    isTrending,
    activeDeal,
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setErrorMessage("");

        const query = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          sort,
        });

        if (deferredSearch) query.set("search", deferredSearch);
        if (category) query.set("category", category);
        if (minPrice) query.set("minPrice", minPrice);
        if (maxPrice) query.set("maxPrice", maxPrice);
        if (isNewArrival) query.set("isNewArrival", "true");
        if (isDeal) query.set("isDeal", "true");
        if (isFeatured) query.set("isFeatured", "true");
        if (isTrending) query.set("isTrending", "true");
        if (activeDeal) query.set("activeDeal", "true");

        const response = await axiosInstance.get(`/products?${query}`, {
          signal: controller.signal,
        });

        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
        setPagination(response.data.pagination || createEmptyPagination());
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setProducts([]);
          setPagination(createEmptyPagination());
          setErrorMessage(
            error.response?.data?.message || "Unable to load products.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [
    category,
    deferredSearch,
    maxPrice,
    minPrice,
    page,
    reloadKey,
    sort,
    activeDeal,
    isDeal,
    isFeatured,
    isNewArrival,
    isTrending,
  ]);

  const updateFilter = (key, value) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value === "" || value == null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }

      if (key !== "page") {
        nextParams.delete("page");
      }

      return nextParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const removeFilter = (key) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (key === "price") {
        nextParams.delete("minPrice");
        nextParams.delete("maxPrice");
      } else {
        nextParams.delete(key);
      }

      nextParams.delete("page");
      return nextParams;
    });
  };

  const selectedFilters = [
    category && { key: "category", label: `Category: ${category}` },
    search && { key: "search", label: `Search: ${search}` },
    (minPrice || maxPrice) && {
      key: "price",
      label: `Price: ${minPrice || "0"} – ${maxPrice || "Any"}`,
    },
    ...PRODUCT_TYPE_FILTERS.filter(
      (filter) => productTypeFilters[filter.key],
    ).map((filter) => ({
      key: filter.key,
      label: filter.label,
    })),
  ].filter(Boolean);

  return (
    <div className="mn-main-content">
      <div className="mn-breadcrumb m-b-30">
        <div className="row">
          <div className="col-12">
            <div className="row gi_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="mn-breadcrumb-title">Shop Page</h2>
              </div>

              <div className="col-md-6 col-sm-12">
                <ul className="mn-breadcrumb-list">
                  <li className="mn-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mn-breadcrumb-item active">Shop Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-12">
          <section className="mn-shop">
            <div className="row">
              <ShopSidebar
                categories={categories}
                categoriesError={categoriesError}
                categoriesLoading={categoriesLoading}
                isOpen={isFilterOpen}
                maxPrice={maxPrice}
                minPrice={minPrice}
                onCategoryChange={(value) => {
                  updateFilter("category", value);
                  setIsFilterOpen(false);
                }}
                onClearFilters={clearFilters}
                onClose={() => setIsFilterOpen(false)}
                onMaxPriceChange={(value) => updateFilter("maxPrice", value)}
                onMinPriceChange={(value) => updateFilter("minPrice", value)}
                onProductTypeChange={(key, checked) =>
                  updateFilter(key, checked ? "true" : "")
                }
                onRetryCategories={retryCategories}
                productTypeFilters={productTypeFilters}
                productTypeOptions={PRODUCT_TYPE_FILTERS}
                selectedCategory={category}
              />

              <div className="mn-shop-rightside col-md-12 m-t-991">
                <ShopToolbar
                  onClearFilters={clearFilters}
                  onFilterToggle={() => setIsFilterOpen(true)}
                  onRemoveFilter={removeFilter}
                  onSearchChange={(value) => updateFilter("search", value)}
                  onSortChange={(value) => updateFilter("sort", value)}
                  onViewModeChange={setViewMode}
                  search={search}
                  selectedFilters={selectedFilters}
                  sort={sort}
                  viewMode={viewMode}
                />

                <div className="shop-pro-content">
                  {loading && <SectionStatus message="Loading products..." />}
                  {!loading && errorMessage && (
                    <SectionStatus
                      message={errorMessage}
                      onRetry={() => setReloadKey((currentKey) => currentKey + 1)}
                    />
                  )}
                  {!loading && !errorMessage && products.length === 0 && (
                    <SectionStatus message="No products match these filters." />
                  )}
                  {!loading && !errorMessage && products.length > 0 && (
                    <>
                      <div
                        className={`shop-pro-inner ${
                          viewMode === "list" ? "list-view-50" : ""
                        }`}
                      >
                        <div className="row">
                          {products.map((product) => (
                            <ShopProductCard
                              isListView={viewMode === "list"}
                              key={product._id}
                              onOpenQuickView={onOpenQuickView}
                              product={product}
                            />
                          ))}
                        </div>
                      </div>

                      <CatalogPagination
                        onPageChange={(nextPage) =>
                          updateFilter("page", nextPage)
                        }
                        pagination={pagination}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CatalogPagination({ pagination, onPageChange }) {
  const {
    currentPage,
    totalPages,
    totalProducts,
    totalShowing,
    limit,
  } = pagination;
  const firstItem = totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1;
  const lastItem = firstItem + totalShowing - 1;
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mn-pro-pagination m-b-15">
      <span>
        Showing {firstItem}-{lastItem} of {totalProducts} item(s)
      </span>

      {totalPages > 1 && (
        <ul className="mn-pro-pagination-inner">
          {pages.map((pageNumber, index) =>
            pageNumber === "ellipsis" ? (
              <li key={`ellipsis-${index}`}>
                <span>…</span>
              </li>
            ) : (
              <li key={pageNumber}>
                <button
                  className={pageNumber === currentPage ? "active" : ""}
                  onClick={() => onPageChange(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              </li>
            ),
          )}

          {currentPage < totalPages && (
            <li>
              <button
                className="next"
                onClick={() => onPageChange(currentPage + 1)}
                type="button"
              >
                Next <i className="ri-arrow-right-double-line"></i>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const validPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);
  const result = [];

  validPages.forEach((pageNumber, index) => {
    if (index > 0 && pageNumber - validPages[index - 1] > 1) {
      result.push("ellipsis");
    }

    result.push(pageNumber);
  });

  return result;
}

function createEmptyPagination() {
  return {
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    totalShowing: 0,
    limit: PAGE_SIZE,
  };
}

function getPositiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export default ShopPage;
