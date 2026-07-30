import { Link } from "react-router-dom";
import { getMediaUrl } from "../../../utils/getMediaUrl";
import { formatPrice } from "../../../utils/formatPrice";

function HomeProductCard({ product, onOpenQuickView, showInfo = false }) {
  const mainImage = getMediaUrl(product.mainImg);
  const hoverImage = getMediaUrl(product.hoverImg) || mainImage;
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  return (
    <div className="mn-product-card">
      <div className="mn-product-img">
        {product.label && (
          <div className="lbl">
            <span className={product.labelClass || ""}>{product.label}</span>
          </div>
        )}

        <div className="mn-img">
          <Link className="image" to={`/product/${product._id}`}>
            <img className="main-img" src={mainImage} alt={product.title} />
            <img className="hover-img" src={hoverImage} alt="" />
          </Link>

          <div className="mn-pro-loader"></div>

          <div className="mn-options">
            <ul>
              <li>
                <button
                  aria-label={`Quick view ${product.title}`}
                  data-tooltip
                  onClick={() => onOpenQuickView?.(product)}
                  title="Quick View"
                  type="button"
                >
                  <i className="ri-eye-line"></i>
                </button>
              </li>
              <li>
                <button
                  aria-label={`Compare ${product.title}`}
                  className="mn-compare"
                  data-tooltip
                  title="Compare"
                  type="button"
                >
                  <i className="ri-repeat-line"></i>
                </button>
              </li>
              <li>
                <button
                  aria-label={`Add ${product.title} to cart`}
                  className="mn-add-cart"
                  data-tooltip
                  title="Add To Cart"
                  type="button"
                >
                  <i className="ri-shopping-cart-line"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mn-product-detail">
        <div className="cat">
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>

          {sizes.length > 0 && (
            <ul>
              {sizes.map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          )}
        </div>

        <h5>
          <Link to={`/product/${product._id}`}>
            {product.title}
          </Link>
        </h5>

        {showInfo && product.info && <p className="mn-info">{product.info}</p>}

        <div className="mn-price">
          <div className="mn-price-new">{formatPrice(product.price)}</div>
          {product.oldPrice != null && (
            <div className="mn-price-old">{formatPrice(product.oldPrice)}</div>
          )}
        </div>

        <div className="mn-pro-option">
          <div className="mn-pro-color">
            {colors.length > 0 && (
              <ul className="mn-opt-swatch">
                {colors.map((item, index) => (
                  <li className={item.active ? "active" : ""} key={`${item.color || item.image}-${index}`}>
                    <span
                      className={`mn-opt-clr-img ${item.active ? "active" : ""}`}
                      title={item.color || "Product color"}
                    >
                      <span
                        style={
                          item.image
                            ? { backgroundImage: `url("${getMediaUrl(item.image)}")` }
                            : { backgroundColor: item.color }
                        }
                      ></span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            aria-label={`Add ${product.title} to wishlist`}
            className={`mn-wishlist ${product.wishlistActive ? "active" : ""}`}
            data-tooltip
            title="Wishlist"
            type="button"
          >
            <i className="ri-heart-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProductCard;
