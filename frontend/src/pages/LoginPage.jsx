import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="mn-main-content">
      <div className="mn-breadcrumb m-b-30">
        <div className="row">
          <div className="col-12">
            <div className="row gi_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="mn-breadcrumb-title">Login Page</h2>
              </div>

              <div className="col-md-6 col-sm-12">
                <ul className="mn-breadcrumb-list">
                  <li className="mn-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mn-breadcrumb-item active">Login Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mn-login p-b-15">
        <div className="mn-title d-none">
          <h2>
            Login<span></span>
          </h2>
          <p>Get access to your Orders, Wishlist and Recommendations.</p>
        </div>

        <div className="mn-login-content">
          <div className="mn-login-box">
            <div className="mn-login-wrapper">
              <div className="mn-login-container">
                <div className="mn-login-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <span className="mn-login-wrap">
                      <label>Email Address*</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your email add..."
                        required
                      />
                    </span>

                    <span className="mn-login-wrap">
                      <label>Password*</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                      />
                    </span>

                    <span className="mn-login-wrap mn-login-fp">
                      <span className="mn-remember">
                        <input type="checkbox" />
                        Remember
                        <span className="checked"></span>
                      </span>

                      <label>
                        <a href="#">Forgot Password?</a>
                      </label>
                    </span>

                    <span className="mn-login-wrap mn-login-btn">
                      <span>
                        <Link to="/register">Create Account?</Link>
                      </span>

                      <button className="mn-btn-1 btn" type="submit">
                        <span>Login</span>
                      </button>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mn-login-box d-n-991">
            <div className="mn-login-img">
              <img src="src/assets/img/common/about-3.png" alt="login" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
