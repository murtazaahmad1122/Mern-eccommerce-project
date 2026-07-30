import HomeProductCard from "../../components/main/sections/HomeProductCard";

function ShopProductCard({ product, onOpenQuickView, isListView }) {
  return (
    <div
      className={`col-lg-3 col-md-4 col-sm-6 col-12 m-b-24 mn-product-box pro-gl-content ${
        isListView ? "width-50" : ""
      }`}
    >
      <HomeProductCard
        onOpenQuickView={onOpenQuickView}
        product={product}
        showInfo={isListView}
      />
    </div>
  );
}

export default ShopProductCard;
