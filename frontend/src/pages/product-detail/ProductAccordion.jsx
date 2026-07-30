import { useState } from "react";
import ReviewSection from "./ReviewSection";

function ProductAccordion({ product }) {
  const [openItem, setOpenItem] = useState("Product Detail");

  const toggleItem = (title) => {
    setOpenItem((currentTitle) => (currentTitle === title ? "" : title));
  };

  return (
    <div className="mn-accordion style-1 mn-single-pro-tab-content">
      <AccordionItem
        isOpen={openItem === "Product Detail"}
        onToggle={() => toggleItem("Product Detail")}
        title="Product Detail"
      >
        <div className="mn-single-pro-tab-desc">
          <p>{product.info || "No additional product details are available."}</p>
        </div>
      </AccordionItem>

      <AccordionItem
        isOpen={openItem === "Specifications"}
        onToggle={() => toggleItem("Specifications")}
        title="Specifications"
      >
        <div className="mn-single-pro-tab-moreinfo">
          <ul>
            <li>
              <span>Category</span> {product.category}
            </li>
            <li>
              <span>Stock</span> {product.stock}
            </li>
            <li>
              <span>Sizes</span>{" "}
              {product.sizes?.length ? product.sizes.join(", ") : "Not specified"}
            </li>
            <li>
              <span>Colors</span>{" "}
              {product.colors?.length
                ? product.colors
                    .map((color) => color.color)
                    .filter(Boolean)
                    .join(", ") || `${product.colors.length} options`
                : "Not specified"}
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        bodyClass="pb-0"
        isOpen={openItem === "Reviews"}
        onToggle={() => toggleItem("Reviews")}
        title={`Reviews (${product.numReviews || 0})`}
      >
        <ReviewSection productId={product._id} />
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ title, isOpen = false, bodyClass = "", onToggle, children }) {
  return (
    <div className="mn-accordion-item">
      <button className="mn-accordion-header" onClick={onToggle} type="button">
        {title}
      </button>
      <div className={`mn-accordion-body ${isOpen ? "show" : ""} ${bodyClass}`}>
        {children}
      </div>
    </div>
  );
}

export default ProductAccordion;
