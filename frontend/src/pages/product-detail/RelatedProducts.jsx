import { useEffect, useRef } from "react";
import useApiCollection from "../../hooks/useApiCollection";
import HomeProductCard from "../../components/main/sections/HomeProductCard";

function RelatedProducts({ currentProduct, onOpenQuickView }) {
  const carouselRef = useRef(null);
  const endpoint = `/products?category=${encodeURIComponent(
    currentProduct.category,
  )}&limit=8`;
  const { items } = useApiCollection(endpoint, "Unable to load related products.");
  const products = items.filter((product) => product._id !== currentProduct._id);
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

    return () => carousel.trigger("destroy.owl.carousel");
  }, [productCount]);

  if (productCount === 0) {
    return null;
  }

  return (
    <section className="mn-related-product m-t-30">
      <div className="mn-title">
        <h2>
          Related <span>Products</span>
        </h2>
      </div>

      <div className="mn-related owl-carousel" ref={carouselRef}>
        {products.map((product) => (
          <HomeProductCard
            key={product._id}
            onOpenQuickView={onOpenQuickView}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
