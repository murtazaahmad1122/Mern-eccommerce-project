import { useEffect, useRef } from "react";
import DealProductCard from "./DealProductCard";
import { dealProducts } from "./dealProducts";

function DealSection({ onOpenQuickView }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const $ = window.jQuery || window.$;

    if (!carouselRef.current || !$ || !$.fn.owlCarousel) return;

    const carousel = $(carouselRef.current);

    carousel.owlCarousel({
      loop: true,
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
  }, []);

  return (
    <section className="mn-new-product p-tb-15">
      <div className="mn-title mn-title-2">
        <div className="mn-timer">
          <h2>
            Day of the <span>Deals</span>
          </h2>

          <div
            className="timer1 timer dealend-timer"
            data-date="September 30, 2026 19:15:10 PDT"
          ></div>
        </div>
      </div>

      <div className="mn-product owl-carousel" ref={carouselRef}>
        {dealProducts.map((product, index) => (
          <DealProductCard
            key={`${product.title}-${index}`}
            product={product}
            onOpenQuickView={onOpenQuickView}
          />
        ))}
      </div>
    </section>
  );
}

export default DealSection;