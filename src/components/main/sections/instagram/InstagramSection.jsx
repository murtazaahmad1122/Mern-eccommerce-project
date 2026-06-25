import { useEffect, useRef } from "react";
import InstagramItem from "./InstagramItem";

const instagramImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
];

function InstagramSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.infiniteslide) {
      return undefined;
    }

    const $container = $(containerRef.current);
    if ($container.data("insta-initialized")) {
      return undefined;
    }

    $container.infiniteslide({
      direction: "left",
      speed: 50,
      clone: 10,
    });

    $container.data("insta-initialized", true);

    return () => {
      $container.data("insta-initialized", false);
    };
  }, []);

  return (
    <section className="mn-instagram module p-tb-15" id="insta">
      <h2 className="d-none">insta</h2>

      <div className="mn-insta-wrapper">
        <div className="mn-insta-outer">
          <div className="insta-auto" ref={containerRef}>
            {instagramImages.map((image) => (
              <InstagramItem key={image} image={image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;