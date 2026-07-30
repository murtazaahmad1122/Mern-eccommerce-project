import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCommerce } from "../context/CommerceContext";

function LoginPage() {
  const navigate = useNavigate();
  const { authenticate } = useCommerce();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setSubmitting(true); setStatus("");
    try {
      const response = await axiosInstance.post("/auth/login", form);
      authenticate(response.data); navigate("/");
    } catch (error) { setStatus(error.response?.data?.message || "Unable to log in."); }
    finally { setSubmitting(false); }
  };
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
                  <form onSubmit={submit}>
                    {status && <div className="alert alert-danger">{status}</div>}
                    <span className="mn-login-wrap">
                      <label>Email Address*</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your email add..."
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </span>

                    <span className="mn-login-wrap">
                      <label>Password*</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
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

                      <button className="mn-btn-1 btn" type="submit" disabled={submitting}>
                        <span>{submitting ? "Signing in..." : "Login"}</span>
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
