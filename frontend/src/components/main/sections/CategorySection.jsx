import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useApiCollection from "../../../hooks/useApiCollection";
import { getMediaUrl } from "../../../utils/getMediaUrl";
import SectionStatus from "./SectionStatus";

const categoryAssets = import.meta.glob(
  ["/src/assets/img/icons/*", "/src/assets/img/category/*"],
  {
    eager: true,
    import: "default",
  },
);

function CategorySection() {
  const carouselRef = useRef(null);
  const {
    items: categories,
    loading,
    errorMessage,
    retry,
  } = useApiCollection("/categories", "Unable to load categories.");
  const categoryCount = categories.length;

  useEffect(() => {
    if (!carouselRef.current || categoryCount === 0) {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);
    const hasMultiplePages = categoryCount > 3;

    carousel.owlCarousel({
      loop: hasMultiplePages,
      nav: hasMultiplePages,
      dots: false,
      autoplay: hasMultiplePages,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      margin: 24,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
      },
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, [categoryCount]);

  if (loading) {
    return (
      <section className="mn-category p-tb-15">
        <SectionStatus message="Loading categories..." />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mn-category p-tb-15">
        <SectionStatus message={errorMessage} onRetry={retry} />
      </section>
    );
  }

  if (categoryCount === 0) {
    return (
      <section className="mn-category p-tb-15">
        <SectionStatus message="No categories are available." />
      </section>
    );
  }

  return (
    <section className="mn-category p-tb-15">
      <div className="mn-cat owl-carousel" ref={carouselRef}>
        {categories.map((category, index) => (
          <CategoryCard
            cardClass={`cat-card-${(index % 6) + 1}`}
            category={category}
            key={category._id}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category, cardClass }) {
  const previewImages = [
    ...(Array.isArray(category.previewImages) ? category.previewImages : []),
    category.image,
  ]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .slice(0, 3);
  const productLabel = `${category.productCount || 0} ${
    category.productCount === 1 ? "product" : "products"
  }`;

  return (
    <div className={`mn-cat-card ${cardClass}`}>
      <p className="lbl">
        <span>{category.section}</span>
      </p>

      <span className="bg">{category.name}</span>

      <h4>{productLabel}</h4>
      <h3>{category.name}</h3>
      <p>
        {category.subcategories?.length || 0}{" "}
        {category.subcategories?.length === 1 ? "subcategory" : "subcategories"}
      </p>

      {previewImages.length > 0 && (
        <ul>
          {previewImages.map((image) => (
            <li key={image}>
              <Link
                aria-label={`Shop ${category.name}`}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
              >
                <img
                  src={resolveCategoryImage(image)}
                  alt={`${category.name} category`}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function resolveCategoryImage(value) {
  if (!value) {
    return "";
  }

  if (/^(?:https?:|data:|blob:|\/uploads\/)/i.test(value)) {
    return getMediaUrl(value);
  }

  const filename = value.split(/[\\/]/).pop();

  return (
    categoryAssets[`/src/assets/img/icons/${filename}`] ||
    categoryAssets[`/src/assets/img/category/${filename}`] ||
    value
  );
}

export default CategorySection;
