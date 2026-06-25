import { useEffect, useRef } from "react";

const banners = [
  {
    imgClass: "img-1",
    smallTitle: "WOMEN'S",
    title: "Fashion COLLECTION",
    season: "Summer",
    text: "New Stylish Shirts, Pants & Accessries.",
  },
  {
    imgClass: "img-2",
    smallTitle: "WOMEN'S",
    title: "goggles COLLECTION",
    season: "Summer",
    text: "New Stylish Shirts, Pants & Accessries.",
  },
];

function BannerSection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const $ = window.jQuery || window.$;

    if (!carouselRef.current || !$ || !$.fn.owlCarousel) return;

    const carousel = $(carouselRef.current);

    carousel.owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 800,
      margin: 0,
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <section className="mn-banner p-tb-15">
      <div className="row">
        <div
          className="col-12"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="mn-modern-banner owl-carousel" ref={carouselRef}>
            {banners.map((banner) => (
              <BannerCard key={banner.imgClass} banner={banner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerCard({ banner }) {
  return (
    <div className="modern-banner">
      <div className={`mn-banner-img ${banner.imgClass}`}></div>

      <div className="mn-banner-contact banner-animation">
        <div className="inner-banner">
          <h3>{banner.smallTitle}</h3>
          <h4>{banner.title}</h4>
        </div>

        <div className="inner-text">
          <span className="bnr-text">{banner.season}</span>
          <p>{banner.text}</p>
        </div>

        <div className="banner-btn">
          <a href="#" className="mn-btn-1">
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BannerSection;