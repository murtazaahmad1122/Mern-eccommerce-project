import { useEffect } from "react";
import { getMediaUrl } from "../../utils/getMediaUrl";
import { formatPrice } from "../../utils/formatPrice";

function QuickViewModal({ isOpen, product, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const mainImage = getMediaUrl(product.mainImg);
  const hoverImage = getMediaUrl(product.hoverImg);

  return (
    <div
      className="modal fade show quickview-modal"
      id="quickview_modal"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.55)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content">
          <button type="button" className="qty-close" onClick={onClose} aria-label="Close" />

          <div className="modal-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="single-pro-img">
                  <div className="single-slide-quickview">
                    <div className="single-product-img mn-product-img">
                      <div className="mn-img">
                        <div className="image">
                          <img
                            className="main-img"
                            src={mainImage}
                            alt={`${product.title} preview`}
                          />
                          {hoverImage ? (
                            <img
                              className="hover-img"
                              src={hoverImage}
                              alt=""
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="quickview-pro-content">
                  <div className="mn-quick-title">
                    <h4>{product.title}</h4>
                    <span className="cat">{product.category}</span>
                  </div>

                  <div className="mn-quickview-price">
                    <span className="new-price">{formatPrice(product.price)}</span>
                    {product.oldPrice != null ? (
                      <span className="old-price">{formatPrice(product.oldPrice)}</span>
                    ) : null}
                  </div>

                  <p className="mn-quickview-desc">
                    {product.info ||
                      "Premium quality product with modern styling and excellent comfort."}
                  </p>

                  <div className="mn-quickview-qty">
                    <div className="mn-quickview-cart">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
