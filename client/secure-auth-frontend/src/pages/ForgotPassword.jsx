import { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-warning">Send Reset Link</button>
        <div className="mt-3">
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
