import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { formatPrice } from "../../utils/formatPrice";
import { getMediaUrl } from "../../utils/getMediaUrl";

const SEARCH_LIMIT = 5;
const RECENT_SEARCHES_KEY = "recentProductSearches";

function getRecentSearches() {
  try {
    const storedSearches = JSON.parse(
      localStorage.getItem(RECENT_SEARCHES_KEY) || "[]",
    );

    return Array.isArray(storedSearches)
      ? storedSearches.filter((item) => typeof item === "string").slice(0, 5)
      : [];
  } catch {
    return [];
  }
}

function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const searchParams = new URLSearchParams({
          limit: String(SEARCH_LIMIT),
          sort: "latest",
        });

        if (debouncedQuery) {
          searchParams.set("search", debouncedQuery);
        }

        const response = await axiosInstance.get(
          `/products?${searchParams.toString()}`,
          { signal: controller.signal },
        );

        setProducts(
          Array.isArray(response.data?.data) ? response.data.data : [],
        );
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setProducts([]);
          setErrorMessage(
            error.response?.data?.message || "Unable to search products.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [debouncedQuery, isOpen, reloadKey]);

  const rememberSearch = (value) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      return;
    }

    setRecentSearches((currentSearches) => {
      const nextSearches = [
        normalizedValue,
        ...currentSearches.filter(
          (item) => item.toLowerCase() !== normalizedValue.toLowerCase(),
        ),
      ].slice(0, 5);

      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
      return nextSearches;
    });
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    rememberSearch(normalizedQuery);
    onClose?.();
    navigate(`/shop?search=${encodeURIComponent(normalizedQuery)}`);
  };

  const handleRecentSearch = (item) => {
    rememberSearch(item);
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="mn-side-search-overlay"
        style={{ display: "block" }}
        onClick={onClose}
      />
      <div
        className="mn-side-search mn-open-search"
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className="mn-search-inner">
          <div className="mn-search-title">
            <span className="search_title">Search</span>
            <button
              type="button"
              className="mn-search-close"
              onClick={onClose}
              aria-label="Close search"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="mn-search">
            <form onSubmit={submitSearch}>
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder="Search products..."
                aria-label="Search products"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit" aria-label="View all search results">
                <i className="ri-search-line"></i>
              </button>
            </form>
          </div>

          <div className="mn-search-list">
            <div className="mn-search-result-heading">
              {debouncedQuery ? "Search results" : "Latest products"}
            </div>

            {isLoading && (
              <SearchStatus message="Searching products..." />
            )}

            {!isLoading && errorMessage && (
              <SearchStatus message={errorMessage}>
                <button
                  type="button"
                  onClick={() => setReloadKey((current) => current + 1)}
                >
                  Try again
                </button>
              </SearchStatus>
            )}

            {!isLoading && !errorMessage && products.length === 0 && (
              <SearchStatus
                message={
                  debouncedQuery
                    ? `No products found for “${debouncedQuery}”.`
                    : "No products are available."
                }
              />
            )}

            {!isLoading && !errorMessage && products.length > 0 && (
              <ul className="mn-search-pro-items">
                {products.map((product) => (
                  <SearchResult
                    key={product._id}
                    product={product}
                    onNavigate={() => {
                      if (debouncedQuery) {
                        rememberSearch(debouncedQuery);
                      }
                      onClose?.();
                    }}
                  />
                ))}
              </ul>
            )}
          </div>

          {recentSearches.length > 0 && (
            <div className="mn-search-also m-t-15">
              <div className="mn-search-title">
                <span className="search_title">Recent searches</span>
              </div>
              <ul>
                {recentSearches.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/shop?search=${encodeURIComponent(item)}`}
                      onClick={() => handleRecentSearch(item)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SearchResult({ product, onNavigate }) {
  const productPath = `/product/${product._id}`;
  const rating = Math.max(0, Math.min(5, Math.round(Number(product.rating) || 0)));

  return (
    <li className="search-sidebar-list">
      <Link to={productPath} className="mn-pro-img" onClick={onNavigate}>
        <SearchProductImage product={product} />
      </Link>
      <div className="mn-pro-content">
        <Link
          to={productPath}
          className="search-pro-title"
          onClick={onNavigate}
        >
          {product.title}
        </Link>
        <Link
          to={`/shop?category=${encodeURIComponent(product.category || "")}`}
          className="search-cat"
          onClick={onNavigate}
        >
          {product.category || "Uncategorized"}
        </Link>
        <ul className="mn-ratings" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <li key={`${product._id}-rating-${index}`}>
              <i
                className={`ri-star-fill ${index >= rating ? "grey" : ""}`}
              ></i>
            </li>
          ))}
        </ul>
        <span className="search-price">
          <span>{formatPrice(product.price)}</span>
          <span className="stock">
            - {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
          </span>
        </span>
      </div>
    </li>
  );
}

function SearchProductImage({ product }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getMediaUrl(product.mainImg);

  if (!imageUrl || hasError) {
    return (
      <span className="mn-search-image-fallback" aria-hidden="true">
        {product.title?.charAt(0)?.toUpperCase() || "?"}
      </span>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={product.title || "Product"}
      onError={() => setHasError(true)}
    />
  );
}

function SearchStatus({ message, children }) {
  return (
    <div className="mn-search-api-status">
      <span>{message}</span>
      {children}
    </div>
  );
}

export default SearchModal;
