import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getMediaUrl } from "../utils/getMediaUrl";

const PREFERRED_SECTION_ORDER = [
  "Fashion",
  "Bakery",
  "Vegetables",
  "Fruits",
];

const sidebarIcons = import.meta.glob("../assets/img/icons/*", {
  eager: true,
  import: "default",
});

function getSectionOrder(sectionName) {
  const index = PREFERRED_SECTION_ORDER.findIndex(
    (name) => name.toLowerCase() === sectionName.toLowerCase(),
  );

  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

function resolveCategoryImage(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  if (/^(?:https?:|data:|blob:|\/uploads\/)/i.test(value)) {
    return getMediaUrl(value);
  }

  const filename = value.split(/[\\/]/).pop();
  return sidebarIcons[`../assets/img/icons/${filename}`] || getMediaUrl(value);
}

function Sidebar({ isOpen, onClose }) {
  const [sections, setSections] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSidebarCategories() {
      setIsLoading(true);
      setError("");

      try {
        const response = await axiosInstance.get("/categories/sidebar", {
          signal: controller.signal,
        });
        const groupedCategories = response.data?.data;

        if (
          !groupedCategories ||
          typeof groupedCategories !== "object" ||
          Array.isArray(groupedCategories)
        ) {
          throw new Error("Invalid sidebar category response.");
        }

        const nextSections = Object.entries(groupedCategories)
          .filter(([, categories]) => Array.isArray(categories))
          .sort(([sectionA], [sectionB]) => {
            const orderDifference =
              getSectionOrder(sectionA) - getSectionOrder(sectionB);

            return Number.isNaN(orderDifference)
              ? sectionA.localeCompare(sectionB)
              : orderDifference;
          })
          .map(([name, categories]) => ({
            name,
            categories: [...categories].sort(
              (categoryA, categoryB) =>
                (categoryA.sortOrder ?? 0) - (categoryB.sortOrder ?? 0),
            ),
          }));

        setSections(nextSections);
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") {
          setError(
            requestError.response?.data?.message ||
              "Unable to load sidebar categories.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadSidebarCategories();

    return () => controller.abort();
  }, [reloadKey]);

  const toggleDropdown = (categoryId) => {
    setOpenDropdown((current) =>
      current === categoryId ? null : categoryId,
    );
  };

  return (
    <>
      <div
        className={`mn-sidebar-overlay ${isOpen ? "mn-sidebar-overlay-hide" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`mn-sidebar ${isOpen ? "sidebar-hide" : ""}`}>
        <div className="mn-sidebar-body">
          <button
            type="button"
            className="side-close"
            title="Close"
            onClick={onClose}
          ></button>

          <ul className="mn-sb-list">
            {isLoading && (
              <SidebarStatus message="Loading categories..." />
            )}

            {!isLoading && error && (
              <SidebarStatus message={error}>
                <button
                  type="button"
                  onClick={() => setReloadKey((current) => current + 1)}
                >
                  Try again
                </button>
              </SidebarStatus>
            )}

            {!isLoading && !error && sections.length === 0 && (
              <SidebarStatus message="No categories are available." />
            )}

            {!isLoading &&
              !error &&
              sections.map((section) => (
                <Fragment key={section.name}>
                  <li className="mn-sb-title condense">
                    <span>{section.name}</span>
                  </li>

                  {section.categories.map((category) => {
                    const categoryKey =
                      category._id || category.slug || category.name;
                    const subcategories = Array.isArray(category.subcategories)
                      ? category.subcategories.filter(Boolean)
                      : [];

                    return subcategories.length > 0 ? (
                      <SidebarDropdown
                        key={categoryKey}
                        category={category}
                        items={subcategories}
                        isOpen={openDropdown === categoryKey}
                        onToggle={() => toggleDropdown(categoryKey)}
                        onNavigate={onClose}
                      />
                    ) : (
                      <SidebarItem
                        key={categoryKey}
                        category={category}
                        onNavigate={onClose}
                      />
                    );
                  })}
                </Fragment>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function SidebarStatus({ message, children }) {
  return (
    <li className="mn-sidebar-api-status">
      <span>{message}</span>
      {children}
    </li>
  );
}

function CategoryIcon({ category }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = resolveCategoryImage(category.image);

  if (!imageUrl || hasError) {
    return (
      <span className="mn-sidebar-icon-fallback" aria-hidden="true">
        {category.name?.charAt(0)?.toUpperCase() || "?"}
      </span>
    );
  }

  return (
    <img
      src={imageUrl}
      alt=""
      aria-hidden="true"
      onError={() => setHasError(true)}
    />
  );
}

function SidebarItem({ category, onNavigate }) {
  return (
    <li className="mn-sb-item sb-drop-item">
      <Link
        to={`/shop?category=${encodeURIComponent(category.name)}`}
        className="mn-drop-toggle"
        onClick={onNavigate}
      >
        <CategoryIcon category={category} />
        <span className="condense">{category.name}</span>
      </Link>
    </li>
  );
}

function SidebarDropdown({
  category,
  items,
  isOpen,
  onToggle,
  onNavigate,
}) {
  return (
    <li className="mn-sb-item sb-drop-item">
      <button
        type="button"
        className={`mn-drop-toggle ${isOpen ? "active-nav" : ""}`}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <CategoryIcon category={category} />
        <span className="condense">
          {category.name}
          <i className="drop-arrow ri-arrow-down-s-line"></i>
        </span>
      </button>

      <ul className="mn-sb-drop" style={{ display: isOpen ? "block" : "none" }}>
        {items.map((item) => (
          <li className="list" key={item}>
            <Link
              to={`/shop?category=${encodeURIComponent(item)}`}
              className="mn-page-link drop"
              onClick={onNavigate}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Sidebar;
