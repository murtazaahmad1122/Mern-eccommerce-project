import { useEffect, useRef, useState } from "react";
import useApiCollection from "../../../../hooks/useApiCollection";
import HomeProductCard from "../HomeProductCard";
import SectionStatus from "../SectionStatus";

function DealSection({ onOpenQuickView }) {
  const carouselRef = useRef(null);
  const {
    items: products,
    loading,
    errorMessage,
    retry,
  } = useApiCollection(
    "/products?activeDeal=true&limit=12",
    "Unable to load current deals.",
  );
  const productCount = products.length;
  const dealEndDate = getNextDealEndDate(products);

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
      <div className="mn-title mn-title-2">
        <div className="mn-timer">
          <h2>
            Day of the <span>Deals</span>
          </h2>

          {dealEndDate && <DealCountdown endDate={dealEndDate} />}
        </div>
      </div>

      {loading && <SectionStatus message="Loading deals..." />}
      {!loading && errorMessage && (
        <SectionStatus message={errorMessage} onRetry={retry} />
      )}
      {!loading && !errorMessage && productCount === 0 && (
        <SectionStatus message="No active deals are available." />
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

function DealCountdown({ endDate }) {
  const [remaining, setRemaining] = useState(() => getRemainingTime(endDate));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemaining(getRemainingTime(endDate));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [endDate]);

  if (remaining.total <= 0) {
    return null;
  }

  return (
    <div
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds remaining`}
      className="timer dealend-timer"
    >
      <div className="dealend-timer">
        <div className="time-block">
          <div className="time">{remaining.days}</div>
          <span className="day">Days</span>
        </div>
        <div className="time-block">
          <div className="time">{padTime(remaining.hours)}</div>
          <span className="dots">:</span>
        </div>
        <div className="time-block">
          <div className="time">{padTime(remaining.minutes)}</div>
          <span className="dots">:</span>
        </div>
        <div className="time-block">
          <div className="time">{padTime(remaining.seconds)}</div>
        </div>
      </div>
    </div>
  );
}

function getNextDealEndDate(products) {
  const now = Date.now();

  return products
    .map((product) => product.dealEndDate)
    .filter((date) => date && new Date(date).getTime() > now)
    .sort((firstDate, secondDate) => new Date(firstDate) - new Date(secondDate))[0];
}

function getRemainingTime(endDate) {
  const total = Math.max(0, new Date(endDate).getTime() - Date.now());

  return {
    total,
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function padTime(value) {
  return String(value).padStart(2, "0");
}

export default DealSection;
