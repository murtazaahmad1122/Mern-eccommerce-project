import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="mn-main-content">
      <div className="mn-breadcrumb m-b-30">
        <div className="row">
          <div className="col-12">
            <div className="row gi_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="mn-breadcrumb-title">Register Page</h2>
              </div>

              <div className="col-md-6 col-sm-12">
                <ul className="mn-breadcrumb-list">
                  <li className="mn-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mn-breadcrumb-item active">Register Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mn-register p-b-15">
        <div className="mn-title d-none">
          <h2>
            Register<span></span>
          </h2>
          <p>Best place to buy and sell digital products.</p>
        </div>

        <div className="row">
          <div className="mn-register-wrapper">
            <div className="mn-register-container">
              <div className="mn-register-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <span className="mn-register-wrap mn-register-half">
                    <label>First Name*</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter your first name"
                      required
                    />
                  </span>

                  <span className="mn-register-wrap mn-register-half">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter your last name"
                      required
                    />
                  </span>

                  <span className="mn-register-wrap mn-register-half">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email add..."
                      required
                    />
                  </span>

                  <span className="mn-register-wrap mn-register-half">
                    <label>Phone Number*</label>
                    <input
                      type="text"
                      name="phonenumber"
                      placeholder="Enter your phone number"
                      required
                    />
                  </span>

                  <span className="mn-register-wrap">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address Line 1"
                    />
                  </span>

                  <RegisterSelect
                    label="City *"
                    name="gi_select_city"
                    id="mn-select-city"
                    placeholder="City"
                    options={["City 1", "City 2", "City 3", "City 4", "City 5"]}
                  />

                  <span className="mn-register-wrap mn-register-half">
                    <label>Post Code</label>
                    <input
                      type="text"
                      name="postalcode"
                      placeholder="Post Code"
                    />
                  </span>

                  <RegisterSelect
                    label="Country *"
                    name="gi_select_country"
                    id="mn-select-country"
                    placeholder="Country"
                    options={[
                      "Country 1",
                      "Country 2",
                      "Country 3",
                      "Country 4",
                      "Country 5",
                    ]}
                  />

                  <RegisterSelect
                    label="Region State"
                    name="gi_select_state"
                    id="mn-select-state"
                    placeholder="Region/State"
                    options={[
                      "Region/State 1",
                      "Region/State 2",
                      "Region/State 3",
                      "Region/State 4",
                      "Region/State 5",
                    ]}
                  />

                  <span className="mn-register-wrap mn-recaptcha">
                    <span
                      className="g-recaptcha"
                      data-sitekey="6LfKURIUAAAAAO50vlwWZkyK_G2ywqE52NU7YO0S"
                      data-callback="verifyRecaptchaCallback"
                      data-expired-callback="expiredRecaptchaCallback"
                    ></span>

                    <input
                      className="form-control d-none"
                      data-recaptcha="true"
                      required
                      data-error="Please complete the Captcha"
                    />

                    <span className="help-block with-errors"></span>
                  </span>

                  <span className="mn-register-wrap mn-register-btn">
                    <span>
                      Have an account?
                      <Link to="/login">Login</Link>
                    </span>

                    <button className="mn-btn-1" type="submit">
                      <span>Register</span>
                    </button>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function RegisterSelect({ label, name, id, placeholder, options }) {
  return (
    <span className="mn-register-wrap mn-register-half">
      <label>{label}</label>

      <span className="mn-rg-select-inner">
        <select name={name} id={id} className="mn-register-select" defaultValue="">
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

export default RegisterPage;