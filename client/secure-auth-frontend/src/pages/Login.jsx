import { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login with Password</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <input
          className="form-control my-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Login</button>
        <div className="mt-3">
          <Link to="/forgot-password">Forgot Password?</Link> |
          <Link to="/otp-login" className="ms-2">Login with OTP</Link> |
          <Link to="/register" className="ms-2">Register</Link>
        </div>
      </form>
    </div>
  );
}
