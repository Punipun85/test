import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../layouts/authlayouts";
import { AuthContext } from "../context/authcontext";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(identifier, password);
      alert(`Login berhasil sebagai ${user.role}`);
      navigate(user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      alert(err.message || "Login gagal");
    }
  };

  return (
    <AuthLayout>
      <div className="login-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-box">
            <input
              type="text"
              placeholder="Email atau No. Telepon"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="login-input-box password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="login-register-link">
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/syarat")}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
