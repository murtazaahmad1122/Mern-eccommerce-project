import { useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    image: "1.jpg",
    name: "Mariya Klinton",
    designation: "(CEO)",
    text: "Lorem Ipsum is simply dummy text of the printing and industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    image: "2.jpg",
    name: "John Doe",
    designation: "(CFO)",
    text: "Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and this is the lorem and scrambled it to make a type specimen.",
  },
  {
    image: "3.jpg",
    name: "Nency Lykra",
    designation: "(Manager)",
    text: "When an unknown printer took a galley of type and scrambled it to make a type specimen Lorem Ipsum has been the industry's and ever since to the 1500s,",
  },
];

function TestimonialSection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const $ = window.jQuery || window.$;

    if (!carouselRef.current || !$ || !$.fn.owlCarousel) return;

    const carousel = $(carouselRef.current);

    carousel.owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      margin: 0,
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <section className="mn-testimonials p-tb-15">
      <div className="row">
        <div className="col-md-12">
          <div className="testim-bg">
            <div className="section-title d-none">
              <h2>
                Customers <span>Review</span>
              </h2>
            </div>

            <div className="mn-test-outer mn-testimonials">
              <ul className="mn-testimonial-slider owl-carousel" ref={carouselRef}>
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    testimonial={testimonial}
                  />
                ))}
              </ul>
            </div>

            <span className="mn-testi-shape-2"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;