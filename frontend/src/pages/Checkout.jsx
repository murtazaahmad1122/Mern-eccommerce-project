import { Link } from "react-router-dom";

const summaryProducts = [
  {
    title: "Round neck cotton t-shirt",
    mainImg: "1.jpg",
    hoverImg: "2.jpg",
    oldPrice: "$58.00",
    newPrice: "$45.00",
    rating: 4,
  },
  {
    title: "Digital smart watch",
    mainImg: "11.jpg",
    hoverImg: "12.jpg",
    oldPrice: "$265.00",
    newPrice: "$250.00",
    rating: 5,
  },
];

function Checkout() {
  return (
    <div className="mn-main-content">
      <Breadcrumb />

      <section className="mn-checkout-section p-b-15">
        <h2 className="d-none">Checkout Page</h2>

        <div className="row">
          <div className="mn-checkout-leftside col-lg-8 col-md-12">
            <CheckoutLeft />
          </div>

          <div className="mn-checkout-rightside col-lg-4 col-md-12 m-t-991">
            <CheckoutSummary />
            <DeliveryMethod />
            <PaymentMethod />
            <PaymentImage />
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
              <h2 className="mn-breadcrumb-title">Checkout Page</h2>
            </div>

            <div className="col-md-6 col-sm-12">
              <ul className="mn-breadcrumb-list">
                <li className="mn-breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="mn-breadcrumb-item active">Checkout Page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutLeft() {
  return (
    <div className="mn-checkout-content">
      <div className="mn-checkout-inner">
        <div className="mn-checkout-wrap m-b-30">
          <NewCustomer />
          <ReturningCustomer />
        </div>

        <BillingDetails />

        <span className="mn-check-order-btn m-t-30">
          <a className="mn-btn-2" href="#">
            <span>Place Order</span>
          </a>
        </span>
      </div>
    </div>
  );
}

function NewCustomer() {
  return (
    <div className="mn-checkout-block mn-check-new">
      <h3 className="mn-checkout-title">New Customer</h3>

      <div className="mn-check-block-content">
        <div className="mn-check-subtitle">Checkout Options</div>

        <form>
          <span className="mn-new-option">
            <span className="m-b-15">
              <input type="radio" id="account1" name="accountType" defaultChecked />
              <label htmlFor="account1">Register Account</label>
            </span>

            <span className="m-b-15">
              <input type="radio" id="account2" name="accountType" />
              <label htmlFor="account2">Guest Account</label>
            </span>
          </span>
        </form>

        <div className="mn-new-desc">
          By creating an account you will be able to shop faster, be up to date
          on an order&apos;s status, and keep track of the orders you have
          previously made.
        </div>

        <div className="mn-new-btn">
          <a href="#" className="mn-btn-2">
            <span>Continue</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ReturningCustomer() {
  return (
    <div className="mn-checkout-block mn-check-login">
      <h3 className="mn-checkout-title">Returning Customer</h3>

      <div className="mn-check-login-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <span className="mn-check-login-wrap">
            <label>Email Address</label>
            <input type="text" name="name" placeholder="Enter your email address" required />
          </span>

          <span className="mn-check-login-wrap">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required />
          </span>

          <span className="mn-check-login-wrap mn-check-login-btn">
            <button className="mn-btn-2" type="submit">
              <span>Login</span>
            </button>
            <a className="mn-check-login-fp" href="#">
              Forgot Password?
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}

function BillingDetails() {
  return (
    <div className="mn-checkout-wrap m-b-30 padding-bottom-3">
      <div className="mn-checkout-block mn-check-bill">
        <h3 className="mn-checkout-title">Billing Details</h3>

        <div className="mn-bl-block-content">
          <div className="mn-check-subtitle">Checkout Options</div>

          <span className="mn-bill-option">
            <span className="m-b-15">
              <input type="radio" id="bill1" name="billingAddress" />
              <label htmlFor="bill1">I want to use an existing address</label>
            </span>

            <span className="m-b-15">
              <input type="radio" id="bill2" name="billingAddress" defaultChecked />
              <label htmlFor="bill2">I want to use new address</label>
            </span>
          </span>

          <div className="mn-check-bill-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <InputWrap half label="First Name*" name="firstname" placeholder="Enter your first name" required />
              <InputWrap half label="Last Name*" name="lastname" placeholder="Enter your last name" required />
              <InputWrap label="Address" name="address" placeholder="Address Line 1" />

              <SelectWrap label="City *" id="mn-select-city" name="gi_select_city" placeholder="City" />
              <InputWrap half label="Post Code" name="postalcode" placeholder="Post Code" />
              <SelectWrap label="Country *" id="mn-select-country" name="gi_select_country" placeholder="Country" />
              <SelectWrap label="Region State" id="mn-select-state" name="gi_select_state" placeholder="Region/State" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWrap({ label, name, placeholder, required = false, half = false }) {
  return (
    <span className={`mn-bill-wrap ${half ? "mn-bill-half" : ""}`}>
      <label>{label}</label>
      <input type="text" name={name} placeholder={placeholder} required={required} />
    </span>
  );
}

function SelectWrap({ label, id, name, placeholder }) {
  return (
    <span className="mn-bill-wrap mn-bill-half">
      <label>{label}</label>
      <span className="mn-bl-select-inner">
        <select name={name} id={id} className="mn-bill-select" defaultValue="">
          <option value="" disabled>
            {placeholder}
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num} key={num}>
              {placeholder} {num}
            </option>
          ))}
        </select>
      </span>
    </span>
  );
}

function CheckoutSummary() {
  return (
    <div className="mn-sidebar-wrap">
      <div className="mn-sidebar-block">
        <div className="mn-sb-title">
          <h3 className="mn-sidebar-title">Summary</h3>
        </div>

        <div className="mn-sb-block-content">
          <div className="mn-checkout-summary">
            <SummaryRow label="Sub-Total" value="$295.00" />
            <SummaryRow label="Delivery Charges" value="$80.00" />

            <div>
              <span className="text-left">Coupan Discount</span>
              <span className="text-right">
                <a className="mn-checkout-coupan">Apply Coupan</a>
              </span>
            </div>

            <div className="mn-checkout-coupan-content">
              <form className="mn-checkout-coupan-form" onSubmit={(e) => e.preventDefault()}>
                <input className="mn-coupan" type="text" required placeholder="Enter Your Coupan Code" />
                <button className="mn-coupan-btn mn-btn-2" type="submit">
                  <span>Apply</span>
                </button>
              </form>
            </div>

            <div className="mn-checkout-summary-total">
              <span className="text-left">Total Amount</span>
              <span className="text-right">$375.00</span>
            </div>
          </div>

          <div className="mn-checkout-pro">
            {summaryProducts.map((product, index) => (
              <SummaryProduct key={product.title} product={product} isLast={index === summaryProducts.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
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

function SummaryProduct({ product, isLast }) {
  return (
    <div className={`col-sm-12 ${isLast ? "mb-0" : "mb-6"}`}>
      <div className="mn-product-inner">
        <div className="mn-pro-image-outer">
          <div className="mn-pro-image">
            <a href="#" className="image">
              <img className="main-image" src={`/src/assets/img/product/${product.mainImg}`} alt="Product" />
              <img className="hover-image" src={`/src/assets/img/product/${product.hoverImg}`} alt="Product" />
            </a>
          </div>
        </div>

        <div className="mn-pro-content">
          <h5 className="mn-pro-title">
            <a href="#">{product.title}</a>
          </h5>

          <div className="mn-pro-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <i key={star} className={`ri-star-fill ${star > product.rating ? "grey" : ""}`}></i>
            ))}
          </div>

          <span className="mn-price">
            <span className="old-price">{product.oldPrice}</span>
            <span className="new-price">{product.newPrice}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function DeliveryMethod() {
  return (
    <SidebarBlock title="Delivery Method">
      <div className="mn-checkout-del">
        <div className="mn-del-desc">
          Please select the preferred shipping method to use on this order.
        </div>

        <form>
          <span className="mn-del-option">
            <span>
              <span className="mn-del-opt-head">Free Shipping</span>
              <input type="radio" id="del1" name="deliveryMethod" defaultChecked />
              <label htmlFor="del1">Rate - $0 .00</label>
            </span>

            <span>
              <span className="mn-del-opt-head">Flat Rate</span>
              <input type="radio" id="del2" name="deliveryMethod" />
              <label htmlFor="del2">Rate - $5.00</label>
            </span>
          </span>
        </form>
      </div>
    </SidebarBlock>
  );
}

function PaymentMethod() {
  return (
    <SidebarBlock title="Payment Method">
      <div className="mn-checkout-pay">
        <div className="mn-pay-desc">
          Please select the preferred payment method to use on this order.
        </div>

        <form>
          <span className="mn-pay-option m-b-15">
            <span>
              <input type="radio" id="pay1" name="paymentMethod" defaultChecked />
              <label htmlFor="pay1">Cash On Delivery</label>
            </span>
          </span>

          <span className="mn-pay-commemt">
            <span className="mn-pay-opt-head">Add extra note</span>
            <textarea name="your-commemt" placeholder="Comments"></textarea>
          </span>

          <span className="mn-pay-agree">
            <input type="checkbox" />
            I have agree with <a href="#">Terms & Conditions.</a>
            <span className="checked"></span>
          </span>
        </form>
      </div>
    </SidebarBlock>
  );
}

function PaymentImage() {
  return (
    <SidebarBlock title="Payment Method">
      <div className="mn-check-pay-img-inner">
        <div className="mn-check-pay-img">
          <img src="/src/assets/img/footer/payment.png" alt="payment" />
        </div>
      </div>
    </SidebarBlock>
  );
}

function SidebarBlock({ title, children }) {
  return (
    <div className="mn-sidebar-wrap mn-checkout-del-wrap">
      <div className="mn-sidebar-block">
        <div className="mn-sb-title">
          <h3 className="mn-sidebar-title">{title}</h3>
        </div>
        <div className="mn-sb-block-content">{children}</div>
      </div>
    </div>
  );
}

export default Checkout;