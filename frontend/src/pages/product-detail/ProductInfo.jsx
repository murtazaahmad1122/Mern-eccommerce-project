import { useEffect, useState } from "react";
import { getMediaUrl } from "../../utils/getMediaUrl";
import { formatPrice } from "../../utils/formatPrice";
import { useCommerce } from "../../context/CommerceContext";

function ProductInfo({ product }) {
  const dealEndTime = product.dealEndDate
    ? new Date(product.dealEndDate).getTime()
    : 0;
  const countdown = useCountdown(dealEndTime);
  const hasActiveDeal = product.isDeal && countdown.total > 0;
  const discountPercent =
    product.discountPercent ||
    (product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0);

  return (
    <div className="single-pro-desc single-pro-desc-no-sidebar m-t-991">
      <div className="single-pro-content">
        <h1 className="mn-single-title">{product.title}</h1>

        <div className="mn-single-rating-wrap">
          <div className="mn-single-rating mn-pro-rating">
            <Rating rating={product.rating || 0} />
          </div>
          <span className="mn-read-review">
            |&nbsp;&nbsp;
            <a href="#mn-spt-nav-review">
              {product.numReviews || 0}{" "}
              {product.numReviews === 1 ? "Review" : "Reviews"}
            </a>
          </span>
        </div>

        <div className="mn-single-price-stoke">
          <div className="mn-single-price">
            <div className="final-price">
              {formatPrice(product.price)}
              {discountPercent > 0 && (
                <span className="price-des">-{discountPercent}%</span>
              )}
            </div>
            {product.oldPrice != null && (
              <div className="mrp">
                M.R.P. : <span>{formatPrice(product.oldPrice)}</span>
              </div>
            )}
          </div>

          <div className="mn-single-stoke">
            <span className="mn-single-sku">
              SKU#: {product._id.slice(-8).toUpperCase()}
            </span>
            <span className="mn-single-ps-title">
              {product.stock > 0 ? `${product.stock} IN STOCK` : "OUT OF STOCK"}
            </span>
          </div>
        </div>

        {hasActiveDeal && (
          <div className="mn-single-sales">
            <div className="mn-single-sales-inner">
              <div className="mn-single-sales-countdown">
                <div className="mn-single-countdown">
                  <div className="timer dealend-timer">
                    <CountdownBlock value={countdown.days} label="Days" />
                    <CountdownBlock value={countdown.hours} separator />
                    <CountdownBlock value={countdown.minutes} separator />
                    <CountdownBlock value={countdown.seconds} />
                  </div>
                  <div className="mn-single-count-desc">
                    Time is Running Out!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mn-single-desc">
          {product.info || "No additional product description is available."}
        </div>

        <ProductVariations product={product} />
        <ProductActions product={product} />
      </div>
    </div>
  );
}

function CountdownBlock({ value, label, separator = false }) {
  return (
    <span className="time-block">
      <span className="time">{String(value).padStart(2, "0")}</span>
      {label ? <span className="day">{label}</span> : null}
      {separator ? <span className="dots">:</span> : null}
    </span>
  );
}

function useCountdown(targetTime) {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(targetTime),
  );

  useEffect(() => {
    if (!targetTime) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setRemainingTime(getRemainingTime(targetTime));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetTime]);

  return remainingTime;
}

function getRemainingTime(targetTime) {
  const distance = Math.max(0, targetTime - Date.now());

  return {
    total: distance,
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function ProductVariations({ product }) {
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const [activeSize, setActiveSize] = useState(sizes[0] || "");
  const [activeColor, setActiveColor] = useState(0);

  if (sizes.length === 0 && colors.length === 0) {
    return null;
  }

  return (
    <div className="mn-pro-variation">
      {sizes.length > 0 && (
        <div className="mn-pro-variation-inner mn-pro-variation-size m-b-24">
          <span>Size</span>
          <div className="mn-pro-variation-content">
            <ul>
              {sizes.map((size) => (
                <li className={activeSize === size ? "active" : ""} key={size}>
                  <button type="button" onClick={() => setActiveSize(size)}>
                    <span>{size}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="mn-pro-variation-inner mn-pro-variation-color">
          <span>Colors</span>
          <div className="mn-pro-variation-content">
            <ul>
              {colors.map((color, index) => (
                <li
                  className={activeColor === index ? "active" : ""}
                  key={`${color.color || color.image}-${index}`}
                >
                  <button type="button" onClick={() => setActiveColor(index)}>
                    <span
                      style={
                        color.image
                          ? {
                              backgroundImage: `url("${getMediaUrl(color.image)}")`,
                            }
                          : { backgroundColor: color.color }
                      }
                    ></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductActions({ product }) {
  const { addToCart, addToWishlist } = useCommerce();
  const [status, setStatus] = useState("");
  const stock = product.stock;
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = Math.max(1, stock || 0);

  return (
    <div className="mn-single-qty">
      <div className="qty-plus-minus">
        <button
          className="dec mn-qtybtn"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          type="button"
        >
          -
        </button>
        <input
          className="qty-input"
          max={maxQuantity}
          min="1"
          name="ms_qtybtn"
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            setQuantity(
              Number.isFinite(nextValue)
                ? Math.min(maxQuantity, Math.max(1, nextValue))
                : 1,
            );
          }}
          type="number"
          value={quantity}
        />
        <button
          className="inc mn-qtybtn"
          onClick={() =>
            setQuantity((value) => Math.min(maxQuantity, value + 1))
          }
          type="button"
        >
          +
        </button>
      </div>

      <div className="mn-btns">
        <div className="mn-single-cart">
          <button
            className="btn btn-primary mn-btn-2 mn-add-cart"
            disabled={stock <= 0}
            type="button"
            onClick={async () => {
              try { await addToCart(product, quantity); setStatus("Added to cart."); }
              catch (error) { setStatus(error.response?.data?.message || error.message); }
            }}
          >
            <span>{stock > 0 ? "Add To Cart" : "Out Of Stock"}</span>
          </button>
        </div>

        <div className="mn-single-wishlist">
          <button
            className="mn-btn-group wishlist mn-wishlist"
            title="Wishlist"
            type="button"
            onClick={async () => {
              try { await addToWishlist(product); setStatus("Added to wishlist."); }
              catch (error) { setStatus(error.response?.data?.message || error.message); }
            }}
          >
            <i className="ri-heart-line"></i>
          </button>
        </div>

        <div className="mn-single-mn-compare">
          <button
            className="mn-btn-group mn-compare"
            title="Compare"
            type="button"
          >
            <i className="ri-repeat-line"></i>
          </button>
        </div>
      </div>
      {status && <p className="m-t-15" role="status">{status}</p>}
    </div>
  );
}

function Rating({ rating }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          className={`ri-star-fill ${star > Math.round(rating) ? "grey" : ""}`}
          key={star}
        ></i>
      ))}
    </>
  );
}

export default ProductInfo;
