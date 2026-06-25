const productPath = "/src/assets/img/product/";

function DealProductCard({ product, onOpenQuickView }) {
  return (
    <div className="mn-product-card">
      <div className="mn-product-img">
        {product.label && (
          <div className="lbl">
            <span className={product.labelClass}>{product.label}</span>
          </div>
        )}

        <div className="mn-img">
          <a href="#" className="image">
            <img className="main-img" src={`${productPath}${product.mainImg}`} alt="product" />
            <img className="hover-img" src={`${productPath}${product.hoverImg}`} alt="product" />
          </a>

          <div className="mn-pro-loader"></div>

          <div className="mn-options">
            <ul>
              <li>
                <a
                  href="#"
                  data-tooltip
                  title="Quick View"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenQuickView?.(product);
                  }}
                >
                  <i className="ri-eye-line"></i>
                </a>
              </li>
              <li><a href="#" data-tooltip title="Compare" className="mn-compare"><i className="ri-repeat-line"></i></a></li>
              <li><a href="#" data-tooltip title="Add To Cart" className="mn-add-cart"><i className="ri-shopping-cart-line"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mn-product-detail">
        <div className="cat">
          <a href="#">{product.category}</a>
          {product.sizes && (
            <ul>
              {product.sizes.map((size) => <li key={size}>{size}</li>)}
            </ul>
          )}
        </div>

        <h5><a href="#">{product.title}</a></h5>

        <div className="mn-price">
          <div className="mn-price-new">{product.price}</div>
          {product.oldPrice && <div className="mn-price-old">{product.oldPrice}</div>}
        </div>

        <div className="mn-pro-option">
          <div className="mn-pro-color">
            <ul className="mn-opt-swatch mn-change-img">
              {product.colors.map((item, index) => (
                <li className={item.active ? "active" : ""} key={index}>
                  <a
                    href="#"
                    className={`mn-opt-clr-img ${item.active ? "active" : ""}`}
                    data-src={`${productPath}${item.src}`}
                    data-src-hover={`${productPath}${item.hover}`}
                    data-tooltip="Orange"
                  >
                    <span
                      style={
                        item.image
                          ? { backgroundImage: `url('${productPath}${item.image}')` }
                          : { backgroundColor: item.color }
                      }
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a href="#" className={`mn-wishlist ${product.wishlistActive ? "active" : ""}`} data-tooltip title="Wishlist">
            <i className="ri-heart-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DealProductCard;