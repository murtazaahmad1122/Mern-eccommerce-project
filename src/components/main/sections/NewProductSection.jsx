import { useEffect, useRef } from "react";

const products = [
  {
    label: "trending",
    labelClass: "trending",
    category: "T-shirt",
    sizes: ["s", "m", "xl"],
    title: "Cotton fabric T-shirt",
    mainImg: "5.jpg",
    hoverImg: "6.jpg",
    price: "$120",
    oldPrice: "$130",
    wishlistActive: false,
    colors: [
      { type: "image", value: "bg/5.jpg", active: true },
      { type: "image", value: "bg/6.jpg" },
      { type: "color", value: "#e97e70" },
      { type: "color", value: "#70e98a" },
    ],
  },
  {
    category: "Shoes",
    sizes: ["7", "8", "10"],
    title: "Special sport shoes",
    mainImg: "9.jpg",
    hoverImg: "10.jpg",
    price: "$55",
    wishlistActive: true,
    colors: [
      { type: "color", value: "#0e0e0e" },
      { type: "color", value: "#c54367" },
    ],
  },
  {
    label: "new",
    labelClass: "new",
    category: "Top",
    sizes: ["s", "m"],
    title: "Cotton fabric Top",
    mainImg: "1.jpg",
    hoverImg: "3.jpg",
    price: "$120",
    oldPrice: "$130",
    colors: [
      { type: "color", value: "#f3f3f3", active: true },
      { type: "color", value: "#e8c2ff" },
    ],
  },
  {
    label: "sale",
    labelClass: "sale",
    category: "watches",
    title: "Mantu smart watch",
    mainImg: "11.jpg",
    hoverImg: "12.jpg",
    price: "$955",
    oldPrice: "$999",
    colors: [
      { type: "color", value: "#f3f3f3" },
      { type: "color", value: "#242424" },
    ],
  },
  {
    label: "20% off",
    labelClass: "discount",
    category: "belt",
    title: "Mantu leather belt",
    mainImg: "13.jpg",
    hoverImg: "14.jpg",
    price: "$10",
    oldPrice: "$12",
    colors: [
      { type: "color", value: "#d48a5b" },
      { type: "color", value: "#242424" },
    ],
  },
  {
    category: "Bag",
    sizes: ["m", "l"],
    title: "Leather bag",
    mainImg: "15.jpg",
    hoverImg: "16.jpg",
    price: "$66",
    colors: [
      { type: "color", value: "#b75956" },
      { type: "color", value: "#0e0e0e" },
    ],
  },
];

function NewProductSection({ onOpenQuickView }) {
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
      loop: true,
      margin: 24,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 800,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        768: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <section className="mn-new-product p-tb-15">
      <div className="mn-title">
        <h2>
          New <span>Arrivals</span>
        </h2>
      </div>

      <div className="mn-product owl-carousel" ref={carouselRef}>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            onOpenQuickView={onOpenQuickView}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onOpenQuickView }) {
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
            <img
              className="main-img"
              src={`/src/assets/img/product/${product.mainImg}`}
              alt="product"
            />
            <img
              className="hover-img"
              src={`/src/assets/img/product/${product.hoverImg}`}
              alt="product"
            />
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
              <li>
                <a href="#" data-tooltip title="Compare" className="mn-compare">
                  <i className="ri-repeat-line"></i>
                </a>
              </li>
              <li>
                <a href="#" data-tooltip title="Add To Cart" className="mn-add-cart">
                  <i className="ri-shopping-cart-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mn-product-detail">
        <div className="cat">
          <a href="#">{product.category}</a>

          {product.sizes && (
            <ul>
              {product.sizes.map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          )}
        </div>

        <h5>
          <a href="#">{product.title}</a>
        </h5>

        <div className="mn-price">
          <div className="mn-price-new">{product.price}</div>
          {product.oldPrice && (
            <div className="mn-price-old">{product.oldPrice}</div>
          )}
        </div>

        <div className="mn-pro-option">
          <div className="mn-pro-color">
            <ul className="mn-opt-swatch mn-change-img">
              {product.colors.map((color, index) => (
                <li className={color.active ? "active" : ""} key={index}>
                  <a
                    href="#"
                    className={`mn-opt-clr-img ${color.active ? "active" : ""}`}
                    data-src={`/src/assets/img/product/${product.mainImg}`}
                    data-src-hover={`/src/assets/img/product/${product.hoverImg}`}
                    data-tooltip="Orange"
                  >
                    <span
                      style={
                        color.type === "image"
                          ? {
                              backgroundImage: `url('/src/assets/img/product/${color.value}')`,
                            }
                          : {
                              backgroundColor: color.value,
                            }
                      }
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className={`mn-wishlist ${product.wishlistActive ? "active" : ""}`}
            data-tooltip
            title="Wishlist"
          >
            <i className="ri-heart-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewProductSection;