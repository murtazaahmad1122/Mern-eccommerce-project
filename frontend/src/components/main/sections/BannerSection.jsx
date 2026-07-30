import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useApiCollection from "../../../hooks/useApiCollection";
import { getMediaUrl } from "../../../utils/getMediaUrl";
import SectionStatus from "./SectionStatus";

function BannerSection() {
  const carouselRef = useRef(null);
  const {
    items: banners,
    loading,
    errorMessage,
    retry,
  } = useApiCollection(
    "/banners?position=home-middle",
    "Unable to load banners.",
  );
  const bannerCount = banners.length;

  useEffect(() => {
    if (!carouselRef.current || bannerCount === 0) {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);
    const hasMultipleBanners = bannerCount > 1;

    carousel.owlCarousel({
      items: 1,
      loop: hasMultipleBanners,
      nav: false,
      dots: hasMultipleBanners,
      autoplay: hasMultipleBanners,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      margin: 0,
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, [bannerCount]);

  return (
    <section className="mn-banner p-tb-15">
      <div className="row">
        <div
          className="col-12"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {loading && <SectionStatus message="Loading banners..." />}
          {!loading && errorMessage && (
            <SectionStatus message={errorMessage} onRetry={retry} />
          )}
          {!loading && !errorMessage && bannerCount === 0 && (
            <SectionStatus message="No banners are available." />
          )}
          {!loading && !errorMessage && bannerCount > 0 && (
            <div className="mn-modern-banner owl-carousel" ref={carouselRef}>
              {banners.map((banner) => (
                <BannerCard banner={banner} key={banner._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BannerCard({ banner }) {
  const imageUrl = getMediaUrl(banner.image);
  const buttonLink = banner.buttonLink || "/shop";
  const buttonText = banner.buttonText || "Shop Now";

  return (
    <div className="modern-banner">
      <div
        className={`mn-banner-img ${banner.className || ""}`.trim()}
        style={imageUrl ? { "--mn-banner-image": `url("${imageUrl}")` } : undefined}
      ></div>

      <div className="mn-banner-contact banner-animation">
        <div className="inner-banner">
          <h3>{banner.title}</h3>
          {banner.subtitle && <h4>{banner.subtitle}</h4>}
        </div>

        {banner.text && (
          <div className="inner-text">
            <p>{banner.text}</p>
          </div>
        )}

        <div className="banner-btn">
          <BannerButton link={buttonLink} text={buttonText} />
        </div>
      </div>
    </div>
  );
}

function BannerButton({ link, text }) {
  if (link.startsWith("/")) {
    return (
      <Link className="mn-btn-1" to={link}>
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <a className="mn-btn-1" href={link}>
      <span>{text}</span>
    </a>
  );
}

export default BannerSection;
