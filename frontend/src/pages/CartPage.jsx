import { Link } from "react-router-dom";

const cartItems = [
  { image: "11.jpg", title: "Mantu smart watch", price: 516 },
  { image: "15.jpg", title: "Leather bag", price: 75 },
  { image: "21.jpg", title: "Cotton fabric T-shirt", price: 48 },
  { image: "9.jpg", title: "Special sport shoes", price: 95 },
];

function CartPage() {
  return (
    <div className="mn-main-content">
      <Breadcrumb />

      <section className="mn-cart-section p-b-15">
        <h2 className="d-none">Cart Page</h2>

        <div className="row">
          <div className="mn-cart-leftside col-lg-8 col-md-12">
            <CartTable />
          </div>

          <div className="mn-cart-rightside col-lg-4 col-md-12 m-t-991">
            <CartSummary />
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
              <h2 className="mn-breadcrumb-title">Cart Page</h2>
            </div>

            <div className="col-md-6 col-sm-12">
              <ul className="mn-breadcrumb-list">
                <li className="mn-breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="mn-breadcrumb-item active">Cart Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartTable() {
  return (
    <div className="mn-cart-content">
      <div className="mn-cart-inner cart_list">
        <div className="row">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="table-content cart-table-content">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th style={{ textAlign: "center" }}>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <CartRow key={item.title} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-lg-12">
              <div className="mn-cart-update-bottom">
                <Link to="/shop">Continue Shopping</Link>
                <Link to="/checkout" className="mn-btn-2">
                  <span>Check Out</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function CartRow({ item }) {
  return (
    <tr className="mn-cart-product">
      <td data-label="Product" className="mn-cart-pro-name">
        <Link to="/product-detail">
          <img
            className="mn-cart-pro-img"
            src={`/src/assets/img/product/${item.image}`}
            alt={item.title}
          />
          {item.title}
        </Link>
      </td>

      <td data-label="Price" className="mn-cart-pro-price">
        <span className="amount">${item.price.toFixed(2)}</span>
      </td>

      <td
        data-label="Quantity"
        className="mn-cart-pro-qty"
        style={{ textAlign: "center" }}
      >
        <div className="cart-qty-plus-minus">
          <input
            className="cart-plus-minus"
            type="text"
            name="cartqtybutton"
            defaultValue="1"
          />
        </div>
      </td>

      <td data-label="Total" className="mn-cart-pro-subtotal">
        ${item.price.toFixed(2)}
      </td>

      <td data-label="Remove" className="mn-cart-pro-remove">
        <a href="#">
          <i className="ri-delete-bin-line"></i>
        </a>
      </td>
    </tr>
  );
}

function CartSummary() {
  return (
    <div className="mn-sidebar-wrap">
      <div className="mn-sidebar-block">
        <div className="mn-sb-title">
          <h3 className="mn-sidebar-title">Summary</h3>
        </div>

        <div className="mn-sb-block-content">
          <div className="mn-cart-form">
            <p>Enter your destination to get a shipping estimate</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <CartSelect
                label="Country *"
                name="gi_cart_country"
                id="mn-cart-select-country"
                placeholder="United States"
                options={["Country 1", "Country 2", "Country 3", "Country 4", "Country 5"]}
              />

              <CartSelect
                label="State/Province"
                name="gi_cart_state"
                id="mn-cart-select-state"
                placeholder="Please Select a region, state"
                options={[
                  "Region/State 1",
                  "Region/State 2",
                  "Region/State 3",
                  "Region/State 4",
                  "Region/State 5",
                ]}
              />

              <span className="mn-cart-wrap">
                <label>Zip/Postal Code</label>
                <input
                  type="text"
                  name="postalcode"
                  placeholder="Zip/Postal Code"
                />
              </span>
            </form>
          </div>
        </div>

        <div className="mn-sb-block-content">
          <div className="mn-cart-summary-bottom">
            <div className="mn-cart-summary">
              <SummaryRow label="Sub-Total" value="$734.00" />
              <SummaryRow label="Delivery Charges" value="$80.00" />

              <div>
                <span className="text-left">Coupan Discount</span>
                <span className="text-right">
                  <a className="mn-cart-coupan">Apply Coupan</a>
                </span>
              </div>

              <div className="mn-cart-coupan-content">
                <form
                  className="mn-cart-coupan-form"
                  name="mn-cart-coupan-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="mn-coupan"
                    type="text"
                    required
                    placeholder="Enter Your Coupan Code"
                    name="mn-coupan"
                  />

                  <button className="mn-btn-2" type="submit">
                    <span>Apply</span>
                  </button>
                </form>
              </div>

              <div className="mn-cart-summary-total">
                <span className="text-left">Total Amount</span>
                <span className="text-right">$814.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSelect({ label, name, id, placeholder, options }) {
  return (
    <span className="mn-cart-wrap">
      <label>{label}</label>

      <span className="mn-cart-select-inner">
        <select name={name} id={id} className="mn-cart-select" defaultValue="">
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option, index) => (
            <option value={index + 1} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </span>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <span className="text-left">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export default CartPage;