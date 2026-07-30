import { useEffect, useRef } from "react";
import useApiCollection from "../../../hooks/useApiCollection";
import HomeProductCard from "./HomeProductCard";
import SectionStatus from "./SectionStatus";

function NewProductSection({ onOpenQuickView }) {
  const carouselRef = useRef(null);
  const {
    items: products,
    loading,
    errorMessage,
    retry,
  } = useApiCollection(
    "/products?section=new-arrivals&limit=12",
    "Unable to load new arrivals.",
  );
  const productCount = products.length;

  useEffect(() => {
    if (!carouselRef.current || productCount === 0) {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);

    carousel.owlCarousel({
      loop: productCount > 4,
      margin: 24,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 800,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        1200: { items: 4 },
      },
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, [productCount]);

  return (
    <section className="mn-new-product p-tb-15">
      <div className="mn-title">
        <h2>
          New <span>Arrivals</span>
        </h2>
      </div>

      {loading && <SectionStatus message="Loading new arrivals..." />}
      {!loading && errorMessage && (
        <SectionStatus message={errorMessage} onRetry={retry} />
      )}
      {!loading && !errorMessage && productCount === 0 && (
        <SectionStatus message="No new arrivals are available." />
      )}
      {!loading && !errorMessage && productCount > 0 && (
        <div className="mn-product owl-carousel" ref={carouselRef}>
          {products.map((product) => (
            <HomeProductCard
              key={product._id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default NewProductSection;
