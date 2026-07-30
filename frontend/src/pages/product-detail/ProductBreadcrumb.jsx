import { Link } from "react-router-dom";

function ProductBreadcrumb({ product }) {
  return (
    <div className="mn-breadcrumb m-b-30">
      <div className="row">
        <div className="col-12">
          <div className="row gi_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="mn-breadcrumb-title">
                {product?.title || "Product Page"}
              </h2>
            </div>

            <div className="col-md-6 col-sm-12">
              <ul className="mn-breadcrumb-list">
                <li className="mn-breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="mn-breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="mn-breadcrumb-item active">
                  {product?.title || "Product"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBreadcrumb;
