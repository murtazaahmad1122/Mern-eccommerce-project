import { Link } from "react-router-dom";

const wishlistItems = [
  {
    id: "548",
    image: "1.jpg",
    title: "T-shirt for womens",
    date: "13 Aug 2026",
    price: "$25",
    status: "Out Of Stock",
    statusClass: "out",
  },
  {
    id: "684",
    image: "23.jpg",
    title: "Women's winter coat",
    date: "20 Jul 2027",
    price: "$360",
    status: "Available",
    statusClass: "avl",
  },
  {
    id: "548",
    image: "11.jpg",
    title: "Mantu smart watch",
    date: "28 Mar 2024",
    price: "$74",
    status: "Disabled",
    statusClass: "dis",
  },
  {
    id: "684",
    image: "15.jpg",
    title: "Leather textured bag",
    date: "16 Apr 2026",
    price: "$245",
    status: "Available",
    statusClass: "avl",
  },
];

function WishlistPage() {
  return (
    <div className="mn-main-content">
      <Breadcrumb />

      <section className="mn-wishlist-page p-b-15">
        <div className="mn-title d-none">
          <h2>
            Product <span>Wishlist</span>
          </h2>
          <p>Your product wish is our first priority.</p>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="mn-vendor-dashboard-card">
              <div className="mn-vendor-card-header">
                <h5>Wishlist</h5>

                <div className="mn-header-btn">
                  <Link className="mn-btn-2" to="/shop">
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>

              <div className="mn-vendor-card-body">
                <div className="mn-vendor-card-table">
                  <table className="mn-table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="wish-empt">
                      {wishlistItems.map((item, index) => (
                        <WishlistRow key={`${item.id}-${index}`} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="mn-breadcrumb m-b-30">
      <div className="row">
        <div className="col-12">
          <div className="row gi_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="mn-breadcrumb-title">Wishlist Page</h2>
            </div>

            <div className="col-md-6 col-sm-12">
              <ul className="mn-breadcrumb-list">
                <li className="mn-breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="mn-breadcrumb-item active">Wishlist Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistRow({ item }) {
  return (
    <tr className="pro-gl-content">
      <td>
        <span>{item.id}</span>
      </td>

      <td data-label="Product" className="mn-cart-pro-name">
        <Link to="/product-detail" className="mn-item">
          <img
            className="prod-img"
            src={`/src/assets/img/product/${item.image}`}
            alt="product"
          />
          {item.title}
        </Link>
      </td>

      <td>
        <span>{item.date}</span>
      </td>

      <td>
        <span>{item.price}</span>
      </td>

      <td>
        <span className={item.statusClass}>{item.status}</span>
      </td>

      <td>
        <span className="tbl-btn">
          <a
            className="mn-btn-2 add-to-cart mn-add-cart"
            href="#"
            title="Add To Cart"
          >
            <span>
              <i className="ri-shopping-cart-line"></i>
            </span>
          </a>

          <a
            className="mn-btn-1 mn-remove-wish btn"
            href="#"
            title="Remove From List"
          >
            <span>
              <i className="ri-close-line"></i>
            </span>
          </a>
        </span>
      </td>
    </tr>
  );
}

export default WishlistPage;