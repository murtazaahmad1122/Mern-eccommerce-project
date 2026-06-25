import { useEffect, useRef } from "react";

const heroSlides = [
  {
    className: "slide-1",
    discount: "50%",
    titleTag: "h1",
    title: "Fashion sale",
    subtitle: "for women's",
    text: "Elevate your every day. Style that speaks volumes.",
  },
  {
    className: "slide-2",
    discount: "35%",
    titleTag: "h2",
    title: "Fashion sale",
    subtitle: "for Men's",
    text: "Wear the change. Fashion that feels good.",
  },
  {
    className: "slide-3",
    discount: "44%",
    titleTag: "h2",
    title: "Fashion sale",
    subtitle: "for Children's",
    text: "Wear the change. Fashion that feels good.",
  },
  {
    className: "slide-4",
    discount: "22%",
    titleTag: "h2",
    title: "Cosmetics sale",
    subtitle: "for Women's",
    text: "Wear the change. Fashion that feels good.",
  },
];

function HeroSection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current || typeof window === "undefined") {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);
    carousel.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      margin: 0,
      animateOut: "fadeOut",
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <section className="mn-hero m-b-15">
      <div className="mn-hero-slider owl-carousel" ref={carouselRef}>
        {heroSlides.map((slide) => (
          <HeroSlide key={slide.className} slide={slide} />
        ))}
      </div>
    </section>
  );
}

function HeroSlide({ slide }) {
  const Title = slide.titleTag;

  return (
    <div className={`mn-hero-slide ${slide.className}`}>
      <div className="mn-hero-detail">
        <p className="label">
          <span>
            {slide.discount}
            <br />
            Off
          </span>
        </p>

        <Title>
          {slide.title} <br />
          {slide.subtitle}
        </Title>

        <p>{slide.text}</p>

        <a href="#" className="mn-btn-2">
          <span>Shop Now</span>
        </a>
      </div>
    </div>
  );
}

export default HeroSection;