import { useState } from "react";
import { getMediaUrl } from "../../utils/getMediaUrl";

function ProductGallery({ product }) {
  const images = [product.mainImg, ...(product.gallery || []), product.hoverImg]
    .filter(Boolean)
    .filter((image, index, values) => values.indexOf(image) === index);
  const [activeImage, setActiveImage] = useState(0);
  const hasMultipleImages = images.length > 1;

  const showPreviousImage = () => {
    setActiveImage((currentImage) =>
      currentImage === 0 ? images.length - 1 : currentImage - 1,
    );
  };

  const showNextImage = () => {
    setActiveImage((currentImage) =>
      currentImage === images.length - 1 ? 0 : currentImage + 1,
    );
  };

  return (
    <div className="single-pro-img single-pro-img-no-sidebar">
      <div className="single-product-scroll">
        <div className="single-product-cover">
          {hasMultipleImages && (
            <button
              aria-label="Previous product image"
              className="mn-gallery-arrow mn-gallery-prev"
              onClick={showPreviousImage}
              type="button"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
          )}

          <div className="single-slide zoom-image-hover">
            <img
              className="img-responsive"
              src={getMediaUrl(images[activeImage])}
              alt={product.title}
            />
          </div>

          {hasMultipleImages && (
            <button
              aria-label="Next product image"
              className="mn-gallery-arrow mn-gallery-next"
              onClick={showNextImage}
              type="button"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          )}
        </div>

        {hasMultipleImages && (
          <div className="single-nav-thumb mn-react-product-thumbs">
            {images.map((image, index) => (
              <button
                className={`single-slide slick-slide ${
                  activeImage === index ? "slick-current slick-active" : ""
                }`}
                key={image}
                onClick={() => setActiveImage(index)}
                type="button"
              >
                <img
                  className="img-responsive"
                  src={getMediaUrl(image)}
                  alt={`${product.title} view ${index + 1}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;
