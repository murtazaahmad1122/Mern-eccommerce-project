import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { getMediaUrl } from "../../../utils/getMediaUrl";

function HeroSection() {
  const carouselRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    const controller = new AbortController();

    async function loadHeroSlides() {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axiosInstance.get("/hero-slides", {
          signal: controller.signal,
        });

        setSlides(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setSlides([]);
          setErrorMessage(
            error.response?.data?.message || "Unable to load hero slides.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHeroSlides();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  useEffect(() => {
    if (!carouselRef.current || slideCount === 0) {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);
    const hasMultipleSlides = slideCount > 1;

    carousel.owlCarousel({
      items: 1,
      loop: hasMultipleSlides,
      nav: hasMultipleSlides,
      dots: hasMultipleSlides,
      autoplay: hasMultipleSlides,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      margin: 0,
      animateOut: "fadeOut",
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, [slideCount]);

  if (loading) {
    return <HeroStatus message="Loading slides..." />;
  }

  if (errorMessage) {
    return (
      <HeroStatus
        message={errorMessage}
        onRetry={() => setReloadKey((currentKey) => currentKey + 1)}
      />
    );
  }

  if (slideCount === 0) {
    return <HeroStatus message="No hero slides are available." />;
  }

  return (
    <section className="mn-hero m-b-15">
      <div className="mn-hero-slider owl-carousel" ref={carouselRef}>
        {slides.map((slide, index) => (
          <HeroSlide
            isPrimaryHeading={index === 0}
            key={slide._id}
            slide={slide}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSlide({ slide, isPrimaryHeading }) {
  const Title = isPrimaryHeading ? "h1" : "h2";
  const imageUrl = getMediaUrl(slide.image);
  const buttonLink = slide.buttonLink || "/shop";
  const buttonText = slide.buttonText || "Shop Now";

  return (
    <div
      className={`mn-hero-slide ${slide.className || ""}`.trim()}
      style={imageUrl ? { "--mn-hero-image": `url("${imageUrl}")` } : undefined}
    >
      <div className="mn-hero-detail">
        {slide.discount && (
          <p className="label">
            <span>
              {slide.discount}
              <br />
              Off
            </span>
          </p>
        )}

        <Title>
          {slide.title}
          {slide.subtitle && (
            <>
              <br />
              {slide.subtitle}
            </>
          )}
        </Title>

        {slide.text && <p>{slide.text}</p>}

        <HeroButton link={buttonLink} text={buttonText} />
      </div>
    </div>
  );
}

function HeroButton({ link, text }) {
  const content = <span>{text}</span>;

  if (link.startsWith("/")) {
    return (
      <Link className="mn-btn-2" to={link}>
        {content}
      </Link>
    );
  }

  return (
    <a className="mn-btn-2" href={link}>
      {content}
    </a>
  );
}

function HeroStatus({ message, onRetry }) {
  return (
    <section className="mn-hero m-b-15">
      <div className="mn-hero-status" role="status">
        <p>{message}</p>
        {onRetry && (
          <button className="mn-btn-2" onClick={onRetry} type="button">
            <span>Retry</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
