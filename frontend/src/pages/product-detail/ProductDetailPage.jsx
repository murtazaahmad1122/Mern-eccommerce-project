import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import SectionStatus from "../../components/main/sections/SectionStatus";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductAccordion from "./ProductAccordion";
import RelatedProducts from "./RelatedProducts";

function ProductDetailPage({ onOpenQuickView }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await axiosInstance.get(`/products/${id}`, {
          signal: controller.signal,
        });

        setProduct(response.data.data || null);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setProduct(null);
          setErrorMessage(
            error.response?.data?.message || "Unable to load this product.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      controller.abort();
    };
  }, [id, reloadKey]);

  return (
    <div className="mn-main-content">
      <ProductBreadcrumb product={product} />

      {loading && <SectionStatus message="Loading product details..." />}
      {!loading && errorMessage && (
        <SectionStatus
          message={errorMessage}
          onRetry={() => setReloadKey((currentKey) => currentKey + 1)}
        />
      )}
      {!loading && !errorMessage && !product && (
        <SectionStatus message="Product not found." />
      )}

      {!loading && !errorMessage && product && (
        <div className="row">
          <div className="col-xxl-12">
            <section className="mn-single-product">
              <div className="row">
                <div className="mn-pro-rightside mn-common-rightside col-lg-12 col-md-12 m-b-15">
                  <div className="single-pro-block">
                    <div className="single-pro-inner">
                      <div className="row">
                        <ProductGallery key={product._id} product={product} />
                        <ProductInfo key={product._id} product={product} />
                      </div>
                    </div>
                  </div>

                  <ProductAccordion product={product} />
                  <RelatedProducts
                    currentProduct={product}
                    onOpenQuickView={onOpenQuickView}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
